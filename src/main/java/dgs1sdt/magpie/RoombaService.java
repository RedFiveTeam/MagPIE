package dgs1sdt.magpie;

import dgs1sdt.magpie.ixns.IxnService;
import dgs1sdt.magpie.ixns.Segment;
import dgs1sdt.magpie.tgts.Target;
import dgs1sdt.magpie.tgts.TargetService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;
import java.util.Date;
import java.util.List;

@Service
public class RoombaService {
  public static final long timeDelayInMs = 86400000L;

  IxnService ixnService;
  TargetService targetService;

  @Autowired
  public RoombaService(IxnService ixnService, TargetService targetService) {
    this.ixnService = ixnService;
    this.targetService = targetService;
  }

  @Autowired
  public void setIxnService(IxnService ixnService) {
    this.ixnService = ixnService;
  }

  @Autowired
  public void setTargetService(TargetService targetService) {
    this.targetService = targetService;
  }

  @Scheduled(fixedDelay = timeDelayInMs)
  public void clean() {
    Timestamp deleteCutoff = new Timestamp(new Date().getTime() - RoombaService.timeDelayInMs);

    List<Segment> segments = ixnService.getDeletedSegments();
    List<Target> targets = targetService.getDeletedTargets();

    for(Segment segment : segments) {
      if(segment.getDeleted() != null && segment.getDeleted().before(deleteCutoff)) {
        ixnService.deleteSegment(segment.getId());
      }
    }

    for(Target target : targets) {
      if(target.getDeleted() != null && target.getDeleted().before(deleteCutoff)) {
        targetService.deleteTarget(target.getId());
      }
    }
  }
}
