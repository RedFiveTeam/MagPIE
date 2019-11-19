package dgs1sdt.project.pie.rfis;

import dgs1sdt.project.pie.BaseIntegrationTest;
import dgs1sdt.project.pie.rfi.RFIController;
import org.junit.Test;

import static io.restassured.RestAssured.given;
import static org.hamcrest.Matchers.equalTo;

public class RFIControllerTest extends BaseIntegrationTest {
  @Test
  public void rfiTest() {
    given()
      .port(port)
      .when()
      .get(RFIController.URI)
      .then()
      .statusCode(200)
      .body("[0].rfiId", equalTo("DGS-1-SDT-2020-00321"))
      .body("[0].getsUrl", equalTo("http://www.google.com"))
      .body("[0].lastUpdate", equalTo(1572963681))
      .body("[0].status", equalTo("NEW"))
      .body("[0].unit", equalTo("633d ABW"))
      .body("[0].ltiov", equalTo(1604586081))
      .body("[8].rfiId", equalTo("DGS-1-SDT-2020-00329"))
      .body("[8].getsUrl", equalTo("http://www.msn.com"))
      .body("[8].lastUpdate", equalTo(1521210089))
      .body("[8].status", equalTo("CLOSED"))
      .body("[8].unit", equalTo("1 FW"))
      .body("[8].ltiov", equalTo(0));
  }

}
