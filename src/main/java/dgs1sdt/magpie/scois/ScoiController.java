package dgs1sdt.magpie.scois;

import dgs1sdt.magpie.metrics.MetricsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
@RequestMapping(ScoiController.URI)
public class ScoiController {
  public static final String URI = "/api/scoi";

  private ScoiRepository scoiRepository;
  private MetricsService metricsService;

  @Autowired
  public void setScoiRepository(ScoiRepository scoiRepository) {
    this.scoiRepository = scoiRepository;
  }

  @Autowired
  public void setMetricsService(MetricsService metricsService) {
    this.metricsService = metricsService;
  }

  @PostMapping
  public Scoi addScoi(@Valid @RequestBody ScoiJson scoiJson,
                      @RequestParam(name = "userName", defaultValue = "") String userName) {
    if (scoiRepository.findByName(scoiJson.getName()) == null) {
      Scoi scoi = scoiRepository.save(new Scoi(scoiJson.getName(), scoiJson.getMgrs()));
      //Save a metric to our metric repository
      metricsService.addCreateScoi(scoi.getId(), userName);
      return scoi;
    }
    return scoiRepository.findByName(scoiJson.getName());
  }

  @GetMapping
  public ResponseEntity<Scoi> getScoi(@RequestParam(name = "name", defaultValue = "") String name) {
    Scoi scoi = scoiRepository.findByName(name);

    if (scoi == null) {
      return ResponseEntity.notFound().build();
    } else {
      return ResponseEntity.ok().body(scoi);
    }
  }
}
