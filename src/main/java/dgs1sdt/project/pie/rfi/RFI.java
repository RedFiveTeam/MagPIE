package dgs1sdt.project.pie.rfi;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class RFI {
  @Id
  @GeneratedValue(strategy = GenerationType.AUTO)
  private long id;
  private String getsUrl;
  private String rfiId;

  public RFI(String rfiId, String getsUrl) {
    this.getsUrl = getsUrl;
    this.rfiId = rfiId;
  }
}
