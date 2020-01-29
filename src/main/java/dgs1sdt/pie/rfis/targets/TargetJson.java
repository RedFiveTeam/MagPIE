package dgs1sdt.pie.rfis.targets;

import lombok.*;

import java.sql.Timestamp;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class TargetJson {
  private String rfiNum;
  private Timestamp exploitDate;
  private String name;
  private String mgrs;
  private String notes;
  private String description;
}
