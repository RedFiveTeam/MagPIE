package dgs1sdt.pie.rfis;

import org.junit.Test;

import static org.junit.Assert.*;

public class GetsClientTest {

  @Test
  public void convertDaysBeforeNowIntoDateString(){
    System.out.println(GetsClient.calculateDateStringDaysBeforeNow(20));

  }

}