package dgs1sdt.pie.rfis;

import dgs1sdt.pie.BaseIntegrationTest;
import org.junit.Before;
import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.TestPropertySource;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import static io.restassured.RestAssured.given;
import static org.hamcrest.Matchers.equalTo;
import static org.hamcrest.Matchers.greaterThan;
import static org.junit.Assert.*;

// Prevent duplicate RFIs from race condition between rfiService.fetchRfisFromUris(files) in getRfisDirectlyFromGETS()
// test and scheduled function fetchRfisFromGets()
@TestPropertySource(
  properties = {
    "GETS_URI_OPEN_PENDING=",
    "GETS_URI_CLOSED=",
  })
public class RfiControllerTest extends BaseIntegrationTest {

  @Autowired
  RfiController rfiController;

  @Autowired
  RfiRepository rfiRepository;

  @Autowired
  RfiService rfiService;

  @Autowired
  public void setRfiRepository(RfiRepository rfiRepository) {
    this.rfiRepository = rfiRepository;
  }

  @Autowired
  public void setRfiController(RfiController rfiController) {
    this.rfiController = rfiController;
  }

  @Autowired
  public void setRfiService(RfiService rfiService) {
    this.rfiService = rfiService;
  }

  @Before
  public void clean() {
    rfiRepository.deleteAll();
  }

  @Test
  public void getRfisDirectlyFromGETS() {
    String[] files = {
      "RfisNewOpen.xml",
      "RfisClosed.xml"
    };
    rfiService.fetchRfisFromUris(files);

    String firstDescription = "hi";
    String longDescription = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor " +
      "incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco " +
      "laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit " +
      "esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui" +
      " officia deserunt mollit anim id est laborum.";

    given()
      .port(port)
      .when()
      .get(RfiController.URI)
      .then()
      .statusCode(200)
      .body("[2].rfiId", equalTo("DGS-1-SDT-2020-00321"))
      .body("[2].getsUrl", equalTo("http://www.google.com"))
      .body("[2].lastUpdate", equalTo("2019-11-05T14:21:21.000+0000"))
      .body("[2].status", equalTo("NEW"))
      .body("[2].customer", equalTo("633d ABW"))
      .body("[2].ltiov", equalTo("2020-11-05T14:21:21.000+0000"))
      .body("[2].country", equalTo("USA"))
      .body("[2].description", equalTo(firstDescription))
      .body("[2].priority", equalTo(-1))

      .body("[5].status", equalTo("OPEN"))
      .body("[5].priority", greaterThan(0))

      .body("[9].rfiId", equalTo("DGS-1-SDT-2020-00329"))
      .body("[9].status", equalTo("CLOSED"))
      .body("[9].description", equalTo(longDescription))
      .body("[9].priority", equalTo(-1))

      .body("[15].rfiId", equalTo("DGS-1-SDT-2020-00338"))
      .body("[15].getsUrl", equalTo("http://www.google.com"))
      .body("[15].lastUpdate", equalTo("2019-10-16T20:21:26.000+0000"))
      .body("[15].status", equalTo("OPEN"))
      .body("[15].customer", equalTo("1 FW"))
      .body("[15].ltiov", equalTo(null))
      .body("[15].country", equalTo("CAN"))

      .body("[16].rfiId", equalTo(null));

    System.out.println();
  }

  @Test
  public void checksPriorityChangeLegality() {
    Rfi rfi2 = new Rfi("id2", "", "OPEN", new Date(), "", new Date(), "", "", 1);
    Rfi rfi3 = new Rfi("id3", "", "OPEN", new Date(), "", new Date(), "", "", 2);
    Rfi rfi1 = new Rfi("id1", "", "OPEN", new Date(), "", new Date(), "", "", 3);

    Rfi rfi4 = new Rfi("id4", "", "OPEN", new Date(), "", new Date(), "", "", 4);
    Rfi rfi5 = new Rfi("id5", "", "OPEN", new Date(), "", new Date(), "", "", 5);
    Rfi rfi6 = new Rfi("id6", "", "CLOSED", new Date(), "", new Date(), "", "", 3);

    List<Rfi> rfis = new ArrayList<>();
    rfis.add(rfi1);
    rfis.add(rfi2);
    rfis.add(rfi3);
    rfis.add(rfi4);
    rfis.add(rfi5);
    rfis.add(rfi6);

    rfiRepository.saveAll(rfis);

    RfiJson [] rfiJsons = {
      new RfiJson("id1", 1),
      new RfiJson("id2", 2),
      new RfiJson("id3", 3)
    };

    assertTrue(rfiController.updatePriority(rfiJsons));
    assertEquals(1, rfiRepository.findByRfiId("id1").getPriority());

    rfiJsons = new RfiJson[]{
      new RfiJson("id1", 2),
      new RfiJson("id3", 3)
    };

    assertFalse(rfiController.updatePriority(rfiJsons));
    assertEquals(1, rfiRepository.findByRfiId("id1").getPriority());
    assertEquals(3, rfiRepository.findByRfiId("id3").getPriority());

    rfiJsons = new RfiJson[]{
      new RfiJson("id4", 2),
      new RfiJson("id3", 3),
      new RfiJson("id1", 4)
    };

    assertFalse(rfiController.updatePriority(rfiJsons));
    assertEquals(1, rfiRepository.findByRfiId("id1").getPriority());
    assertEquals(2, rfiRepository.findByRfiId("id2").getPriority());
    assertEquals(3, rfiRepository.findByRfiId("id3").getPriority());
    assertEquals(4, rfiRepository.findByRfiId("id4").getPriority());

  }


}

