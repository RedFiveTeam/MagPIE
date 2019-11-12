package dgs1sdt.project.pie.metrics.getsclick;



import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@NoArgsConstructor
@Data
public class GETSClickJSON {
  private Date datetime;
  private String url;

  public Date getDatetime() {
    return datetime;
  }

  public void setDatetime(Date datetime) {
    this.datetime = datetime;
  }

  public GETSClickJSON(String url, Date datetime) {
    this.datetime = datetime;
    this.url = url;
  }

  public String getUrl() {
    return url;
  }

  public void setUrl(String url) {
    this.url = url;
  }
}
