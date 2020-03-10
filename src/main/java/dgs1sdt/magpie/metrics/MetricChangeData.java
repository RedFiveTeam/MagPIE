package dgs1sdt.magpie.metrics;

import dgs1sdt.magpie.ixns.Ixn;
import dgs1sdt.magpie.ixns.IxnJson;
import dgs1sdt.magpie.tgts.Target;
import dgs1sdt.magpie.tgts.TargetJson;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.sql.Timestamp;

@Entity
@Data
@NoArgsConstructor
public class MetricChangeData {
  @Id
  @GeneratedValue(strategy = GenerationType.AUTO)
  private long id;
  private long dataId;
  private Timestamp timestamp; // time change *observed*
  private String field;

  @Column(length = 65535)
  private String oldData;

  @Column(length = 65535)
  private String newData;


  public MetricChangeData(
    Timestamp timestamp,
    String field,
    Target oldTarget,
    TargetJson newTarget
  ) throws Exception {
    this.dataId = oldTarget.getId();
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
      case "status":
        oldData = oldTarget.getStatus();
        newData = newTarget.getStatus();
        break;
      default:
        throw new Exception();
    }
  }

  public MetricChangeData(
    Timestamp timestamp,
    String field,
    Ixn oldIxn,
    IxnJson newIxn
  ) throws Exception {
    this.dataId = oldIxn.getId();
    this.field = field;
    this.timestamp = timestamp;

    switch (field) {
      case "exploit_analyst":
        oldData = oldIxn.getExploitAnalyst();
        newData = newIxn.getExploitAnalyst();
        break;
      case "time":
        oldData = oldIxn.getTime().toString();
        newData = newIxn.getTime().toString();
        break;
      case "activity":
        oldData = oldIxn.getActivity();
        newData = newIxn.getActivity();
        break;
      case "track_analyst":
        oldData = oldIxn.getTrackAnalyst();
        newData = newIxn.getTrackAnalyst();
        break;
      case "status":
        oldData = oldIxn.getStatus();
        newData = newIxn.getStatus();
        break;
      case "lead_checker":
        oldData = oldIxn.getLeadChecker();
        newData = newIxn.getLeadChecker();
        break;
      case "final_checker":
        oldData = oldIxn.getFinalChecker();
        newData = newIxn.getFinalChecker();
        break;
      default:
        throw new Exception();
    }
  }
}
