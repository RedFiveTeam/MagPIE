package dgs1sdt.pie.ixns;
import dgs1sdt.pie.BaseIntegrationTest;
import dgs1sdt.pie.metrics.createSegment.MetricCreateSegment;
import dgs1sdt.pie.metrics.createSegment.MetricCreateSegmentRepository;
import dgs1sdt.pie.rfis.Rfi;
import dgs1sdt.pie.rfis.RfiRepository;
import dgs1sdt.pie.rfis.exploitDates.ExploitDate;
import dgs1sdt.pie.rfis.exploitDates.ExploitDateRepository;
import dgs1sdt.pie.rfis.targets.Target;
import dgs1sdt.pie.rfis.targets.TargetJson;
import dgs1sdt.pie.rfis.targets.TargetRepository;
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
  MetricCreateSegmentRepository metricCreateSegmentRepository;

  @Before
  public void clean() {
    rfiRepository.deleteAll();
    exploitDateRepository.deleteAll();
    targetRepository.deleteAll();
    segmentRepository.deleteAll();
    metricCreateSegmentRepository.deleteAll();
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
}