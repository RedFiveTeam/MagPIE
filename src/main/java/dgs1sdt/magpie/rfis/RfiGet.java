package dgs1sdt.magpie.rfis;

import lombok.Getter;
import lombok.NoArgsConstructor;

import java.sql.Timestamp;

@Getter
@NoArgsConstructor
public class RfiGet {
  private long id;
  private String description;
  private String justification;
  private String rfiNum;
  private String getsUrl;
  private String status;
  private Timestamp lastUpdate;
  private String customer;
  private Timestamp ltiov;
  private String country;
  private int priority;
  private long tgtCount;
  private long ixnCount;

  public RfiGet(Rfi rfi, long tgtCount, long ixnCount) {
    this.id = rfi.getId();
    this.description = rfi.getDescription();
    this.justification = rfi.getJustification();
    this.rfiNum = rfi.getRfiNum();
    this.getsUrl = rfi.getGetsUrl();
    this.status = rfi.getStatus();
    this.lastUpdate = rfi.getLastUpdate();
    this.customer = rfi.getCustomer();
    this.ltiov = rfi.getLtiov();
    this.country = rfi.getCountry();
    this.priority = rfi.getPriority();
    this.tgtCount = tgtCount;
    this.ixnCount = ixnCount;
  }
}
