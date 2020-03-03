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
      Segment oldSegment = segmentRepository.findById(segmentJson.getId()).get();
    }

    if (rfiRepository.findById(segmentJson.getRfiId()).isPresent()) {
      String rfiNum = rfiRepository.findRfiById(segmentJson.getRfiId()).getRfiNum();
      if (exploitDateRepository.findById(segmentJson.getExploitDateId()).isPresent()) {
        Timestamp exploitDate = exploitDateRepository.findById(segmentJson.getExploitDateId()).get().getExploitDate();
        if (targetRepository.findById(segmentJson.getTargetId()).isPresent()) {
          String targetName = targetRepository.findById(segmentJson.getTargetId()).get().getName();
          if (segmentJson.getId() > 0) {
            if (segmentRepository.findById(segmentJson.getId()).isPresent()) {
              this.metricsService.addChangeSegment(rfiNum, exploitDate, targetName, segmentJson,
                segmentRepository.findById(segmentJson.getId()).get());
            } else {
              System.err.println("Error editing segment: could not find segment with id " + segmentJson.getId());
            }
          } else {
            this.metricsService.addCreateSegment(rfiNum, exploitDate, targetName, segmentJson);
          }
        } else {
          System.err.println("Error adding segment: could not find target with id " + segmentJson.getTargetId());
        }
      } else {
        System.err.println("Error adding segment: could not find exploit date with id " + segmentJson.getExploitDateId());
      }
    } else {
      System.err.println("Error adding segment: could not find rfi with id " + segmentJson.getRfiId());
    }
    segmentRepository.save(segment);
  }

  @PostMapping(path = "/post")
  public void postIxn(@Valid @RequestBody IxnJson ixnJson) {
    addIxn(ixnJson);
  }

  @DeleteMapping(path = "/{ixnId}")
  public void deleteIxn(@PathVariable("ixnId") long ixnId) {
    if (ixnRepository.findById(ixnId).isPresent()) {
      Ixn ixn = ixnRepository.findById(ixnId).get();

      ixnRepository.deleteById(ixnId);

      if (rfiRepository.findById(ixn.getRfiId()).isPresent()) {
        String rfiNum = rfiRepository.findRfiById(ixn.getRfiId()).getRfiNum();
        if (exploitDateRepository.findById(ixn.getExploitDateId()).isPresent()) {
          Timestamp exploitDate = exploitDateRepository.findById(ixn.getExploitDateId()).get().getExploitDate();
          if (targetRepository.findById(ixn.getTargetId()).isPresent()) {
            String targetName = targetRepository.findById(ixn.getTargetId()).get().getName();
            if (segmentRepository.findById(ixn.getSegmentId()).isPresent()) {
              Segment segment = segmentRepository.findById(ixn.getSegmentId()).get();

              metricsService.addDeleteIxn(
                rfiNum,
                exploitDate,
                targetName,
                segment.getStartTime(),
                segment.getEndTime()
              );
            }
          }
        }
      }
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

      if (rfiRepository.findById(segment.getRfiId()).isPresent()) {
        String rfiNum = rfiRepository.findRfiById(segment.getRfiId()).getRfiNum();
        if (exploitDateRepository.findById(segment.getExploitDateId()).isPresent()) {
          Timestamp exploitDate = exploitDateRepository.findById(segment.getExploitDateId()).get().getExploitDate();
          if (targetRepository.findById(segment.getTargetId()).isPresent()) {
            String targetName = targetRepository.findById(segment.getTargetId()).get().getName();
            this.metricsService.addDeleteSegment(rfiNum, exploitDate, targetName, segment.getStartTime(),
              segment.getEndTime(), hadIxns);
          } else {
            System.err.println("Error adding segment deletion metric: could not find target with id " + segment.getTargetId());
          }
        } else {
          System.err.println("Error adding segment deletion metric: could not find exploit date with id " + segment.getExploitDateId());
        }
      } else {
        System.err.println("Error adding segment deletion metric: could not find rfi with id " + segment.getRfiId());
      }
    } else {
      System.err.println("Error deleting segment: could not find segment with id " + segmentId);
    }
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

            metricsService.addCreateIxn(
              rfiNum,
              exploitDate,
              targetName,
              segment.getStartTime(),
              segment.getEndTime(),
              ixnId
            );
          }
        }
      }
    }
  }
}
