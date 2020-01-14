package dgs1sdt.pie.metrics.refreshclicks;

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
public class RefreshClicks {
  @Id
  @GeneratedValue(strategy = GenerationType.AUTO)
  private long id;
  private Date datetime;

  public RefreshClicks(Date datetime) {
    this.datetime = datetime;
  }
}
