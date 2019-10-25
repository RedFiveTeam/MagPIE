package dgs1sdt.project.pie.rfi;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import javax.validation.constraints.Size;

@Data
@Entity
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "rfi")

public class RfiModel {
  @Id
  @GeneratedValue(strategy = GenerationType.AUTO)
  private long id;
  @Size(min = 1, max = 20)
  private String priority;
  private String rfi_id;
  private String gets_status;
  private String info;
  private String customer;
  private String start;
  private String end;
  private String rfi_status;
  private String exploited_coi;
  private String tracks;

  public RfiModel(@Size(min = 1, max = 20) String priority, String rfi_id, String gets_status, String info, String customer
    , String start, String end, String rfi_status, String exploited_coi, String tracks) {
    this.priority = priority;
    this.rfi_id = rfi_id;
    this.gets_status = gets_status;
    this.info = info;
    this.customer = customer;
    this.start = start;
    this.end = end;
    this.rfi_status = rfi_status;
    this.exploited_coi = exploited_coi;
    this.tracks = tracks;
  }

  public RfiModel update(RfiJSON json) {
    this.setId(json.getId());
    this.setPriority(json.getPriority());
    this.setRfi_id(json.getRfi_id());
    this.setGets_status(json.getGets_status());
    this.setInfo(json.getInfo());
    this.setCustomer(json.getCustomer());
    this.setStart(json.getStart());
    this.setEnd(json.getEnd());
    this.setRfi_status(json.getRfi_status());
    this.setExploited_coi(json.getExploited_coi());
    this.setTracks(json.getTracks());
    return this;
  }
}
