package dgs1sdt.project.pie.metrics;

import dgs1sdt.project.pie.BaseIntegrationTest;
import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.Date;

import static io.restassured.RestAssured.given;
import static org.hamcrest.Matchers.equalTo;
import static org.junit.Assert.assertEquals;

public class SiteVisitControllerTest extends BaseIntegrationTest {
  @Autowired
  private SiteVisitRepository siteVisitRepository;

  @Test
  public void postCreatesNewSiteVisit() {
    Long siteVisitCount = siteVisitRepository.count();
    given()
      .port(port)
      .when()
      .post(SiteVisitController.URI)
      .then()
      .statusCode(200);

    assertEquals(siteVisitCount + 1, siteVisitRepository.count());
  }

  @Test
  public void getReturnsSiteVisitCount() {
    siteVisitRepository.save(new SiteVisit(new Date()));
    siteVisitRepository.save(new SiteVisit(new Date()));

    given()
      .port(port)
      .when()
      .get(SiteVisitController.URI)
      .then()
      .statusCode(200)
      .body(equalTo("2"));
  }
}
