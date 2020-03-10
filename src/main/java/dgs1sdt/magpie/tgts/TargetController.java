package dgs1sdt.magpie.tgts;

import dgs1sdt.magpie.ixns.*;
import dgs1sdt.magpie.metrics.MetricsService;
import dgs1sdt.magpie.rfis.Rfi;
import dgs1sdt.magpie.rfis.RfiRepository;
import dgs1sdt.magpie.tgts.exploitDates.ExploitDate;
import dgs1sdt.magpie.tgts.exploitDates.ExploitDateJson;
import dgs1sdt.magpie.tgts.exploitDates.ExploitDateRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;

@RestController
@RequestMapping(TargetController.URI)
public class TargetController {
  public static final String URI = "/api/targets";

  private MetricsService metricsService;
  private RfiRepository rfiRepository;
  private ExploitDateRepository exploitDateRepository;
  private TargetRepository targetRepository;
  private SegmentRepository segmentRepository;
  private IxnRepository ixnRepository;
  private IxnController ixnController;


  @Autowired
  public TargetController(RfiRepository rfiRepository,
                          ExploitDateRepository exploitDateRepository,
                          TargetRepository targetRepository,
                          SegmentRepository segmentRepository,
                          IxnRepository ixnRepository,
                          IxnController ixnController) {
    this.rfiRepository = rfiRepository;
    this.exploitDateRepository = exploitDateRepository;
    this.targetRepository = targetRepository;
    this.segmentRepository = segmentRepository;
    this.ixnRepository = ixnRepository;
    this.ixnController = ixnController;
  }

  @Autowired
  public void setMetricsService(MetricsService metricsService) {
    this.metricsService = metricsService;
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

  @Autowired
  public void setSegmentRepository(SegmentRepository segmentRepository) {
    this.segmentRepository = segmentRepository;
  }

  @Autowired
  public void setIxnRepository(IxnRepository ixnRepository) {
    this.ixnRepository = ixnRepository;
  }

  @Autowired
  public void setIxnController(IxnController ixnController) {
    this.ixnController = ixnController;
  }

  @GetMapping
  public List<Target> getTargets(@RequestParam(value = "rfiId") long rfiId) {
    return targetRepository.findAllByRfiId(rfiId);
  }

  @GetMapping(path = "/dates")
  public List<ExploitDate> getExploitDates(@RequestParam(value = "rfiId") long rfiId) {
    List<ExploitDate> dates = exploitDateRepository.findAllByRfiId(rfiId);
    dates.sort(Comparator.comparing(ExploitDate::getExploitDate));
    return dates;
  }

  @PostMapping(path = "/post")
  public void postTarget(@Valid @RequestBody TargetJson targetJson) {
    long rfiId = targetJson.getRfiId();
    long targetId = targetJson.getTargetId();
    if (targetId > 0) {
      editTarget(targetJson, targetId);
    } else {
      addTarget(targetJson, rfiId);
    }
  }

  @PostMapping(path = "/dates/post")
  public List<ExploitDate> postExploitDate(@Valid @RequestBody ExploitDateJson exploitDateJson) {

    Rfi rfi = rfiRepository.findRfiById(exploitDateJson.getRfiId());
    if (rfi == null) {
      // Failback in case there is no rfi associated with the provided rfiId
      System.err.println("Error posting exploit date: RFI with id " + exploitDateJson.getRfiId() +
        " not found");
      return new ArrayList<>();
    }

    ExploitDate newExploitDate = new ExploitDate(
      exploitDateJson.getNewExploitDate(),
      rfi.getId()
    );

    if (exploitDateJson.getExploitDateId() > 0) {
      newExploitDate.setId(exploitDateJson.getExploitDateId());
    }

    if (
      exploitDateRepository.findAllByRfiId(rfi.getId()).stream()
        .noneMatch(exploitDate -> exploitDate.getExploitDate().equals(newExploitDate.getExploitDate()))
    ) {
      exploitDateRepository.save(newExploitDate);

      if (exploitDateRepository.findById(exploitDateJson.getExploitDateId()).isPresent()) {
        metricsService.addChangeExploitDate(exploitDateJson);
      } else {
        long lastExploitDateId =
          exploitDateRepository.findAll().get(exploitDateRepository.findAll().size() - 1).getId();
        metricsService.addCreateExploitDate(lastExploitDateId, exploitDateJson);
      }
    }
    return exploitDateRepository.findAllByRfiId(rfi.getId());
  }

  @DeleteMapping(path = "/delete")
  public List<Target> deleteTarget(@RequestParam("targetId") long targetId) {
    if (targetRepository.findById(targetId).isPresent()) {
      long rfiId = targetRepository.findById(targetId).get().getRfiId();
      String targetName = targetRepository.findById(targetId).get().getName();

      metricsService.addDeleteTarget(targetId);

      List<Ixn> ixns = ixnRepository.findAllByTargetId(targetId);
      ixnRepository.deleteAll(ixns);

      List<Segment> segments = segmentRepository.findAllByTargetId(targetId);
      segmentRepository.deleteAll(segments);

      targetRepository.deleteById(targetId);

      ixnController.assignTracks(rfiId, targetName);
      return getTargets(rfiId);
    } else {
      System.err.println("Error deleting target: Could not find target by id " + targetId);
    }
    return new ArrayList<>();
  }

  @DeleteMapping(path = "/dates/delete")
  public List<ExploitDate> deleteExploitDate(@RequestParam("exploitDateId") long exploitDateId) {
    if (!targetRepository.findAllByExploitDateId(exploitDateId).isEmpty()) {
      List<Target> targetList = targetRepository.findAllByExploitDateId(exploitDateId);
      for (Target target : targetList) {
        deleteTarget(target.getId());
        ixnController.assignTracks(target.getRfiId(), target.getName());
      }
    }
    if (exploitDateRepository.findById(exploitDateId).isPresent()) {
      long rfiId = exploitDateRepository.findById(exploitDateId).get().getRfiId();
      metricsService.addDeleteExploitDate(exploitDateId);
      exploitDateRepository.deleteById(exploitDateId);
      return getExploitDates(rfiId);
    } else {
      System.err.println("Error deleting exploit date: Could not find exploit Date by id " + exploitDateId);
    }
    return new ArrayList<>(exploitDateRepository.findAllByRfiId(
      exploitDateRepository.findById(exploitDateId).get().getRfiId()));
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
          long lastTargetId = targetRepository.findAll().get(targetRepository.findAll().size() - 1).getId();

          metricsService.addCreateTarget(lastTargetId, targetJson);
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
        Target targetWithSameNameAsJson = targetRepository.findByRfiIdAndExploitDateIdAndName(targetJson.getRfiId(),
          targetJson.getExploitDateId(), targetJson.getName());
        if (targetWithSameNameAsJson != null && targetWithSameNameAsJson.getId() != targetJson.getTargetId()) {
          return; //name conflict, do nothing
        }
        Target oldTarget = targetRepository.findById(targetId).get();
        String oldName = oldTarget.getName();
        metricsService.addChangeTarget(oldTarget, targetJson);
        Target newTarget = new Target(targetJson);
        targetRepository.save(newTarget);

        System.out.println(oldName);
        System.out.println(newTarget.getName());
        if (!oldName.equals(newTarget.getName())) {
          ixnController.assignTracks(oldTarget.getRfiId(), oldName);
          ixnController.assignTracks(newTarget.getRfiId(), newTarget.getName());
        }

      } else
        System.err.println("Error updating target: Could not find exploit date by id " + exploitDateId);

    } else
      System.err.println("Error updating target: Could not find target by id " + targetId);
  }
}
