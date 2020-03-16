package dgs1sdt.magpie.tgts;

import dgs1sdt.magpie.tgts.exploitDates.ExploitDate;
import dgs1sdt.magpie.tgts.exploitDates.ExploitDateJson;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping(TargetController.URI)
public class TargetController {
  public static final String URI = "/api/targets";

  TargetService targetService;

  @Autowired
  public TargetController(TargetService targetService) {
    this.targetService = targetService;
  }

  @Autowired
  public void setTargetService(TargetService targetService) {
    this.targetService = targetService;
  }

  @GetMapping
  public List<Target> getTargets(@RequestParam(value = "rfiId") long rfiId) {
    return targetService.getTargets(rfiId);
  }

  @GetMapping(path = "/dates")
  public List<ExploitDate> getExploitDates(@RequestParam(value = "rfiId") long rfiId) {
    return targetService.getExploitDates(rfiId);
  }

  @PostMapping(path = "/post")
  public void postTarget(@Valid @RequestBody TargetJson targetJson) {
    targetService.postTarget(targetJson);
  }

  @PostMapping(path = "/dates/post")
  public List<ExploitDate> postExploitDate(@Valid @RequestBody ExploitDateJson exploitDateJson) {
    return targetService.postExploitDate(exploitDateJson);
  }

  @DeleteMapping(path = "/delete")
  public List<Target> deleteTarget(@RequestParam("targetId") long targetId) {
    return targetService.setDeletedTarget(targetId);
  }

  @DeleteMapping(path = "/dates/delete")
  public List<ExploitDate> deleteExploitDate(@RequestParam("exploitDateId") long exploitDateId) {
    return targetService.setDeletedExploitDate(exploitDateId);
  }
}
