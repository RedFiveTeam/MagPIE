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
  private String customer;
  private int ltiov;
  private String country;
  private String description;

  public RFI(String rfiId,
             String getsUrl,
             String status,
             int lastUpdate,
             String customer,
             int ltiov,
             String country,
             String description) {
    this.getsUrl = getsUrl;
    this.rfiId = rfiId;
    this.status = status;
    this.lastUpdate = lastUpdate;
    this.customer = customer;
    this.ltiov = ltiov;
    this.country = country;
    this.description = description;
  }

}

class SortByRecentFirst implements Comparator<RFI> {
  public int compare(RFI a, RFI b) {
    return b.getLastUpdate() - a.getLastUpdate();
  }
}


