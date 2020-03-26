package dgs1sdt.magpie.rfis;

import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.sql.Timestamp;
import java.util.*;

@Data
@Entity
@NoArgsConstructor
@Table(name = "data_rfi")
public class Rfi {
  @Id
  @GeneratedValue(strategy = GenerationType.AUTO)
  private long id;

  @Column(length = 65535)
  private String description;
  private String rfiNum;
  private String getsUrl;
  private String status;
  private Timestamp lastUpdate;
  private String customer;
  private Timestamp ltiov;
  private String country;
  private int priority;
  private Timestamp receiveDate;

  public Rfi(
    String rfiNum,
    String getsUrl,
    String status,
    Date lastUpdate,
    String customer,
    Date ltiov,
    String country,
    String description
  ) {
    this.getsUrl = getsUrl;
    this.rfiNum = rfiNum;
    this.status = status;
    this.lastUpdate = new Timestamp(lastUpdate.getTime());
    this.customer = customer;

    try {
      this.ltiov = new Timestamp(ltiov.getTime());
    } catch (NullPointerException e) {
      this.ltiov = null;
    }

    this.country = country;
    this.description = description;
    this.priority = -1;
    this.receiveDate = new Timestamp(new Date().getTime());
  }

  public Rfi(
    String rfiNum,
    String getsUrl,
    String status,
    Date lastUpdate,
    String customer,
    Date ltiov,
    String country,
    String description,
    int priority
  ) {
    this.getsUrl = getsUrl;
    this.rfiNum = rfiNum;
    this.status = status;
    this.lastUpdate = new Timestamp(lastUpdate.getTime());
    this.customer = customer;
    this.ltiov = new Timestamp(ltiov.getTime());
    this.country = country;
    this.description = description;
    this.priority = priority;
  }

  public List<String> compare(Rfi otherRfi) throws NullPointerException {
    List<String> diff = new ArrayList<>();

    if (!this.getsUrl.equals(otherRfi.getsUrl))
      diff.add("getsUrl");

    try {
      if (!this.status.equals(otherRfi.status))
        diff.add("status");
    } catch (NullPointerException e) {
      diff.add("status");
    }

    try {
      if (!this.customer.equals(otherRfi.customer))
        diff.add("customer");
    } catch (NullPointerException e) {
      diff.add("customer");
    }

    try {
      if (!this.ltiov.equals(otherRfi.ltiov))
        diff.add("ltiov");
    } catch (NullPointerException e) {
      if (otherRfi.ltiov != null)
        diff.add("ltiov");
    }

    try {
      if (!this.country.equals(otherRfi.country))
        diff.add("country");
    } catch (NullPointerException e) {
      diff.add("country");
    }

    try {
      if (!this.description.equals(otherRfi.description))
        diff.add("description");
    } catch (NullPointerException e) {
      diff.add("description");
    }

    return diff;
  }

}

class SortByRecentFirst implements Comparator<Rfi> {
  public int compare(Rfi a, Rfi b) {
    return b.getLastUpdate().compareTo(a.getLastUpdate());
  }
}

class SortByAscendingPriority implements Comparator<Rfi> {
  public int compare(Rfi a, Rfi b) {
    return a.getPriority() - b.getPriority();
  }
}
