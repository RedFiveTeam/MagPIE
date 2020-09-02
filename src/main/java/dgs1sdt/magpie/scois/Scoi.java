package dgs1sdt.magpie.scois;

import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Data
@NoArgsConstructor
@Table(name = "data_scoi")
public class Scoi {
  @Id
  @GeneratedValue(strategy = GenerationType.AUTO)
  private long id;
  private String name;
  private String mgrs;
  private String note;

  public Scoi(String name, String mgrs, String note) {
    this.name = name;
    this.mgrs = mgrs;
    this.note = note;
  }

  public List<String> compare(Scoi otherScoi) {
    List<String> diff = new ArrayList<>();

    if ((this.name == null && otherScoi.getName() != null) ||
      (this.note != null && !this.name.equals(otherScoi.getName()))) {
      diff.add("name");
    }
    if ((this.mgrs == null && otherScoi.getMgrs() != null) ||
      (this.note != null && !this.mgrs.equals(otherScoi.getMgrs()))) {
      diff.add("mgrs");
    }
    if ((this.note == null && otherScoi.getNote() != null) ||
      (this.note != null && !this.note.equals(otherScoi.getNote()))) {
      diff.add("note");
    }

    return diff;
  }
}
