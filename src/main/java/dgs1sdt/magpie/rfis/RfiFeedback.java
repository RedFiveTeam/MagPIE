package dgs1sdt.magpie.rfis;

import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Data
@Entity
@NoArgsConstructor
@Table(name = "data_rfi_feedback")
public class RfiFeedback {
  @Id
  @GeneratedValue(strategy = GenerationType.AUTO)
  private long id;

  private String rfiNum;
  private int stars;

  public RfiFeedback(String rfiNum, int stars) {
    this.rfiNum = rfiNum;
    this.stars = stars;
  }

  public RfiFeedback(RfiFeedbackJson json) {
    this.rfiNum = json.getRfiNum();
    this.stars = json.getStars();
  }
}
