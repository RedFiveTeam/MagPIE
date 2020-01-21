package dgs1sdt.pie.metrics;

import dgs1sdt.pie.BaseIntegrationTest;
import dgs1sdt.pie.metrics.getsclick.GetsClicksRepository;
import dgs1sdt.pie.metrics.getsclick.GetsClick;
import dgs1sdt.pie.metrics.getsclick.GetsClickJSON;
import dgs1sdt.pie.metrics.refreshclicks.RefreshClicksRepository;
import dgs1sdt.pie.metrics.rfiexploitdateschange.RfiExploitDatesChange;
import dgs1sdt.pie.metrics.rfiexploitdateschange.RfiExploitDatesChangeRepository;
import dgs1sdt.pie.metrics.rfiprioritychange.RfiPriorityChange;
import dgs1sdt.pie.metrics.rfiprioritychange.RfiPriorityChangeRepository;
import dgs1sdt.pie.metrics.rfiupdate.RfiUpdate;
import dgs1sdt.pie.metrics.rfiupdate.RfiUpdateRepository;
import dgs1sdt.pie.metrics.sitevisit.SiteVisit;
import dgs1sdt.pie.metrics.sitevisit.SiteVisitRepository;
import dgs1sdt.pie.metrics.sortclick.SortClickJson;
import dgs1sdt.pie.metrics.sortclick.SortClicksRepository;
import org.junit.Before;
import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;

import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import static io.restassured.RestAssured.given;
import static org.hamcrest.Matchers.equalTo;
import static org.junit.Assert.*;

public class MetricControllerTest extends BaseIntegrationTest {
  @Autowired
  private MetricController metricController;

  @Autowired
  private GetsClicksRepository getsClicksRepository;

  @Autowired
  private SiteVisitRepository siteVisitRepository;

  @Autowired
  private SortClicksRepository sortClicksRepository;

  @Autowired
  private RfiPriorityChangeRepository rfiPriorityChangeRepository;

  @Autowired
  private RfiUpdateRepository rfiUpdateRepository;

  @Autowired
  private RefreshClicksRepository refreshClicksRepository;

  @Autowired
  private RfiExploitDatesChangeRepository rfiExploitDatesChangeRepository;

  @Before
  public void setup() {
    getsClicksRepository.deleteAll();
    siteVisitRepository.deleteAll();
    sortClicksRepository.deleteAll();
    rfiPriorityChangeRepository.deleteAll();
    rfiUpdateRepository.deleteAll();
    refreshClicksRepository.deleteAll();
    rfiExploitDatesChangeRepository.deleteAll();
  }

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
  public void postCreatesNewRefreshClick() {
    long refreshClickCount = refreshClicksRepository.count();
    given()
      .port(port)
      .when()
      .post(MetricController.URI + "/refresh-click")
      .then()
      .statusCode(200);

    assertEquals(refreshClickCount + 1, refreshClicksRepository.count());
  }

  @Test
  public void getReturnsGetsClickCount() {
    getsClicksRepository.save(new GetsClick(new Date(), "OPEN", "www.google.com"));
    getsClicksRepository.save(new GetsClick(new Date(), "OPEN", "www.google.com"));
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

    GetsClickJSON getsClickJSON = new GetsClickJSON(new Date(), "OPEN", "www.google.com");

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

  @Test
  public void postCreatesNewSortClick() throws Exception {

    SortClickJson sortClickJSON = new SortClickJson(new Date(), "ltiov", true);

    long sortClickCount = sortClicksRepository.count();

    final String json = objectMapper.writeValueAsString(sortClickJSON);
    given()
      .port(port)
      .contentType("application/json")
      .body(json)
      .when()
      .post(MetricController.URI + "/sort-click")
      .then()
      .statusCode(200);

    assertEquals(sortClickCount + 1, sortClicksRepository.count());
  }

  @Test
  public void createsNewPriorityChangeMetric() {
    RfiPriorityChange rfiPriorityChange1 = new RfiPriorityChange("20-001", 1, 2, new Date());
    RfiPriorityChange rfiPriorityChange2 = new RfiPriorityChange("20-002", 2, 1, new Date());

    List<RfiPriorityChange> priChanges = new ArrayList<>();
    priChanges.add(rfiPriorityChange1);
    priChanges.add(rfiPriorityChange2);

    metricController.addRfiPriorityChanges(priChanges);

    assertEquals(2, rfiPriorityChangeRepository.count());
  }

  @Test
  public void createsNewRfiUpdateMetric() {
    RfiUpdate rfiUpdate1 = new RfiUpdate("20-005", new Date(), "field", "old", "new");
    RfiUpdate rfiUpdate2 = new RfiUpdate("20-005", new Date(), "field", "old", "new");

    long rfiUpdateCount = rfiUpdateRepository.count();

    metricController.addRfiUpdate(rfiUpdate1);
    metricController.addRfiUpdate(rfiUpdate2);

    assertEquals(rfiUpdateCount + 2, rfiUpdateRepository.count());
  }

  @Test
  public void getsSiteVisitsOverLast7Days() throws Exception{
    Date sixDaysAgo = new Date(new Date().getTime() - 518400000L);
    Date fourDaysAgo = new Date(new Date().getTime() - 345600000L);
    Date oneDayAgo = new Date(new Date().getTime() - 86400000L);

    List<SiteVisit> siteVisits = new ArrayList<>();
    for (int i = 0; i < 356; i++) {
      siteVisits.add(new SiteVisit(sixDaysAgo));
    }

    for (int i = 0; i < 23; i++) {
      siteVisits.add(new SiteVisit(fourDaysAgo));
    }

    for (int i = 0; i < 1; i++) {
      siteVisits.add(new SiteVisit(oneDayAgo));
    }

    for (int i = 0; i < 65; i++) {
      siteVisits.add(new SiteVisit(new Date()));
    }

    siteVisitRepository.saveAll(siteVisits);

    int[] last7DaysActual = metricController.getSiteVisitsLast7Days();
    int[] last7DaysExpected = {356, 0, 23, 0, 0, 1, 65};

    assertArrayEquals(last7DaysExpected, last7DaysActual);

  }

  @Test
  public void createsNewExploitDatesChangeMetric() {
    RfiExploitDatesChange rfiExploitDatesChange1 = new RfiExploitDatesChange("20-001", null, null, new Timestamp(1), new Timestamp(2), new Timestamp(100));
    RfiExploitDatesChange rfiExploitDatesChange2 = new RfiExploitDatesChange("20-002", null, null, new Timestamp(3), new Timestamp(4), new Timestamp(100));

    metricController.addRfiExploitDatesChange(rfiExploitDatesChange1);
    metricController.addRfiExploitDatesChange(rfiExploitDatesChange2);

    assertEquals(2, rfiExploitDatesChangeRepository.count());
  }
}
