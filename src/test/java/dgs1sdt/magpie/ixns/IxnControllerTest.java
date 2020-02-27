package dgs1sdt.magpie.ixns;

import dgs1sdt.magpie.BaseIntegrationTest;
import dgs1sdt.magpie.metrics.createIxn.MetricCreateIxn;
import dgs1sdt.magpie.metrics.createIxn.MetricCreateIxnRepository;
import dgs1sdt.magpie.metrics.createSegment.MetricCreateSegment;
import dgs1sdt.magpie.metrics.createSegment.MetricCreateSegmentRepository;
import dgs1sdt.magpie.metrics.deleteIxn.MetricDeleteIxn;
import dgs1sdt.magpie.metrics.deleteIxn.MetricDeleteIxnRepository;
import dgs1sdt.magpie.rfis.Rfi;
import dgs1sdt.magpie.rfis.RfiRepository;
import dgs1sdt.magpie.rfis.exploitDates.ExploitDate;
import dgs1sdt.magpie.rfis.exploitDates.ExploitDateRepository;
import dgs1sdt.magpie.rfis.targets.Target;
import dgs1sdt.magpie.rfis.targets.TargetJson;
import dgs1sdt.magpie.rfis.targets.TargetRepository;
import org.junit.Before;
import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;

import java.sql.Timestamp;
import java.util.Date;

import static io.restassured.RestAssured.given;
import static org.hamcrest.Matchers.equalTo;
import static org.junit.Assert.assertEquals;

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

    assertEquals("DGS-1-SDT-2020-00338", metric.getRfiNum());
    assertEquals("1970-01-01 00:00:00.0", metric.getExploitDate().toString());
    assertEquals("SDT12-123", metric.getTargetName());
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

    assertEquals(1, metricCreateIxnRepository.findAll().size());

    MetricCreateIxn metric = metricCreateIxnRepository.findAll().get(0);

    assertEquals("DGS-1-SDT-2020-00338", metric.getRfiNum());
    assertEquals("1970-01-01 00:00:00.0", metric.getExploitDate().toString());
    assertEquals("SDT12-123", metric.getTargetName());
    assertEquals("1970-01-01 12:10:10.0", metric.getSegmentStart().toString());
    assertEquals("1970-01-01 12:30:45.0", metric.getSegmentEnd().toString());
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
      "123-234"
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
      "123-234"
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

    MetricDeleteIxn metric = metricDeleteIxnRepository.findAll().get(0);

    assertEquals("DGS-1-SDT-2020-00338", metric.getRfiNum());
    assertEquals("1970-01-01 00:00:00.0", metric.getExploitDate().toString());
    assertEquals("SDT12-123", metric.getTargetName());
    assertEquals("1970-01-01 12:10:10.0", metric.getSegmentStart().toString());
    assertEquals("1970-01-01 12:30:45.0", metric.getSegmentEnd().toString());
  }
}