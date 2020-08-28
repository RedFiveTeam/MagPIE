package dgs1sdt.magpie.products;

import dgs1sdt.magpie.metrics.MetricsService;
import dgs1sdt.magpie.metrics.deleteProduct.MetricDeleteProduct;
import dgs1sdt.magpie.metrics.deleteProduct.MetricDeleteProductRepository;
import dgs1sdt.magpie.metrics.undoProductDelete.MetricUndoProductDelete;
import dgs1sdt.magpie.metrics.undoProductDelete.MetricUndoProductDeleteRepository;
import dgs1sdt.magpie.rfis.RfiRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.io.IOException;
import java.sql.Timestamp;
import java.util.Date;
import java.util.List;
import java.util.Objects;

import static java.util.Comparator.comparing;

@Service
public class ProductService {
  @Autowired
  ProductRepository productRepository;

  @Autowired
  RfiRepository rfiRepository;

  @Autowired
  MetricDeleteProductRepository metricDeleteProductRepository;

  @Autowired
  MetricUndoProductDeleteRepository metricUndoProductDeleteRepository;

  @Autowired
  MetricsService metricsService;

  public ResponseEntity<Void> uploadNewFile(MultipartFile file, String rfiId, String userName) throws IOException {
    Product upload =
      new Product(Short.parseShort(rfiId), Objects.requireNonNull(file.getOriginalFilename()),
        file.getContentType(),
        file.getBytes());
    productRepository.save(upload);

    long uploadId = productRepository.findAll().get(productRepository.findAll().size() - 1).getId();

    metricsService.addUploadFileMetric(rfiId, uploadId, userName);

    java.net.URI location = ServletUriComponentsBuilder.fromCurrentRequest().build().toUri();
    return ResponseEntity.created(location).build();
  }

  public void undoDeleteProduct(long rfiId, String userName) {
    if (rfiRepository.findById(rfiId).isPresent() && !productRepository.findAllByRfiId(rfiId).isEmpty()) {
      String rfiNum = rfiRepository.findById(rfiId).get().getRfiNum();
      Product product = findMostRecentlyDeleted(productRepository.findAllByRfiIdAndDeletedIsNotNull(rfiId));

      product.setDeleted(null);
      productRepository.save(product);

      metricUndoProductDeleteRepository.save(new MetricUndoProductDelete(rfiNum, userName));
    }
  }

  public ResponseEntity<byte[]> downloadProduct(long rfiId, String userName) {
    Product upload = productRepository.findByRfiId(rfiId);
    metricsService.addDownloadProduct(rfiId, userName);
    if (upload == null) {
      return ResponseEntity.notFound().build();
    }
    return ResponseEntity.ok()
      .contentType(MediaType.parseMediaType(upload.getContentType()))
      .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + upload.getFileName() + "\"")
      .body(upload.getData());
  }

  public String getProductName(long rfiId) {
    try {
      Product product = productRepository.findByRfiIdAndDeletedIsNull(rfiId);
      if (product.getDeleted() == null) {
        return product.getFileName();
      } else {
        return null;
      }
    } catch (NullPointerException e) {
      return null;
    }
  }

  public void setDeleteProduct(long rfiId, String userName) {
    if (productRepository.findByRfiIdAndDeletedIsNull(rfiId) != null) {
      Product product = productRepository.findByRfiIdAndDeletedIsNull(rfiId);
      Timestamp now = new Timestamp(new Date().getTime());

      if (rfiRepository.findById(rfiId).isPresent()) {
        String rfiNum = rfiRepository.findById(rfiId).get().getRfiNum();
        metricDeleteProductRepository.save(new MetricDeleteProduct(rfiNum, userName, now));
      }

      product.setDeleted(now);
      productRepository.save(product);
    }
  }

  public void deleteProduct(long id) {
    productRepository.deleteById(id);
  }

  public List<Product> getDeletedProducts() {
    return productRepository.findAllByDeletedIsNotNull();
  }

  private Product findMostRecentlyDeleted(List<Product> products) {
    return products.stream().max(comparing(Product::getDeleted)).get();
  }
}
