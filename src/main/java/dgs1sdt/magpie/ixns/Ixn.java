package dgs1sdt.magpie.ixns;

import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.sql.Timestamp;
import java.util.ArrayList;

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
  private String trackAnalyst;
  private String status;
  private String leadChecker;
  private String finalChecker;

  public Ixn(long rfiId, long exploitDateId, long targetId, long segmentId, String exploitAnalyst, Timestamp time,
             String activity, String track, String trackAnalyst, String status, String leadChecker,
             String finalChecker) {
    this.rfiId = rfiId;
    this.exploitDateId = exploitDateId;
    this.targetId = targetId;
    this.segmentId = segmentId;
    this.exploitAnalyst = exploitAnalyst;
    this.time = time;
    this.activity = activity;
    this.track = track;
    this.trackAnalyst = trackAnalyst;
    this.status = status;
    this.leadChecker = leadChecker;
    this.finalChecker = finalChecker;
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
    this.trackAnalyst = ixnJson.getTrackAnalyst();
    this.status = ixnJson.getStatus();
    this.leadChecker = ixnJson.getLeadChecker();
    this.finalChecker = ixnJson.getFinalChecker();
  }

  public ArrayList<String> Compare(IxnJson other) throws NullPointerException {
    ArrayList<String> diff = new ArrayList<>();

    try {
      if (!this.exploitAnalyst.equals(other.getExploitAnalyst())) {
        diff.add("exploit_analyst");
      }
    } catch (NullPointerException e) {
      diff.add("exploit_analyst");
    }

    try {
      if (!this.time.equals(other.getTime())) {
        diff.add("time");
      }
    } catch (NullPointerException e) {
      diff.add("time");
    }

    try {
      if (!this.activity.equals(other.getActivity())) {
        diff.add("activity");
      }
    } catch (NullPointerException e) {
      diff.add("activity");
    }

    try {
      if (!this.track.equals(other.getTrack())) {
        diff.add("track");
      }
    } catch (NullPointerException e) {
      diff.add("track");
    }

    try {
      if (!this.trackAnalyst.equals(other.getTrackAnalyst())) {
        diff.add("track_analyst");
      }
    } catch (NullPointerException e) {
      diff.add("track_analyst");
    }

    try {
      if (!this.status.equals(other.getStatus())) {
        diff.add("status");
      }
    } catch (NullPointerException e) {
      diff.add("status");
    }

    try {
      if (!this.leadChecker.equals(other.getLeadChecker())) {
        diff.add("lead_checker");
      }
    } catch (NullPointerException e) {
      diff.add("lead_checker");
    }

    try {
      if (!this.finalChecker.equals(other.getFinalChecker())) {
        diff.add("final_checker");
      }
    } catch (NullPointerException e) {
      diff.add("final_checker");
    }

    return diff;
  }
}
