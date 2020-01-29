package dgs1sdt.pie.rfis.targets;

import lombok.*;

import javax.persistence.*;

@Data
@Entity
@NoArgsConstructor
@Getter
@Setter
@Table(name = "data_target")
public class Target {
  @Id
  @GeneratedValue(strategy = GenerationType.AUTO)
  private long id;

  private long rfiId;
  private long exploitDateId;
  private String name;
  private String mgrs;
  private String notes;
  private String description;

  public Target (long rfiId, long exploitDateId, TargetJson targetJson) {
    this.rfiId = rfiId;
    this.exploitDateId = exploitDateId;
    this.name = targetJson.getName();
    this.mgrs = targetJson.getMgrs();
    this.notes = targetJson.getNotes();
    this.description = targetJson.getDescription();
  }
}
