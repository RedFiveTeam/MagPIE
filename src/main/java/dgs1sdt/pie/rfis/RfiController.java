package dgs1sdt.pie.rfis;

import dgs1sdt.pie.metrics.MetricController;
import dgs1sdt.pie.metrics.changerfipriority.MetricChangeRfiPriority;
import dgs1sdt.pie.rfis.exploitdates.ExploitDate;
import dgs1sdt.pie.rfis.exploitdates.ExploitDateJson;
import dgs1sdt.pie.rfis.exploitdates.ExploitDateRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.*;


@RestController
@RequestMapping(RfiController.URI)
public class RfiController {
  public static final String URI = "/api/rfis";

  private RfiRepository rfiRepository;
  private RfiService rfiService;
  private MetricController metricController;
  private ExploitDateRepository exploitDateRepository;

  @Autowired
  public void setRfiRepository(RfiRepository rfiRepository) {
    this.rfiRepository = rfiRepository;
  }
  @Autowired
  public void setExploitDateRepository(ExploitDateRepository exploitDateRepository) {
    this.exploitDateRepository = exploitDateRepository;
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
                       RfiRepository rfiRepository,
                       ExploitDateRepository exploitDateRepository) {
    this.rfiService = rfiService;
    this.rfiRepository = rfiRepository;
    this.exploitDateRepository = exploitDateRepository;
  }

  @GetMapping
  public List<Rfi> getAllRfis() {
    return this.rfiService.fetchRfisFromRepo();
  }

  //Return value: whether the passed priority change results in a valid priority list
  @PostMapping(path = "/update-priority")
  public boolean updatePriority (@Valid @RequestBody RfiPriorityJson[] rfiPriorityJsons) {
    List<Rfi> rfis = new ArrayList<>();
    List<MetricChangeRfiPriority> metrics = new ArrayList<>();

    List<Rfi> repoRfis = rfiRepository.findAll();
    repoRfis.removeIf(rfi -> rfi.getPriority() < 1 || !rfi.getStatus().equals("OPEN"));

    for (RfiPriorityJson rfiPriorityJson : rfiPriorityJsons) {
      Rfi rfiToUpdate = rfiRepository.findByRfiNum(rfiPriorityJson.getRfiNum());
      if(rfiToUpdate != null) {
        metrics.add(
          new MetricChangeRfiPriority(rfiToUpdate.getRfiNum(), rfiToUpdate.getPriority(), rfiPriorityJson.getPriority(), new Date())
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
    metricController.addChangeRfiPriority(metrics);
    rfiRepository.saveAll(repoRfis);

    //Tell front end that reprioritization was successful
    return true;
  }

  @PostMapping(path = "/change-exploit-date")
  public void changeExploitDate(@Valid @RequestBody ExploitDateJson exploitDateJson) {
    Rfi rfi = rfiRepository.findByRfiNum(exploitDateJson.getRfiNum());
    if (
      exploitDateRepository.findAllByRfiId(rfi.getId()).stream()
        .noneMatch(exploitDate -> exploitDate.getExploitDate().equals(exploitDateJson.getNewExploitDate()))
    ) {
      ExploitDate exploitDate = new ExploitDate(exploitDateJson.getNewExploitDate(), rfi.getId());
      exploitDateRepository.save(exploitDate);
      metricController.addChangeExploitDate(exploitDateJson);
    }
  }

  @PostMapping(path = "/dates")
  public List<ExploitDate> fetchExploitDates(@Valid @RequestBody String rfiNum) {
    System.out.println(rfiNum);
    List<ExploitDate> dates = exploitDateRepository.findAllByRfiId(
      rfiRepository.findByRfiNum(rfiNum).getId()
    );
    dates.sort(Comparator.comparing(ExploitDate::getExploitDate));
    return dates;
  }

//  @PostMapping(path = "update-exploit-dates")
//  public void updateExploitDates(@Valid @RequestBody RfiExploitDatesJson updatedRfiExploitDates) {
//    try {
//      Rfi rfiToUpdate = rfiRepository.findByRfiNum(updatedRfiExploitDates.getRfiNum());
//      RfiExploitDatesChange metric = new RfiExploitDatesChange(rfiToUpdate.getRfiNum(),
//        rfiToUpdate.getExploitStart(),
//        rfiToUpdate.getExploitEnd(),
//        new Timestamp(updatedRfiExploitDates.getExploitStart().getTime()),
//        new Timestamp(updatedRfiExploitDates.getExploitEnd().getTime()),
//        new Timestamp(new Date().getTime())
//      );
//      rfiToUpdate.setExploitStart(new Timestamp(updatedRfiExploitDates.getExploitStart().getTime()));
//      rfiToUpdate.setExploitEnd(new Timestamp(updatedRfiExploitDates.getExploitEnd().getTime()));
//      rfiRepository.save(rfiToUpdate);
//      metricController.addRfiExploitDatesChange(metric);
//    } catch (Exception e) {
//      System.err.println("Failed to update exploit dates on RFI " + updatedRfiExploitDates.getRfiNum());
//    }
//  }
}
