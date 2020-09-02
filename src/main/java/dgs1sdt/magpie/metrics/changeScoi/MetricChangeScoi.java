package dgs1sdt.magpie.metrics.changeScoi;

import dgs1sdt.magpie.scois.Scoi;
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
public class MetricChangeScoi {
  @Id
  @GeneratedValue(strategy = GenerationType.AUTO)
  private long id;

  private long scoiId;
  private String field;
  private String newData;
  private Timestamp timestamp;

  public MetricChangeScoi(String field,
                          Scoi newScoi,
                          Timestamp timestamp,
                          String userName
  ) throws Exception {
    this.scoiId = newScoi.getId();
    this.field = field;
    this.timestamp = timestamp;
    switch (field) {
      case "name":
        newData = newScoi.getName();
        break;
      case "mgrs":
        newData = newScoi.getMgrs();
        break;
      case "note":
        newData = newScoi.getNote();
        break;
      default:
        throw new Exception();
    }
  }
}
