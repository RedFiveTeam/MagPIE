package dgs1sdt.magpie.metrics;

import dgs1sdt.magpie.BaseIntegrationTest;
import dgs1sdt.magpie.metrics.cancelAddSegment.MetricCancelAddSegmentRepository;
import dgs1sdt.magpie.metrics.changeExploitDate.MetricChangeExploitDateRepository;
import dgs1sdt.magpie.metrics.changeRfi.MetricChangeRfiRepository;
import dgs1sdt.magpie.metrics.changeRfiPriority.MetricChangeRfiPriorityRepository;
import dgs1sdt.magpie.metrics.changeTarget.MetricChangeTargetRepository;
import dgs1sdt.magpie.metrics.clickGets.MetricClickGetsJson;
import dgs1sdt.magpie.metrics.clickGets.MetricClickGetsRepository;
import dgs1sdt.magpie.metrics.clickImport.MetricClickImport;
import dgs1sdt.magpie.metrics.clickImport.MetricClickImportJson;
import dgs1sdt.magpie.metrics.clickImport.MetricClickImportRepository;
import dgs1sdt.magpie.metrics.clickRefresh.MetricClickRefreshRepository;
import dgs1sdt.magpie.metrics.clickRollup.MetricClickRollup;
import dgs1sdt.magpie.metrics.clickRollup.MetricClickRollupJson;
import dgs1sdt.magpie.metrics.clickRollup.MetricClickRollupRepository;
import dgs1sdt.magpie.metrics.clickTrackNarrative.MetricClickTrackNarrative;
import dgs1sdt.magpie.metrics.clickTrackNarrative.MetricClickTrackNarrativeJson;
import dgs1sdt.magpie.metrics.clickTrackNarrative.MetricClickTrackNarrativeRepository;
import dgs1sdt.magpie.metrics.createTarget.MetricCreateTargetRepository;
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
  private MetricCreateTargetRepository metricCreateTargetRepository;

  @Autowired
  private MetricChangeTargetRepository metricChangeTargetRepository;

  @Autowired
  private MetricCancelAddSegmentRepository metricCancelAddSegmentRepository;

  @Autowired
  private MetricClickTrackNarrativeRepository metricClickTrackNarrativeRepository;

  @Autowired
  private MetricClickRollupRepository metricClickRollupRepository;

  @Autowired
  private MetricClickImportRepository metricClickImportRepository;

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
    metricClickTrackNarrativeRepository.deleteAll();
    metricClickRollupRepository.deleteAll();
    metricClickImportRepository.deleteAll();
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
      .post(MetricController.URI + "/click-refresh")
      .then()
      .statusCode(200);

    assertEquals(refreshClickCount + 1, metricClickRefreshRepository.count());
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
      .post(MetricController.URI + "/click-gets")
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
      .post(MetricController.URI + "/click-sort")
      .then()
      .statusCode(200);

    assertEquals(1, metricClickSortRepository.count());
  }

  @Test
  public void postCreatesNewCancelAddSegmentMetric() {
    given()
      .port(port)
      .contentType("application/json")
      .when()
      .post(MetricController.URI + "/cancel-add-segment/5")
      .then()
      .statusCode(200);

    assertEquals(5, metricCancelAddSegmentRepository.findAll().get(0).getTargetId());
  }

  @Test
  public void postCreatesNewClickTrackNarrativeMetric() throws Exception {
    MetricClickTrackNarrativeJson metricJson = new MetricClickTrackNarrativeJson(5, "billy.bob.joe");

    final String json = objectMapper.writeValueAsString(metricJson);

    given()
      .port(port)
      .contentType("application/json")
      .body(json)
      .when()
      .post(MetricController.URI + "/click-track-narrative")
      .then()
      .statusCode(200);

    MetricClickTrackNarrative metric = metricClickTrackNarrativeRepository.findAll().get(0);

    assertEquals(5, metric.getIxnId());
    assertEquals("billy.bob.joe", metric.getUserName());
  }

  @Test
  public void postCreatesNewClickRollupMetric() throws Exception {
    MetricClickRollupJson metricJson = new MetricClickRollupJson(5, "billy.bob.joe");

    final String json = objectMapper.writeValueAsString(metricJson);

    given()
      .port(port)
      .contentType("application/json")
      .body(json)
      .when()
      .post(MetricController.URI + "/click-rollup")
      .then()
      .statusCode(200);

    MetricClickRollup metric = metricClickRollupRepository.findAll().get(0);

    assertEquals(5, metric.getTargetId());
    assertEquals("billy.bob.joe", metric.getUserName());
  }

  @Test
  public void postCreatesNewClickImportMetric() throws Exception {
    MetricClickImportJson metricJson = new MetricClickImportJson(5, 12, "billy.bob.joe");

    final String json = objectMapper.writeValueAsString(metricJson);

    given()
      .port(port)
      .contentType("application/json")
      .body(json)
      .when()
      .post(MetricController.URI + "/click-import")
      .then()
      .statusCode(200);

    MetricClickImport metric = metricClickImportRepository.findAll().get(0);

    assertEquals(5, metric.getTargetId());
    assertEquals(12, metric.getIxnsImported());
    assertEquals("billy.bob.joe", metric.getUserName());
  }
}
