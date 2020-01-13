package dgs1sdt.pie.rfis;

import dgs1sdt.pie.BaseIntegrationTest;
import org.junit.Before;
import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.TestPropertySource;

import java.util.ArrayList;
import java.util.List;

import static io.restassured.RestAssured.given;
import static org.hamcrest.Matchers.equalTo;
import static org.hamcrest.Matchers.greaterThan;
import static org.junit.Assert.assertFalse;
import static org.junit.Assert.assertTrue;

@TestPropertySource(
  properties = {
    "GETS_URI_OPEN_PENDING=RfisNewOpen.xml",
    "GETS_URI_CLOSED=RfisClosed.xml",
  })
public class RfiControllerTest extends BaseIntegrationTest {

  @Autowired
  RfiController rfiController;

  @Autowired
  RfiRepository rfiRepository;

  @Before
  public void clean() {
    rfiRepository.deleteAll();
  }

  @Test
  public void getRfisDirectlyFromGETS() {
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
      .body("[0].rfiId", equalTo("DGS-1-SDT-2020-00321"))
      .body("[0].getsUrl", equalTo("http://www.google.com"))
      .body("[0].lastUpdate", equalTo("2019-11-05T14:21:21.000+0000"))
      .body("[0].status", equalTo("NEW"))
      .body("[0].customer", equalTo("633d ABW"))
      .body("[0].ltiov", equalTo("2020-11-05T14:21:21.000+0000"))
      .body("[0].country", equalTo("USA"))
      .body("[0].description", equalTo(firstDescription))
      .body("[0].priority", equalTo(-1))

      .body("[10].status", equalTo("OPEN"))
      .body("[10].priority", greaterThan(0))

      .body("[15].rfiId", equalTo("DGS-1-SDT-2020-00329"))
      .body("[15].getsUrl", equalTo("http://www.msn.com"))
      .body("[15].lastUpdate", equalTo("2018-03-16T14:21:29.000+0000"))
      .body("[15].status", equalTo("CLOSED"))
      .body("[15].customer", equalTo("1 FW"))
      .body("[15].ltiov", equalTo(null))
      .body("[15].country", equalTo("MEX"))
      .body("[15].description", equalTo(longDescription))
      .body("[15].priority", equalTo(-1))

      .body("[16].rfiId", equalTo(null));
  }

  @Test
  public void checksPriorityChangeLegality() {
    Rfi rfi1 = new Rfi();
    Rfi rfi2 = new Rfi();
    Rfi rfi3 = new Rfi();
    Rfi rfi4 = new Rfi();
    Rfi rfi5 = new Rfi();
    rfi1.setRfiId("id1");
    rfi2.setRfiId("id2");
    rfi3.setRfiId("id3");
    rfi4.setRfiId("id4");
    rfi5.setRfiId("id5");
    rfi1.setPriority(2);
    rfi2.setPriority(3);
    rfi3.setPriority(1);
    rfi4.setPriority(4);
    rfi5.setPriority(5);

    List<Rfi> rfis = new ArrayList<>();
    rfis.add(rfi1);
    rfis.add(rfi2);
    rfis.add(rfi3);
    rfis.add(rfi4);
    rfis.add(rfi5);


    rfiRepository.saveAll(rfis);



    RfiJson [] rfiJsons = {
      new RfiJson("id1", 1),
      new RfiJson("id2", 2),
      new RfiJson("id3", 3)
    };

    assertTrue(rfiController.updatePriority(rfiJsons));

    rfiJsons = new RfiJson[]{
      new RfiJson("id2", 1),
      new RfiJson("id3", 2)
    };

    assertFalse(rfiController.updatePriority(rfiJsons));

    rfiJsons = new RfiJson[]{
      new RfiJson("id4", 2),
      new RfiJson("id1", 3),
      new RfiJson("id2", 4)
    };

    assertFalse(rfiController.updatePriority(rfiJsons));

  }


}

