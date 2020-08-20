package dgs1sdt.magpie.products;

import dgs1sdt.magpie.metrics.MetricsService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import javax.validation.constraints.NotNull;
import java.io.IOException;
import java.util.Objects;

@RestController
@RequestMapping(ProductController.URI)
@CrossOrigin(value = {"*"}, exposedHeaders = {"Content-Disposition"})
@Slf4j
public class ProductController {
  public static final String URI = "/api/product";

  @Autowired
  ProductRepository productRepository;

  @Autowired
  MetricsService metricsService;

  @PostMapping
  public ResponseEntity<Void> uploadNewFile(@NotNull @RequestParam("file") MultipartFile multipartFile,
                                            @RequestParam(value = "rfiId", defaultValue = "") String rfiId,
                                            @RequestParam(value = "userName", defaultValue = "") String userName) throws
    IOException {

    Product upload =
      new Product(Short.parseShort(rfiId), Objects.requireNonNull(multipartFile.getOriginalFilename()),
        multipartFile.getContentType(),
        multipartFile.getBytes());
    productRepository.save(upload);

    long uploadId = productRepository.findAll().get(productRepository.findAll().size() - 1).getId();

    metricsService.addUploadFileMetric(rfiId, uploadId, userName);

    java.net.URI location = ServletUriComponentsBuilder.fromCurrentRequest().build().toUri();
    return ResponseEntity.created(location).build();
  }

  @GetMapping
  public ResponseEntity<byte[]> downloadProduct(@RequestParam(value = "rfiId", defaultValue = "-1") long rfiId,
                                                @RequestParam(value = "userName", defaultValue = "") String userName) {
    Product upload = productRepository.findByRfiId(rfiId);
    metricsService.addDownloadProduct(rfiId, userName);
    if (upload == null)
      return ResponseEntity.notFound().build();

    return ResponseEntity.ok()
      .contentType(MediaType.parseMediaType(upload.getContentType()))
      .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + upload.getFileName() + "\"")
      .body(upload.getData());
  }

  public String getProductName(long rfiId) {
    try {
      return productRepository.findByRfiId(rfiId).getFileName();
    } catch (NullPointerException e) {
      return null;
    }
  }

}
