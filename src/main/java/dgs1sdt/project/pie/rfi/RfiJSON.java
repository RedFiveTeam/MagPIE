package dgs1sdt.project.pie.rfi;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class RfiJSON {


  private Long id;
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

  public RfiJSON(String priority, String rfi_id, String gets_status, String info, String customer,
                 String start, String end, String rfi_status, String exploited_coi, String tracks) {
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

  public long getId() {
    return id;
  }

  public void setId(long id) {
    this.id = id;
  }

  public String getPriority() {
    return priority;
  }

  public void setPriority(String priority) {
    this.priority = priority;
  }

  public String getRfiId() {
    return rfi_id;
  }

  public void setRfiId(String rfi_id) {
    this.rfi_id = rfi_id;
  }

  public String getGetsStatus() {
    return gets_status;
  }

  public void setGetsStatus(String gets_status) {
    this.gets_status = gets_status;
  }

  public String getInfo() {
    return info;
  }

  public void setInfo(String info) {
    this.info = info;
  }

  public String getCustomer() {
    return customer;
  }

  public void setCustomer(String customer) {
    this.customer = customer;
  }

  public String getStart() {
    return start;
  }

  public void setStart(String start) {
    this.start = start;
  }

  public String getEnd() {
    return end;
  }

  public void setEnd(String end) {
    this.end = end;
  }

  public String getRfiStatus() {
    return rfi_status;
  }

  public void setRfiStatus(String rfi_status) {
    this.rfi_status = rfi_status;
  }

  public String getExploited_coi() { return exploited_coi;}

  public void setExploited_Coi(String exploited_coi) {
    this.exploited_coi = exploited_coi;
  }

  public String getTracks() {
    return tracks;
  }

  public void setTracks(String tracks) {
    this.tracks = tracks;
  }


}
