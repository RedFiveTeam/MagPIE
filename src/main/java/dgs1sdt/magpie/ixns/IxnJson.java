package dgs1sdt.magpie.ixns;

import lombok.*;

import java.sql.Timestamp;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class IxnJson {
  private long id;
  private long rfiId;
  private long exploitDateId;
  private long targetId;
  private long segmentId;
  private String exploitAnalyst;
  private Timestamp time;
  private String activity;
  private String trackAnalyst;
  private String status;
  private String leadChecker;
  private String finalChecker;
  private String trackNarrative;
  private String note;

  public IxnJson(long rfiId, long exploitDateId, long targetId, long segmentId, String exploitAnalyst, Timestamp time,
                 String activity, String trackAnalyst, String status, String leadChecker, String finalChecker,
                 String trackNarrative, String note) {
    this.rfiId = rfiId;
    this.exploitDateId = exploitDateId;
    this.targetId = targetId;
    this.segmentId = segmentId;
    this.exploitAnalyst = exploitAnalyst;
    this.time = time;
    this.activity = activity;
    this.trackAnalyst = trackAnalyst;
    this.status = status;
    this.leadChecker = leadChecker;
    this.finalChecker = finalChecker;
    this.trackNarrative = trackNarrative;
    this.note = note;
  }
}
