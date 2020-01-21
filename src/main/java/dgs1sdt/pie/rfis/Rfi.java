package dgs1sdt.pie.rfis;


import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.sql.Timestamp;
import java.util.*;

@Data
@Entity
@NoArgsConstructor
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
  private Timestamp exploitStart;
  private Timestamp exploitEnd;

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
    TimeZone.setDefault(TimeZone.getTimeZone("UTC"));
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
    this.exploitStart = null;
    this.exploitEnd = null;
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
    TimeZone.setDefault(TimeZone.getTimeZone("UTC"));
    this.getsUrl = getsUrl;
    this.rfiNum = rfiNum;
    this.status = status;
    this.lastUpdate = new Timestamp(lastUpdate.getTime());
    this.customer = customer;
    this.ltiov = new Timestamp(ltiov.getTime());
    this.country = country;
    this.description = description;
    this.priority = priority;
    this.exploitStart = null;
    this.exploitEnd = null;
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
    int priority,
    Date exploitStart,
    Date exploitEnd
  ) {
    TimeZone.setDefault(TimeZone.getTimeZone("UTC"));
    this.getsUrl = getsUrl;
    this.rfiNum = rfiNum;
    this.status = status;
    this.lastUpdate = new Timestamp(lastUpdate.getTime());
    this.customer = customer;
    this.ltiov = new Timestamp(ltiov.getTime());
    this.country = country;
    this.description = description;
    this.priority = priority;
    this.exploitStart = new Timestamp(exploitStart.getTime());
    this.exploitEnd = new Timestamp(exploitEnd.getTime());
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

/*
TODO a function to update some fields of the rfi based on a second rfi
 */


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
