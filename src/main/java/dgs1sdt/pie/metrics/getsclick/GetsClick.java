package dgs1sdt.pie.metrics.getsclick;

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
public class GetsClick {
  @Id
  @GeneratedValue(strategy = GenerationType.AUTO)
  private long id;
  private Date datetime;
  private String status;
  private String url;

  public GetsClick(Date datetime, String status, String url) {
    this.datetime = datetime;
    this.status = status;
    this.url = url;
  }
}
