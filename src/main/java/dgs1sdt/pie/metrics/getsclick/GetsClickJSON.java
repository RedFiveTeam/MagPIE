package dgs1sdt.pie.metrics.getsclick;


import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@NoArgsConstructor
@Data
public class GetsClickJSON {
  private Date datetime;
  private String status;
  private String url;

  public String getStatus() {
    return status;
  }

  public void setStatus(String status) {
    this.status = status;
  }

  public Date getDatetime() {
    return datetime;
  }

  public void setDatetime(Date datetime) {
    this.datetime = datetime;
  }

  public String getUrl() {
    return url;
  }

  public void setUrl(String url) {
    this.url = url;
  }

  public GetsClickJSON(Date datetime, String status, String url) {
    this.datetime = datetime;
    this.status = status;
    this.url = url;
  }
}
