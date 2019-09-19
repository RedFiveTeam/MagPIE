package dgs1sdt.project.pie.fact;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import javax.validation.constraints.Size;

@Data
@Entity
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "facts")
public
class Fact {
  @Id
  @GeneratedValue(strategy = GenerationType.AUTO)
  private long id;

  @Size(min = 3, max = 20)
  private String content;

  public Fact(@Size(min = 3, max = 20) String content) {
    this.content = content;
  }
}
