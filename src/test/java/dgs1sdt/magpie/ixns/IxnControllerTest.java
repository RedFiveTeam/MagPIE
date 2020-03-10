package dgs1sdt.magpie.ixns;

import dgs1sdt.magpie.BaseIntegrationTest;
import dgs1sdt.magpie.metrics.changeIxn.MetricChangeIxn;
import dgs1sdt.magpie.metrics.changeIxn.MetricChangeIxnRepository;
import dgs1sdt.magpie.metrics.changeSegment.MetricChangeSegment;
import dgs1sdt.magpie.metrics.changeSegment.MetricChangeSegmentRepository;
import dgs1sdt.magpie.metrics.createIxn.MetricCreateIxn;
import dgs1sdt.magpie.metrics.createIxn.MetricCreateIxnRepository;
import dgs1sdt.magpie.metrics.createSegment.MetricCreateSegment;
import dgs1sdt.magpie.metrics.createSegment.MetricCreateSegmentRepository;
import dgs1sdt.magpie.metrics.deleteIxn.MetricDeleteIxn;
import dgs1sdt.magpie.metrics.deleteIxn.MetricDeleteIxnRepository;
import dgs1sdt.magpie.metrics.deleteSegment.MetricDeleteSegment;
import dgs1sdt.magpie.metrics.deleteSegment.MetricDeleteSegmentRepository;
import dgs1sdt.magpie.rfis.Rfi;
import dgs1sdt.magpie.rfis.RfiRepository;
import dgs1sdt.magpie.tgts.Target;
import dgs1sdt.magpie.tgts.TargetJson;
import dgs1sdt.magpie.tgts.TargetRepository;
import dgs1sdt.magpie.tgts.exploitDates.ExploitDate;
import dgs1sdt.magpie.tgts.exploitDates.ExploitDateRepository;
import org.junit.Before;
import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;

import java.sql.Timestamp;
import java.util.Date;

import static io.restassured.RestAssured.given;
import static org.hamcrest.Matchers.equalTo;
import static org.junit.Assert.*;

public class IxnControllerTest extends BaseIntegrationTest {
  @Autowired
  RfiRepository rfiRepository;
  @Autowired
  ExploitDateRepository exploitDateRepository;
  @Autowired
  TargetRepository targetRepository;
  @Autowired
  SegmentRepository segmentRepository;
  @Autowired
  IxnRepository ixnRepository;
  @Autowired
  MetricCreateSegmentRepository metricCreateSegmentRepository;
  @Autowired
  MetricCreateIxnRepository metricCreateIxnRepository;
  @Autowired
  MetricDeleteIxnRepository metricDeleteIxnRepository;
  @Autowired
  MetricDeleteSegmentRepository metricDeleteSegmentRepository;
  @Autowired
  MetricChangeSegmentRepository metricChangeSegmentRepository;
  @Autowired
  MetricChangeIxnRepository metricChangeIxnRepository;

  @Before
  public void clean() {
    rfiRepository.deleteAll();
    exploitDateRepository.deleteAll();
    targetRepository.deleteAll();
    segmentRepository.deleteAll();
    ixnRepository.deleteAll();
    metricCreateSegmentRepository.deleteAll();
    metricCreateIxnRepository.deleteAll();
    metricDeleteIxnRepository.deleteAll();
    metricDeleteSegmentRepository.deleteAll();
    metricChangeSegmentRepository.deleteAll();
    metricChangeIxnRepository.deleteAll();
  }

  @Test
  public void addsSegments() {
    rfiRepository.save(new Rfi("DGS-1-SDT-2020-00338", "", "", new Date(), "", new Date(), "", ""));
    long rfiId = rfiRepository.findByRfiNum("DGS-1-SDT-2020-00338").getId();
    Date exploitDate = new Date(0);
    exploitDateRepository.save(new ExploitDate(exploitDate, rfiId));
    long exploitDateId = exploitDateRepository.findAll().get(0).getId();
    targetRepository.save(new Target(new TargetJson(rfiId, exploitDateId, "SDT12-123", "12WQE1231231231", "", "")));
    long targetId = targetRepository.findAll().get(0).getId();

    String segmentJsonString = "{" +
      "\"id\":null," +
      "\"rfiId\":" + rfiId +
      ",\"exploitDateId\":" + exploitDateId +
      ",\"targetId\":" + targetId +
      ",\"startTime\":\"1970-01-01T12:34:56.000Z\"" +
      ",\"endTime\":\"1970-01-01T13:02:00.000Z\"" +
      "}";

    given()
      .port(port)
      .header("Content-Type", "application/json")
      .body(segmentJsonString)
      .when()
      .post(IxnController.URI + "/segment/post")
      .then()
      .statusCode(200);

    assertEquals(1, segmentRepository.findAll().size());
    assertEquals(1, metricCreateSegmentRepository.findAll().size());

    Segment segment = segmentRepository.findAll().get(0);

    assertEquals(rfiId, segment.getRfiId());
    assertEquals(exploitDateId, segment.getExploitDateId());
    assertEquals(targetId, segment.getTargetId());
    assertEquals("1970-01-01 12:34:56.0", segment.getStartTime().toString());
    assertEquals("1970-01-01 13:02:00.0", segment.getEndTime().toString());

    MetricCreateSegment metric = metricCreateSegmentRepository.findAll().get(0);

    assertEquals(rfiId, metric.getRfiId());
    assertEquals(exploitDateId, metric.getExploitDateId());
    assertEquals(targetId, metric.getTargetId());
    assertEquals(segment.getId(), metric.getSegmentId());
    assertEquals("1970-01-01 12:34:56.0", metric.getSegmentStart().toString());
    assertEquals("1970-01-01 13:02:00.0", metric.getSegmentEnd().toString());
  }

  @Test
  public void getsSegments() {
    rfiRepository.save(new Rfi("DGS-1-SDT-2020-00338", "", "", new Date(), "", new Date(), "", ""));
    long rfiId = rfiRepository.findByRfiNum("DGS-1-SDT-2020-00338").getId();
    exploitDateRepository.save(new ExploitDate(new Date(), rfiId));
    long exploitDateId = exploitDateRepository.findAll().get(0).getId();
    targetRepository.save(new Target(new TargetJson(rfiId, exploitDateId, "SDT12-123", "12WQE1231231231", "", "")));
    long targetId = targetRepository.findAll().get(0).getId();
    segmentRepository.save(new Segment(new SegmentJson(rfiId, exploitDateId, targetId,
      new Timestamp(
        (12 * 3600 + //HH
          30 * 60 + //MM
          10) * //SS
          1000 //milliseconds
      ),
      new Timestamp(
        (15 * 3600 + //HH
          45 * 60 + //MM
          30) * //SS
          1000 //milliseconds
      )
    )));
    segmentRepository.save(new Segment(new SegmentJson(rfiId, exploitDateId, targetId,
      new Timestamp(
        (5 * 3600 + //HH
          15 * 60 + //MM
          15) * //SS
          1000 //milliseconds
      ),
      new Timestamp(
        (9 * 3600 + //HH
          30 * 60 + //MM
          45) * //SS
          1000 //milliseconds
      )
    )));

    given()
      .port(port)
      .header("Content-Type", "application/json")
      .when()
      .get(IxnController.URI + "/segment/" + targetId)
      .then()
      .statusCode(200)
      .body("[0].startTime", equalTo("1970-01-01T05:15:15.000+0000"))
      .body("[0].endTime", equalTo("1970-01-01T09:30:45.000+0000"))
      .body("[1].startTime", equalTo("1970-01-01T12:30:10.000+0000"))
      .body("[1].endTime", equalTo("1970-01-01T15:45:30.000+0000"));
  }

  @Test
  public void addsInteractions() {
    rfiRepository.save(new Rfi("DGS-1-SDT-2020-00338", "", "", new Date(), "", new Date(), "", ""));
    long rfiId = rfiRepository.findByRfiNum("DGS-1-SDT-2020-00338").getId();
    Date exploitDate = new Date(0);
    exploitDateRepository.save(new ExploitDate(exploitDate, rfiId));
    long exploitDateId = exploitDateRepository.findAll().get(0).getId();
    targetRepository.save(new Target(new TargetJson(rfiId, exploitDateId, "SDT12-123", "12WQE1231231231", "", "")));
    long targetId = targetRepository.findAll().get(0).getId();
    segmentRepository.save(new Segment(new SegmentJson(rfiId, exploitDateId, targetId,
      new Timestamp(
        (12 * 3600 + //HH
          10 * 60 + // MM
          10 // SS
        ) * 1000 // Milliseconds

      ),
      new Timestamp(
        (12 * 3600 + //HH
          30 * 60 + // MM
          45 // SS
        ) * 1000 // Milliseconds
      )
    )));
    long segmentId = segmentRepository.findAll().get(0).getId();

    String ixnJsonString = "{" +
      "\"rfiId\":" + rfiId +
      ",\"exploitDateId\":" + exploitDateId +
      ",\"targetId\":" + targetId +
      ",\"segmentId\":" + segmentId +
      ",\"exploitAnalyst\":\"Billy Bob\"" +
      ",\"time\":\"1970-01-01T12:10:55.000Z\"" +
      ",\"activity\":\"Person entered building from right\"" +
      ",\"track\":\"123-234\"" +
      ",\"trackAnalyst\":\"Billy Joe\"" +
      ",\"status\":\"NOT_STARTED\"" +
      ",\"leadChecker\":\"\"" +
      ",\"finalChecker\":\"\"" +
      "}";

    given()
      .port(port)
      .header("Content-Type", "application/json")
      .body(ixnJsonString)
      .when()
      .post(IxnController.URI + "/post")
      .then()
      .statusCode(200);

    assertEquals(1, ixnRepository.findAll().size());

    Ixn ixn = ixnRepository.findAll().get(0);

    assertEquals("Billy Bob", ixn.getExploitAnalyst());
    assertEquals("1970-01-01 12:10:55.0", ixn.getTime().toString());
    assertEquals("Person entered building from right", ixn.getActivity());
    assertEquals("123-234", ixn.getTrack());
    assertEquals("Billy Joe", ixn.getTrackAnalyst());
    assertEquals("NOT_STARTED", ixn.getStatus());
    assertEquals("", ixn.getLeadChecker());
    assertEquals("", ixn.getFinalChecker());


    assertEquals(1, metricCreateIxnRepository.findAll().size());

    MetricCreateIxn metric = metricCreateIxnRepository.findAll().get(0);

    assertEquals(rfiId, metric.getRfiId());
    assertEquals(exploitDateId, metric.getExploitDateId());
    assertEquals(targetId, metric.getTargetId());
    assertEquals(segmentId, metric.getSegmentId());
    assertEquals(ixn.getId(), metric.getIxnId());
  }

  @Test
  public void getsIxns() {
    rfiRepository.save(new Rfi("DGS-1-SDT-2020-00338", "", "", new Date(), "", new Date(), "", ""));
    long rfiId = rfiRepository.findByRfiNum("DGS-1-SDT-2020-00338").getId();
    Date exploitDate = new Date(0);
    exploitDateRepository.save(new ExploitDate(exploitDate, rfiId));
    long exploitDateId = exploitDateRepository.findAll().get(0).getId();
    targetRepository.save(new Target(new TargetJson(rfiId, exploitDateId, "SDT12-123", "12WQE1231231231", "", "")));
    long targetId = targetRepository.findAll().get(0).getId();
    segmentRepository.save(new Segment(new SegmentJson(rfiId, exploitDateId, targetId,
      new Timestamp(
        (12 * 3600 + //HH
          10 * 60 + // MM
          10 // SS
        ) * 1000 // Milliseconds
      ),
      new Timestamp(
        (12 * 3600 + //HH
          30 * 60 + // MM
          45 // SS
        ) * 1000 // Milliseconds
      )
    )));
    long segmentId = segmentRepository.findAll().get(0).getId();

    ixnRepository.save(new Ixn(rfiId, exploitDateId, targetId, segmentId,
      "Billy Bob",
      new Timestamp(
        (12 * 3600 + //HH
          15 * 60 + // MM
          55 // SS
        ) * 1000 // Milliseconds
      ),
      "",
      "",
      "",
      "NOT_STARTED",
      "",
      ""
    ));

    ixnRepository.save(new Ixn(rfiId, exploitDateId, targetId, segmentId,
      "",
      new Timestamp(
        (12 * 3600 + //HH
          15 * 60 + // MM
          10 // SS
        ) * 1000 // Milliseconds
      ),
      "Person entered vehicle",
      "123-234",
      "",
      "NOT_STARTED",
      "",
      ""
    ));

    given()
      .port(port)
      .header("Content-Type", "application/json")
      .when()
      .get(IxnController.URI + "/" + targetId)
      .then()
      .statusCode(200)
      .body("[0].exploitAnalyst", equalTo(""))
      .body("[0].time", equalTo("1970-01-01T12:15:10.000+0000"))
      .body("[0].activity", equalTo("Person entered vehicle"))
      .body("[0].track", equalTo("123-234"))
      .body("[1].exploitAnalyst", equalTo("Billy Bob"))
      .body("[1].time", equalTo("1970-01-01T12:15:55.000+0000"))
      .body("[1].activity", equalTo(""))
      .body("[1].track", equalTo(""));
  }

  @Test
  public void deletesIxns() {
    rfiRepository.save(new Rfi("DGS-1-SDT-2020-00338", "", "", new Date(), "", new Date(), "", ""));
    long rfiId = rfiRepository.findByRfiNum("DGS-1-SDT-2020-00338").getId();
    Date exploitDate = new Date(0);
    exploitDateRepository.save(new ExploitDate(exploitDate, rfiId));
    long exploitDateId = exploitDateRepository.findAll().get(0).getId();
    targetRepository.save(new Target(new TargetJson(rfiId, exploitDateId, "SDT12-123", "12WQE1231231231", "", "")));
    long targetId = targetRepository.findAll().get(0).getId();
    segmentRepository.save(new Segment(new SegmentJson(rfiId, exploitDateId, targetId,
      new Timestamp(
        (12 * 3600 + //HH
          10 * 60 + // MM
          10 // SS
        ) * 1000 // Milliseconds
      ),
      new Timestamp(
        (12 * 3600 + //HH
          30 * 60 + // MM
          45 // SS
        ) * 1000 // Milliseconds
      )
    )));
    long segmentId = segmentRepository.findAll().get(0).getId();

    ixnRepository.save(new Ixn(rfiId, exploitDateId, targetId, segmentId,
      "Billy Bob",
      new Timestamp(
        (12 * 3600 + //HH
          15 * 60 + // MM
          55 // SS
        ) * 1000 // Milliseconds
      ),
      "",
      "",
      "",
      "NOT_STARTED",
      "",
      ""
    ));

    ixnRepository.save(new Ixn(rfiId, exploitDateId, targetId, segmentId,
      "",
      new Timestamp(
        (12 * 3600 + //HH
          15 * 60 + // MM
          10 // SS
        ) * 1000 // Milliseconds
      ),
      "Person entered vehicle",
      "123-234",
      "",
      "NOT_STARTED",
      "",
      ""
    ));

    long ixnId = ixnRepository.findAll().get(0).getId();

    given()
      .port(port)
      .header("Content-Type", "application/json")
      .when()
      .delete(IxnController.URI + "/" + ixnId)
      .then()
      .statusCode(200);

    assertEquals(1, ixnRepository.findAll().size());

    assertEquals(1, metricDeleteIxnRepository.findAll().size());

    assertEquals(ixnId, metricDeleteIxnRepository.findAll().get(0).getIxnId());
  }

  @Test
  public void deletesSegmentinos() {
    rfiRepository.save(new Rfi("DGS-1-SDT-2020-00338", "", "", new Date(), "", new Date(), "", ""));
    long rfiId = rfiRepository.findByRfiNum("DGS-1-SDT-2020-00338").getId();
    Date exploitDate = new Date(0);
    exploitDateRepository.save(new ExploitDate(exploitDate, rfiId));
    long exploitDateId = exploitDateRepository.findAll().get(0).getId();
    targetRepository.save(new Target(new TargetJson(rfiId, exploitDateId, "SDT12-123", "12WQE1231231231", "", "")));
    long targetId = targetRepository.findAll().get(0).getId();
    segmentRepository.save(new Segment(new SegmentJson(rfiId, exploitDateId, targetId,
      new Timestamp(
        (12 * 3600 + //HH
          10 * 60 + // MM
          10 // SS
        ) * 1000 // Milliseconds
      ),
      new Timestamp(
        (12 * 3600 + //HH
          30 * 60 + // MM
          45 // SS
        ) * 1000 // Milliseconds
      )
    )));
    long segmentId = segmentRepository.findAll().get(0).getId();

    ixnRepository.save(new Ixn(rfiId, exploitDateId, targetId, segmentId,
      "Billy Bob",
      new Timestamp(
        (12 * 3600 + //HH
          15 * 60 + // MM
          55 // SS
        ) * 1000 // Milliseconds
      ),
      "",
      "",
      "",
      "NOT_STARTED",
      "",
      ""
    ));

    ixnRepository.save(new Ixn(rfiId, exploitDateId, targetId, segmentId,
      "",
      new Timestamp(
        (12 * 3600 + //HH
          15 * 60 + // MM
          10 // SS
        ) * 1000 // Milliseconds
      ),
      "Person entered vehicle",
      "123-234",
      "",
      "NOT_STARTED",
      "",
      ""
    ));

    assertEquals(1, segmentRepository.findAll().size());
    assertEquals(2, ixnRepository.findAll().size());

    given()
      .port(port)
      .header("Content-Type", "application/json")
      .when()
      .delete(IxnController.URI + "/segment/" + segmentId)
      .then()
      .statusCode(200);

    assertEquals(0, segmentRepository.findAll().size());
    assertEquals(0, ixnRepository.findAll().size());

    assertEquals(1, metricDeleteSegmentRepository.findAll().size());

    MetricDeleteSegment metric = metricDeleteSegmentRepository.findAll().get(0);

    assertEquals(segmentId, metric.getSegmentId());
    assertTrue(metric.isHadIxns());

    segmentRepository.save(new Segment(new SegmentJson(rfiId, exploitDateId, targetId,
      new Timestamp(
        (12 * 3600 + //HH
          10 * 60 + // MM
          10 // SS
        ) * 1000 // Milliseconds
      ),
      new Timestamp(
        (12 * 3600 + //HH
          30 * 60 + // MM
          45 // SS
        ) * 1000 // Milliseconds
      )
    )));

    segmentId = segmentRepository.findAll().get(0).getId();

    given()
      .port(port)
      .header("Content-Type", "application/json")
      .when()
      .delete(IxnController.URI + "/segment/" + segmentId)
      .then()
      .statusCode(200);

    assertEquals(2, metricDeleteSegmentRepository.findAll().size());

    metric = metricDeleteSegmentRepository.findAll().get(1);

    assertFalse(metric.isHadIxns());
  }

  @Test
  public void editsSegments() {
    rfiRepository.save(new Rfi("DGS-1-SDT-2020-00338", "", "", new Date(), "", new Date(), "", ""));
    long rfiId = rfiRepository.findByRfiNum("DGS-1-SDT-2020-00338").getId();
    Date exploitDate = new Date(0);
    exploitDateRepository.save(new ExploitDate(exploitDate, rfiId));
    long exploitDateId = exploitDateRepository.findAll().get(0).getId();
    targetRepository.save(new Target(new TargetJson(rfiId, exploitDateId, "SDT12-123", "12WQE1231231231", "", "")));
    long targetId = targetRepository.findAll().get(0).getId();
    segmentRepository.save(new Segment(new SegmentJson(rfiId, exploitDateId, targetId,
      new Timestamp(
        (12 * 3600 + //HH
          10 * 60 + // MM
          10 // SS
        ) * 1000 // Milliseconds
      ),
      new Timestamp(
        (12 * 3600 + //HH
          30 * 60 + // MM
          45 // SS
        ) * 1000 // Milliseconds
      )
    )));
    long segmentId = segmentRepository.findAll().get(0).getId();

    ixnRepository.save(new Ixn(rfiId, exploitDateId, targetId, segmentId,
      "Billy Bob",
      new Timestamp(
        (12 * 3600 + //HH
          15 * 60 + // MM
          55 // SS
        ) * 1000 // Milliseconds
      ),
      "",
      "",
      "",
      "NOT_STARTED",
      "",
      ""
    ));

    ixnRepository.save(new Ixn(rfiId, exploitDateId, targetId, segmentId,
      "",
      new Timestamp(
        (12 * 3600 + //HH
          15 * 60 + // MM
          10 // SS
        ) * 1000 // Milliseconds
      ),
      "Person entered vehicle",
      "123-234",
      "",
      "NOT_STARTED",
      "",
      ""
    ));

    String segmentJsonString = "{" +
      "\"id\":" + segmentId +
      ",\"rfiId\":" + rfiId +
      ",\"exploitDateId\":" + exploitDateId +
      ",\"targetId\":" + targetId +
      ",\"startTime\":\"1970-01-01T12:30:00.000Z\"" +
      ",\"endTime\":\"1970-01-01T15:15:30.000Z\"" +
      "}";

    given()
      .port(port)
      .header("Content-Type", "application/json")
      .body(segmentJsonString)
      .when()
      .post(IxnController.URI + "/segment/post")
      .then()
      .statusCode(200);

    assertEquals(1, segmentRepository.findAll().size());
    Segment segment = segmentRepository.findAll().get(0);

    assertEquals(rfiId, segment.getRfiId());
    assertEquals(exploitDateId, segment.getExploitDateId());
    assertEquals(targetId, segment.getTargetId());
    assertEquals("1970-01-01 12:30:00.0", segment.getStartTime().toString());
    assertEquals("1970-01-01 15:15:30.0", segment.getEndTime().toString());

    assertEquals(1, metricChangeSegmentRepository.findAll().size());
    MetricChangeSegment metric = metricChangeSegmentRepository.findAll().get(0);

    assertEquals(segmentId, metric.getSegmentId());
    assertEquals("1970-01-01 12:30:00.0", metric.getNewSegmentStart().toString());
    assertEquals("1970-01-01 15:15:30.0", metric.getNewSegmentEnd().toString());
  }

  @Test
  public void editIxns() {
    rfiRepository.save(new Rfi("DGS-1-SDT-2020-00338", "", "", new Date(), "", new Date(), "", ""));
    long rfiId = rfiRepository.findByRfiNum("DGS-1-SDT-2020-00338").getId();
    Date exploitDate = new Date(0);
    exploitDateRepository.save(new ExploitDate(exploitDate, rfiId));
    long exploitDateId = exploitDateRepository.findAll().get(0).getId();
    targetRepository.save(new Target(new TargetJson(rfiId, exploitDateId, "SDT12-123", "12WQE1231231231", "", "")));
    long targetId = targetRepository.findAll().get(0).getId();
    segmentRepository.save(new Segment(new SegmentJson(rfiId, exploitDateId, targetId,
      new Timestamp(
        (12 * 3600 + //HH
          10 * 60 + // MM
          10 // SS
        ) * 1000 // Milliseconds
      ),
      new Timestamp(
        (12 * 3600 + //HH
          30 * 60 + // MM
          45 // SS
        ) * 1000 // Milliseconds
      )
    )));
    long segmentId = segmentRepository.findAll().get(0).getId();

    ixnRepository.save(new Ixn(rfiId, exploitDateId, targetId, segmentId,
      "Billy Bob",
      new Timestamp(
        (12 * 3600 + //HH
          15 * 60 + // MM
          55 // SS
        ) * 1000 // Milliseconds
      ),
      "Person entered building from right",
      "123-234",
      "",
      "NOT_STARTED",
      "",
      ""
    ));

    long ixnId = ixnRepository.findAll().get(0).getId();

    String ixnJsonString = "{" +
      "\"id\":" + ixnId +
      ",\"rfiId\":" + rfiId +
      ",\"exploitDateId\":" + exploitDateId +
      ",\"targetId\":" + targetId +
      ",\"segmentId\":" + segmentId +
      ",\"exploitAnalyst\":\"William Robert\"" +
      ",\"time\":\"1970-01-01T12:15:55.000Z\"" +
      ",\"activity\":\"Person entered building from right side\"" +
      ",\"track\":\"123-345\"" +
      ",\"trackAnalyst\":\"William Joseph\"" +
      ",\"status\":\"NOT_STARTED\"" +
      ",\"leadChecker\":\"\"" +
      ",\"finalChecker\":\"\"" +
      "}";

    given()
      .port(port)
      .header("Content-Type", "application/json")
      .body(ixnJsonString)
      .when()
      .post(IxnController.URI + "/post")
      .then()
      .statusCode(200);

    assertEquals(1, ixnRepository.findAll().size());

    Ixn ixn = ixnRepository.findAll().get(0);

    assertEquals("William Robert", ixn.getExploitAnalyst());
    assertEquals("1970-01-01 12:15:55.0", ixn.getTime().toString());
    assertEquals("Person entered building from right side", ixn.getActivity());
    assertEquals("123-345", ixn.getTrack());
    assertEquals("William Joseph", ixn.getTrackAnalyst());
    assertEquals("NOT_STARTED", ixn.getStatus());
    assertEquals("", ixn.getLeadChecker());
    assertEquals("", ixn.getFinalChecker());

    ixnJsonString = "{" +
      "\"id\":" + ixnId +
      ",\"rfiId\":" + rfiId +
      ",\"exploitDateId\":" + exploitDateId +
      ",\"targetId\":" + targetId +
      ",\"segmentId\":" + segmentId +
      ",\"exploitAnalyst\":\"William Robert\"" +
      ",\"time\":\"1970-01-01T12:15:55.000Z\"" +
      ",\"activity\":\"Person entered building from right side\"" +
      ",\"track\":\"123-345\"" +
      ",\"trackAnalyst\":\"William Joseph\"" +
      ",\"status\":\"IN_PROGRESS\"" +
      ",\"leadChecker\":\"\"" +
      ",\"finalChecker\":\"\"" +
      "}";

    given()
      .port(port)
      .header("Content-Type", "application/json")
      .body(ixnJsonString)
      .when()
      .post(IxnController.URI + "/post")
      .then()
      .statusCode(200);

    assertEquals(1, ixnRepository.findAll().size());

    ixn = ixnRepository.findAll().get(0);

    assertEquals("William Robert", ixn.getExploitAnalyst());
    assertEquals("1970-01-01 12:15:55.0", ixn.getTime().toString());
    assertEquals("Person entered building from right side", ixn.getActivity());
    assertEquals("123-345", ixn.getTrack());
    assertEquals("William Joseph", ixn.getTrackAnalyst());
    assertEquals("IN_PROGRESS", ixn.getStatus());
    assertEquals("", ixn.getLeadChecker());
    assertEquals("", ixn.getFinalChecker());

    assertEquals(5, metricChangeIxnRepository.findAll().size());

    MetricChangeIxn metric1 = metricChangeIxnRepository.findAll().get(0);
    MetricChangeIxn metric3 = metricChangeIxnRepository.findAll().get(2);
    MetricChangeIxn metric5 = metricChangeIxnRepository.findAll().get(4);

    assertEquals(ixnId, metric1.getIxnId());
    assertEquals("exploit_analyst", metric1.getField());
    assertEquals("William Robert", metric1.getNewData());

    assertEquals(ixnId, metric3.getIxnId());
    assertEquals("track", metric3.getField());
    assertEquals("123-345", metric3.getNewData());

    assertEquals(ixnId, metric5.getIxnId());
    assertEquals("status", metric5.getField());
    assertEquals("IN_PROGRESS", metric5.getNewData());
  }
}
