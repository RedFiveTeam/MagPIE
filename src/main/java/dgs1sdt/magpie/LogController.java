package dgs1sdt.magpie;

import org.springframework.core.io.InputStreamResource;
import org.springframework.core.io.Resource;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.*;

@RestController
@RequestMapping(LogController.URI)
public class LogController {
  public static final String URI = "/api/logs";

  @GetMapping
  public ResponseEntity<Resource> download() throws IOException {

    File file = new File("magpie.log");

    InputStreamResource resource = new InputStreamResource(new FileInputStream(file));

    return ResponseEntity.ok()
      .contentLength(file.length())
      .contentType(MediaType.parseMediaType("application/octet-stream"))
      .body(resource);
  }
}
