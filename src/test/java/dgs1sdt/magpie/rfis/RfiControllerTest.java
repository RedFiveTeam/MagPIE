package dgs1sdt.magpie.rfis;

import dgs1sdt.magpie.BaseIntegrationTest;
import dgs1sdt.magpie.ixns.*;
import dgs1sdt.magpie.metrics.changeExploitDate.MetricChangeExploitDateRepository;
import dgs1sdt.magpie.metrics.changeTarget.MetricChangeTargetRepository;
import dgs1sdt.magpie.metrics.createTarget.MetricCreateTargetRepository;
import dgs1sdt.magpie.metrics.deleteExploitDate.MetricDeleteExploitDateRepository;
import dgs1sdt.magpie.metrics.deleteTarget.MetricDeleteTargetRepository;
import dgs1sdt.magpie.tgts.Target;
import dgs1sdt.magpie.tgts.TargetController;
import dgs1sdt.magpie.tgts.TargetJson;
import dgs1sdt.magpie.tgts.TargetRepository;
import dgs1sdt.magpie.tgts.exploitDates.ExploitDate;
import dgs1sdt.magpie.tgts.exploitDates.ExploitDateRepository;
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
  RfiService rfiService;
  RfiRepository rfiRepository;
  ExploitDateRepository exploitDateRepository;
  TargetRepository targetRepository;
  MetricChangeExploitDateRepository metricChangeExploitDateRepository;
  MetricCreateTargetRepository metricCreateTargetRepository;
  MetricDeleteExploitDateRepository metricDeleteExploitDateRepository;
  MetricDeleteTargetRepository metricDeleteTargetRepository;
  MetricChangeTargetRepository metricChangeTargetRepository;

  @Autowired
  SegmentRepository segmentRepository;
  @Autowired
  IxnRepository ixnRepository;
  @Autowired
  IxnController ixnController;
  @Autowired
  TargetController targetController;

  @Autowired
  public void setRfiController(RfiController rfiController) {
    this.rfiController = rfiController;
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
    metricChangeExploitDateRepository.deleteAll();
    metricCreateTargetRepository.deleteAll();
    metricDeleteTargetRepository.deleteAll();
    metricChangeTargetRepository.deleteAll();
    metricDeleteExploitDateRepository.deleteAll();
    segmentRepository.deleteAll();
    ixnRepository.deleteAll();
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
  public void returnsRfisWithTgtAndIxnCounts() throws Exception {
    //Setup and RFI with 2 targets and 10 interactions
    rfiRepository.save(new Rfi("DGS-1-SDT-2020-00338", "", "", new Date(), "", new Date(), "", ""));
    long rfiId = rfiRepository.findByRfiNum("DGS-1-SDT-2020-00338").getId();
    Date exploitDate1 = new Date(new SimpleDateFormat("MM/dd/yyyy").parse("11/11/2020").getTime());
    exploitDateRepository.save(new ExploitDate(exploitDate1, rfiId));
    Date exploitDate2 = new Date(new SimpleDateFormat("MM/dd/yyyy").parse("11/10/2020").getTime());
    exploitDateRepository.save(new ExploitDate(exploitDate2, rfiId));


    long exploitDate1Id = exploitDateRepository.findAll().get(0).getId();
    long exploitDate2Id = exploitDateRepository.findAll().get(1).getId();

    targetRepository.save(new Target(new TargetJson(rfiId, exploitDate1Id, "SDT12-123", "12WQE1231231231", "", "")));
    long target1Id = targetRepository.findAll().get(0).getId();

    targetRepository.save(new Target(new TargetJson(rfiId, exploitDate2Id, "SDT12-123", "12WQE1231231231", "", "")));
    long target2Id = targetRepository.findAll().get(1).getId();


    segmentRepository.save(new Segment(new SegmentJson(rfiId, exploitDate1Id, target1Id, new Timestamp(new Date(0).getTime()), new Timestamp(new Date(56789).getTime()))));
    long segment1Id = segmentRepository.findAll().get(0).getId();

    segmentRepository.save(new Segment(new SegmentJson(rfiId, exploitDate2Id, target2Id, new Timestamp(new Date(0).getTime()), new Timestamp(new Date(56789).getTime()))));
    long segment2Id = segmentRepository.findAll().get(1).getId();

    ixnRepository.save(new Ixn(rfiId, exploitDate1Id, target1Id, segment1Id, "", new Timestamp(new Date(123000).getTime()), "", "", "", IxnStatus.IN_PROGRESS, "", "")); //123-003
    ixnRepository.save(new Ixn(rfiId, exploitDate1Id, target1Id, segment1Id, "", new Timestamp(new Date(234000).getTime()), "", "", "", IxnStatus.NOT_STARTED, "", ""));
    ixnRepository.save(new Ixn(rfiId, exploitDate1Id, target1Id, segment1Id, "", new Timestamp(new Date(345000).getTime()), "", "", "", IxnStatus.IN_PROGRESS, "", "")); //123-004
    ixnRepository.save(new Ixn(rfiId, exploitDate1Id, target1Id, segment1Id, "", new Timestamp(new Date(456000).getTime()), "", "", "", IxnStatus.DOES_NOT_MEET_EEI, "", ""));
    ixnRepository.save(new Ixn(rfiId, exploitDate1Id, target1Id, segment1Id, "", new Timestamp(new Date(567000).getTime()), "", "", "", IxnStatus.COMPLETED, "", "")); //123-005

    ixnRepository.save(new Ixn(rfiId, exploitDate2Id, target2Id, segment2Id, "", new Timestamp(new Date(123000).getTime()), "", "", "", IxnStatus.NOT_STARTED, "", ""));
    ixnRepository.save(new Ixn(rfiId, exploitDate2Id, target2Id, segment2Id, "", new Timestamp(new Date(234000).getTime()), "", "", "", IxnStatus.NOT_STARTED, "", ""));
    ixnRepository.save(new Ixn(rfiId, exploitDate2Id, target2Id, segment2Id, "", new Timestamp(new Date(345000).getTime()), "", "", "", IxnStatus.IN_PROGRESS, "", ""));  //123-001
    ixnRepository.save(new Ixn(rfiId, exploitDate2Id, target2Id, segment2Id, "", new Timestamp(new Date(456000).getTime()), "", "", "", IxnStatus.DOES_NOT_MEET_EEI, "", ""));
    ixnRepository.save(new Ixn(rfiId, exploitDate2Id, target2Id, segment2Id, "", new Timestamp(new Date(567000).getTime()), "", "", "", IxnStatus.COMPLETED, "", "")); //123-002

    //Another RFI
    rfiRepository.save(new Rfi("DGS-1-SDT-2020-00339", "", "", new Date(), "", new Date(), "", ""));
    rfiId = rfiRepository.findByRfiNum("DGS-1-SDT-2020-00339").getId();
    exploitDate1 = new Date(new SimpleDateFormat("MM/dd/yyyy").parse("11/11/2020").getTime());
    exploitDateRepository.save(new ExploitDate(exploitDate1, rfiId));
    exploitDate2 = new Date(new SimpleDateFormat("MM/dd/yyyy").parse("11/10/2020").getTime());
    exploitDateRepository.save(new ExploitDate(exploitDate2, rfiId));

    exploitDate1Id = exploitDateRepository.findAll().get(0).getId();
    exploitDate2Id = exploitDateRepository.findAll().get(1).getId();

    targetRepository.save(new Target(new TargetJson(rfiId, exploitDate1Id, "SDT12-123", "12WQE1231231231", "", "")));
    target1Id = targetRepository.findAll().get(0).getId();

    targetRepository.save(new Target(new TargetJson(rfiId, exploitDate2Id, "SDT12-123", "12WQE1231231231", "", "")));
    target2Id = targetRepository.findAll().get(1).getId();

    segmentRepository.save(new Segment(new SegmentJson(rfiId, exploitDate1Id, target1Id, new Timestamp(new Date(0).getTime()), new Timestamp(new Date(56789).getTime()))));
    segment1Id = segmentRepository.findAll().get(0).getId();

    segmentRepository.save(new Segment(new SegmentJson(rfiId, exploitDate2Id, target2Id, new Timestamp(new Date(0).getTime()), new Timestamp(new Date(56789).getTime()))));
    segment2Id = segmentRepository.findAll().get(1).getId();

    ixnRepository.save(new Ixn(rfiId, exploitDate1Id, target1Id, segment1Id, "", new Timestamp(new Date(123000).getTime()), "", "", "", IxnStatus.IN_PROGRESS, "", "")); //123-003
    ixnRepository.save(new Ixn(rfiId, exploitDate1Id, target1Id, segment1Id, "", new Timestamp(new Date(234000).getTime()), "", "", "", IxnStatus.NOT_STARTED, "", ""));
    ixnRepository.save(new Ixn(rfiId, exploitDate1Id, target1Id, segment1Id, "", new Timestamp(new Date(345000).getTime()), "", "", "", IxnStatus.IN_PROGRESS, "", "")); //123-004
    ixnRepository.save(new Ixn(rfiId, exploitDate1Id, target1Id, segment1Id, "", new Timestamp(new Date(456000).getTime()), "", "", "", IxnStatus.DOES_NOT_MEET_EEI, "", ""));
    ixnRepository.save(new Ixn(rfiId, exploitDate1Id, target1Id, segment1Id, "", new Timestamp(new Date(567000).getTime()), "", "", "", IxnStatus.COMPLETED, "", "")); //123-005

    ixnRepository.save(new Ixn(rfiId, exploitDate2Id, target2Id, segment2Id, "", new Timestamp(new Date(123000).getTime()), "", "", "", IxnStatus.NOT_STARTED, "", ""));
    ixnRepository.save(new Ixn(rfiId, exploitDate2Id, target2Id, segment2Id, "", new Timestamp(new Date(234000).getTime()), "", "", "", IxnStatus.NOT_STARTED, "", ""));
    ixnRepository.save(new Ixn(rfiId, exploitDate2Id, target2Id, segment2Id, "", new Timestamp(new Date(345000).getTime()), "", "", "", IxnStatus.IN_PROGRESS, "", ""));  //123-001
    ixnRepository.save(new Ixn(rfiId, exploitDate2Id, target2Id, segment2Id, "", new Timestamp(new Date(456000).getTime()), "", "", "", IxnStatus.DOES_NOT_MEET_EEI, "", ""));
    ixnRepository.save(new Ixn(rfiId, exploitDate2Id, target2Id, segment2Id, "", new Timestamp(new Date(567000).getTime()), "", "", "", IxnStatus.COMPLETED, "", "")); //123-002

    RfiGet rfi = rfiController.getAllRfis().get(0);

    assertEquals(2, rfi.getTgtCount());
    assertEquals(10, rfi.getIxnCount());

    ixnController.deleteSegment(segment2Id);
    targetController.deleteTarget(target1Id);
    rfi = rfiController.getAllRfis().get(0);

    assertEquals(1, rfi.getTgtCount());
    assertEquals(0, rfi.getIxnCount());

    targetController.deleteExploitDate(exploitDate2Id);
    rfi = rfiController.getAllRfis().get(0);

    assertEquals(0, rfi.getTgtCount());
  }
}
