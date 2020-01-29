package dgs1sdt.pie.metrics.sortClick;


import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@NoArgsConstructor
@Data
public class MetricClickSortJson {
  private Date datetime;
  private String key;
  private boolean orderAscending;

  public String getKey() {
    return key;
  }

  public void setKey(String key) {
    this.key = key;
  }

  public Date getDatetime() {
    return datetime;
  }

  public void setDatetime(Date datetime) {
    this.datetime = datetime;
  }

  public MetricClickSortJson(Date datetime, String key, boolean orderAscending) {
    this.datetime = datetime;
    this.key = key;
    this.orderAscending = orderAscending;
  }

  public boolean getOrder() {
    return orderAscending;
  }

  public void setOrder(boolean orderAscending) {
    this.orderAscending = orderAscending;
  }
}
