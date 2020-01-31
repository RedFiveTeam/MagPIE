package dgs1sdt.pie.rfis;

import dgs1sdt.pie.BaseIntegrationTest;
import dgs1sdt.pie.metrics.changeexploitdate.MetricChangeExploitDateRepository;
import dgs1sdt.pie.rfis.exploitdates.ExploitDate;
import dgs1sdt.pie.rfis.exploitdates.ExploitDateJson;
import dgs1sdt.pie.rfis.exploitdates.ExploitDateRepository;
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
  MetricChangeExploitDateRepository metricChangeExploitDateRepository;

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
  public void setMetricChangeExploitDateRepository(MetricChangeExploitDateRepository metricChangeExploitDateRepository) {
    this.metricChangeExploitDateRepository = metricChangeExploitDateRepository;
  }


  @Before
  public void clean() {
    rfiRepository.deleteAll();
    exploitDateRepository.deleteAll();
  }

  @Test
  public void getRfisDirectlyFromGETS() throws Exception {
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

    RfiPriorityJson [] rfiJsons = {
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
  public void addsExploitDates() throws Exception {
    rfiRepository.save(new Rfi("DGS-1-SDT-2020-00338", "", "", new Date(), "", new Date(), "", ""));

    ExploitDateJson exploitDateJson = new ExploitDateJson(
      null,
      new Timestamp(new SimpleDateFormat("dd/MM/yyyy").parse("11/11/2020").getTime()),
      "DGS-1-SDT-2020-00338");

    rfiController.changeExploitDate(exploitDateJson);

    assertEquals(1, exploitDateRepository.findAll().size());

    assertEquals("2020-11-11 00:00:00.0", exploitDateRepository.findAllByRfiId(1L).get(0).getExploitDate().toString());

    assertEquals(1, metricChangeExploitDateRepository.findAll().size());

    rfiController.changeExploitDate(exploitDateJson);

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

    List<ExploitDate> returnedDates = rfiController.fetchExploitDates("DGS-1-SDT-2020-00338");

    assertEquals(2, returnedDates.size());

    given()
      .port(port)
      .header("Content-Type", "application/json")
      .body("DGS-1-SDT-2020-00338")
      .when()
      .post(RfiController.URI + "/dates")
      .then()
      .statusCode(200)
      .body("[0].exploitDate", equalTo("2020-11-11T00:00:00.000+0000"))
      .body("[1].exploitDate", equalTo("2020-11-15T00:00:00.000+0000"))
      .body("[2].exploitDate", equalTo(null));
  }

}

