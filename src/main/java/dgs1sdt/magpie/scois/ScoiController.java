package dgs1sdt.magpie.scois;

import dgs1sdt.magpie.ixns.IxnRepository;
import dgs1sdt.magpie.metrics.MetricsService;
import dgs1sdt.magpie.rfis.Rfi;
import dgs1sdt.magpie.rfis.RfiRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping(ScoiController.URI)
public class ScoiController {
  public static final String URI = "/api/scoi";

  private ScoiRepository scoiRepository;
  private MetricsService metricsService;
  private RfiRepository rfiRepository;
  private IxnRepository ixnRepository;

  @Autowired
  public void setScoiRepository(ScoiRepository scoiRepository) {
    this.scoiRepository = scoiRepository;
  }

  @Autowired
  public void setMetricsService(MetricsService metricsService) {
    this.metricsService = metricsService;
  }

  @Autowired
  public void setRfiRepository(RfiRepository rfiRepository) {
    this.rfiRepository = rfiRepository;
  }

  @Autowired
  public void setIxnRepository(IxnRepository ixnRepository) {
    this.ixnRepository = ixnRepository;
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

  @GetMapping(path = "/all")
  public List<Scoi> getAllScois() {
    return scoiRepository.findAll();
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

  @GetMapping(path = "/rfi")
  public ResponseEntity<List<RfiAssociation>> getRfiAssociations(
    @RequestParam(name = "name", defaultValue = "") String name) {
    List<RfiAssociation> rfiAssociations = new ArrayList<>();

    for (Rfi rfi : rfiRepository.findAll()) {
      if (!ixnRepository.findAllByRfiIdContainingScoiName(rfi.getId(), name).isEmpty()) {
        rfiAssociations.add(new RfiAssociation(rfi.getRfiNum(), rfi.getDescription()));
      }
    }

    if (rfiAssociations.isEmpty()) {
      return ResponseEntity.notFound().build();
    }
    return ResponseEntity.ok().body(rfiAssociations);
  }
}
