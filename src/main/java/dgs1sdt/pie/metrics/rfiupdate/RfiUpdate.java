package dgs1sdt.pie.metrics.rfiupdate;

import dgs1sdt.pie.rfis.Rfi;
import lombok.Data;

import javax.persistence.*;
import java.util.Date;

@Entity
@Data
public class RfiUpdate {
  @Id
  @GeneratedValue(strategy = GenerationType.AUTO)
  private long id;
  private String rfiId;
  private Date datetime; // time change *observed*
  private String field;

  @Column(length = 65535)
  private String oldData;

  @Column(length = 65535)
  private String newData;

  public RfiUpdate(
    String rfiId,
    Date datetime,
    String field,
    String oldData,
    String newData
  ) {
    this.rfiId = rfiId;
    this.datetime = datetime;
    this.field = field;
    this.oldData = oldData;
    this.newData = newData;
  }

  public RfiUpdate(
    Date datetime,
    Rfi newRfi,
    Rfi oldRfi,
    String field
  ) {
    this.rfiId = newRfi.getRfiId();
    this.datetime = datetime;
    this.field = field;
    this.oldData = oldRfi.getDescription();
    this.newData = newRfi.getDescription();
  }
}
