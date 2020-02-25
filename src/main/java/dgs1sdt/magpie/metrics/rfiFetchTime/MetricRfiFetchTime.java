package dgs1sdt.magpie.metrics.rfiFetchTime;

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
public class MetricRfiFetchTime {
  @Id
  @GeneratedValue(strategy = GenerationType.AUTO)
  private long id;
  private Date start_time;
  private Date end_time;

  public MetricRfiFetchTime(Date start_time, Date end_time) {
    this.start_time = start_time;
    this.end_time = end_time;
  }
}
