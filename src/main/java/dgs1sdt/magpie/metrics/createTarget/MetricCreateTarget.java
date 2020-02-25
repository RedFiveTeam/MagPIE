package dgs1sdt.magpie.metrics.createTarget;

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
public class MetricCreateTarget {
  @Id
  @GeneratedValue(strategy = GenerationType.AUTO)
  private long id;
  private String rfiNum;
  private Timestamp exploitDate;
  private String name;
  private Timestamp timestamp;

  public MetricCreateTarget(String rfiNum, Timestamp exploitDate, String name, Timestamp timestamp) {
    this.rfiNum = rfiNum;
    this.exploitDate = exploitDate;
    this.name = name;
    this.timestamp = timestamp;
  }
}
