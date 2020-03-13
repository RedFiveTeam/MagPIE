package dgs1sdt.magpie;

import dgs1sdt.magpie.ixns.IxnService;
import dgs1sdt.magpie.ixns.Segment;
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

  @Autowired
  public RoombaService(IxnService ixnService) {
    this.ixnService = ixnService;
  }

  @Autowired
  public void setIxnService(IxnService ixnService) {
    this.ixnService = ixnService;
  }


  @Scheduled(fixedDelay = timeDelayInMs)
  public void clean() {
    List<Segment> segments = ixnService.getDeletedSegments();

    Timestamp deleteCutoff = new Timestamp(new Date().getTime() - RoombaService.timeDelayInMs);

    for(Segment segment : segments) {
      if(segment.getDeleted() != null && segment.getDeleted().before(deleteCutoff)) {
        ixnService.deleteSegment(segment.getId());
      }
    }
  }
}
