package dgs1sdt.magpie.rfis;

import lombok.Setter;
import lombok.Getter;

@Getter
@Setter
public class RfiFeedbackJson {
  private String rfiNum;
  private int stars;

  public RfiFeedbackJson(String rfiNum, int stars) {
    this.rfiNum = rfiNum;
    this.stars = stars;
  }
}
