package dgs1sdt.magpie.scois;

import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

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

  public Scoi(String name, String mgrs) {
    this.name = name;
    this.mgrs = mgrs;
  }
}
