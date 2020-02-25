package dgs1sdt.magpie.rfis;

import org.junit.Test;

public class GetsClientTest {

  @Test
  public void convertDaysBeforeNowIntoDateString(){
    System.out.println(GetsClient.calculateDateStringDaysBeforeNow(20));

  }

}