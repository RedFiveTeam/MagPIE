package dgs1sdt.pie.rfis;

import dgs1sdt.pie.metrics.MetricController;
import dgs1sdt.pie.metrics.changeRfiPriority.MetricChangeRfiPriority;
import dgs1sdt.pie.metrics.deleteExploitDate.MetricDeleteExploitDate;
import dgs1sdt.pie.metrics.deleteTarget.MetricDeleteTarget;
import dgs1sdt.pie.rfis.exploitDates.ExploitDate;
import dgs1sdt.pie.rfis.exploitDates.ExploitDateJson;
import dgs1sdt.pie.rfis.exploitDates.ExploitDateRepository;
import dgs1sdt.pie.rfis.targets.Target;
import dgs1sdt.pie.rfis.targets.TargetJson;
import dgs1sdt.pie.rfis.targets.TargetRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.transaction.Transactional;
import javax.validation.Valid;
import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.Date;
import java.util.List;


@RestController
@RequestMapping(RfiController.URI)
public class RfiController {
  public static final String URI = "/api/rfis";

  private MetricController metricController;
  private RfiService rfiService;
  private RfiRepository rfiRepository;
  private ExploitDateRepository exploitDateRepository;
  private TargetRepository targetRepository;

  @Autowired
  public RfiController(RfiService rfiService,
                       RfiRepository rfiRepository,
                       ExploitDateRepository exploitDateRepository,
                       TargetRepository targetRepository) {
    this.rfiService = rfiService;
    this.rfiRepository = rfiRepository;
    this.exploitDateRepository = exploitDateRepository;
    this.targetRepository = targetRepository;
  }

  @Autowired
  public void setMetricController(MetricController metricController) {
    this.metricController = metricController;
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
  public void setExploitDateRepository(ExploitDateRepository exploitDateRepository) {
    this.exploitDateRepository = exploitDateRepository;
  }

  @Autowired
  public void setTargetRepository(TargetRepository targetRepository) {
    this.targetRepository = targetRepository;
  }

  @GetMapping
  public List<Rfi> getAllRfis() {
    return this.rfiService.fetchRfisFromRepo();
  }

  //  Return value: whether the passed priority change results in a valid priority list
  @PostMapping(path = "/update-priority")
  public boolean updatePriority(@Valid @RequestBody RfiPriorityJson[] rfiPriorityJsons) {
    List<Rfi> rfis = new ArrayList<>();
    List<MetricChangeRfiPriority> metrics = new ArrayList<>();

    List<Rfi> repoRfis = rfiRepository.findAll();
    repoRfis.removeIf(rfi -> rfi.getPriority() < 1 || !rfi.getStatus().equals("OPEN"));

    for (RfiPriorityJson rfiPriorityJson : rfiPriorityJsons) {
      Rfi rfiToUpdate = rfiRepository.findByRfiNum(rfiPriorityJson.getRfiNum());
      if (rfiToUpdate != null) {
        metrics.add(
          new MetricChangeRfiPriority(rfiToUpdate.getRfiNum(), rfiToUpdate.getPriority(),
            rfiPriorityJson.getPriority(), new Date())
        );

        rfiToUpdate.setPriority(rfiPriorityJson.getPriority());
        rfis.add(rfiToUpdate);

      } else {
        System.err.println("Updating priority on previously unknown RFI " + rfiPriorityJson.getRfiNum());
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
      priorityExists[i] = false;

    for (Rfi rfi : repoRfis) { // mark used
      priorityExists[rfi.getPriority() - 1] = true;
    }

    for (int i = 0; i < length; i++) // Check all priorities
      if (!priorityExists[i]) // A priority is missing, so tell front end that reprioritization failed
        return false;

//    Add metrics and save pri updates
    metricController.addChangeRfiPriority(metrics);
    rfiRepository.saveAll(repoRfis);

//    Tell front end that reprioritization was successful
    return true;
  }

  private List<ExploitDate> addOrUpdateExploitDate(Rfi rfi, ExploitDate newExploitDate,
                                                   ExploitDateJson exploitDateJson) {
    if (
      exploitDateRepository.findAllByRfiId(rfi.getId()).stream()
        .noneMatch(exploitDate -> exploitDate.getExploitDate().equals(newExploitDate.getExploitDate()))
    ) {
      exploitDateRepository.save(newExploitDate);
      metricController.addChangeExploitDate(exploitDateJson,
        rfiRepository.findRfiById(exploitDateJson.getRfiId()).getRfiNum());
    }
    return exploitDateRepository.findAllByRfiId(rfi.getId());
  }

  @PostMapping(path = "/change-exploit-date/")
  public List<ExploitDate> addExploitDate(@Valid @RequestBody ExploitDateJson exploitDateJson) {
    Rfi rfi = rfiRepository.findRfiById(exploitDateJson.getRfiId());
    if (rfi != null) {
      return addOrUpdateExploitDate(
        rfi,
        new ExploitDate(
          exploitDateJson.getNewExploitDate(),
          rfi.getId()
        ),
        exploitDateJson
      );
    }
    return new ArrayList<>();
  }

  @PostMapping(path = "/change-exploit-date/{exploitDateId}")
  public List<ExploitDate> changeExploitDate(@PathVariable("exploitDateId") long exploitDateId,
                                             @Valid @RequestBody ExploitDateJson exploitDateJson) {
    Rfi rfi = rfiRepository.findRfiById(exploitDateJson.getRfiId());
    return addOrUpdateExploitDate(
      rfi,
      new
        ExploitDate(
        exploitDateId,
        exploitDateJson.getNewExploitDate(),
        rfi.getId()
      ),
      exploitDateJson
    );
  }

  @PostMapping(path = "/dates")
  public List<ExploitDate> fetchExploitDates(@Valid @RequestBody Long rfiId) {
    List<ExploitDate> dates = exploitDateRepository.findAllByRfiId(rfiId);
    dates.sort(Comparator.comparing(ExploitDate::getExploitDate));
    return dates;
  }

  @PostMapping(path = "/post-target")
  public void postTarget(@Valid @RequestBody TargetJson targetJson) {
    long rfiId = targetJson.getRfiId();
    long targetId = targetJson.getTargetId();
    if (targetId > 0) {
      editTarget(targetJson, targetId);
    } else {
      addTarget(targetJson, rfiId);
    }
  }

  private void addTarget(@RequestBody @Valid TargetJson targetJson, long rfiId) {
    long exploitDateId = targetJson.getExploitDateId();

    Target target = new Target(rfiId, exploitDateId, targetJson);
    Target duplicate = targetRepository.findByRfiIdAndExploitDateIdAndName(rfiId, exploitDateId,
      targetJson.getName());
    if (duplicate == null) {
      targetRepository.save(target);

      if (rfiRepository.findById(rfiId).isPresent()) {
        if (exploitDateRepository.findById(exploitDateId).isPresent()) {
          String rfiNum = rfiRepository.findById(rfiId).get().getRfiNum();
          Timestamp exploitDate = exploitDateRepository.findById(exploitDateId).get().getExploitDate();
          metricController.addCreateTarget(targetJson, rfiNum, exploitDate);
        } else {
          System.err.println("Error finding exploit date by id: " + exploitDateId);
        }
      } else {
        System.err.println("Error finding rfi by id: " + rfiId);
      }
    }
  }

  private void editTarget(@RequestBody @Valid TargetJson targetJson, long targetId) {
    if (targetRepository.findById(targetId).isPresent()) {
      long exploitDateId = targetRepository.findById(targetId).get().getExploitDateId();
      if (exploitDateRepository.findById(exploitDateId).isPresent()) {
        Target targetWithSameNameAsJson = targetRepository.findByRfiIdAndExploitDateIdAndName(targetJson.getRfiId(), targetJson.getExploitDateId(), targetJson.getName());
        if (targetWithSameNameAsJson != null && targetWithSameNameAsJson.getId() != targetJson.getTargetId()) {
          return; //name conflict, do nothing
        }
        Target oldTarget = targetRepository.findById(targetId).get();
        metricController.addChangeTarget(oldTarget, targetJson);
        Target newTarget = new Target(targetJson);
        targetRepository.save(newTarget);
      } else
        System.err.println("Error updating target: Could not find exploit date by id " + exploitDateId);

    } else
      System.err.println("Error updating target: Could not find target by id " + targetId);
  }

  @GetMapping(path = "/{rfiId}/targets")
  public List<Target> getRfiTargets(@Valid @RequestBody @PathVariable("rfiId") long rfiId) {
    return targetRepository.findAllByRfiId(rfiId);
  }

  @GetMapping(path = "/{rfiId}/exploit-dates")
  public List<ExploitDate> getRfiExploitDates(@Valid @RequestBody @PathVariable("rfiId") long rfiId) {
    return exploitDateRepository.findAllByRfiId(rfiId);
  }

  @DeleteMapping(path = "/{exploitDateId}/delete")
  public List<ExploitDate> deleteExploitDate(@Valid @RequestBody @PathVariable("exploitDateId") long exploitDateId) {
    if (!targetRepository.findAllByExploitDateId(exploitDateId).isEmpty()) {
      List<Target> targetList = targetRepository.findAllByExploitDateId(exploitDateId);
      for (Target target : targetList) {
        deleteTarget(target.getId());
      }
    }
    if (exploitDateRepository.findById(exploitDateId).isPresent()) {
      long rfiId = exploitDateRepository.findById(exploitDateId).get().getRfiId();
      if (rfiRepository.findById(rfiId).isPresent()) {
        String rfiNum = rfiRepository.findById(rfiId).get().getRfiNum();
        Timestamp exploitDate = exploitDateRepository.findById(exploitDateId).get().getExploitDate();

        MetricDeleteExploitDate metricDeleteExploitDate = new MetricDeleteExploitDate(
          new Timestamp(new Date().getTime()),
          rfiNum,
          exploitDate
        );

        metricController.addDeleteExploitDate(metricDeleteExploitDate);
        exploitDateRepository.deleteById(exploitDateId);
        return getRfiExploitDates(rfiId);
      } else {
        System.err.println("Error deleting exploit date: Could not find RFI by id " + rfiId);
      }
    } else {
      System.err.println("Error deleting exploit date: Could not find exploit Date by id " + exploitDateId);
    }
    return new ArrayList<>(exploitDateRepository.findAllByRfiId(
      exploitDateRepository.findById(exploitDateId).get().getRfiId()));
  }


  @DeleteMapping(path = "/delete-target/{tgtId}")
  public List<Target> deleteTarget(@Valid @RequestBody @PathVariable("tgtId") long tgtId) {
    if (targetRepository.findById(tgtId).isPresent()) {
      long rfiId = targetRepository.findById(tgtId).get().getRfiId();
      long exploitDateId = targetRepository.findById(tgtId).get().getExploitDateId();
      if (rfiRepository.findById(rfiId).isPresent()) {
        String rfiNum = rfiRepository.findById(rfiId).get().getRfiNum();
        if (exploitDateRepository.findById(exploitDateId).isPresent()) {
          Timestamp exploitDate = exploitDateRepository.findById(exploitDateId).get().getExploitDate();

          MetricDeleteTarget metric = new MetricDeleteTarget(
            rfiNum,
            exploitDate,
            targetRepository.findById(tgtId).get().getName(),
            new Timestamp(new Date().getTime())
          );

          metricController.addDeleteTarget(metric);
          targetRepository.deleteById(tgtId);
          return getRfiTargets(rfiId);
        } else {

          System.err.println("Error deleting target: Could not find exploit date by id " + exploitDateId);
        }
      } else {
        System.err.println("Error deleting target: Could not find RFI by id " + rfiId);
      }
    } else {
      System.err.println("Error deleting target: Could not find target by id " + tgtId);
    }
    return new ArrayList<>();
  }
}
