package dgs1sdt.pie.rfis;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.Comparator;
import java.util.Date;

@Data
@Entity
@AllArgsConstructor
@NoArgsConstructor
public class Rfi {
  @Id
  @GeneratedValue(strategy = GenerationType.AUTO)
  private long id;

  @Column(columnDefinition = "LONGVARCHAR")
  private String description;

  private String rfiId;
  private String getsUrl;
  private String status;
  private Date lastUpdate;
  private String customer;
  private Date ltiov;
  private String country;
  private int priority;

  public Rfi(
    String rfiId,
    String getsUrl,
    String status,
    Date lastUpdate,
    String customer,
    Date ltiov,
    String country,
    String description
  ) {
    this.getsUrl = getsUrl;
    this.rfiId = rfiId;
    this.status = status;
    this.lastUpdate = lastUpdate;
    this.customer = customer;
    this.ltiov = ltiov;
    this.country = country;
    this.description = description;
    this.priority = -1;
  }

  public Rfi(
    String rfiId,
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
    this.rfiId = rfiId;
    this.status = status;
    this.lastUpdate = lastUpdate;
    this.customer = customer;
    this.ltiov = ltiov;
    this.country = country;
    this.description = description;
    this.priority = priority;
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
