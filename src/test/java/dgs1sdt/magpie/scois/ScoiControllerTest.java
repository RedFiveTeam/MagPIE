package dgs1sdt.magpie.scois;

import dgs1sdt.magpie.BaseIntegrationTest;
import dgs1sdt.magpie.metrics.createScoi.MetricCreateScoi;
import dgs1sdt.magpie.metrics.createScoi.MetricCreateScoiRepository;
import org.junit.Before;
import org.junit.Test;

import static org.hamcrest.CoreMatchers.equalTo;
import static org.junit.Assert.*;
import org.springframework.beans.factory.annotation.Autowired;

import static io.restassured.RestAssured.given;

public class ScoiControllerTest extends BaseIntegrationTest {

  @Autowired
  ScoiController scoiController;

  @Autowired
  ScoiRepository scoiRepository;

  @Autowired
  MetricCreateScoiRepository metricCreateScoiRepository;

  @Before
  public void clean() {
    scoiRepository.deleteAll();
    metricCreateScoiRepository.deleteAll();
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
}
