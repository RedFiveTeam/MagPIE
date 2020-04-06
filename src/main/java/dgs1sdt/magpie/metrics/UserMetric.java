package dgs1sdt.magpie.metrics;

import java.sql.Timestamp;

public abstract class UserMetric {

  private String userName;
  private Timestamp timestamp;

  public String getUserName() {
    return userName;
  }

  public void setUserName(String userName) {
    this.userName = userName;
  }

  public Timestamp getTimestamp() {
    return timestamp;
  }

  public void setTimestamp(Timestamp timestamp) {
    this.timestamp = timestamp;
  }
}
