package dgs1sdt.magpie.tgts;

import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class TargetJson {
  private long targetId;
  private long rfiId;
  private long exploitDateId;
  private String name;
  private String mgrs;
  private String notes;
  private String description;
  private String status;
  private String hourlyRollup;

  public TargetJson(long rfiId, long exploitDateId, String name, String mgrs, String notes, String description) {
    this.rfiId = rfiId;
    this.exploitDateId = exploitDateId;
    this.name = name;
    this.mgrs = mgrs;
    this.notes = notes;
    this.description = description;
    this.status = TargetStatus.NOT_STARTED;
    this.hourlyRollup = "";
  }
}
