package dgs1sdt.pie.metrics.rfiupdate;

import lombok.Data;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import java.util.Date;

@Entity
@Data
public class RfiUpdate {
  @Id
  @GeneratedValue(strategy = GenerationType.AUTO)
  private long id;
  private String rfiId;
  private Date datetime;

  public RfiUpdate(
    String rfiId,
    Date datetime
  ) {
    this.rfiId = rfiId;
    this.datetime = datetime;
  }
}
