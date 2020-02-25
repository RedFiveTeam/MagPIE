package dgs1sdt.magpie.rfis;

import dgs1sdt.magpie.BaseIntegrationTest;
import dgs1sdt.magpie.ixns.*;
import dgs1sdt.magpie.metrics.changeExploitDate.MetricChangeExploitDateRepository;
import dgs1sdt.magpie.metrics.changeTarget.MetricChangeTargetRepository;
import dgs1sdt.magpie.metrics.createTarget.MetricCreateTargetRepository;
import dgs1sdt.magpie.metrics.deleteExploitDate.MetricDeleteExploitDateRepository;
import dgs1sdt.magpie.metrics.deleteTarget.MetricDeleteTargetRepository;
import dgs1sdt.magpie.rfis.exploitDates.ExploitDate;
import dgs1sdt.magpie.rfis.exploitDates.ExploitDateJson;
import dgs1sdt.magpie.rfis.exploitDates.ExploitDateRepository;
import dgs1sdt.magpie.rfis.targets.Target;
import dgs1sdt.magpie.rfis.targets.TargetJson;
import dgs1sdt.magpie.rfis.targets.TargetRepository;
import org.junit.Before;
import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.TestPropertySource;

import java.sql.Timestamp;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import static io.restassured.RestAssured.given;
import static org.hamcrest.Matchers.equalTo;
import static org.hamcrest.Matchers.greaterThan;
import static org.junit.Assert.*;

// Prevent duplicate RFIs from race condition between rfiService.fetchRfisFromUris(files) in getRfisDirectlyFromGETS()
// test and scheduled function fetchRfisFromGets()
@TestPropertySource(
  properties = {
    "GETS_URI_OPEN_PENDING=",
    "GETS_URI_CLOSED=",
    "GETS_REQUEST_TIME_FRAME_IN_DAYS=20"
  })
public class RfiControllerTest extends BaseIntegrationTest {

  RfiController rfiController;
  IxnController ixnController;
  RfiService rfiService;
  RfiRepository rfiRepository;
  ExploitDateRepository exploitDateRepository;
  TargetRepository targetRepository;
  SegmentRepository segmentRepository;
  IxnRepository ixnRepository;
  MetricChangeExploitDateRepository metricChangeExploitDateRepository;
  MetricCreateTargetRepository metricCreateTargetRepository;
  MetricDeleteExploitDateRepository metricDeleteExploitDateRepository;
  MetricDeleteTargetRepository metricDeleteTargetRepository;
  MetricChangeTargetRepository metricChangeTargetRepository;

  @Autowired
  public void setRfiController(RfiController rfiController) {
    this.rfiController = rfiController;
  }

  @Autowired
  public void setIxnController(IxnController ixnController) {
    this.ixnController = ixnController;
  }

  @Autowired
  public void setRfiService(RfiService rfiService) {
    this.rfiService = rfiService;
  }

  @Autowired
  public void setRfiRepository(RfiRepository rfiRepository) {
    this.rfiRepository = rfiRepository;
  }

  @Autowired
  public void setExploitDateRepository(ExploitDateRepository exploitDateRepository) {
    this.exploitDateRepository = exploitDateRepository;
  }

  @Autowired
  public void setTargetRepository(TargetRepository targetRepository) {
    this.targetRepository = targetRepository;
  }

  @Autowired
  public void setSegmentRepository(SegmentRepository segmentRepository) {
    this.segmentRepository = segmentRepository;
  }

  @Autowired
  public void setIxnRepository(IxnRepository ixnRepository) {
    this.ixnRepository = ixnRepository;
  }

  @Autowired
  public void setMetricChangeExploitDateRepository(MetricChangeExploitDateRepository metricChangeExploitDateRepository) {
    this.metricChangeExploitDateRepository = metricChangeExploitDateRepository;
  }

  @Autowired
  public void setMetricCreateTargetRepository(MetricCreateTargetRepository metricCreateTargetRepository) {
    this.metricCreateTargetRepository = metricCreateTargetRepository;
  }

  @Autowired
  public void setMetricDeleteTargetRepository(MetricDeleteTargetRepository metricDeleteTargetRepository) {
    this.metricDeleteTargetRepository = metricDeleteTargetRepository;
  }

  @Autowired
  public void setMetricDeleteExploitDateRepository(MetricDeleteExploitDateRepository metricDeleteExploitDateRepository) {
    this.metricDeleteExploitDateRepository = metricDeleteExploitDateRepository;
  }

  @Autowired
  public void setMetricChangeTargetRepository(MetricChangeTargetRepository metricChangeTargetRepository) {
    this.metricChangeTargetRepository = metricChangeTargetRepository;
  }

  @Before
  public void clean() {
    rfiRepository.deleteAll();
    exploitDateRepository.deleteAll();
    targetRepository.deleteAll();
    segmentRepository.deleteAll();
    ixnRepository.deleteAll();
    metricChangeExploitDateRepository.deleteAll();
    metricCreateTargetRepository.deleteAll();
    metricDeleteTargetRepository.deleteAll();
    metricChangeTargetRepository.deleteAll();
    metricDeleteExploitDateRepository.deleteAll();
  }

  @Test
  public void getRfisDirectlyFromGETS() {
    String[] files = {
      "RfisNewOpen.xml",
      "RfisClosed.xml"
    };
    rfiService.fetchRfisFromUris(files);

    Rfi exploitingRfi = new Rfi("ZZZZZ", "", "OPEN", new Date(), "", new Date(), "", "", 1);

    rfiRepository.save(exploitingRfi);


    String firstDescription = "hi";
    String longDescription = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor " +
      "incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco " +
      "laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit " +
      "esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui" +
      " officia deserunt mollit anim id est laborum.";

    given()
      .port(port)
      .when()
      .get(RfiController.URI)
      .then()
      .statusCode(200)
      .body("[2].rfiNum", equalTo("DGS-1-SDT-2020-00321"))
      .body("[2].getsUrl", equalTo("http://www.google.com"))
      .body("[2].lastUpdate", equalTo("2019-11-05T14:21:21.000+0000"))
      .body("[2].status", equalTo("NEW"))
      .body("[2].customer", equalTo("633d ABW"))
      .body("[2].ltiov", equalTo("2020-11-05T14:21:21.000+0000"))
      .body("[2].country", equalTo("USA"))
      .body("[2].description", equalTo(firstDescription))
      .body("[2].priority", equalTo(-1))

      .body("[5].status", equalTo("OPEN"))
      .body("[5].priority", greaterThan(0))

      .body("[9].rfiNum", equalTo("DGS-1-SDT-2020-00329"))
      .body("[9].status", equalTo("CLOSED"))
      .body("[9].description", equalTo(longDescription))
      .body("[9].priority", equalTo(-1))

      .body("[15].rfiNum", equalTo("DGS-1-SDT-2020-00338"))
      .body("[15].getsUrl", equalTo("http://www.google.com"))
      .body("[15].lastUpdate", equalTo("2019-10-16T20:21:26.000+0000"))
      .body("[15].status", equalTo("OPEN"))
      .body("[15].customer", equalTo("1 FW"))
      .body("[15].ltiov", equalTo(null))
      .body("[15].country", equalTo("CAN"))

      .body("[16].rfiNum", equalTo("ZZZZZ"))

      .body("[17].rfiNum", equalTo(null));

  }

  @Test
  public void checksPriorityChangeLegality() {
    Rfi rfi2 = new Rfi("id2", "", "OPEN", new Date(), "", new Date(), "", "", 1);
    Rfi rfi3 = new Rfi("id3", "", "OPEN", new Date(), "", new Date(), "", "", 2);
    Rfi rfi1 = new Rfi("id1", "", "OPEN", new Date(), "", new Date(), "", "", 3);

    Rfi rfi4 = new Rfi("id4", "", "OPEN", new Date(), "", new Date(), "", "", 4);
    Rfi rfi5 = new Rfi("id5", "", "OPEN", new Date(), "", new Date(), "", "", 5);
    Rfi rfi6 = new Rfi("id6", "", "CLOSED", new Date(), "", new Date(), "", "", 3);

    List<Rfi> rfis = new ArrayList<>();
    rfis.add(rfi1);
    rfis.add(rfi2);
    rfis.add(rfi3);
    rfis.add(rfi4);
    rfis.add(rfi5);
    rfis.add(rfi6);

    rfiRepository.saveAll(rfis);

    RfiPriorityJson[] rfiJsons = {
      new RfiPriorityJson("id1", 1),
      new RfiPriorityJson("id2", 2),
      new RfiPriorityJson("id3", 3)
    };

    assertTrue(rfiController.updatePriority(rfiJsons));
    assertEquals(1, rfiRepository.findByRfiNum("id1").getPriority());

    rfiJsons = new RfiPriorityJson[]{
      new RfiPriorityJson("id1", 2),
      new RfiPriorityJson("id3", 3)
    };

    assertFalse(rfiController.updatePriority(rfiJsons));
    assertEquals(1, rfiRepository.findByRfiNum("id1").getPriority());
    assertEquals(3, rfiRepository.findByRfiNum("id3").getPriority());

    rfiJsons = new RfiPriorityJson[]{
      new RfiPriorityJson("id4", 2),
      new RfiPriorityJson("id3", 3),
      new RfiPriorityJson("id1", 4)
    };

    assertFalse(rfiController.updatePriority(rfiJsons));
    assertEquals(1, rfiRepository.findByRfiNum("id1").getPriority());
    assertEquals(2, rfiRepository.findByRfiNum("id2").getPriority());
    assertEquals(3, rfiRepository.findByRfiNum("id3").getPriority());
    assertEquals(4, rfiRepository.findByRfiNum("id4").getPriority());

  }

  @Test
  public void addsExploitDatesCorrectly() throws Exception {
    rfiRepository.save(new Rfi("DGS-1-SDT-2020-00338", "", "", new Date(), "", new Date(), "", ""));

    ExploitDateJson exploitDateJson = new ExploitDateJson(
      null,
      new Timestamp(new SimpleDateFormat("dd/MM/yyyy HH:mm:ss").parse("11/11/2020 11:22:33").getTime()),
    rfiRepository.findByRfiNum("DGS-1-SDT-2020-00338").getId());

    rfiController.addExploitDate(exploitDateJson);

    assertEquals(1, exploitDateRepository.findAll().size());
    assertEquals("2020-11-11 00:00:00.0", exploitDateRepository.findAll().get(0).getExploitDate().toString());

    assertEquals(1, metricChangeExploitDateRepository.findAll().size());

    rfiController.addExploitDate(exploitDateJson);

    assertEquals(1, exploitDateRepository.findAll().size());

    assertEquals(1, metricChangeExploitDateRepository.findAll().size());
  }

  @Test
  public void returnsExploitDates() throws Exception {

    rfiRepository.save(new Rfi("DGS-1-SDT-2020-00338", "", "", new Date(), "", new Date(), "", ""));

    long rfiId = rfiRepository.findByRfiNum("DGS-1-SDT-2020-00338").getId();

    List<ExploitDate> dates = new ArrayList<>();
    dates.add(new ExploitDate(
      new Timestamp(new SimpleDateFormat("dd/MM/yyyy").parse("11/11/2020").getTime()),
      rfiId
    ));
    dates.add(new ExploitDate(
      new Timestamp(new SimpleDateFormat("dd/MM/yyyy").parse("15/11/2020").getTime()),
      rfiId
    ));
    dates.add(new ExploitDate(
      new Timestamp(new SimpleDateFormat("dd/MM/yyyy").parse("20/11/2020").getTime()),
      rfiId + 5
    ));

    exploitDateRepository.saveAll(dates);

    List<ExploitDate> returnedDates = rfiController.fetchExploitDates(
      rfiRepository.findByRfiNum("DGS-1-SDT-2020-00338").getId()
    );

    assertEquals(2, returnedDates.size());

    given()
      .port(port)
      .header("Content-Type", "application/json")
      .body(rfiRepository.findByRfiNum("DGS-1-SDT-2020-00338").getId())
      .when()
      .post(RfiController.URI + "/dates")
      .then()
      .statusCode(200)
      .body("[0].exploitDate", equalTo("2020-11-11T00:00:00.000+0000"))
      .body("[1].exploitDate", equalTo("2020-11-15T00:00:00.000+0000"))
      .body("[2].exploitDate", equalTo(null));
  }

  @Test
  public void addsNewTargets() throws Exception {
    rfiRepository.save(new Rfi("SDT-123", "", "", new Date(), "", new Date(), "", ""));
    long rfiId = rfiRepository.findByRfiNum("SDT-123").getId();
    exploitDateRepository.save(new ExploitDate(
      new Timestamp(new SimpleDateFormat("dd/MM/yyyy").parse("11/11/2020").getTime()),
      rfiId
    ));
    long exploitDateId = exploitDateRepository.findByRfiIdAndExploitDate(rfiId,
      new Timestamp(new SimpleDateFormat("dd/MM/yyyy").parse("11/11/2020").getTime())).getId();

    TargetJson targetJson = new TargetJson(
      rfiId,
      exploitDateId,
      "SDT20-123",
      "12ABC1234567890",
      "These are some EEI notes",
      "This is a description"
    );

    rfiController.postTarget(targetJson);

    Target target = targetRepository.findAll().get(0);

    assertEquals(rfiRepository.findByRfiNum("SDT-123").getId(), target.getRfiId());
    assertEquals(exploitDateRepository.findAllByRfiId(rfiId).get(0).getId(), target.getExploitDateId());
    assertEquals("SDT20-123", target.getName());
    assertEquals("12ABC1234567890", target.getMgrs());
    assertEquals("These are some EEI notes", target.getNotes());
    assertEquals("This is a description", target.getDescription());


    targetJson = new TargetJson(
      rfiId,
      exploitDateId,
      "SDT20-123",
      "12ABC1234567899",
      "These are some different EEI notes",
      "This is a unique description"
    );

    rfiController.postTarget(targetJson);
    assertEquals(1, targetRepository.findAll().size());

    assertEquals(1, metricCreateTargetRepository.findAll().size());
  }

  @Test
  public void changesExploitDates() throws Exception {
    Timestamp oldDate = new Timestamp(new SimpleDateFormat("dd/MM/yyyy").parse("11/11/2020").getTime());
    Timestamp newDate = new Timestamp(new SimpleDateFormat("dd/MM/yyyy").parse("11/12/2020").getTime());

    rfiRepository.save(new Rfi("SDT-123", "", "", new Date(), "", new Date(), "", ""));
    long rfiId = rfiRepository.findByRfiNum("SDT-123").getId();
    exploitDateRepository.save(new ExploitDate(
      oldDate,
      rfiId
    ));

    long exploitDateId = exploitDateRepository.findByRfiIdAndExploitDate(rfiId, oldDate).getId();

    ExploitDateJson changeExploitDateJson = new ExploitDateJson(
      oldDate,
      newDate,
      rfiId
    );

    rfiController.changeExploitDate(exploitDateId, changeExploitDateJson);

    assertEquals(1, exploitDateRepository.findAll().size());

    assertEquals(newDate, exploitDateRepository.findAll().get(0).getExploitDate());


  }

  @Test
  public void deletesExploitDates() throws Exception {
    rfiRepository.save(new Rfi("DGS-1-SDT-2020-00338", "", "", new Date(), "", new Date(), "", ""));

    ExploitDateJson exploitDateJson = new ExploitDateJson(
      null,
      new Timestamp(new SimpleDateFormat("dd/MM/yyyy HH:mm:ss").parse("11/11/2020 00:00:00").getTime()),
      rfiRepository.findByRfiNum("DGS-1-SDT-2020-00338").getId());

    rfiController.addExploitDate(exploitDateJson);

    long id = exploitDateRepository.findAll().get(0).getId();

    rfiController.deleteExploitDate(id);

    assertEquals(0, exploitDateRepository.findAll().size());

    assertEquals(1, metricDeleteExploitDateRepository.findAll().size());

    assertEquals(
      "2020-11-11 00:00:00.0",
      metricDeleteExploitDateRepository.findAll().get(0).getExploitDate().toString()
    );

    assertEquals(
      "DGS-1-SDT-2020-00338",
      metricDeleteExploitDateRepository.findAll().get(0).getRfiNum()
    );
  }

  @Test
  public void deletesExploitDatesWithTargets() throws Exception {
    rfiRepository.save(new Rfi("DGS-1-SDT-2020-00338", "", "", new Date(), "", new Date(), "", ""));
    long rfiId = rfiRepository.findByRfiNum("DGS-1-SDT-2020-00338").getId();
    exploitDateRepository.save(new ExploitDate(
      new Timestamp(new SimpleDateFormat("dd/MM/yyyy").parse("11/11/2020").getTime()),
      rfiId
    ));
    long exploitDateId = exploitDateRepository.findByRfiIdAndExploitDate(rfiId,
      new Timestamp(new SimpleDateFormat("dd/MM/yyyy").parse("11/11/2020").getTime())).getId();

    TargetJson targetJson1 = new TargetJson(
      rfiId,
      exploitDateId,
      "SDT20-123",
      "12ABC1234567890",
      "These are some EEI notes",
      "This is a description"
    );
    TargetJson targetJson2 = new TargetJson(
      rfiId,
      exploitDateId,
      "SDT19-123",
      "12ABC1234567890",
      "These are some EEI notes",
      "This is a description"
    );

    rfiController.postTarget(targetJson1);
    rfiController.postTarget(targetJson2);

    long id = exploitDateRepository.findAll().get(0).getId();

    rfiController.deleteExploitDate(id);

    assertEquals(0, exploitDateRepository.findAll().size());

    assertEquals(0, targetRepository.findAll().size());
  }

  @Test
  public void deletesTargets() throws Exception {
    rfiRepository.save(new Rfi("SDT-123", "", "", new Date(), "", new Date(), "", ""));
    long rfiId = rfiRepository.findByRfiNum("SDT-123").getId();
    exploitDateRepository.save(new ExploitDate(
      new Timestamp(new SimpleDateFormat("dd/MM/yyyy").parse("11/11/2020").getTime()),
      rfiId
    ));
    long exploitDateId = exploitDateRepository.findByRfiIdAndExploitDate(rfiId,
      new Timestamp(new SimpleDateFormat("dd/MM/yyyy").parse("11/11/2020").getTime())).getId();

    TargetJson targetJson = new TargetJson(
      rfiId,
      exploitDateId,
      "SDT20-123",
      "12ABC1234567890",
      "These are some EEI notes",
      "This is a description"
    );

    rfiController.postTarget(targetJson);
    long targetId = targetRepository.findAll().get(0).getId();

    SegmentJson segmentJson1 = new SegmentJson(rfiId, exploitDateId, targetId, new Timestamp(123), new Timestamp(234));
    SegmentJson segmentJson2 = new SegmentJson(rfiId, exploitDateId, targetId, new Timestamp(345), new Timestamp(456));

    ixnController.postSegment(segmentJson1);
    ixnController.postSegment(segmentJson2);

    long segmentId = segmentRepository.findAll().get(0).getId();

    IxnJson ixnJson1 = new IxnJson(rfiId, exploitDateId, targetId, segmentId, "Billy", new Timestamp(124), "things", "");
    IxnJson ixnJson2 = new IxnJson(rfiId, exploitDateId, targetId, segmentId, "Billy", new Timestamp(125), "stuff", "");

    ixnController.postIxn(ixnJson1);
    ixnController.postIxn(ixnJson2);

    assertEquals(0, rfiController.deleteTarget(targetId).size());

    assertEquals(0, targetRepository.findAll().size());

    rfiController.postTarget(targetJson);
    targetId = targetRepository.findAll().get(0).getId();

    given()
      .port(port)
      .header("Content-Type", "application/json")
      .when()
      .delete(RfiController.URI + "/delete-target/" + targetId)
      .then()
      .statusCode(200);

    assertEquals(0, targetRepository.findAll().size());
    assertEquals(0, segmentRepository.findAll().size());
    assertEquals(0, ixnRepository.findAll().size());
  }

  @Test
  public void editsTargets() throws Exception {
    rfiRepository.save(new Rfi("SDT-123", "", "", new Date(), "", new Date(), "", ""));
    long rfiId = rfiRepository.findByRfiNum("SDT-123").getId();
    exploitDateRepository.save(new ExploitDate(
      new Timestamp(new SimpleDateFormat("dd/MM/yyyy").parse("11/11/2020").getTime()),
      rfiId
    ));
    long exploitDateId = exploitDateRepository.findByRfiIdAndExploitDate(rfiId,
      new Timestamp(new SimpleDateFormat("dd/MM/yyyy").parse("11/11/2020").getTime())).getId();

    TargetJson targetJson = new TargetJson(
      rfiId,
      exploitDateId,
      "SDT20-123",
      "12ABC1234567890",
      "These are some EEI notes",
      "This is a description"
    );


    rfiController.postTarget(targetJson);
    long targetId = targetRepository.findByRfiIdAndExploitDateIdAndName(rfiId, exploitDateId, "SDT20-123").getId();

    TargetJson targetEditJson = new TargetJson(
      targetId,
      rfiId,
      exploitDateId,
      "SDT20-123",
      "12ABC1234567890",
      "These are some RAD supercool EEI notes",
      "This is a different description"
    );

    rfiController.postTarget(targetEditJson);
    Target target = targetRepository.findAll().get(0);

    assertEquals(1, targetRepository.findAll().size());

    assertEquals(rfiId, target.getRfiId());
    assertEquals(exploitDateId, target.getExploitDateId());
    assertEquals("SDT20-123", target.getName());
    assertEquals("12ABC1234567890", target.getMgrs());
    assertEquals("These are some RAD supercool EEI notes", target.getNotes());
    assertEquals("This is a different description", target.getDescription());
  }

  @Test
  public void addsTargetDeletionMetrics() throws Exception {
    rfiRepository.save(new Rfi("SDT-123", "", "", new Date(), "", new Date(), "", ""));
    long rfiId = rfiRepository.findByRfiNum("SDT-123").getId();
    exploitDateRepository.save(new ExploitDate(
      new Timestamp(new SimpleDateFormat("dd/MM/yyyy").parse("11/11/2020").getTime()),
      rfiId
    ));
    long exploitDateId = exploitDateRepository.findByRfiIdAndExploitDate(rfiId,
      new Timestamp(new SimpleDateFormat("dd/MM/yyyy").parse("11/11/2020").getTime())).getId();

    TargetJson targetJson = new TargetJson(
      rfiId,
      exploitDateId,
      "SDT20-123",
      "12ABC1234567890",
      "These are some EEI notes",
      "This is a description"
    );

    rfiController.postTarget(targetJson);

    long targetId = targetRepository.findAll().get(0).getId();

    rfiController.deleteTarget(targetId);

    assertEquals(1, metricDeleteTargetRepository.findAll().size());
    assertEquals("SDT-123", metricDeleteTargetRepository.findAll().get(0).getRfiNum());
    assertEquals("SDT20-123", metricDeleteTargetRepository.findAll().get(0).getTargetName());

  }

  @Test
  public void updatesTargetsAndAddsMetrics() throws Exception {
    rfiRepository.save(new Rfi("SDT-123", "", "", new Date(), "", new Date(), "", ""));
    long rfiId = rfiRepository.findByRfiNum("SDT-123").getId();
    exploitDateRepository.save(new ExploitDate(
      new Timestamp(new SimpleDateFormat("dd/MM/yyyy").parse("11/11/2020").getTime()),
      rfiId
    ));
    long exploitDateId = exploitDateRepository.findByRfiIdAndExploitDate(rfiId,
      new Timestamp(new SimpleDateFormat("dd/MM/yyyy").parse("11/11/2020").getTime())).getId();

    TargetJson targetJson = new TargetJson(
      rfiId,
      exploitDateId,
      "SDT20-123",
      "12ABC1234567890",
      "These are some EEI notes",
      "This is a description"
    );

    rfiController.postTarget(targetJson);

    long targetId = targetRepository.findByRfiIdAndExploitDateIdAndName(rfiId, exploitDateId, "SDT20-123").getId();

    TargetJson updatedTargetJson = new TargetJson(
      targetId,
      rfiId,
      exploitDateId,
      "SDT20-123",
      "12ABC1234567890",
      "These are some different notes for the EEI",
      "This is a description that's also different"
    );

    rfiController.postTarget(updatedTargetJson);

    assertEquals(2, metricChangeTargetRepository.findAll().size());
  }

  @Test
  public void doesNotUpdateTargetIfTheNameAlreadyExists() throws Exception {
    rfiRepository.save(new Rfi("SDT-123", "", "", new Date(), "", new Date(), "", "")); //toChange
    long rfiId = rfiRepository.findByRfiNum("SDT-123").getId();
    exploitDateRepository.save(new ExploitDate(
      new Timestamp(new SimpleDateFormat("dd/MM/yyyy").parse("11/11/2020").getTime()),
      rfiId
    ));
    long exploitDateId = exploitDateRepository.findByRfiIdAndExploitDate(rfiId,
      new Timestamp(new SimpleDateFormat("dd/MM/yyyy").parse("11/11/2020").getTime())).getId();

    TargetJson targetJson = new TargetJson(
      rfiId,
      exploitDateId,
      "SDT20-123",
      "12ABC1234567890",
      "These are some EEI notes",
      "This is a description"
    );

    TargetJson targetJsonConflict = new TargetJson(
      rfiId,
      exploitDateId,
      "SDT20-124",
      "12ABC1234567890",
      "These are some EEI notes",
      "This is a description"
    );

    rfiController.postTarget(targetJson);
    rfiController.postTarget(targetJsonConflict);

    long targetId = targetRepository.findByRfiIdAndExploitDateIdAndName(rfiId, exploitDateId, "SDT20-123").getId();

    TargetJson updatedTargetJson = new TargetJson(
      targetId,
      rfiId,
      exploitDateId,
      "SDT20-124",
      "12ABC1234567890",
      "These are some different notes for the EEI",
      "This is a description that's also different"
    );

    rfiController.postTarget(updatedTargetJson);

    assertEquals("SDT20-123", targetRepository.findById(targetId).get().getName());
  }
}