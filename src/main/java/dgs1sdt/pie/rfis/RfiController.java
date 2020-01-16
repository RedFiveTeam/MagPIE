package dgs1sdt.pie.rfis;

import dgs1sdt.pie.metrics.MetricController;
import dgs1sdt.pie.metrics.rfiprioritychange.RfiPriorityChange;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;


@RestController
@RequestMapping(RfiController.URI)
public class RfiController {
  public static final String URI = "/api/rfis";

  @Value("${GETS_URI_OPEN_PENDING}")
  private String getsUriOpenPending;

  @Value("${GETS_URI_CLOSED}")
  private String getsUriClosed;

  @Autowired
  private RfiRepository rfiRepository;

  @Autowired
  private RfiService rfiService;

  @Autowired
  private MetricController metricController;

  public RfiController(RfiService rfiService, RfiRepository rfiRepository) {
    this.rfiService = rfiService;
    this.rfiRepository = rfiRepository;
  }

  @GetMapping
  public List<Rfi> getAllRfis() throws Exception {
    String[] uris = {getsUriOpenPending, getsUriClosed};
    return this.rfiService.fetchRfis(uris);
  }

  //Return value: whether the passed priority change results in a valid priority list
  @PostMapping(path = "/update-priority")
  public boolean updatePriority (@Valid @RequestBody RfiJson[] rfiJsons) {
    List<Rfi> rfis = new ArrayList<>();
    List<RfiPriorityChange> metrics = new ArrayList<>();

    List<Rfi> repoRfis = rfiRepository.findAll();
    repoRfis.removeIf(rfi -> rfi.getPriority() < 1 || !rfi.getStatus().equals("OPEN"));

    for (RfiJson rfiJson : rfiJsons) {
      Rfi rfiToUpdate = rfiRepository.findByRfiId(rfiJson.getRfiId());
      if(rfiToUpdate != null) {
        metrics.add(
          new RfiPriorityChange(rfiToUpdate.getRfiId(), rfiToUpdate.getPriority(), rfiJson.getPriority(), new Date())
        );

        rfiToUpdate.setPriority(rfiJson.getPriority());
        rfis.add(rfiToUpdate);

      } else {
        System.err.println("Updating priority on previously unknown RFI " + rfiJson.getRfiId());
      }
    }

    //Update priorities in repo list from frontend priorities
    for (Rfi rfi : rfis) {
      for (Rfi repoRfi : repoRfis) {
        if (repoRfi.getRfiId().equals(rfi.getRfiId())) {
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

    //Tell front end that repriotitization was successful
    return true;
  }
}
