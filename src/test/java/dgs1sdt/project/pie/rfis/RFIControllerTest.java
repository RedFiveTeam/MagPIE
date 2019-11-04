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
      .body("[0].rfiId", equalTo("2019-00111"))
      .body("[0].getsUrl", equalTo("http://www.google.com"))
      .body("[1].rfiId", equalTo("2020-00222"))
      .body("[1].getsUrl", equalTo("http://www.yahoo.com"));
  }
}
