package dgs1sdt.pie.metrics.changeRfi;

import dgs1sdt.pie.rfis.Rfi;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.Date;

@Entity
@Data
@NoArgsConstructor
public class MetricChangeRfi {
  @Id
  @GeneratedValue(strategy = GenerationType.AUTO)
  private long id;
  private String rfiNum;
  private Date datetime; // time change *observed*
  private String field;

  @Column(length = 65535)
  private String oldData;

  @Column(length = 65535)
  private String newData;

  public MetricChangeRfi(
    String rfiNum,
    Date datetime,
    String field,
    String oldData,
    String newData
  ) {
    this.rfiNum = rfiNum;
    this.datetime = datetime;
    this.field = field;
    this.oldData = oldData;
    this.newData = newData;
  }

  public MetricChangeRfi(
    Date datetime,
    Rfi newRfi,
    Rfi oldRfi,
    String field
  ) {
    this.rfiNum = newRfi.getRfiNum();
    this.datetime = datetime;
    this.field = field;
    switch (field) {
      case "description":
        this.oldData = oldRfi.getDescription();
        this.newData = newRfi.getDescription();
        break;

      case "country":
        this.oldData = oldRfi.getCountry();
        this.newData = newRfi.getCountry();
        break;

      case "ltiov": // this is the only field that could be null to string
        if (oldRfi.getLtiov() == null) {
          this.oldData = "not set";
        } else {
          this.oldData = oldRfi.getLtiov().toString();
        }

        if (newRfi.getLtiov() == null) {
          this.newData = "not set";
        } else {
          this.newData = newRfi.getLtiov().toString();
        }

        break;

      case "customer":
        this.oldData = oldRfi.getCustomer();
        this.newData = newRfi.getCustomer();
        break;

      case "status":
        this.oldData = oldRfi.getStatus();
        this.newData = newRfi.getStatus();
        break;

      case "getsUrl":
        this.oldData = oldRfi.getGetsUrl();
        this.newData = newRfi.getGetsUrl();
        break;

      default:
        break;
    }
  }
}
