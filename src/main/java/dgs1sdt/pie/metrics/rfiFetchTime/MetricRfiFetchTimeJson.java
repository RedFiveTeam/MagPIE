package dgs1sdt.pie.metrics.rfiFetchTime;

import lombok.Data;

@Data
public class MetricRfiFetchTimeJson {
  private long startTime;
  private long endTime;

  public long getEndTime() {
    return endTime;
  }

  public void setEnd_time(long endTime) {
    this.endTime = endTime;
  }

  public long getStartTime() {
    return startTime;
  }

  public void setStart_time(long startTime) {
    this.startTime = startTime;
  }

  public MetricRfiFetchTimeJson(long startTime, long endTime) {
    this.startTime = startTime;
    this.endTime = endTime;
  }
}
