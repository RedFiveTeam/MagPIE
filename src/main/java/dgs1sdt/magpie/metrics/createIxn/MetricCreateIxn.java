package dgs1sdt.magpie.metrics.createIxn;

import dgs1sdt.magpie.ixns.IxnJson;
import dgs1sdt.magpie.metrics.TimestampMetric;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import java.sql.Timestamp;
import java.util.Date;

@Entity
@Data
@NoArgsConstructor
public class MetricCreateIxn implements TimestampMetric {
  @Id
  @GeneratedValue(strategy = GenerationType.AUTO)
  private long id;
  private long rfiId;
  private long exploitDateId;
  private long targetId;
  private long segmentId;
  private long ixnId;

  private String exploitAnalyst;
  private Timestamp time;
  private String activity;
  private String track;
  private String trackAnalyst;
  private String leadChecker;
  private String finalChecker;

  private Timestamp timestamp;
  private String userName;

  public MetricCreateIxn(long ixnId, IxnJson ixn, String userName) {
    this.rfiId = ixn.getRfiId();
    this.exploitDateId = ixn.getExploitDateId();
    this.targetId = ixn.getTargetId();
    this.segmentId = ixn.getSegmentId();
    this.ixnId = ixnId;
    this.exploitAnalyst = ixn.getExploitAnalyst();
    this.time = ixn.getTime();
    this.activity = ixn.getActivity();
    this.trackAnalyst = ixn.getTrackAnalyst();
    this.leadChecker = ixn.getLeadChecker();
    this.finalChecker = ixn.getFinalChecker();
    this.timestamp = new Timestamp(new Date().getTime());
    this.userName = userName.toLowerCase();
  }
}
