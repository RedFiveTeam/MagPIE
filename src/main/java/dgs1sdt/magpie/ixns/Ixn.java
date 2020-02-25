package dgs1sdt.magpie.ixns;

import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.sql.Timestamp;

@Data
@Entity
@Getter
@Setter
@NoArgsConstructor
@Table(name = "data_ixn")
public class Ixn {
  @Id
  @GeneratedValue(strategy = GenerationType.AUTO)
  private long id;
  private long rfiId;
  private long exploitDateId;
  private long targetId;
  private long segmentId;
  private String exploitAnalyst;
  private Timestamp time;
  private String activity;
  private String track;

  public Ixn(long rfiId,
             long exploitDateId,
             long targetId,
             long segmentId,
             String exploitAnalyst,
             Timestamp time,
             String activity,
             String track) {
    this.rfiId = rfiId;
    this.exploitDateId = exploitDateId;
    this.targetId = targetId;
    this.segmentId = segmentId;
    this.exploitAnalyst = exploitAnalyst;
    this.time = time;
    this.activity = activity;
    this.track = track;
  }

  public Ixn(IxnJson ixnJson) {
    this.rfiId = ixnJson.getRfiId();
    this.exploitDateId = ixnJson.getExploitDateId();
    this.targetId = ixnJson.getTargetId();
    this.segmentId = ixnJson.getSegmentId();
    this.exploitAnalyst = ixnJson.getExploitAnalyst();
    this.time = ixnJson.getTime();
    this.activity = ixnJson.getActivity();
    this.track = ixnJson.getTrack();
  }
}