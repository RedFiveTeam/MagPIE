package dgs1sdt.pie.ixns;

import dgs1sdt.pie.metrics.createSegment.MetricCreateSegment;
import dgs1sdt.pie.metrics.createSegment.MetricCreateSegmentRepository;
import dgs1sdt.pie.rfis.RfiRepository;
import dgs1sdt.pie.rfis.exploitDates.ExploitDateRepository;
import dgs1sdt.pie.rfis.targets.TargetRepository;
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
  public static final String URI = "/api/ixns";

  private RfiRepository rfiRepository;
  private ExploitDateRepository exploitDateRepository;
  private TargetRepository targetRepository;
  private SegmentRepository segmentRepository;
  private MetricCreateSegmentRepository metricCreateSegmentRepository;


  @Autowired
  public IxnController(RfiRepository rfiRepository,
                       ExploitDateRepository exploitDateRepository,
                       TargetRepository targetRepository,
                       SegmentRepository segmentRepository,
                       MetricCreateSegmentRepository metricCreateSegmentRepository) {
    this.rfiRepository = rfiRepository;
    this.exploitDateRepository = exploitDateRepository;
    this.targetRepository = targetRepository;
    this.segmentRepository = segmentRepository;
    this.metricCreateSegmentRepository = metricCreateSegmentRepository;
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
  public void setMetricCreateSegmentRepository(MetricCreateSegmentRepository metricCreateSegmentRepository) {
    this.metricCreateSegmentRepository = metricCreateSegmentRepository;
  }

  @GetMapping(path = "/segment/{targetId}")
  public List<Segment> getSegments(@PathVariable("targetId") long targetId ) {
    List<Segment> segments = segmentRepository.findAllByTargetId(targetId);
    segments.sort(Comparator.comparing(Segment::getStartTime));
    return segments;
  }

  @PostMapping(path = "/segment/post")
  public void postIxn(@Valid @RequestBody SegmentJson segmentJson) {
    addSegment(segmentJson);
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