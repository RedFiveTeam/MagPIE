package dgs1sdt.magpie.rfis.uploads;

import dgs1sdt.magpie.BaseIntegrationTest;
import dgs1sdt.magpie.metrics.uploadFile.MetricUploadFileRepository;
import dgs1sdt.magpie.rfis.Rfi;
import dgs1sdt.magpie.rfis.RfiRepository;
import io.restassured.http.ContentType;
import org.junit.Before;
import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.TestPropertySource;

import java.io.File;
import java.util.Date;

import static io.restassured.RestAssured.given;
import static org.junit.Assert.assertEquals;

@TestPropertySource(
  properties = {
    "GETS_URI_OPEN_PENDING=",
    "GETS_URI_CLOSED=",
    "GETS_REQUEST_TIME_FRAME_IN_DAYS=20"
  }
)
public class UploadControllerTest extends BaseIntegrationTest {
  RfiRepository rfiRepository;
  UploadController uploadController;
  UploadRepository uploadRepository;
  MetricUploadFileRepository metricUploadFileRepository;

  @Autowired
  public void setUploadController(UploadController uploadController) {
    this.uploadController = uploadController;
  }

  @Autowired
  public void setRfiRepository(RfiRepository rfiRepository) {
    this.rfiRepository = rfiRepository;
  }

  @Autowired
  public void setUploadRepository(UploadRepository uploadRepository) {
    this.uploadRepository = uploadRepository;
  }

  @Autowired
  public void setMetricUploadFileRepository(MetricUploadFileRepository metricUploadFileRepository) {
    this.metricUploadFileRepository = metricUploadFileRepository;
  }

  @Before
  public void clean() {
    rfiRepository.deleteAll();
    uploadRepository.deleteAll();
    metricUploadFileRepository.deleteAll();
  }

  @Test
  public void savesUploadsToRepo() {
    Rfi rfi =
      new Rfi("SDT20-0001", "", "OPEN", new Date(), "", new Date(), "", "", "", "", "", "", "", "", "", "", "", "");
    rfiRepository.save(rfi);
    long rfiId = rfiRepository.findByRfiNum("SDT20-0001").getId();

    File file = new File("./src/main/resources/TestFilePleaseIgnore.kml");

    given()
      .port(port)
      .multiPart("file", file)
      .param("name", file.getName())
      .accept(ContentType.JSON)
      .when()
      .post(UploadController.URI + "?rfiId=" + rfiId + "&userName=billy.bob.joe")
      .then()
      .statusCode(201);

    long uploadId = uploadRepository.findAll().get(0).getId();

    assertEquals(1, metricUploadFileRepository.findAll().size());
    assertEquals("billy.bob.joe", metricUploadFileRepository.findAll().get(0).getUserName());
    assertEquals(rfiId, metricUploadFileRepository.findAll().get(0).getRfiId());
    assertEquals(uploadId, metricUploadFileRepository.findAll().get(0).getUploadId());
    assertEquals(1, uploadRepository.findAll().size());
    assertEquals("TestFilePleaseIgnore.kml", uploadRepository.findAll().get(0).getFileName());
    assertEquals(rfiId, uploadRepository.findAll().get(0).getRfiId());
  }
}
