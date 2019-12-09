package dgs1sdt.pie.metrics.sortclick;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import java.util.Date;

@AllArgsConstructor
@NoArgsConstructor
@Entity
@Data
public class SortClick {
  @Id
  @GeneratedValue(strategy = GenerationType.AUTO)
  private long id;
  private Date datetime;
  private String sort_key;
  private boolean sort_order_ascending;

  public SortClick(Date datetime, String key, boolean order) {
    this.datetime = datetime;
    this.sort_key = key;
    this.sort_order_ascending = order;
  }
}
