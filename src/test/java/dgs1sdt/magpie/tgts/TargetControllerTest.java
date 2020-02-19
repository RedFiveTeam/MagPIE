package dgs1sdt.magpie.tgts;

import dgs1sdt.magpie.BaseIntegrationTest;
import dgs1sdt.magpie.metrics.changeExploitDate.MetricChangeExploitDateRepository;
import dgs1sdt.magpie.metrics.changeTarget.MetricChangeTarget;
import dgs1sdt.magpie.metrics.changeTarget.MetricChangeTargetRepository;
import dgs1sdt.magpie.metrics.createTarget.MetricCreateTargetRepository;
import dgs1sdt.magpie.metrics.deleteExploitDate.MetricDeleteExploitDateRepository;
import dgs1sdt.magpie.metrics.deleteTarget.MetricDeleteTargetRepository;
import dgs1sdt.magpie.rfis.Rfi;
import dgs1sdt.magpie.rfis.RfiController;
import dgs1sdt.magpie.rfis.RfiRepository;
import dgs1sdt.magpie.rfis.RfiService;
import dgs1sdt.magpie.tgts.exploitDates.ExploitDate;
import dgs1sdt.magpie.tgts.exploitDates.ExploitDateJson;
import dgs1sdt.magpie.tgts.exploitDates.ExploitDateRepository;
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
import static org.junit.Assert.assertEquals;


public class TargetControllerTest extends BaseIntegrationTest {

  TargetController targetController;
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
  public void setTargetController(TargetController targetController) {
    this.targetController = targetController;
  }

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
  }

  @Test
  public void addsExploitDatesCorrectly() throws Exception {
    rfiRepository.save(new Rfi("DGS-1-SDT-2020-00338", "", "", new Date(), "", new Date(), "", ""));

    ExploitDateJson exploitDateJson = new ExploitDateJson(
      rfiRepository.findByRfiNum("DGS-1-SDT-2020-00338").getId(),
      new Timestamp(new SimpleDateFormat("dd/MM/yyyy HH:mm:ss").parse("11/11/2020 11:22:33").getTime()));

    targetController.postExploitDate(exploitDateJson);

    assertEquals(1, exploitDateRepository.findAll().size());
    assertEquals("2020-11-11 00:00:00.0", exploitDateRepository.findAll().get(0).getExploitDate().toString());

    assertEquals(1, metricChangeExploitDateRepository.findAll().size());

    targetController.postExploitDate(exploitDateJson);

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

    List<ExploitDate> returnedDates = targetController.getExploitDates(
      rfiRepository.findByRfiNum("DGS-1-SDT-2020-00338").getId()
    );

    assertEquals(2, returnedDates.size());

    given()
      .port(port)
      .header("Content-Type", "application/json")
      .when()
      .get(TargetController.URI + "/dates?rfiId=" + rfiId)
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

    targetController.postTarget(targetJson);

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

    targetController.postTarget(targetJson);
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
      exploitDateId,
      rfiId,
      newDate
    );

    targetController.postExploitDate(changeExploitDateJson);

    assertEquals(1, exploitDateRepository.findAll().size());

    assertEquals(newDate, exploitDateRepository.findAll().get(0).getExploitDate());


  }

  @Test
  public void deletesExploitDates() throws Exception {
    rfiRepository.save(new Rfi("DGS-1-SDT-2020-00338", "", "", new Date(), "", new Date(), "", ""));

    ExploitDateJson exploitDateJson = new ExploitDateJson(
      rfiRepository.findByRfiNum("DGS-1-SDT-2020-00338").getId(),
      new Timestamp(new SimpleDateFormat("dd/MM/yyyy HH:mm:ss").parse("11/11/2020 00:00:00").getTime()));

    targetController.postExploitDate(exploitDateJson);

    long id = exploitDateRepository.findAll().get(0).getId();

    targetController.deleteExploitDate(id);

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

    targetController.postTarget(targetJson1);
    targetController.postTarget(targetJson2);

    long id = exploitDateRepository.findAll().get(0).getId();

    targetController.deleteExploitDate(id);

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

    targetController.postTarget(targetJson);
    long targetId = targetRepository.findAll().get(0).getId();

    assertEquals(0, targetController.deleteTarget(targetId).size());

    assertEquals(0, targetRepository.findAll().size());

    targetController.postTarget(targetJson);
    targetId = targetRepository.findAll().get(0).getId();

    given()
      .port(port)
      .header("Content-Type", "application/json")
      .when()
      .delete(TargetController.URI + "/delete?targetId=" + targetId)
      .then()
      .statusCode(200);

    assertEquals(0, targetRepository.findAll().size());
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


    targetController.postTarget(targetJson);
    long targetId = targetRepository.findByRfiIdAndExploitDateIdAndName(rfiId, exploitDateId, "SDT20-123").getId();

    TargetJson targetEditJson = new TargetJson(
      targetId,
      rfiId,
      exploitDateId,
      "SDT20-123",
      "12ABC1234567890",
      "These are some RAD supercool EEI notes",
      "This is a different description",
      TargetStatus.NOT_STARTED);

    targetController.postTarget(targetEditJson);
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

    targetController.postTarget(targetJson);

    long targetId = targetRepository.findAll().get(0).getId();

    targetController.deleteTarget(targetId);

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

    targetController.postTarget(targetJson);

    long targetId = targetRepository.findByRfiIdAndExploitDateIdAndName(rfiId, exploitDateId, "SDT20-123").getId();

    TargetJson updatedTargetJson = new TargetJson(
      targetId,
      rfiId,
      exploitDateId,
      "SDT20-123",
      "12ABC1234567890",
      "These are some different notes for the EEI",
      "This is a description that's also different",
      TargetStatus.NOT_STARTED);

    targetController.postTarget(updatedTargetJson);

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

    targetController.postTarget(targetJson);
    targetController.postTarget(targetJsonConflict);

    long targetId = targetRepository.findByRfiIdAndExploitDateIdAndName(rfiId, exploitDateId, "SDT20-123").getId();

    TargetJson updatedTargetJson = new TargetJson(
      targetId,
      rfiId,
      exploitDateId,
      "SDT20-124",
      "12ABC1234567890",
      "These are some different notes for the EEI",
      "This is a description that's also different",
      TargetStatus.NOT_STARTED);

    targetController.postTarget(updatedTargetJson);

    assertEquals("SDT20-123", targetRepository.findById(targetId).get().getName());
  }

  @Test
  public void shouldChangeTargetStatusAndCreateMetric() throws Exception {
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

    targetController.postTarget(targetJson);

    Target target = targetRepository.findAll().get(0);
    long targetId = target.getId();

    assertEquals(TargetStatus.NOT_STARTED, target.getStatus());

    String targetUpdateJsonString = "{" +
      "\"targetId\":" + targetId +
      ",\"rfiId\":" + rfiId +
      ",\"exploitDateId\":" + exploitDateId +
      ",\"name\":" + "\"" + targetJson.getName() + "\"" +
      ",\"mgrs\":" + "\"" + targetJson.getMgrs() + "\"" +
      ",\"notes\":" + "\"" + targetJson.getNotes() + "\"" +
      ",\"description\":" + "\"" + targetJson.getDescription() + "\"" +
      ",\"status\":\"IN_PROGRESS\""
      + "}";

    given()
      .port(port)
      .header("Content-Type", "application/json")
      .body(targetUpdateJsonString)
      .when()
      .post(TargetController.URI + "/post")
      .then()
      .statusCode(200);

    target = targetRepository.findAll().get(0);

    assertEquals(TargetStatus.IN_PROGRESS, target.getStatus());

    targetUpdateJsonString = "{" +
      "\"targetId\":" + targetId +
      ",\"rfiId\":" + rfiId +
      ",\"exploitDateId\":" + exploitDateId +
      ",\"name\":" + "\"" + targetJson.getName() + "\"" +
      ",\"mgrs\":" + "\"" + targetJson.getMgrs() + "\"" +
      ",\"notes\":" + "\"" + targetJson.getNotes() + "\"" +
      ",\"description\":" + "\"" + targetJson.getDescription() + "\"" +
      ",\"status\":\"COMPLETED\""
      + "}";

    given()
      .port(port)
      .header("Content-Type", "application/json")
      .body(targetUpdateJsonString)
      .when()
      .post(TargetController.URI + "/post")
      .then()
      .statusCode(200);

    target = targetRepository.findAll().get(0);

    assertEquals(TargetStatus.COMPLETED, target.getStatus());

    assertEquals(2, metricChangeTargetRepository.findAll().size());

    MetricChangeTarget metric1 = metricChangeTargetRepository.findAll().get(0);
    MetricChangeTarget metric2 = metricChangeTargetRepository.findAll().get(1);

    assertEquals("status", metric1.getField());
    assertEquals(TargetStatus.NOT_STARTED, metric1.getOldData());
    assertEquals(TargetStatus.IN_PROGRESS, metric1.getNewData());
    assertEquals("status", metric2.getField());
    assertEquals(TargetStatus.IN_PROGRESS, metric2.getOldData());
    assertEquals(TargetStatus.COMPLETED, metric2.getNewData());
  }
}
