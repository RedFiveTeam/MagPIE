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
      .body("[0].rfiId", equalTo("20-00321"))
      .body("[0].getsUrl", equalTo("http://www.google.com"))
      .body("[0].lastUpdate", equalTo(1572963681))
      .body("[0].status", equalTo("NEW"))
      .body("[0].customer", equalTo("633d ABW"))
      .body("[0].ltiov", equalTo(1604586081))
      .body("[0].country", equalTo("USA"))
      .body("[14].rfiId", equalTo("20-00329"))
      .body("[14].getsUrl", equalTo("http://www.msn.com"))
      .body("[14].lastUpdate", equalTo(1521210089))
      .body("[14].status", equalTo("CLOSED"))
      .body("[14].customer", equalTo("1 FW"))
      .body("[14].ltiov", equalTo(0))
      .body("[14].country", equalTo("MEX"));
  }
}
