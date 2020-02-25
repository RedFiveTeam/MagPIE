package dgs1sdt.magpie.metrics.changeTarget;

import dgs1sdt.magpie.rfis.targets.Target;
import dgs1sdt.magpie.rfis.targets.TargetJson;
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
  private String oldData;

  @Column(length = 65535)
  private String newData;

  public MetricChangeTarget(
    Timestamp timestamp,
    String field,
    Target oldTarget,
    TargetJson newTarget
  ) throws Exception {
    this.targetId = oldTarget.getId();
    this.field = field;
    this.timestamp = timestamp;

    switch (field) {
      case "name":
        oldData = oldTarget.getName();
        newData = newTarget.getName();
        break;
      case "mgrs":
        oldData = oldTarget.getMgrs();
        newData = newTarget.getMgrs();
        break;
      case "notes":
        oldData = oldTarget.getNotes();
        newData = newTarget.getNotes();
        break;
      case "description":
        oldData = oldTarget.getDescription();
        newData = newTarget.getDescription();
        break;
      default:
        throw new Exception();
    }
  }
}