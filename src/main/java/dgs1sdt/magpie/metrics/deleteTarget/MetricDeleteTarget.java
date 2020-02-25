package dgs1sdt.magpie.metrics.deleteTarget;

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
public class MetricDeleteTarget {
  @Id
  @GeneratedValue(strategy = GenerationType.AUTO)
  private long id;
  private String rfiNum;
  private Timestamp exploitDate;
  private String targetName;
  private Timestamp timestamp;

  public MetricDeleteTarget(String rfiNum, Timestamp exploitDate, String targetName, Timestamp timestamp) {
    this.rfiNum = rfiNum;
    this.exploitDate = exploitDate;
    this.targetName = targetName;
    this.timestamp = timestamp;
  }
}
