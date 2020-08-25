package dgs1sdt.magpie.metrics.undoProductDelete;

import dgs1sdt.magpie.metrics.TimestampMetric;
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
public class MetricUndoProductDelete implements TimestampMetric {
  @Id
  @GeneratedValue(strategy = GenerationType.AUTO)
  private long id;

  private String rfiNum;
  private String userName;

  private Timestamp timestamp;

  public MetricUndoProductDelete(String rfiNum, String userName) {
    this.rfiNum = rfiNum;
    this.userName = userName;
    this.timestamp = new Timestamp(new Date().getTime());
  }
}
