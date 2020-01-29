package dgs1sdt.pie.metrics;

import dgs1sdt.pie.BaseIntegrationTest;
import dgs1sdt.pie.metrics.changeExploitDate.MetricChangeExploitDateRepository;
import dgs1sdt.pie.metrics.changeRfi.MetricChangeRfi;
import dgs1sdt.pie.metrics.changeRfi.MetricChangeRfiRepository;
import dgs1sdt.pie.metrics.changeRfiPriority.MetricChangeRfiPriority;
import dgs1sdt.pie.metrics.changeRfiPriority.MetricChangeRfiPriorityRepository;
import dgs1sdt.pie.metrics.clickGets.MetricClickGets;
import dgs1sdt.pie.metrics.clickGets.MetricClickGetsJson;
import dgs1sdt.pie.metrics.clickGets.MetricClickGetsRepository;
import dgs1sdt.pie.metrics.clickRefresh.MetricClickRefreshRepository;
import dgs1sdt.pie.metrics.createTarget.MetricCreateTargetRepository;
import dgs1sdt.pie.metrics.rfiFetchTime.MetricRfiFetchTimeJson;
import dgs1sdt.pie.metrics.rfiFetchTime.MetricRfiFetchTimeRepository;
import dgs1sdt.pie.metrics.siteVisit.MetricSiteVisit;
import dgs1sdt.pie.metrics.siteVisit.MetricSiteVisitRepository;
import dgs1sdt.pie.metrics.sortClick.MetricClickSortJson;
import dgs1sdt.pie.metrics.sortClick.MetricClickSortRepository;
import dgs1sdt.pie.rfis.exploitDates.ExploitDateJson;
import dgs1sdt.pie.rfis.targets.TargetJson;
import org.junit.Before;
import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;

import java.sql.Timestamp;
import java.text.SimpleDateFormat;
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

  @Test
  public void createsNewPriorityChangeMetric() {
    MetricChangeRfiPriority metricChangeRfiPriority1 = new MetricChangeRfiPriority("20-001", 1, 2, new Date());
    MetricChangeRfiPriority metricChangeRfiPriority2 = new MetricChangeRfiPriority("20-002", 2, 1, new Date());

    List<MetricChangeRfiPriority> priChanges = new ArrayList<>();
    priChanges.add(metricChangeRfiPriority1);
    priChanges.add(metricChangeRfiPriority2);

    metricController.addChangeRfiPriority(priChanges);

    assertEquals(2, metricChangeRfiPriorityRepository.count());
  }

  @Test
  public void createsNewRfiUpdateMetric() {
    MetricChangeRfi metricChangeRfi1 = new MetricChangeRfi("20-005", new Date(), "field", "old", "new");
    MetricChangeRfi metricChangeRfi2 = new MetricChangeRfi("20-005", new Date(), "field", "old", "new");

    long rfiUpdateCount = metricChangeRfiRepository.count();

    metricController.addChangeRfi(metricChangeRfi1);
    metricController.addChangeRfi(metricChangeRfi2);

    assertEquals(rfiUpdateCount + 2, metricChangeRfiRepository.count());
  }

  @Test
  public void getsSiteVisitsOverLast7Days() throws Exception {
    Date sixDaysAgo = new Date(new Date().getTime() - 518400000L);
    Date fourDaysAgo = new Date(new Date().getTime() - 345600000L);
    Date oneDayAgo = new Date(new Date().getTime() - 86400000L);

    List<MetricSiteVisit> metricSiteVisits = new ArrayList<>();
    for (int i = 0; i < 356; i++) {
      metricSiteVisits.add(new MetricSiteVisit(sixDaysAgo));
    }

    for (int i = 0; i < 23; i++) {
      metricSiteVisits.add(new MetricSiteVisit(fourDaysAgo));
    }

    for (int i = 0; i < 1; i++) {
      metricSiteVisits.add(new MetricSiteVisit(oneDayAgo));
    }

    for (int i = 0; i < 65; i++) {
      metricSiteVisits.add(new MetricSiteVisit(new Date()));
    }

    metricSiteVisitRepository.saveAll(metricSiteVisits);

    int[] last7DaysActual = metricController.getSiteVisitsLast7Days();
    int[] last7DaysExpected = {356, 0, 23, 0, 0, 1, 65};

    assertArrayEquals(last7DaysExpected, last7DaysActual);

  }

  @Test
  public void addsExploitDateChangeMetric() throws Exception {
    ExploitDateJson exploitDateJson = new ExploitDateJson(
      null,
      new Timestamp(new SimpleDateFormat("dd/MM/yyyy").parse("11/11/2020").getTime()),
      "DGS-1-SDT-2020-00338");

    metricController.addChangeExploitDate(exploitDateJson);

    assertEquals(1, metricChangeExploitDateRepository.findAll().size());
    assertEquals(
      "2020-11-11 00:00:00.0",
      metricChangeExploitDateRepository.findAll().get(0).getNewExploitDate().toString()
    );
    assertNull(metricChangeExploitDateRepository.findAll().get(0).getOldExploitDate());
  }

  @Test
  public void addsTargetDateCreationMetric() throws Exception {
    TargetJson targetJson = new TargetJson(
      "DGS-1-SDT-2020-00338",
      new Timestamp(new SimpleDateFormat("dd/MM/yyyy").parse("11/11/2020").getTime()),
      "SDT12-123",
      "12ASD1231231231",
      "",
      ""
    );

    metricController.addCreateTarget(targetJson);

    assertEquals(1, metricCreateTargetRepository.findAll().size());
    assertEquals(
      "SDT12-123",
      metricCreateTargetRepository.findAll().get(0).getName()
    );
    assertEquals(
      "DGS-1-SDT-2020-00338",
      metricCreateTargetRepository.findAll().get(0).getRfiNum()
    );
    assertEquals(
      "2020-11-11 00:00:00.0",
      metricCreateTargetRepository.findAll().get(0).getExploitDate().toString()
    );

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
