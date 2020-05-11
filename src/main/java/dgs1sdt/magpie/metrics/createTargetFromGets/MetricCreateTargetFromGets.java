package dgs1sdt.magpie.metrics.createTargetFromGets;

import dgs1sdt.magpie.metrics.TimestampMetric;
import dgs1sdt.magpie.tgts.Target;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import java.sql.Timestamp;

@Data
@Entity
@NoArgsConstructor
public class MetricCreateTargetFromGets implements TimestampMetric {
  @Id
  @GeneratedValue(strategy = GenerationType.AUTO)
  private long id;
  private long rfiId;
  private String mgrs;
  private Timestamp timestamp;

  public MetricCreateTargetFromGets(Target target, Timestamp timestamp) {
    this.rfiId = target.getRfiId();
    this.mgrs = target.getMgrs();
    this.timestamp = timestamp;
  }
}
