package dgs1sdt.magpie.rfis.targets;

import lombok.*;

import javax.persistence.*;
import java.util.ArrayList;

@Data
@Entity
@NoArgsConstructor
@Getter
@Setter
@AllArgsConstructor
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

  public Target(TargetJson editTarget) {
    this.id = editTarget.getTargetId();
    this.rfiId = editTarget.getRfiId();
    this.exploitDateId = editTarget.getExploitDateId();
    this.name = editTarget.getName();
    this.mgrs = editTarget.getMgrs();
    this.notes = editTarget.getNotes();
    this.description = editTarget.getDescription();
  }

  public ArrayList<String> Compare(TargetJson other) throws NullPointerException {
    ArrayList<String> diff = new ArrayList<>();

    if(!this.name.equals(other.getName())){
      diff.add("name");
    }

    if(!this.mgrs.equals(other.getMgrs())){
      diff.add("mgrs");
    }

    try {
      if (!this.notes.equals(other.getNotes())) {
        diff.add("notes");
      }
    } catch (NullPointerException e) {
      diff.add("notes");
    }


    if(!this.description.equals(other.getDescription())){
      diff.add("description");
    }

    return diff;
  }
}