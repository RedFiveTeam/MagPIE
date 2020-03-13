package dgs1sdt.magpie.ixns;

import dgs1sdt.magpie.metrics.MetricsService;
import dgs1sdt.magpie.tgts.Target;
import dgs1sdt.magpie.tgts.TargetRepository;
import dgs1sdt.magpie.tgts.exploitDates.ExploitDate;
import dgs1sdt.magpie.tgts.exploitDates.ExploitDateRepository;
import org.flywaydb.core.internal.util.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class IxnService {
  private MetricsService metricsService;
  private ExploitDateRepository exploitDateRepository;
  private TargetRepository targetRepository;
  private SegmentRepository segmentRepository;
  private IxnRepository ixnRepository;

  @Autowired
  public IxnService(MetricsService metricsService,
                    ExploitDateRepository exploitDateRepository,
                    TargetRepository targetRepository,
                    SegmentRepository segmentRepository,
                    IxnRepository ixnRepository) {
    this.metricsService = metricsService;
    this.exploitDateRepository = exploitDateRepository;
    this.targetRepository = targetRepository;
    this.segmentRepository = segmentRepository;
    this.ixnRepository = ixnRepository;
  }

  @Autowired
  public void setMetricsService(MetricsService metricsService) {
    this.metricsService = metricsService;
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

  public List<Segment> getSegments(long targetId) {
    return segmentRepository.findAllByTargetId(targetId)
      .stream().filter(segment -> segment.getDeleted() == null)
      .sorted(Comparator.comparing(Segment::getStartTime))
      .collect(Collectors.toList());
  }

  public List<Ixn> getIxns(long targetId) {
//     May need to be refactored for performance
    return ixnRepository.findAllByTargetId(targetId)
      .stream().filter(ixn -> segmentRepository.findById(ixn.getSegmentId()).get().getDeleted() == null)
      .sorted((Comparator.comparing(Ixn::getTime)))
      .collect(Collectors.toList());
  }

  public void postSegment(SegmentJson segmentJson) {
    Segment newSegment = new Segment(segmentJson);

    if (segmentJson.getId() > 0) {
      newSegment.setId(segmentJson.getId());
    }

    if (segmentJson.getId() > 0) {
      if (segmentRepository.findById(segmentJson.getId()).isPresent()) {
        Segment oldSegment = segmentRepository.findById(segmentJson.getId()).get();

        if (oldSegment.getDeleted() != null) {
          this.metricsService.addUndoSegmentDelete(oldSegment.getId());
          newSegment.setDeleted(null);
        } else {
          this.metricsService.addChangeSegment(segmentJson);
        }

        segmentRepository.save(newSegment);
      } else {
        System.err.println("Error editing segment: could not find segment with id " + segmentJson.getId());
      }
    } else {
      segmentRepository.save(newSegment);
      long lastSegmentId = segmentRepository.findAll().get(segmentRepository.findAll().size() - 1).getId();
      this.metricsService.addCreateSegment(lastSegmentId, segmentJson);
    }
  }

  public void postIxn(IxnJson ixnJson) {
    Ixn ixn = new Ixn(ixnJson);

    if (ixnJson.getId() > 0) {
      ixn.setId(ixnJson.getId());
      if (ixnRepository.findById(ixnJson.getId()).isPresent()) {
        this.metricsService.addChangeIxn(ixnJson, ixnRepository.findById(ixnJson.getId()).get());
        ixnRepository.save(ixn);
      } else {
        this.metricsService.addUndoIxnDelete(ixnJson.getId());
        ixnRepository.save(ixn);
      }
    } else {
      ixnRepository.save(ixn);
      long lastIxnId = ixnRepository.findAll().get(ixnRepository.findAll().size() - 1).getId();
      this.metricsService.addCreateIxn(lastIxnId, ixnJson);
    }

    assignTracks(ixnJson.getRfiId(), targetRepository.findById(ixnJson.getTargetId()).get().getName());
  }

  public void deleteIxn(long ixnId) {
    if (ixnRepository.findById(ixnId).isPresent()) {
      Ixn ixn = ixnRepository.findById(ixnId).get();
      ixnRepository.deleteById(ixnId);

      metricsService.addDeleteIxn(ixnId);

      assignTracks(ixn.getRfiId(), targetRepository.findById(ixn.getTargetId()).get().getName());
    } else {
      System.err.println("Could not find ixn to delete with id " + ixnId);
    }
  }

  public void deleteSegment(long segmentId) {
    if (segmentRepository.findById(segmentId).isPresent()) {
      List<Ixn> ixns = ixnRepository.findAllBySegmentId(segmentId);
      ixnRepository.deleteAll(ixns);
      segmentRepository.deleteById(segmentId);
    } else {
      System.err.println("Error deleting segment: could not find segment with id " + segmentId);
    }
  }

  public void setDeletedSegment(long segmentId) {
    if (segmentRepository.findById(segmentId).isPresent()) {
      Segment segment = segmentRepository.findById(segmentId).get();

      boolean hadIxns = !ixnRepository.findAllBySegmentId(segmentId).isEmpty();

      segment.setDeleted(new Timestamp(new Date().getTime()));

      segmentRepository.save(segment);

      this.metricsService.addDeleteSegment(segmentId, hadIxns);

      assignTracks(segment.getRfiId(), targetRepository.findById(segment.getTargetId()).get().getName());
    } else {
      System.err.println("Error deleting segment: could not find segment with id " + segmentId);
    }
  }

  public void assignTracks(long rfiId, String targetName) {
    List<Target> targets = targetRepository.findAllByRfiIdAndName(rfiId, targetName)
      .stream().filter(target -> target.getDeleted() == null)
      .collect(Collectors.toList());
    List<Ixn> ixns = new ArrayList<>();

    //sort targets by exploit date
    targets.sort((target1, target2) -> {
      ExploitDate date1 = exploitDateRepository.findById(target1.getExploitDateId()).get();
      ExploitDate date2 = exploitDateRepository.findById(target2.getExploitDateId()).get();
      return date1.getExploitDate().compareTo(date2.getExploitDate());
    });

    for (Target target : targets) {
      List<Ixn> targetIxns = ixnRepository.findAllInProgressOrCompleteByTargetId(target.getId())
        .stream().filter(ixn -> segmentRepository.findById(ixn.getSegmentId()).get().getDeleted() == null)
        .sorted((Comparator.comparing(Ixn::getTime)))
        .collect(Collectors.toList());
      ixns.addAll(targetIxns);
    }

    int trackNum = 1;
    for (Ixn ixn : ixns) {
      String trackId = targetName.substring(6) + "-" + StringUtils.leftPad(String.valueOf(trackNum), 3, '0');
      ixn.setTrack(trackId);
      trackNum++;
    }

    ixnRepository.saveAll(ixns);
  }

  public List<Segment> getDeletedSegments() {
    return segmentRepository.findAll()
      .stream().filter(segment -> segment.getDeleted() != null)
      .collect(Collectors.toList());
  }

  public long findNumByRfiId(long rfiId) {
    return ixnRepository.findAllByRfiId(rfiId).stream()
      .filter(ixn -> segmentRepository.findById(ixn.getSegmentId()).get().getDeleted() == null)
      .filter(ixn -> targetRepository.findById(ixn.getTargetId()).get().getDeleted() == null)
      .count();
  }
}
