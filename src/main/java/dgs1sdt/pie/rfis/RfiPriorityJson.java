package dgs1sdt.pie.rfis;

public class RfiPriorityJson {
  private String rfiNum;
  private int priority;

  public RfiPriorityJson(
    String rfiNum,
    int priority
  ) {
    this.rfiNum = rfiNum;

    this.priority = priority;
  }

  public String getRfiNum() {
    return rfiNum;
  }

  public void setRfiNum(String rfiNum) {
    this.rfiNum = rfiNum;
  }

  public int getPriority() {
    return priority;
  }

  public void setPriority(int priority) {
    this.priority = priority;
  }
}
