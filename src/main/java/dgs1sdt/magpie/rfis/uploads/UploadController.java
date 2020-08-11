package dgs1sdt.magpie.rfis.uploads;

import dgs1sdt.magpie.metrics.MetricsService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import javax.validation.constraints.NotNull;
import java.io.IOException;
import java.util.Objects;

@RestController
@RequestMapping(UploadController.URI)
@CrossOrigin(value = {"*"}, exposedHeaders = {"Content-Disposition"})
@Slf4j
public class UploadController {
  public static final String URI = "/api/uploadProduct";

  @Autowired
  UploadRepository uploadRepository;

  @Autowired
  MetricsService metricsService;

  @PostMapping
  public ResponseEntity<Void> uploadNewFile(@NotNull @RequestParam("file") MultipartFile multipartFile,
                                            @RequestParam(value = "rfiId", defaultValue = "") String rfiId,
                                            @RequestParam(value = "userName", defaultValue = "") String userName) throws
    IOException {

    Upload upload =
      new Upload(Short.parseShort(rfiId), Objects.requireNonNull(multipartFile.getOriginalFilename()),
        multipartFile.getContentType(),
        multipartFile.getBytes());
    uploadRepository.save(upload);

    int uploadId = uploadRepository.findAll().get(uploadRepository.findAll().size() - 1).getId();

    metricsService.addUploadFileMetric(rfiId, uploadId, userName);

    java.net.URI location = ServletUriComponentsBuilder.fromCurrentRequest().build().toUri();
    return ResponseEntity.created(location).build();
  }
}
