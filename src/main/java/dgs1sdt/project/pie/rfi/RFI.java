package dgs1sdt.project.pie.rfi;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.apache.logging.log4j.util.PropertySource;

import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import java.util.Comparator;
import java.util.Date;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class RFI {
  @Id
  @GeneratedValue(strategy = GenerationType.AUTO)
  private long id;
  private String getsUrl;
  private String rfiId;
  private String status;
  private int lastUpdate;
  private String unit;
  private int ltiov;
  private String country;

  public RFI(String rfiId, String getsUrl, String status, int lastUpdate, String unit, int ltiov, String country) {
    this.getsUrl = getsUrl;
    this.rfiId = rfiId;
    this.status = status;
    this.lastUpdate = lastUpdate;
    this.unit = unit;
    this.ltiov = ltiov;
    this.country = country;
  }

}

class SortByRecentFirst implements Comparator<RFI> {
  public int compare(RFI a, RFI b) {
    return b.getLastUpdate() - a.getLastUpdate();
  }
}


