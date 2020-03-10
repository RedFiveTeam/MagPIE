package dgs1sdt.magpie.ixns;

import dgs1sdt.magpie.metrics.MetricsService;
import dgs1sdt.magpie.tgts.Target;
import dgs1sdt.magpie.tgts.TargetRepository;
import dgs1sdt.magpie.tgts.exploitDates.ExploitDate;
import dgs1sdt.magpie.tgts.exploitDates.ExploitDateRepository;
import org.flywaydb.core.internal.util.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;

@RestController
@RequestMapping(IxnController.URI)
public class IxnController {
  public static final String URI = "/api/ixn";

  private MetricsService metricsService;
  private ExploitDateRepository exploitDateRepository;
  private TargetRepository targetRepository;
  private SegmentRepository segmentRepository;
  private IxnRepository ixnRepository;

  @Autowired
  public IxnController(MetricsService metricsService,
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

  @GetMapping(path = "/segment/{targetId}")
  public List<Segment> getSegments(@PathVariable("targetId") long targetId) {
    List<Segment> segments = segmentRepository.findAllByTargetId(targetId);
    segments.sort(Comparator.comparing(Segment::getStartTime));
    return segments;
  }

  @GetMapping(path = "/{targetId}")
  public List<Ixn> getIxns(@PathVariable("targetId") long targetId) {
    List<Ixn> interactions = ixnRepository.findAllByTargetId(targetId);
    interactions.sort((Comparator.comparing(Ixn::getTime)));
    return interactions;
  }

  @PostMapping(path = "/segment/post")
  public void postSegment(@Valid @RequestBody SegmentJson segmentJson) {
    Segment segment = new Segment(segmentJson);

    if (segmentJson.getId() > 0) {
      segment.setId(segmentJson.getId());
    }

    segmentRepository.save(segment);

    if (segmentJson.getId() > 0) {
      if (segmentRepository.findById(segmentJson.getId()).isPresent()) {
        this.metricsService.addChangeSegment(segmentJson);
      } else {
        System.err.println("Error editing segment: could not find segment with id " + segmentJson.getId());
      }
    } else {
      long lastSegmentId = segmentRepository.findAll().get(segmentRepository.findAll().size() - 1).getId();
      this.metricsService.addCreateSegment(lastSegmentId, segmentJson);
    }
  }

  @PostMapping(path = "/post")
  public void postIxn(@Valid @RequestBody IxnJson ixnJson) {
    Ixn ixn = new Ixn(ixnJson);

    if (ixnJson.getId() > 0) {
      ixn.setId(ixnJson.getId());
      if (ixnRepository.findById(ixnJson.getId()).isPresent()) {
        this.metricsService.addChangeIxn(ixnJson, ixnRepository.findById(ixnJson.getId()).get());
        ixnRepository.save(ixn);
      } else {
        System.err.println("Error creating ixn metric: could not find ixn with id " + ixnJson.getId());
      }
    } else {
      ixnRepository.save(ixn);
      long lastIxnId = ixnRepository.findAll().get(ixnRepository.findAll().size() - 1).getId();
      this.metricsService.addCreateIxn(lastIxnId, ixnJson);
    }

    assignTracks(ixnJson.getRfiId(), targetRepository.findById(ixnJson.getTargetId()).get().getName());
  }

  @DeleteMapping(path = "/{ixnId}")
  public void deleteIxn(@PathVariable("ixnId") long ixnId) {
    if (ixnRepository.findById(ixnId).isPresent()) {
      Ixn ixn = ixnRepository.findById(ixnId).get();
      ixnRepository.deleteById(ixnId);

      metricsService.addDeleteIxn(ixnId);

      assignTracks(ixn.getRfiId(), targetRepository.findById(ixn.getTargetId()).get().getName());
    } else {
      System.err.println("Could not find ixn to delete with id " + ixnId);
    }
  }

  @DeleteMapping(path = "/segment/{segmentId}")
  public void deleteSegment(@PathVariable("segmentId") long segmentId) {

    if (segmentRepository.findById(segmentId).isPresent()) {
      Segment segment = segmentRepository.findById(segmentId).get();
      List<Ixn> ixns = ixnRepository.findAllBySegmentId(segmentId);

      boolean hadIxns = !ixns.isEmpty();

      ixnRepository.deleteAll(ixns);

      segmentRepository.deleteById(segmentId);

      this.metricsService.addDeleteSegment(segmentId, hadIxns);

      assignTracks(segment.getRfiId(), targetRepository.findById(segment.getTargetId()).get().getName());
    } else {
      System.err.println("Error deleting segment: could not find segment with id " + segmentId);
    }
  }

  public void assignTracks(long rfiId, String targetName) {
    List<Target> targets = targetRepository.findAllByRfiIdAndName(rfiId, targetName);
    List<Ixn> ixns = new ArrayList<>();

    //sort targets by exploit date
    targets.sort((target1, target2) -> {
      ExploitDate date1 = exploitDateRepository.findById(target1.getExploitDateId()).get();
      ExploitDate date2 = exploitDateRepository.findById(target2.getExploitDateId()).get();
      return date1.getExploitDate().compareTo(date2.getExploitDate());
    });

    for (Target target : targets) {
      List<Ixn> targetIxns = ixnRepository.findAllInProgressOrCompleteByTargetId(target.getId());
      targetIxns.sort(Comparator.comparing(Ixn::getTime));
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
}
