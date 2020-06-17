package dgs1sdt.magpie.metrics;

import lombok.Data;

import java.util.Date;

@Data
public class DateRange {
  private Date startDate;
  private Date endDate;

  public DateRange (Date startDate, Date endDate) {
    this.startDate = startDate;
    this.endDate = endDate;
  }
}
