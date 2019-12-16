package dgs1sdt.pie.metrics.rfifetch;

import lombok.Data;

@Data
public class RfiFetchJson {
  private long startTime;
  private long endTime;

  public long getEnd_time() {
    return endTime;
  }

  public void setEnd_time(long endTime) {
    this.endTime = endTime;
  }

  public long getStart_time() {
    return startTime;
  }

  public void setStart_time(long startTime) {
    this.startTime = startTime;
  }

  public RfiFetchJson(long startTime, long endTime) {
    this.startTime = startTime;
    this.endTime = endTime;
  }
}
