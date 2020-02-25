package dgs1sdt.magpie.metrics.createIxn;

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
public class MetricCreateIxn {
  @Id
  @GeneratedValue(strategy = GenerationType.AUTO)
  private long id;

  private String rfiNum;
  private Timestamp exploitDate;
  private String targetName;
  private Timestamp segmentStart;
  private Timestamp segmentEnd;
  private long ixnId;
  private Timestamp timestamp;

  public MetricCreateIxn(String rfiNum,
                         Timestamp exploitDate,
                         String targetName,
                         Timestamp segmentStart,
                         Timestamp segmentEnd,
                         long ixnId,
                         Timestamp timestamp) {
    this.rfiNum = rfiNum;
    this.exploitDate = exploitDate;
    this.targetName = targetName;
    this.segmentStart = segmentStart;
    this.segmentEnd = segmentEnd;
    this.ixnId = ixnId;
    this.timestamp = timestamp;
  }
}