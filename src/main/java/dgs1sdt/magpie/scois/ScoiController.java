package dgs1sdt.magpie.scois;

import dgs1sdt.magpie.ixns.Ixn;
import dgs1sdt.magpie.ixns.IxnRepository;
import dgs1sdt.magpie.metrics.MetricsService;
import dgs1sdt.magpie.rfis.Rfi;
import dgs1sdt.magpie.rfis.RfiRepository;
import dgs1sdt.magpie.tgts.Target;
import dgs1sdt.magpie.tgts.TargetRepository;
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
  private TargetRepository targetRepository;
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
  public void setTargetRepository(TargetRepository targetRepository) {
    this.targetRepository = targetRepository;
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

  @GetMapping(path = "/tgt")
  public ResponseEntity<List<TgtAssociation>> getTgtAssociations(
    @RequestParam(name = "name", defaultValue = "") String name) {
    List<TgtAssociation> tgtAssociations = new ArrayList<>();

    for (Target tgt : targetRepository.findAll()) {
      List<Ixn> associatedIxns = ixnRepository.findAllByTgtIdContainingScoiName(tgt.getId(), name);

      if (!associatedIxns.isEmpty()) {
        //Find tgtAssociation in list, or add new one
        TgtAssociation tgtAssociation = new TgtAssociation(tgt.getName(), tgt.getMgrs());
        if (tgtAssociations.contains(tgtAssociation)) {
          tgtAssociation = tgtAssociations.get(tgtAssociations.indexOf(tgtAssociation));
        } else {
          tgtAssociations.add(tgtAssociation);
        }

        //iterate through all IXN and add analysts to association POC list
        for (Ixn ixn : associatedIxns) {
          if (ixn.getExploitAnalyst() != null && !ixn.getExploitAnalyst().equals("")) {
            tgtAssociation.getEmails().add(ixn.getExploitAnalyst());
          }
          if (ixn.getTrackAnalyst() != null && !ixn.getTrackAnalyst().equals("")) {
            tgtAssociation.getEmails().add(ixn.getTrackAnalyst());
          }
        }
      }
    }

    if (tgtAssociations.isEmpty()) {
      return ResponseEntity.notFound().build();
    }
    return ResponseEntity.ok().body(tgtAssociations);
  }

  @GetMapping(path = "/ixn")
  public ResponseEntity<List<IxnAssociation>> getIxnAssociations(
    @RequestParam(name = "name", defaultValue = "") String name) {
    List<IxnAssociation> ixnAssociations = new ArrayList<>();

    //iterate through ixns that reference SCOI and create associations
    for (Ixn ixn : ixnRepository.findAllByTrackNarrativeContains(name)) {
      ixnAssociations.add(new IxnAssociation(ixn.getActivity(), ixn.getTrackNarrative()));
    }

    if (ixnAssociations.isEmpty()) {
      return ResponseEntity.notFound().build();
    }
    return ResponseEntity.ok().body(ixnAssociations);
  }


}
