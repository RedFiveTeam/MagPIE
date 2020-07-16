package dgs1sdt.magpie.rfis;

import dgs1sdt.magpie.ixns.IxnService;
import dgs1sdt.magpie.metrics.MetricsService;
import dgs1sdt.magpie.metrics.changeRfiPriority.MetricChangeRfiPriority;
import dgs1sdt.magpie.tgts.TargetService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;


@RestController
@RequestMapping(RfiController.URI)
@Slf4j
public class RfiController {
  public static final String URI = "/api/rfi";

  private RfiService rfiService;
  private MetricsService metricsService;
  private RfiRepository rfiRepository;
  private TargetService targetService;
  private IxnService ixnService;

  @Autowired
  public RfiController(RfiService rfiService,
                       MetricsService metricsService,
                       RfiRepository rfiRepository,
                       TargetService targetService,
                       IxnService ixnService) {
    this.rfiService = rfiService;
    this.metricsService = metricsService;
    this.rfiRepository = rfiRepository;
    this.targetService = targetService;
    this.ixnService = ixnService;
  }

  @Autowired
  public void setMetricsService(MetricsService metricsService) {
    this.metricsService = metricsService;
  }

  @Autowired
  public void setRfiService(RfiService rfiService) {
    this.rfiService = rfiService;
  }

  @Autowired
  public void setRfiRepository(RfiRepository rfiRepository) {
    this.rfiRepository = rfiRepository;
  }

  @Autowired
  public void setTargetService(TargetService targetRepository) {
    this.targetService = targetRepository;
  }

  @Autowired
  public void setIxnService(IxnService ixnService) {
    this.ixnService = ixnService;
  }

  @GetMapping
  public List<RfiGet> getAllRfis() {
    List<Rfi> rfis = this.rfiService.fetchRfisFromRepo();
    List<RfiGet> rfiGetList = new ArrayList<>();

    long last3RfisCompletionTimeInMS = metricsService.getAverageCompletionTimeLast3Rfis();

    for (Rfi rfi : rfis) {
      long tgtCount = targetService.findNumByRfiId(rfi.getId());
      long ixnCount = ixnService.findNumByRfiId(rfi.getId());
      Date startDate = metricsService.getRfiStartDate(rfi.getRfiNum());
      boolean containsRejectedTracks = ixnService.rfiContainsRejectedTracks(rfi.getId());

      if (rfi.getStatus().equals("NEW")) {
        rfiGetList.add(new RfiGet(rfi, tgtCount, ixnCount, startDate, null, containsRejectedTracks));
      } else if (rfi.getStatus().equals("OPEN")) {
        long estimatedCompetionTimeByTargets = metricsService.getEstimatedCompletionTimeByNumberOfTargets(rfi.getId());
        if (estimatedCompetionTimeByTargets > 0) {
          rfiGetList
            .add(new RfiGet(rfi, tgtCount, ixnCount, startDate, estimatedCompetionTimeByTargets, containsRejectedTracks));
        } else {
          rfiGetList
            .add(new RfiGet(rfi, tgtCount, ixnCount, startDate, last3RfisCompletionTimeInMS, containsRejectedTracks));
        }
      } else {
        Date closeDate = metricsService.getRfiCloseDate(rfi.getRfiNum());
        rfiGetList.add(new RfiGet(rfi, tgtCount, ixnCount, startDate, closeDate, containsRejectedTracks));
      }
    }
    return rfiGetList;
  }

  //  Return value: whether the passed priority change results in a valid priority list
  @PostMapping(path = "/update-priority")
  public boolean updatePriority(@Valid @RequestBody RfiPriorityJson[] rfiPriorityJsons,
                                @RequestParam(value = "undo", defaultValue = "") String undo,
                                @RequestParam(value = "userName", defaultValue = "") String userName) {
    // Check to see if any of the RFIs are NEW, if so, update repo from GETS before continuing
    for (RfiPriorityJson rfiPriorityJson : rfiPriorityJsons) {
      if (rfiRepository.findByRfiNum(rfiPriorityJson.getRfiNum()).getStatus().equals("NEW")) {
        rfiService.fetchRfisFromGets();
        break;
      }
    }

    List<Rfi> rfis = new ArrayList<>();
    List<MetricChangeRfiPriority> metrics = new ArrayList<>();

    List<Rfi> repoRfis = rfiRepository.findAll();
    repoRfis.removeIf(rfi -> rfi.getPriority() < 1 || !rfi.getStatus().equals("OPEN"));

    Date now = new Date();

    for (RfiPriorityJson rfiPriorityJson : rfiPriorityJsons) {
      Rfi rfiToUpdate = rfiRepository.findByRfiNum(rfiPriorityJson.getRfiNum());
      if (rfiToUpdate != null) {
        metrics.add(
          new MetricChangeRfiPriority(rfiToUpdate.getRfiNum(), rfiToUpdate.getPriority(),
            rfiPriorityJson.getPriority(), userName, now)
        );

        rfiToUpdate.setPriority(rfiPriorityJson.getPriority());
        rfis.add(rfiToUpdate);

      } else {
        log.error("Updating priority on previously unknown RFI " + rfiPriorityJson.getRfiNum());
      }
    }

//    Update priorities in repo list from frontend priorities
    for (Rfi rfi : rfis) {
      for (Rfi repoRfi : repoRfis) {
        if (repoRfi.getRfiNum().equals(rfi.getRfiNum())) {
          repoRfi.setPriority(rfi.getPriority());
          break;
        }
      }
    }

//    Check to make sure each priority 1 through n is used
    int length = repoRfis.size();
    boolean[] priorityExists = new boolean[length];

    for (int i = 0; i < length; i++) //initialize
    {
      priorityExists[i] = false;
    }

    for (Rfi rfi : repoRfis) { // mark used
      priorityExists[rfi.getPriority() - 1] = true;
    }

    for (int i = 0; i < length; i++) // Check all priorities
    {
      if (!priorityExists[i]) // A priority is missing, so tell front end that reprioritization failed
      {
        return false;
      }
    }

//    Add metrics and save pri updates
    Rfi undoRfi = rfiRepository.findByRfiNum(undo);

    if (undoRfi != null) {
      metricsService.addUndoChangeRfiPriority(undoRfi.getId(), userName);
    } else {
      metricsService.addChangeRfiPriority(metrics);
    }

    rfiRepository.saveAll(repoRfis);

//    Tell front end that reprioritization was successful
    return true;
  }

  @GetMapping(path = "/refresh")
  public void refreshFromGets() {
    rfiService.fetchRfisFromGets();
  }
}
