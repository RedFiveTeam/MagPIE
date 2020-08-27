package dgs1sdt.magpie.scois;

import dgs1sdt.magpie.BaseIntegrationTest;
import dgs1sdt.magpie.ixns.*;
import dgs1sdt.magpie.metrics.IxnApprovalStatus;
import dgs1sdt.magpie.metrics.createScoi.MetricCreateScoi;
import dgs1sdt.magpie.metrics.createScoi.MetricCreateScoiRepository;
import dgs1sdt.magpie.rfis.Rfi;
import dgs1sdt.magpie.rfis.RfiRepository;
import dgs1sdt.magpie.tgts.Target;
import dgs1sdt.magpie.tgts.TargetJson;
import dgs1sdt.magpie.tgts.TargetRepository;
import dgs1sdt.magpie.tgts.exploitDates.ExploitDate;
import dgs1sdt.magpie.tgts.exploitDates.ExploitDateRepository;
import org.junit.Before;
import org.junit.Test;

import static org.hamcrest.CoreMatchers.containsString;
import static org.hamcrest.CoreMatchers.equalTo;
import static org.junit.Assert.*;

import org.springframework.beans.factory.annotation.Autowired;

import java.sql.Timestamp;
import java.util.Arrays;
import java.util.Date;

import static io.restassured.RestAssured.given;

public class ScoiControllerTest extends BaseIntegrationTest {

  @Autowired
  ScoiController scoiController;

  @Autowired
  ScoiRepository scoiRepository;

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
  MetricCreateScoiRepository metricCreateScoiRepository;

  @Before
  public void clean() {
    scoiRepository.deleteAll();
    metricCreateScoiRepository.deleteAll();
    rfiRepository.deleteAll();
    exploitDateRepository.deleteAll();
    targetRepository.deleteAll();
    segmentRepository.deleteAll();
    ixnRepository.deleteAll();
  }

  @Test
  public void postCreatesNewScoi() throws Exception {
    ScoiJson scoiJson = new ScoiJson("OPNS20-0001", "12ASD1231231231");

    String scoiJsonString = objectMapper.writeValueAsString(scoiJson);

    given()
      .port(port)
      .contentType("application/json")
      .body(scoiJsonString)
      .when()
      .post(ScoiController.URI + "?userName=billy.bob.joe")
      .then()
      .statusCode(200);

    assertEquals(1, scoiRepository.findAll().size());
    Scoi scoi = scoiRepository.findAll().get(0);

    assertEquals("OPNS20-0001", scoi.getName());
    assertEquals("12ASD1231231231", scoi.getMgrs());

    assertEquals(1, metricCreateScoiRepository.findAll().size());
    MetricCreateScoi metric = metricCreateScoiRepository.findAll().get(0);

    assertEquals("billy.bob.joe", metric.getUserName());
    assertEquals(scoi.getId(), metric.getScoiId());

    //Test that posting with the same name does not create a new SCOI
    given()
      .port(port)
      .contentType("application/json")
      .body(scoiJsonString)
      .when()
      .post(ScoiController.URI + "?userName=billy.bob.joe")
      .then()
      .statusCode(200);

    assertEquals(1, scoiRepository.findAll().size());
  }

  @Test
  public void returnsMgrsFromScoiNameIfExistsOr404IfNot() {
    Scoi scoi = new Scoi("OPNS20-0001", "12ASD1231231231");
    scoiRepository.save(scoi);

    given()
      .port(port)
      .contentType("application/json")
      .when()
      .get(ScoiController.URI + "?userName=billy.bob.joe&name=OPNS20-0001")
      .then()
      .statusCode(200)
      .body("name", equalTo("OPNS20-0001"))
      .body("mgrs", equalTo("12ASD1231231231"));

    given()
      .port(port)
      .contentType("application/json")
      .when()
      .get(ScoiController.URI + "?userName=billy.bob.joe&name=OPNS20-0002")
      .then()
      .statusCode(404);
  }

  @Test
  public void returnsAllScois() {
    //Arrange
    Scoi scoi1 = new Scoi("OPNS20-0001", "12ASD1231231231");
    Scoi scoi2 = new Scoi("OPNS20-0002", "12ASD1231231232");
    Scoi scoi3 = new Scoi("OPNS20-0003", "12ASD1231231233");
    scoiRepository.saveAll(Arrays.asList(scoi1, scoi2, scoi3));

    //Act
    given()
      .port(port)
      .when()
      .get(ScoiController.URI + "/all")

      //Assert
      .then()
      .statusCode(200)
      .body("[0].name", equalTo("OPNS20-0001"))
      .body("[0].mgrs", equalTo("12ASD1231231231"))
      .body("[1].name", equalTo("OPNS20-0002"))
      .body("[1].mgrs", equalTo("12ASD1231231232"))
      .body("[2].name", equalTo("OPNS20-0003"))
      .body("[2].mgrs", equalTo("12ASD1231231233"))
      .body("[3]", equalTo(null));
  }

  @Test
  public void returnsRFIAssociationsWithScoi() {
    // 2 cases: RFI that is associated and an RFI that is not associated

    //Arrange
    String scoiName = "OPNS20-0123";
    scoiRepository.save(new Scoi(scoiName, "12QWE1231231231"));

    rfiRepository.save(
      new Rfi("DGS-1-SDT-2020-00001", "", "CLOSED", new Date(), "", new Date(), "",
        "This is the description of an associated RFI", "This is a justifiction", "", "", "",
        "", "", "", "", "", ""));
    rfiRepository.save(
      new Rfi("DGS-1-SDT-2020-00002", "", "OPEN", new Date(), "", new Date(), "",
        "This is the description of an RFI that does not mention the SCOI", "This is a justifiction", "", "", "",
        "", "", "", "", "", ""));
    rfiRepository.save(
      new Rfi("DGS-1-SDT-2020-00003", "", "CLOSED", new Date(), "", new Date(), "",
        "This is the description of another associated RFI", "This is a justifiction", "", "", "",
        "", "", "", "", "", ""));
    long rfi1Id = rfiRepository.findAll().get(0).getId();
    long rfi2Id = rfiRepository.findAll().get(1).getId();
    long rfi3Id = rfiRepository.findAll().get(2).getId();

    exploitDateRepository.save(new ExploitDate(new Date(), rfi1Id));
    exploitDateRepository.save(new ExploitDate(new Date(), rfi2Id));
    exploitDateRepository.save(new ExploitDate(new Date(), rfi3Id));
    long exploitDate1Id = exploitDateRepository.findAll().get(0).getId();
    long exploitDate2Id = exploitDateRepository.findAll().get(1).getId();
    long exploitDate3Id = exploitDateRepository.findAll().get(2).getId();

    targetRepository.save(new Target(new TargetJson(rfi1Id, exploitDate1Id, "12IOP1231231231", "", ""), "20-0001"));
    targetRepository.save(new Target(new TargetJson(rfi2Id, exploitDate2Id, "12IOP1231231232", "", ""), "20-0002"));
    targetRepository.save(new Target(new TargetJson(rfi3Id, exploitDate3Id, "12IOP1231231233", "", ""), "20-0003"));
    long target1Id = targetRepository.findAll().get(0).getId();
    long target2Id = targetRepository.findAll().get(1).getId();
    long target3Id = targetRepository.findAll().get(2).getId();

    segmentRepository
      .save(new Segment(new SegmentJson(rfi1Id, exploitDate1Id, target1Id, new Timestamp(2345), new Timestamp(3456))));
    segmentRepository
      .save(new Segment(new SegmentJson(rfi2Id, exploitDate2Id, target2Id, new Timestamp(2345), new Timestamp(3456))));
    segmentRepository
      .save(new Segment(new SegmentJson(rfi3Id, exploitDate3Id, target3Id, new Timestamp(2345), new Timestamp(3456))));
    long segment1Id = segmentRepository.findAll().get(0).getId();
    long segment2Id = segmentRepository.findAll().get(1).getId();
    long segment3Id = segmentRepository.findAll().get(2).getId();

    Ixn rfi1ixn1 = new Ixn(rfi1Id, exploitDate1Id, target1Id, segment1Id, "", new Timestamp(2345), "", "0001-001", "",
      IxnStatus.COMPLETED, "",
      IxnApprovalStatus.APPROVED);
    rfi1ixn1.setTrackNarrative("This is a track narrative that includes the SCOI " + scoiName);
    Ixn rfi1ixn2 = new Ixn(rfi1Id, exploitDate1Id, target1Id, segment1Id, "", new Timestamp(2345), "", "0001-001", "",
      IxnStatus.COMPLETED, "",
      IxnApprovalStatus.APPROVED);
    rfi1ixn2.setTrackNarrative("This one doesn't");

    Ixn rfi2ixn1 = new Ixn(rfi2Id, exploitDate2Id, target2Id, segment2Id, "", new Timestamp(2345), "", "0001-001", "",
      IxnStatus.COMPLETED, "",
      IxnApprovalStatus.APPROVED);
    rfi2ixn1.setTrackNarrative("This is a track narrative that includes a different SCOI OPNS20-0002");
    Ixn rfi2ixn2 = new Ixn(rfi2Id, exploitDate2Id, target2Id, segment2Id, "", new Timestamp(2345), "", "0001-001", "",
      IxnStatus.COMPLETED, "",
      IxnApprovalStatus.APPROVED);
    rfi2ixn2.setTrackNarrative("This is a track narrative that includes a different SCOI OPNS20-0003");

    Ixn rfi3ixn1 = new Ixn(rfi3Id, exploitDate3Id, target3Id, segment3Id, "", new Timestamp(2345), "", "0001-001", "",
      IxnStatus.COMPLETED, "",
      IxnApprovalStatus.APPROVED);
    rfi3ixn1.setTrackNarrative("This is a track narrative that includes the SCOI " + scoiName);

    ixnRepository.saveAll(Arrays.asList(rfi1ixn1, rfi1ixn2, rfi2ixn1, rfi2ixn2, rfi3ixn1));

    //Act
    given()
      .port(port)
      .when()
      .get(ScoiController.URI + "/rfi?name=" + scoiName)

      //Assert
      .then()
      .statusCode(200)
      .body("[0].rfiNum", equalTo("DGS-1-SDT-2020-00001"))
      .body("[0].description", equalTo("This is the description of an associated RFI"))
      .body("[1].rfiNum", equalTo("DGS-1-SDT-2020-00003"))
      .body("[1].description", equalTo("This is the description of another associated RFI"))
      .body("[2]", equalTo(null));

    //Act
    given()
      .port(port)
      .when()
      .get(ScoiController.URI + "/rfi?name=" + "Bad name")

      //Assert
      .then()
      .statusCode(404);
  }
}
