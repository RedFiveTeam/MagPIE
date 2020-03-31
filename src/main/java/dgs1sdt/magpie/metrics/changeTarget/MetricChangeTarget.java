package dgs1sdt.magpie.metrics.changeTarget;

import dgs1sdt.magpie.tgts.TargetJson;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.sql.Timestamp;

@Entity
@Data
@NoArgsConstructor
public class MetricChangeTarget {
  @Id
  @GeneratedValue(strategy = GenerationType.AUTO)
  private long id;
  private long targetId;
  private Timestamp timestamp; // time change *observed*
  private String field;

  @Column(length = 65535)
  private String newData;

  public MetricChangeTarget(
    String field,
    TargetJson newTarget,
    Timestamp now
  ) throws Exception {
    this.targetId = newTarget.getTargetId();
    this.field = field;
    this.timestamp = now;

    switch (field) {
      case "name":
        newData = newTarget.getName();
        break;
      case "mgrs":
        newData = newTarget.getMgrs();
        break;
      case "notes":
        newData = newTarget.getNotes();
        break;
      case "description":
        newData = newTarget.getDescription();
        break;
      case "status":
        newData = newTarget.getStatus();
        break;
      case "hourly_rollup":
        newData = newTarget.getHourlyRollup();
        break;
      case "all_callouts":
        newData = newTarget.getAllCallouts();
        break;
      default:
        throw new Exception();
    }
  }
}
