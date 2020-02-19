package dgs1sdt.magpie.metrics;

import dgs1sdt.magpie.BaseIntegrationTest;
import dgs1sdt.magpie.metrics.changeExploitDate.MetricChangeExploitDateRepository;
import dgs1sdt.magpie.metrics.changeRfi.MetricChangeRfiRepository;
import dgs1sdt.magpie.metrics.changeRfiPriority.MetricChangeRfiPriorityRepository;
import dgs1sdt.magpie.metrics.changeTarget.MetricChangeTargetRepository;
import dgs1sdt.magpie.metrics.clickGets.MetricClickGets;
import dgs1sdt.magpie.metrics.clickGets.MetricClickGetsJson;
import dgs1sdt.magpie.metrics.clickGets.MetricClickGetsRepository;
import dgs1sdt.magpie.metrics.clickRefresh.MetricClickRefreshRepository;
import dgs1sdt.magpie.metrics.createTarget.MetricCreateTargetRepository;
import dgs1sdt.magpie.metrics.rfiFetchTime.MetricRfiFetchTimeJson;
import dgs1sdt.magpie.metrics.rfiFetchTime.MetricRfiFetchTimeRepository;
import dgs1sdt.magpie.metrics.siteVisit.MetricSiteVisit;
import dgs1sdt.magpie.metrics.siteVisit.MetricSiteVisitRepository;
import dgs1sdt.magpie.metrics.sortClick.MetricClickSortJson;
import dgs1sdt.magpie.metrics.sortClick.MetricClickSortRepository;
import org.junit.Before;
import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.Date;

import static io.restassured.RestAssured.given;
import static org.hamcrest.Matchers.equalTo;
import static org.junit.Assert.assertEquals;

public class MetricControllerTest extends BaseIntegrationTest {
  @Autowired
  private MetricClickGetsRepository metricClickGetsRepository;

  @Autowired
  private MetricSiteVisitRepository metricSiteVisitRepository;

  @Autowired
  private MetricClickSortRepository metricClickSortRepository;

  @Autowired
  private MetricChangeRfiPriorityRepository metricChangeRfiPriorityRepository;

  @Autowired
  private MetricChangeRfiRepository metricChangeRfiRepository;

  @Autowired
  private MetricClickRefreshRepository metricClickRefreshRepository;

  @Autowired
  private MetricChangeExploitDateRepository metricChangeExploitDateRepository;

  @Autowired
  private MetricRfiFetchTimeRepository metricRfiFetchTimeRepository;

  @Autowired
  private MetricCreateTargetRepository metricCreateTargetRepository;

  @Autowired
  private MetricChangeTargetRepository metricChangeTargetRepository;

  @Before
  public void setup() {
    metricClickGetsRepository.deleteAll();
    metricSiteVisitRepository.deleteAll();
    metricClickSortRepository.deleteAll();
    metricChangeRfiPriorityRepository.deleteAll();
    metricChangeRfiRepository.deleteAll();
    metricClickRefreshRepository.deleteAll();
    metricChangeExploitDateRepository.deleteAll();
    metricCreateTargetRepository.deleteAll();
    metricChangeTargetRepository.deleteAll();
  }

  @Test
  public void postCreatesNewSiteVisit() {
    long siteVisitCount = metricSiteVisitRepository.count();
    given()
      .port(port)
      .when()
      .post(MetricController.URI + "/site-visit")
      .then()
      .statusCode(200);

    assertEquals(siteVisitCount + 1, metricSiteVisitRepository.count());
  }

  @Test
  public void getReturnsSiteVisitCount() {
    metricSiteVisitRepository.save(new MetricSiteVisit(new Date()));
    metricSiteVisitRepository.save(new MetricSiteVisit(new Date()));

    given()
      .port(port)
      .when()
      .get(MetricController.URI + "/site-visits")
      .then()
      .statusCode(200)
      .body(equalTo("2"));
  }

  @Test
  public void postCreatesNewRefreshClick() {
    long refreshClickCount = metricClickRefreshRepository.count();
    given()
      .port(port)
      .when()
      .post(MetricController.URI + "/refresh-click")
      .then()
      .statusCode(200);

    assertEquals(refreshClickCount + 1, metricClickRefreshRepository.count());
  }

  @Test
  public void getReturnsGetsClickCount() {
    metricClickGetsRepository.save(new MetricClickGets(new Date(), "OPEN", "www.google.com"));
    metricClickGetsRepository.save(new MetricClickGets(new Date(), "OPEN", "www.google.com"));
    given()
      .port(port)
      .when()
      .get(MetricController.URI + "/gets-clicks")
      .then()
      .statusCode(200)
      .body(equalTo("2"));
  }

  @Test
  public void postCreatesNewGetsClick() throws Exception {

    MetricClickGetsJson metricClickGetsJson = new MetricClickGetsJson(new Date(), "OPEN", "www.google.com");

    long getsClickCount = metricClickGetsRepository.count();

    final String json = objectMapper.writeValueAsString(metricClickGetsJson);
    given()
      .port(port)
      .contentType("application/json")
      .body(json)
      .when()
      .post(MetricController.URI + "/gets-click")
      .then()
      .statusCode(200);

    assertEquals(getsClickCount + 1, metricClickGetsRepository.count());
  }

  @Test
  public void postCreatesNewSortClick() throws Exception {

    MetricClickSortJson metricClickSortJSON = new MetricClickSortJson(new Date(), "ltiov", true);

    final String json = objectMapper.writeValueAsString(metricClickSortJSON);
    given()
      .port(port)
      .contentType("application/json")
      .body(json)
      .when()
      .post(MetricController.URI + "/sort-click")
      .then()
      .statusCode(200);

    assertEquals(1, metricClickSortRepository.count());
  }

  @Test
  public void postCreatesNewRfiFetchTimeMetric() throws Exception {
    MetricRfiFetchTimeJson metricRfiFetchTimeJson = new MetricRfiFetchTimeJson(12345L, 12350L);

    final String json = objectMapper.writeValueAsString(metricRfiFetchTimeJson);

    given()
      .port(port)
      .contentType("application/json")
      .body(json)
      .when()
      .post(MetricController.URI + "/rfi-fetch")
      .then()
      .statusCode(200);

    assertEquals(1, metricRfiFetchTimeRepository.findAll().size());


  }

//  @Test
//  public void createsNewExploitDatesChangeMetric() {
//    MetricChangeExploitDate metricChangeExploitDate1 = new MetricChangeExploitDate("20-001", null, null, new Timestamp(1), new Timestamp(2), new Timestamp(100));
//    MetricChangeExploitDate metricChangeExploitDate2 = new MetricChangeExploitDate("20-002", null, null, new Timestamp(3), new Timestamp(4), new Timestamp(100));
//
//    metricController.addRfiExploitDatesChange(metricChangeExploitDate1);
//    metricController.addRfiExploitDatesChange(metricChangeExploitDate2);
//
//    assertEquals(2, metricChangeExploitDateRepository.count());
//  }
}
