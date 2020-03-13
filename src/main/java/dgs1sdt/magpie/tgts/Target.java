package dgs1sdt.magpie.tgts;

import lombok.*;

import javax.persistence.*;
import java.sql.Timestamp;
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
  private String status;
  private Timestamp deleted;

  public Target(long rfiId, long exploitDateId, TargetJson targetJson) {
    this.rfiId = rfiId;
    this.exploitDateId = exploitDateId;
    this.name = targetJson.getName();
    this.mgrs = targetJson.getMgrs();
    this.notes = targetJson.getNotes();
    this.description = targetJson.getDescription();
    this.status = TargetStatus.NOT_STARTED;
  }

  public Target(TargetJson editTarget) {
    this.id = editTarget.getTargetId();
    this.rfiId = editTarget.getRfiId();
    this.exploitDateId = editTarget.getExploitDateId();
    this.name = editTarget.getName();
    this.mgrs = editTarget.getMgrs();
    this.notes = editTarget.getNotes();
    this.description = editTarget.getDescription();
    this.status = editTarget.getStatus();
  }

  public ArrayList<String> Compare(TargetJson other) throws NullPointerException {
    ArrayList<String> diff = new ArrayList<>();

    if (!this.name.equals(other.getName())) {
      diff.add("name");
    }

    if (!this.mgrs.equals(other.getMgrs())) {
      diff.add("mgrs");
    }

    try {
      if (!this.notes.equals(other.getNotes())) {
        diff.add("notes");
      }
    } catch (NullPointerException e) {
      diff.add("notes");
    }

    try {
      if (!this.description.equals(other.getDescription())) {
        diff.add("description");
      }
    } catch (NullPointerException e) {
      diff.add("description");
    }

    try {
      if (!this.status.equals(other.getStatus())) {
        diff.add("status");
      }
    } catch (NullPointerException e) {
      diff.add("status");
    }


    return diff;
  }

}
