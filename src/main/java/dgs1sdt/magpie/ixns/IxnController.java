package dgs1sdt.magpie.ixns;

import dgs1sdt.magpie.metrics.createIxn.MetricCreateIxn;
import dgs1sdt.magpie.metrics.createIxn.MetricCreateIxnRepository;
import dgs1sdt.magpie.metrics.createSegment.MetricCreateSegment;
import dgs1sdt.magpie.metrics.createSegment.MetricCreateSegmentRepository;
import dgs1sdt.magpie.rfis.RfiRepository;
import dgs1sdt.magpie.rfis.exploitDates.ExploitDateRepository;
import dgs1sdt.magpie.rfis.targets.TargetRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.sql.Timestamp;
import java.util.Comparator;
import java.util.Date;
import java.util.List;

@RestController
@RequestMapping(IxnController.URI)
public class IxnController {
  public static final String URI = "/api/ixn";

  private RfiRepository rfiRepository;
  private ExploitDateRepository exploitDateRepository;
  private TargetRepository targetRepository;
  private SegmentRepository segmentRepository;
  private IxnRepository ixnRepository;
  private MetricCreateSegmentRepository metricCreateSegmentRepository;
  private MetricCreateIxnRepository metricCreateIxnRepository;


  @Autowired
  public IxnController(RfiRepository rfiRepository,
                       ExploitDateRepository exploitDateRepository,
                       TargetRepository targetRepository,
                       SegmentRepository segmentRepository,
                       IxnRepository ixnRepository,
                       MetricCreateSegmentRepository metricCreateSegmentRepository,
                       MetricCreateIxnRepository metricCreateIxnRepository) {
    this.rfiRepository = rfiRepository;
    this.exploitDateRepository = exploitDateRepository;
    this.targetRepository = targetRepository;
    this.segmentRepository = segmentRepository;
    this.ixnRepository = ixnRepository;
    this.metricCreateSegmentRepository = metricCreateSegmentRepository;
    this.metricCreateIxnRepository = metricCreateIxnRepository;
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
  public void setMetricCreateSegmentRepository(MetricCreateSegmentRepository metricCreateSegmentRepository) {
    this.metricCreateSegmentRepository = metricCreateSegmentRepository;
  }

  @Autowired
  public void setMetricCreateIxnRepository(MetricCreateIxnRepository metricCreateIxnRepository) {
    this.metricCreateIxnRepository = metricCreateIxnRepository;
  }

  @GetMapping(path = "/{targetId}")
  public List<Ixn> getIxns(@PathVariable("targetId") long targetId) {
    List<Ixn> interactions = ixnRepository.findAllByTargetId(targetId);
    interactions.sort((Comparator.comparing(Ixn::getTime)));
    return interactions;
  }

  @GetMapping(path = "/segment/{targetId}")
  public List<Segment> getSegments(@PathVariable("targetId") long targetId ) {
    List<Segment> segments = segmentRepository.findAllByTargetId(targetId);
    segments.sort(Comparator.comparing(Segment::getStartTime));
    return segments;
  }

  @PostMapping(path = "/segment/post")
  public void postSegment(@Valid @RequestBody SegmentJson segmentJson) {
    addSegment(segmentJson);
  }

  @PostMapping(path = "/post")
  public void postIxn(@Valid @RequestBody IxnJson ixnJson) {
    addIxn(ixnJson);
  }

  private void addIxn(IxnJson ixnJson) {
    Ixn ixn = new Ixn(ixnJson);
    ixnRepository.save(ixn);
    long ixnId = ixnRepository.findAll().get(ixnRepository.findAll().size() - 1).getId();

    if (rfiRepository.findById(ixnJson.getRfiId()).isPresent()) {
      String rfiNum = rfiRepository.findRfiById(ixnJson.getRfiId()).getRfiNum();
      if (exploitDateRepository.findById(ixnJson.getExploitDateId()).isPresent()) {
        Timestamp exploitDate = exploitDateRepository.findById(ixnJson.getExploitDateId()).get().getExploitDate();
        if (targetRepository.findById(ixnJson.getTargetId()).isPresent()) {
          String targetName = targetRepository.findById(ixnJson.getTargetId()).get().getName();
          if (segmentRepository.findById(ixnJson.getSegmentId()).isPresent()) {
            Segment segment = segmentRepository.findById(ixnJson.getSegmentId()).get();

            MetricCreateIxn metricCreateIxn = new MetricCreateIxn(
              rfiNum,
              exploitDate,
              targetName,
              segment.getStartTime(),
              segment.getEndTime(),
              ixnId,
              new Timestamp(new Date().getTime())
            );

            metricCreateIxnRepository.save(metricCreateIxn);
          }
        }
      }
    }
  }

  private void addSegment(SegmentJson segmentJson) {
    Segment segment = new Segment(segmentJson);
    segmentRepository.save(segment);
    if (rfiRepository.findById(segmentJson.getRfiId()).isPresent()) {
      String rfiNum = rfiRepository.findRfiById(segmentJson.getRfiId()).getRfiNum();
      if (exploitDateRepository.findById(segmentJson.getExploitDateId()).isPresent()) {
        Timestamp exploitDate = exploitDateRepository.findById(segmentJson.getExploitDateId()).get().getExploitDate();
        if (targetRepository.findById(segmentJson.getTargetId()).isPresent()) {
          String targetName = targetRepository.findById(segmentJson.getTargetId()).get().getName();

          MetricCreateSegment metricCreateSegment = new MetricCreateSegment(
            rfiNum,
            exploitDate,
            targetName,
            segmentJson.getStartTime(),
            segmentJson.getEndTime(),
            new Timestamp(new Date().getTime())
          );

          metricCreateSegmentRepository.save(metricCreateSegment);
        }
      }
    }
  }
}