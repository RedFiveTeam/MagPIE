package dgs1sdt.magpie.products;

import dgs1sdt.magpie.metrics.MetricsService;
import dgs1sdt.magpie.metrics.deleteProduct.MetricDeleteProductRepository;
import dgs1sdt.magpie.metrics.undoProductDelete.MetricUndoProductDeleteRepository;
import dgs1sdt.magpie.rfis.RfiRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.validation.constraints.NotNull;
import java.io.IOException;

@RestController
@RequestMapping(ProductController.URI)
@CrossOrigin(value = {"*"}, exposedHeaders = {"Content-Disposition"})
@Slf4j
public class ProductController {
  public static final String URI = "/api/product";

  @Autowired
  ProductRepository productRepository;

  @Autowired
  RfiRepository rfiRepository;

  @Autowired
  MetricDeleteProductRepository metricDeleteProductRepository;

  @Autowired
  MetricUndoProductDeleteRepository metricUndoProductDeleteRepository;

  @Autowired
  ProductService productService;

  @Autowired
  MetricsService metricsService;

  @PostMapping
  public ResponseEntity<Void> uploadNewFile(@NotNull @RequestParam("file") MultipartFile multipartFile,
                                            @RequestParam(value = "rfiId", defaultValue = "") String rfiId,
                                            @RequestParam(value = "userName", defaultValue = "") String userName)
    throws IOException {
    return productService.uploadNewFile(multipartFile, rfiId, userName);
  }

  @PostMapping(path = "/undo-delete")
  public void undoDeleteProduct(@NotNull @RequestParam("rfiId") long rfiId, @RequestParam("userName") String userName) {
    productService.undoDeleteProduct(rfiId, userName);
  }

  @GetMapping
  public ResponseEntity<byte[]> downloadProduct(@RequestParam(value = "rfiId", defaultValue = "-1") long rfiId,
                                                @RequestParam(value = "userName", defaultValue = "") String userName) {
    return productService.downloadProduct(rfiId, userName);
  }

  @DeleteMapping(path = "/delete")
  public void deleteProduct(@NotNull @RequestParam("rfiId") long rfiId, @RequestParam("userName") String userName) {
    productService.setDeleteProduct(rfiId, userName);
  }
}
