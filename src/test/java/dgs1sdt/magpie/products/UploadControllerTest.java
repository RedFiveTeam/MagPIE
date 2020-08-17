package dgs1sdt.magpie.products;

import dgs1sdt.magpie.BaseIntegrationTest;
import dgs1sdt.magpie.metrics.downloadProduct.MetricDownloadProduct;
import dgs1sdt.magpie.metrics.downloadProduct.MetricDownloadProductRepository;
import dgs1sdt.magpie.metrics.uploadProduct.MetricUploadProductRepository;
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
  ProductController uploadController;
  ProductRepository productRepository;
  MetricUploadProductRepository metricUploadProductRepository;
  MetricDownloadProductRepository metricDownloadProductRepository;

  @Autowired
  public void setUploadController(ProductController uploadController) {
    this.uploadController = uploadController;
  }

  @Autowired
  public void setRfiRepository(RfiRepository rfiRepository) {
    this.rfiRepository = rfiRepository;
  }

  @Autowired
  public void setUploadRepository(ProductRepository productRepository) {
    this.productRepository = productRepository;
  }

  @Autowired
  public void setMetricUploadFileRepository(MetricUploadProductRepository metricUploadProductRepository) {
    this.metricUploadProductRepository = metricUploadProductRepository;
  }

  @Autowired
  public void setMetricDownloadProductRepository(MetricDownloadProductRepository metricDownloadProductRepository) {
    this.metricDownloadProductRepository = metricDownloadProductRepository;
  }

  @Before
  public void clean() {
    rfiRepository.deleteAll();
    productRepository.deleteAll();
    metricUploadProductRepository.deleteAll();
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
      .post(ProductController.URI + "?rfiId=" + rfiId + "&userName=billy.bob.joe")
      .then()
      .statusCode(201);

    long uploadId = productRepository.findAll().get(0).getId();

    assertEquals(1, metricUploadProductRepository.findAll().size());
    assertEquals("billy.bob.joe", metricUploadProductRepository.findAll().get(0).getUserName());
    assertEquals(rfiId, metricUploadProductRepository.findAll().get(0).getRfiId());
    assertEquals(uploadId, metricUploadProductRepository.findAll().get(0).getUploadId());
    assertEquals(1, productRepository.findAll().size());
    assertEquals("TestFilePleaseIgnore.kml", productRepository.findAll().get(0).getFileName());
    assertEquals(rfiId, productRepository.findAll().get(0).getRfiId());
  }

  @Test
  public void returnsFileFromRepo() {
    // Arrange - setup
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
      .post(ProductController.URI + "?rfiId=" + rfiId + "&userName=billy.bob.joe")
      .then()
      .statusCode(201);

    // Act - do what we want to test
    // Assert - test whether the outcome of our actions is what we expect
    given()
      .port(port)
      .when()
      .get(ProductController.URI + "?rfiId=" + rfiId + "&userName=billy.bob.joe")
      .then()
      .statusCode(200);

    given()
      .port(port)
      .when()
      .get(ProductController.URI + "?rfiId=" + (rfiId + 1) + "&userName=billy.bob.joe")
      .then()
      .statusCode(404);

    assertEquals(2, metricDownloadProductRepository.findAll().size());

    MetricDownloadProduct metric = metricDownloadProductRepository.findAll().get(0);

    assertEquals(rfiId, metric.getRfiId());
    assertEquals("billy.bob.joe", metric.getUserName());
  }
}
