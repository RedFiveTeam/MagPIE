package dgs1sdt.magpie.metrics.changeIxn;

import dgs1sdt.magpie.ixns.Ixn;
import dgs1sdt.magpie.ixns.IxnJson;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.sql.Timestamp;

@Entity
@Data
@NoArgsConstructor
public class MetricChangeIxn {
  @Id
  @GeneratedValue(strategy = GenerationType.AUTO)
  private long id;
  private long ixnId;
  private Timestamp timestamp; // time change *observed*
  private String field;

  @Column(length = 65535)
  private String newData;

  public MetricChangeIxn(
    String field,
    IxnJson newIxn,
    Timestamp timestamp
  ) throws Exception {
    this.ixnId = newIxn.getId();
    this.field = field;
    this.timestamp = timestamp;

    switch (field) {
      case "exploit_analyst":
        newData = newIxn.getExploitAnalyst();
        break;
      case "time":
        newData = newIxn.getTime().toString();
        break;
      case "activity":
        newData = newIxn.getActivity();
        break;
      case "track_analyst":
        newData = newIxn.getTrackAnalyst();
        break;
      case "status":
        newData = newIxn.getStatus();
        break;
      case "lead_checker":
        newData = newIxn.getLeadChecker();
        break;
      case "final_checker":
        newData = newIxn.getFinalChecker();
        break;
      default:
        throw new Exception();
    }
  }
}
