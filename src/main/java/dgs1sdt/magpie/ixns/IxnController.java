package dgs1sdt.magpie.ixns;

import dgs1sdt.magpie.metrics.MetricsService;
import dgs1sdt.magpie.rfis.RfiRepository;
import dgs1sdt.magpie.tgts.TargetRepository;
import dgs1sdt.magpie.tgts.exploitDates.ExploitDateRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.sql.Timestamp;
import java.util.Comparator;
import java.util.List;

@RestController
@RequestMapping(IxnController.URI)
public class IxnController {
  public static final String URI = "/api/ixn";

  private MetricsService metricsService;
  private RfiRepository rfiRepository;
  private ExploitDateRepository exploitDateRepository;
  private TargetRepository targetRepository;
  private SegmentRepository segmentRepository;
  private IxnRepository ixnRepository;

  @Autowired
  public IxnController(MetricsService metricsService,
                       RfiRepository rfiRepository,
                       ExploitDateRepository exploitDateRepository,
                       TargetRepository targetRepository,
                       SegmentRepository segmentRepository,
                       IxnRepository ixnRepository) {
    this.metricsService = metricsService;
    this.rfiRepository = rfiRepository;
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
  }

  @DeleteMapping(path = "/{ixnId}")
  public void deleteIxn(@PathVariable("ixnId") long ixnId) {
    if (ixnRepository.findById(ixnId).isPresent()) {
      Ixn ixn = ixnRepository.findById(ixnId).get();

      ixnRepository.deleteById(ixnId);

      metricsService.addDeleteIxn(ixnId);

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

    } else {
      System.err.println("Error deleting segment: could not find segment with id " + segmentId);
    }
  }
}
