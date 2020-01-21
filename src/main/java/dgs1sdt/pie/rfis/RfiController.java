package dgs1sdt.pie.rfis;

import dgs1sdt.pie.metrics.MetricController;
import dgs1sdt.pie.metrics.rfiexploitdateschange.RfiExploitDatesChange;
import dgs1sdt.pie.metrics.rfiexploitdateschange.RfiExploitDatesChangeRepository;
import dgs1sdt.pie.metrics.rfiprioritychange.RfiPriorityChange;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.TimeZone;


@RestController
@RequestMapping(RfiController.URI)
public class RfiController {
  public static final String URI = "/api/rfis";

  private RfiRepository rfiRepository;
  private RfiService rfiService;
  private MetricController metricController;

  @Autowired
  public void setRfiRepository(RfiRepository rfiRepository) {
    this.rfiRepository = rfiRepository;
  }
  @Autowired
  public void setRfiService(RfiService rfiService) {
    this.rfiService = rfiService;
  }
  @Autowired
  public void setMetricController(MetricController metricController) {
    this.metricController = metricController;
  }

  @Autowired
  public RfiController(RfiService rfiService,
                       RfiRepository rfiRepository) {
    this.rfiService = rfiService;
    this.rfiRepository = rfiRepository;
  }

  @GetMapping
  public List<Rfi> getAllRfis() {
    return this.rfiService.fetchRfisFromRepo();
  }

  //Return value: whether the passed priority change results in a valid priority list
  @PostMapping(path = "/update-priority")
  public boolean updatePriority (@Valid @RequestBody RfiPriorityJson[] rfiPriorityJsons) {
    List<Rfi> rfis = new ArrayList<>();
    List<RfiPriorityChange> metrics = new ArrayList<>();

    List<Rfi> repoRfis = rfiRepository.findAll();
    repoRfis.removeIf(rfi -> rfi.getPriority() < 1 || !rfi.getStatus().equals("OPEN"));

    for (RfiPriorityJson rfiPriorityJson : rfiPriorityJsons) {
      Rfi rfiToUpdate = rfiRepository.findByRfiNum(rfiPriorityJson.getRfiNum());
      if(rfiToUpdate != null) {
        metrics.add(
          new RfiPriorityChange(rfiToUpdate.getRfiNum(), rfiToUpdate.getPriority(), rfiPriorityJson.getPriority(), new Date())
        );

        rfiToUpdate.setPriority(rfiPriorityJson.getPriority());
        rfis.add(rfiToUpdate);

      } else {
        System.err.println("Updating priority on previously unknown RFI " + rfiPriorityJson.getRfiNum());
      }
    }

    //Update priorities in repo list from frontend priorities
    for (Rfi rfi : rfis) {
      for (Rfi repoRfi : repoRfis) {
        if (repoRfi.getRfiNum().equals(rfi.getRfiNum())) {
          repoRfi.setPriority(rfi.getPriority());
          break;
        }
      }
    }

    //Check to make sure each priority 1 through n is used
    int length = repoRfis.size();
    boolean [] priorityExists = new boolean[length];

    for (int i = 0; i < length; i++) //initialize
      priorityExists[i] = false;

    for (Rfi rfi : repoRfis) { // mark used
      priorityExists[rfi.getPriority() - 1] = true;
    }

    for (int i = 0; i < length; i++) //Check all priorities
      if (!priorityExists[i]) //A priority is missing, so tell front end that reprioritization failed
        return false;

    //Add metrics and save pri updates
    metricController.addRfiPriorityChanges(metrics);
    rfiRepository.saveAll(repoRfis);

    //Tell front end that reprioritization was successful
    return true;
  }

  @PostMapping(path = "update-exploit-dates")
  public void updateExploitDates(@Valid @RequestBody RfiExploitDatesJson updatedRfiExploitDates) {
    try {
      TimeZone.setDefault(TimeZone.getTimeZone("UTC"));
      Rfi rfiToUpdate = rfiRepository.findByRfiNum(updatedRfiExploitDates.getRfiNum());
      RfiExploitDatesChange metric = new RfiExploitDatesChange(rfiToUpdate.getRfiNum(),
        rfiToUpdate.getExploitStart(),
        rfiToUpdate.getExploitEnd(),
        new Timestamp(updatedRfiExploitDates.getExploitStart().getTime()),
        new Timestamp(updatedRfiExploitDates.getExploitEnd().getTime()),
        new Timestamp(new Date().getTime())
      );
      rfiToUpdate.setExploitStart(new Timestamp(updatedRfiExploitDates.getExploitStart().getTime()));
      rfiToUpdate.setExploitEnd(new Timestamp(updatedRfiExploitDates.getExploitEnd().getTime()));
      rfiRepository.save(rfiToUpdate);
      metricController.addRfiExploitDatesChange(metric);
    } catch (Exception e) {
      System.err.println("Failed to update exploit dates on RFI " + updatedRfiExploitDates.getRfiNum());
    }
  }
}
