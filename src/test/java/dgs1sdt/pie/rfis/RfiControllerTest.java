package dgs1sdt.pie.rfis;

import dgs1sdt.pie.BaseIntegrationTest;
import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.TestPropertySource;

import java.util.ArrayList;
import java.util.List;

import static io.restassured.RestAssured.given;
import static org.hamcrest.Matchers.*;
import static org.junit.Assert.assertEquals;

@TestPropertySource(
  properties = {
    "GETS_URI_OPEN_PENDING=RfisNewOpen.xml",
    "GETS_URI_CLOSED=RfisClosed.xml",
  })
public class RfiControllerTest extends BaseIntegrationTest {

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

      .body("[14].rfiId", equalTo("DGS-1-SDT-2020-00329"))
      .body("[14].getsUrl", equalTo("http://www.msn.com"))
      .body("[14].lastUpdate", equalTo("2018-03-16T14:21:29.000+0000"))
      .body("[14].status", equalTo("CLOSED"))
      .body("[14].customer", equalTo("1 FW"))
      .body("[14].ltiov", equalTo(null))
      .body("[14].country", equalTo("MEX"))
      .body("[14].description", equalTo(longDescription))
      .body("[14].priority", equalTo(-1));
  }
}

