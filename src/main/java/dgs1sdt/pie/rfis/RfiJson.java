package dgs1sdt.pie.rfis;

public class RfiJson {
  private String rfiId;
  private int priority;

  public RfiJson(
    String rfiId,
    int priority
  ) {
    this.rfiId = rfiId;

    this.priority = priority;
  }

  public String getRfiId() {
    return rfiId;
  }

  public void setRfiId(String rfiId) {
    this.rfiId = rfiId;
  }

  public int getPriority() {
    return priority;
  }

  public void setPriority(int priority) {
    this.priority = priority;
  }
}
