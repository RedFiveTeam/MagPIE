package dgs1sdt.pie.metrics.rfiprioritychange;

import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import java.util.Date;

@Entity
@Data
@NoArgsConstructor
public class RfiPriorityChange {
  @Id
  @GeneratedValue(strategy = GenerationType.AUTO)
  private long id;
  private String rfiNum;
  private int oldPri;
  private int newPri;
  private Date datetime;

  public RfiPriorityChange(String rfiNum, int oldPri, int newPri, Date datetime) {
    this.rfiNum = rfiNum;
    this.oldPri = oldPri;
    this.newPri = newPri;
    this.datetime = datetime;
  }
}
