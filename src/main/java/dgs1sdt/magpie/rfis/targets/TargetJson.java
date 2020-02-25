package dgs1sdt.magpie.rfis.targets;

import lombok.*;

@Data
@NoArgsConstructor
@Getter
@Setter
public class TargetJson {
  private long targetId;
  private long rfiId;
  private long exploitDateId;
  private String name;
  private String mgrs;
  private String notes;
  private String description;

  public TargetJson(long targetId, long rfiId, long exploitDateId, String name, String mgrs, String notes,
                    String description) {
    this.targetId = targetId;
    this.rfiId = rfiId;
    this.exploitDateId = exploitDateId;
    this.name = name;
    this.mgrs = mgrs;
    this.notes = notes;
    this.description = description;
  }

  public TargetJson(long rfiId, long exploitDateId, String name, String mgrs, String notes, String description) {
    this.rfiId = rfiId;
    this.exploitDateId = exploitDateId;
    this.name = name;
    this.mgrs = mgrs;
    this.notes = notes;
    this.description = description;
  }
}