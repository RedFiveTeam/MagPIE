package dgs1sdt.magpie.metrics.changeSegment;

import dgs1sdt.magpie.ixns.SegmentJson;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import java.sql.Timestamp;
import java.util.Date;

@Entity
@Data
@NoArgsConstructor
public class MetricChangeSegment {

  @Id
  @GeneratedValue(strategy = GenerationType.AUTO)
  private long id;
  private long segmentId;
  private Timestamp newSegmentStart;
  private Timestamp newSegmentEnd;
  private Timestamp timestamp;

  public MetricChangeSegment(SegmentJson segment) {
    this.segmentId = segment.getId();
    this.newSegmentStart = segment.getStartTime();
    this.newSegmentEnd = segment.getEndTime();
    this.timestamp = new Timestamp(new Date().getTime());
  }
}
