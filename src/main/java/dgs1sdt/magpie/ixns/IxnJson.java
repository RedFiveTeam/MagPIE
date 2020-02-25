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
  private String track;

  public IxnJson(long rfiId,
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
}