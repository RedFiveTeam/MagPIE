package dgs1sdt.pie.rfis;

import dgs1sdt.pie.metrics.MetricController;
import dgs1sdt.pie.metrics.changeRfiPriority.MetricChangeRfiPriority;
import dgs1sdt.pie.metrics.deleteTarget.MetricDeleteTarget;
import dgs1sdt.pie.rfis.exploitDates.ExploitDate;
import dgs1sdt.pie.rfis.exploitDates.ExploitDateJson;
import dgs1sdt.pie.rfis.exploitDates.ExploitDateRepository;
import dgs1sdt.pie.rfis.targets.Target;
import dgs1sdt.pie.rfis.targets.TargetJson;
import dgs1sdt.pie.rfis.targets.TargetRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.Date;
import java.util.List;


@RestController
@RequestMapping(RfiController.URI)
public class RfiController {
  public static final String URI = "/api/rfis";

  private MetricController metricController;
  private RfiService rfiService;
  private RfiRepository rfiRepository;
  private ExploitDateRepository exploitDateRepository;
  private TargetRepository targetRepository;

  @Autowired
  public void setMetricController(MetricController metricController) {
    this.metricController = metricController;
  }
  @Autowired
  public void setRfiService(RfiService rfiService) {
    this.rfiService = rfiService;
  }
  @Autowired
  public void setRfiRepository(RfiRepository rfiRepository) {
    this.rfiRepository = rfiRepository;
  }
  @Autowired
  public void setExploitDateRepository(ExploitDateRepository exploitDateRepository) {
    this.exploitDateRepository = exploitDateRepository;
  }
  @Autowired
  public void setTargetRepository(TargetRepository targetRepository) {
    this.targetRepository = targetRepository;
  }

  @Autowired
  public RfiController(RfiService rfiService,
                       RfiRepository rfiRepository,
                       ExploitDateRepository exploitDateRepository,
                       TargetRepository targetRepository) {
    this.rfiService = rfiService;
    this.rfiRepository = rfiRepository;
    this.exploitDateRepository = exploitDateRepository;
    this.targetRepository = targetRepository;
  }


  @GetMapping
  public List<Rfi> getAllRfis() {
    return this.rfiService.fetchRfisFromRepo();
  }

  //Return value: whether the passed priority change results in a valid priority list
  @PostMapping(path = "/update-priority")
  public boolean updatePriority (@Valid @RequestBody RfiPriorityJson[] rfiPriorityJsons) {
    List<Rfi> rfis = new ArrayList<>();
    List<MetricChangeRfiPriority> metrics = new ArrayList<>();

    List<Rfi> repoRfis = rfiRepository.findAll();
    repoRfis.removeIf(rfi -> rfi.getPriority() < 1 || !rfi.getStatus().equals("OPEN"));

    for (RfiPriorityJson rfiPriorityJson : rfiPriorityJsons) {
      Rfi rfiToUpdate = rfiRepository.findByRfiNum(rfiPriorityJson.getRfiNum());
      if(rfiToUpdate != null) {
        metrics.add(
          new MetricChangeRfiPriority(rfiToUpdate.getRfiNum(), rfiToUpdate.getPriority(), rfiPriorityJson.getPriority(), new Date())
        );

        rfiToUpdate.setPriority(rfiPriorityJson.getPriority());
        rfis.add(rfiToUpdate);

      } else {
        System.err.println("Updating priority on previously unknown RFI " + rfiPriorityJson.getRfiNum());
      }
    }

    //Update priorities in repo list from frontend priorities
    for (Rfi rfi : rfis) {
      for (Rfi repoRfi : repoRfis) {
        if (repoRfi.getRfiNum().equals(rfi.getRfiNum())) {
          repoRfi.setPriority(rfi.getPriority());
          break;
        }
      }
    }

    //Check to make sure each priority 1 through n is used
    int length = repoRfis.size();
    boolean [] priorityExists = new boolean[length];

    for (int i = 0; i < length; i++) //initialize
      priorityExists[i] = false;

    for (Rfi rfi : repoRfis) { // mark used
      priorityExists[rfi.getPriority() - 1] = true;
    }

    for (int i = 0; i < length; i++) //Check all priorities
      if (!priorityExists[i]) //A priority is missing, so tell front end that reprioritization failed
        return false;

    //Add metrics and save pri updates
    metricController.addChangeRfiPriority(metrics);
    rfiRepository.saveAll(repoRfis);

    //Tell front end that reprioritization was successful
    return true;
  }

  @PostMapping(path = "/change-exploit-date")
  public void changeExploitDate(@Valid @RequestBody ExploitDateJson exploitDateJson) {
    Rfi rfi = rfiRepository.findByRfiNum(exploitDateJson.getRfiNum());
    if (
      exploitDateRepository.findAllByRfiId(rfi.getId()).stream()
        .noneMatch(exploitDate -> exploitDate.getExploitDate().equals(exploitDateJson.getNewExploitDate()))
    ) {
      ExploitDate exploitDate = new ExploitDate(exploitDateJson.getNewExploitDate(), rfi.getId());
      exploitDateRepository.save(exploitDate);
      metricController.addChangeExploitDate(exploitDateJson);
    }
  }

  @PostMapping(path = "/dates")
  public List<ExploitDate> fetchExploitDates(@Valid @RequestBody String rfiNum) {
    System.out.println(rfiNum);
    List<ExploitDate> dates = exploitDateRepository.findAllByRfiId(
      rfiRepository.findByRfiNum(rfiNum).getId()
    );
    dates.sort(Comparator.comparing(ExploitDate::getExploitDate));
    return dates;
  }

  @PostMapping(path = "/add-target")
  public void addTarget(@Valid @RequestBody TargetJson targetJson){
    long rfiId = rfiRepository.findByRfiNum(targetJson.getRfiNum()).getId();
    long exploitDateId = exploitDateRepository.findByRfiIdAndExploitDate(rfiId, targetJson.getExploitDate()).getId();

    Target target = new Target(rfiId, exploitDateId, targetJson);
    Target duplicate = targetRepository.findByRfiIdAndExploitDateIdAndName(rfiId, exploitDateId, targetJson.getName());
    if(duplicate == null){
      targetRepository.save(target);
      metricController.addCreateTarget(targetJson);
    }
  }

  @GetMapping(path = "/{rfiId}/targets")
  public List<Target> getRfiTargets(@Valid @RequestBody @PathVariable("rfiId") long rfiId) {
    return targetRepository.findAllByRfiId(rfiId);
  }

  @GetMapping(path = "/{rfiId}/exploit-dates")
  public List<ExploitDate> getRfiExploitDates(@Valid @RequestBody @PathVariable("rfiId") long rfiId) {
    return exploitDateRepository.findAllByRfiId(rfiId);
  }

  @DeleteMapping(path = "/delete-target/{tgtId}")
  public List<Target> deleteTarget(@Valid @RequestBody @PathVariable("tgtId") long tgtId) {
    if (targetRepository.findById(tgtId).isPresent()) {
      long rfiId = targetRepository.findById(tgtId).get().getRfiId();
      long exploitDateId = targetRepository.findById(tgtId).get().getExploitDateId();
      if (rfiRepository.findById(rfiId).isPresent()) {
        String rfiNum = rfiRepository.findById(rfiId).get().getRfiNum();
        if (exploitDateRepository.findById(exploitDateId).isPresent()) {
          Timestamp exploitDate = exploitDateRepository.findById(exploitDateId).get().getExploitDate();

          MetricDeleteTarget metric = new MetricDeleteTarget(
            rfiNum,
            exploitDate,
            targetRepository.findById(tgtId).get().getName(),
            new Timestamp(new Date().getTime())
          );

          metricController.addDeleteTarget(metric);
          targetRepository.deleteById(tgtId);
          return getRfiTargets(rfiId);
        } else {

        System.err.println("Error deleting target: Could not find exploit date by id " + exploitDateId);
        }
      } else {
        System.err.println("Error deleting target: Could not find RFI by id " + rfiId);
      }
    } else {
      System.err.println("Error deleting target: Could not find target by id " + tgtId);
    }
    return new ArrayList<>();
  }

}
