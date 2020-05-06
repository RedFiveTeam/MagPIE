package dgs1sdt.magpie.tgts;

import dgs1sdt.magpie.ixns.*;
import dgs1sdt.magpie.metrics.MetricsService;
import dgs1sdt.magpie.rfis.Rfi;
import dgs1sdt.magpie.rfis.RfiRepository;
import dgs1sdt.magpie.tgts.exploitDates.ExploitDate;
import dgs1sdt.magpie.tgts.exploitDates.ExploitDateJson;
import dgs1sdt.magpie.tgts.exploitDates.ExploitDateRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

@Service
@Slf4j
public class TargetService {
  private MetricsService metricsService;
  private RfiRepository rfiRepository;
  private ExploitDateRepository exploitDateRepository;
  private TargetRepository targetRepository;
  private SegmentRepository segmentRepository;
  private IxnRepository ixnRepository;
  private IxnService ixnService;

  @Autowired
  public TargetService(RfiRepository rfiRepository,
                       ExploitDateRepository exploitDateRepository,
                       TargetRepository targetRepository,
                       SegmentRepository segmentRepository,
                       IxnRepository ixnRepository,
                       IxnService ixnService) {
    this.rfiRepository = rfiRepository;
    this.exploitDateRepository = exploitDateRepository;
    this.targetRepository = targetRepository;
    this.segmentRepository = segmentRepository;
    this.ixnRepository = ixnRepository;
    this.ixnService = ixnService;
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
  public void setIxnService(IxnService ixnService) {
    this.ixnService = ixnService;
  }

  public List<Target> getTargets(long rfiId) {
    return targetRepository.findAllByRfiId(rfiId);
  }

  public List<ExploitDate> getExploitDates(long rfiId) {
    List<ExploitDate> dates = exploitDateRepository.findAllByRfiId(rfiId);
    dates.sort(Comparator.comparing(ExploitDate::getExploitDate));
    return dates;
  }

  public void postTarget(List<TargetJson> targetJsons, String userName, Boolean isCopy) {
    for (TargetJson targetJson : targetJsons) {
      if (targetJson.getTargetId() > 0) {
        editTarget(targetJson, userName);
      } else {
        addTarget(targetJson, userName, isCopy);
      }
    }
  }

  public List<ExploitDate> postExploitDate(ExploitDateJson exploitDateJson) {
    Rfi rfi = rfiRepository.findRfiById(exploitDateJson.getRfiId());
    if (rfi == null) {
      // Failback in case there is no rfi associated with the provided rfiId
      log.error("Error posting exploit date: RFI with id " + exploitDateJson.getRfiId() +
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

      if (exploitDateRepository.findById(exploitDateJson.getExploitDateId()).isPresent()) {
        ExploitDate oldDate = exploitDateRepository.findById(exploitDateJson.getExploitDateId()).get();

        if (oldDate.getDeleted() == null) {
          metricsService.addChangeExploitDate(exploitDateJson);
          exploitDateRepository.save(newExploitDate);
        } else {
          metricsService.addUndoExploitDateDelete(exploitDateJson.getExploitDateId());
          List<Target> targets = targetRepository
            .findAllByExploitDateIdAndDeletedIsNotNull(exploitDateJson.getExploitDateId());
          for (Target target : targets) {
            target.setDeleted(null);
          }
          targetRepository.saveAll(targets);
          oldDate.setDeleted(null);
          exploitDateRepository.save(oldDate);
        }
      } else {
        exploitDateRepository.save(newExploitDate);
        long lastExploitDateId =
          exploitDateRepository.findAll().get(exploitDateRepository.findAll().size() - 1).getId();
        metricsService.addCreateExploitDate(lastExploitDateId, exploitDateJson);
      }
    }
    return exploitDateRepository.findAllByRfiId(rfi.getId());
  }

  public List<Target> setDeletedTarget(long targetId) {
    if (targetRepository.findById(targetId).isPresent()) {
      Target target = targetRepository.findById(targetId).get();

      target.setDeleted(new Timestamp(new Date().getTime()));

      targetRepository.save(target);

      this.metricsService.addDeleteTarget(targetId);

      ixnService.assignTracks(target.getRfiId(), target.getName());

      return this.getTargets(target.getRfiId());
    } else {
      log.error("Error deleting target: could not find target with id " + targetId);
      return new ArrayList<>();
    }
  }

  public List<Target> setDeletedTargets(List<TargetJson> targets, String userName) {
    Timestamp now = new Timestamp(new Date().getTime());
    for (TargetJson target : targets) {
      Target toDelete = targetRepository
        .findByRfiIdAndExploitDateIdAndName(target.getRfiId(), target.getExploitDateId(), target.getName());
      if (toDelete != null) {
        toDelete.setDeleted(now);
        targetRepository.save(toDelete);
        this.metricsService.addUndoTargetCreate(toDelete.getId(), userName);
//        ixnService.assignTracks(target.getRfiId(), target.getName());
      } else {
        log.error(
          "Error deleting target: could not find target with name " + target.getName() + " and exploit date id " +
            target.getExploitDateId());
      }
    }
    return this.getTargets(targets.get(0).getRfiId());
  }

  public void deleteTarget(long targetId) {
    if (targetRepository.findById(targetId).isPresent()) {
      List<Ixn> ixns = ixnRepository.findAllByTargetId(targetId);
      List<Segment> segments = segmentRepository.findAllByTargetId(targetId);
      ixnRepository.deleteAll(ixns);
      segmentRepository.deleteAll(segments);

      targetRepository.deleteById(targetId);
    } else {
      log.error("Error deleting target: Could not find target by id " + targetId);
    }
  }

  public List<ExploitDate> setDeletedExploitDate(long exploitDateId) {
    if (!targetRepository.findAllByExploitDateId(exploitDateId).isEmpty()) {
      List<Target> targetList = targetRepository.findAllByExploitDateId(exploitDateId);
      for (Target target : targetList) {
        setDeletedTarget(target.getId());
        ixnService.assignTracks(target.getRfiId(), target.getName());
      }
    }
    if (exploitDateRepository.findById(exploitDateId).isPresent()) {
      metricsService.addDeleteExploitDate(exploitDateId);
      ExploitDate exploitDate = exploitDateRepository.findById(exploitDateId).get();
      exploitDate.setDeleted(new Timestamp(new Date().getTime()));
      exploitDateRepository.save(exploitDate);
      return this.getExploitDates(exploitDate.getRfiId());
    } else {
      log.error("Error deleting exploit date: Could not find exploit Date by id " + exploitDateId);
      return new ArrayList<>();
    }
  }

  public void deleteExploitDate(long exploitDateId) {
    if (!targetRepository.findAllByExploitDateId(exploitDateId).isEmpty()) {
      List<Target> targetList = targetRepository.findAllByExploitDateId(exploitDateId);
      for (Target target : targetList) {
        deleteTarget(target.getId());
        ixnService.assignTracks(target.getRfiId(), target.getName());
      }
    }
    if (exploitDateRepository.findById(exploitDateId).isPresent()) {
      metricsService.addDeleteExploitDate(exploitDateId);
      exploitDateRepository.deleteById(exploitDateId);
    } else {
      log.error("Error deleting exploit date: Could not find exploit Date by id " + exploitDateId);
    }
  }

  private void addTarget(TargetJson targetJson, String userName, Boolean isCopy) {
    long exploitDateId = targetJson.getExploitDateId();

    Target target = new Target(targetJson.getRfiId(), exploitDateId, targetJson);
    Target duplicate = targetRepository.findByRfiIdAndExploitDateIdAndName(targetJson.getRfiId(), exploitDateId,
      targetJson.getName());
    if (duplicate == null) {
      targetRepository.save(target);

      if (rfiRepository.findById(targetJson.getRfiId()).isPresent()) {
        if (exploitDateRepository.findById(exploitDateId).isPresent()) {
          long lastTargetId = targetRepository.findAll().get(targetRepository.findAll().size() - 1).getId();

          metricsService.addCreateTarget(lastTargetId, targetJson, userName, isCopy);
        } else {
          log.error("Error finding exploit date by id: " + exploitDateId);
        }
      } else {
        log.error("Error finding rfi by id: " + targetJson.getRfiId());
      }
    }
  }

  private void editTarget(TargetJson targetJson, String userName) {
    if (targetRepository.findById(targetJson.getTargetId()).isPresent()) {
      long exploitDateId = targetRepository.findById(targetJson.getTargetId()).get().getExploitDateId();
      if (exploitDateRepository.findById(exploitDateId).isPresent()) {
        Target targetWithSameNameAsJson = targetRepository.findByRfiIdAndExploitDateIdAndName(targetJson.getRfiId(),
          targetJson.getExploitDateId(), targetJson.getName());

        if (targetWithSameNameAsJson != null && targetWithSameNameAsJson.getId() != targetJson.getTargetId()) {
          return; //name conflict, do nothing
        }

        Target oldTarget = targetRepository.findById(targetJson.getTargetId()).get();
        String oldName = oldTarget.getName();
        Target newTarget = new Target(targetJson);

        if (oldTarget.getDeleted() != null) {
          this.metricsService.addUndoTargetDelete(oldTarget.getId());
          newTarget.setDeleted(null);
        } else {
          this.metricsService.addChangeTarget(oldTarget, targetJson, userName);
        }

        targetRepository.save(newTarget);

        if (!oldName.equals(newTarget.getName())) {
          ixnService.assignTracks(oldTarget.getRfiId(), oldName);
          ixnService.assignTracks(newTarget.getRfiId(), newTarget.getName());
        }

      } else {
        log.error("Error updating target: Could not find exploit date by id " + exploitDateId);
      }

    } else {
      log.error("Error updating target: Could not find target by id " + targetJson.getTargetId());
    }
  }

  public List<Target> getDeletedTargets() {
    return targetRepository.findAll()
      .stream().filter(target -> target.getDeleted() != null)
      .collect(Collectors.toList());
  }

  public long findNumByRfiId(long rfiId) {
    return targetRepository.findAllByRfiId(rfiId).size();
  }
}

