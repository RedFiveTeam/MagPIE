package dgs1sdt.pie.metrics.rfiprioritychange;

import lombok.Data;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import java.util.Date;

@Entity
@Data
public class RfiPriorityChange {
  @Id
  @GeneratedValue(strategy = GenerationType.AUTO)
  private long id;
  private String rfiId;
  private int oldPri;
  private int newPri;
  private Date datetime;

  public RfiPriorityChange(String rfiId, int oldPri, int newPri, Date datetime) {
    this.rfiId = rfiId;
    this.oldPri = oldPri;
    this.newPri = newPri;
    this.datetime = datetime;
  }
}
