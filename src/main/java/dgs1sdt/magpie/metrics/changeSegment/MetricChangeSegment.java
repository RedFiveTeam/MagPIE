package dgs1sdt.magpie.metrics.changeSegment;

import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import java.sql.Timestamp;

@Entity
@Data
@NoArgsConstructor
public class MetricChangeSegment {

  @Id
  @GeneratedValue(strategy = GenerationType.AUTO)
  private long id;

  private String rfiNum;
  private Timestamp exploitDate;
  private String targetName;
  private Timestamp oldSegmentStart;
  private Timestamp oldSegmentEnd;
  private Timestamp newSegmentStart;
  private Timestamp newSegmentEnd;
  private Timestamp timestamp;

  public MetricChangeSegment(String rfiNum, Timestamp exploitDate, String targetName, Timestamp oldSegmentStart,
                             Timestamp oldSegmentEnd, Timestamp newSegmentStart, Timestamp newSegmentEnd,
                             Timestamp timestamp) {
    this.rfiNum = rfiNum;
    this.exploitDate = exploitDate;
    this.targetName = targetName;
    this.oldSegmentStart = oldSegmentStart;
    this.oldSegmentEnd = oldSegmentEnd;
    this.newSegmentStart = newSegmentStart;
    this.newSegmentEnd = newSegmentEnd;
    this.timestamp = timestamp;
  }
}
