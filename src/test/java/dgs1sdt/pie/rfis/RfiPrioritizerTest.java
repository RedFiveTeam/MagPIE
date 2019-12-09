package dgs1sdt.pie.rfis;

import org.junit.Test;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Date;
import java.util.List;

import static org.hamcrest.Matchers.greaterThan;
import static org.junit.Assert.*;

public class RfiPrioritizerTest {
  @Test
  public void prioritizesOpenRfis() {
    Rfi rfi1 = new Rfi("1", "url", "OPEN", new Date(12345), "cust", new Date(), "count", "desc");
    Rfi rfi2 = new Rfi("2", "url", "OPEN", new Date(22345), "cust", new Date(), "count", "desc");
    Rfi rfi3 = new Rfi("3", "url", "OPEN", new Date(32345), "cust", new Date(), "count", "desc");
    Rfi rfi4 = new Rfi("4", "url", "OPEN", new Date(42345), "cust", new Date(), "count", "desc");
    Rfi rfi5 = new Rfi("5", "url", "OPEN", new Date(52345), "cust", new Date(), "count", "desc");
    Rfi rfi6 = new Rfi("6", "url", "CLOSED", new Date(62345), "cust", new Date(), "count", "desc");
    Rfi rfi7 = new Rfi("7", "url", "NEW", new Date(72345), "cust", new Date(), "count", "desc");
    rfi1.setPriority(1);
    List<Rfi> rfis = new ArrayList<>(Arrays.asList(rfi1, rfi2, rfi3, rfi4, rfi5, rfi6, rfi7));

    RfiPrioritizer.prioritize(rfis);

    assertEquals(-1, rfi7.getPriority());
    assertEquals(-1, rfi6.getPriority());
    assertEquals(1, rfi1.getPriority());
    assertThat(rfi2.getPriority(), greaterThan(-1));
    assertThat(rfi3.getPriority(), greaterThan(-1));
    assertThat(rfi4.getPriority(), greaterThan(-1));
    assertThat(rfi5.getPriority(), greaterThan(-1));
  }

}
