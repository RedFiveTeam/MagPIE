package dgs1sdt.project.pie.metrics;

import dgs1sdt.project.pie.BaseIntegrationTest;
import dgs1sdt.project.pie.metrics.getsclick.GETSClickJSON;
import dgs1sdt.project.pie.metrics.getsclick.GETSClicksRepository;
import dgs1sdt.project.pie.metrics.getsclick.GetsClick;
import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.Date;

import static io.restassured.RestAssured.given;
import static org.hamcrest.Matchers.equalTo;
import static org.junit.Assert.assertEquals;

public class MetricControllerTest extends BaseIntegrationTest {
  @Autowired
  private GETSClicksRepository getsClicksRepository;

  @Autowired
  private SiteVisitRepository siteVisitRepository;

  @Test
  public void postCreatesNewSiteVisit() {
    long siteVisitCount = siteVisitRepository.count();
    given()
      .port(port)
      .when()
      .post(MetricController.URI + "/site-visit")
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
      .get(MetricController.URI + "/site-visits")
      .then()
      .statusCode(200)
      .body(equalTo("2"));
  }

  @Test
  public void getReturnsGETSClickCount() {
    getsClicksRepository.save(new GetsClick(new Date(), "OPEN", "www.google.com"));
    getsClicksRepository.save(new GetsClick(new Date(), "OPEN", "www.google.com"));
    given()
      .port(port)
      .when()
      .get(MetricController.URI + "/gets-clicks")
      .then()
      .statusCode(200)
      .body(equalTo("3"));
  }

  @Test
  public void postCreatesNewGETSClick() throws Exception {

    GETSClickJSON getsClickJSON = new GETSClickJSON(new Date(), "OPEN", "www.google.com");


    long getsClickCount = getsClicksRepository.count();

    final String json = objectMapper.writeValueAsString(getsClickJSON);
    given()
      .port(port)
      .contentType("application/json")
      .body(json)
      .when()
      .post(MetricController.URI + "/gets-click")
      .then()
      .statusCode(200);

    assertEquals(getsClickCount + 1, getsClicksRepository.count());
  }


}
