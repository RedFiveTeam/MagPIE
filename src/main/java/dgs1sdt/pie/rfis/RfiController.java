package dgs1sdt.pie.rfis;

import dgs1sdt.pie.metrics.MetricController;
import dgs1sdt.pie.metrics.rfiprioritychange.RfiPriorityChange;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;


@RestController
@RequestMapping(RfiController.URI)
public class RfiController {
  public static final String URI = "/api/rfis";

  private RfiRepository rfiRepository;

  @Value("${GETS_URI_OPEN_PENDING}")
  private String getsUriOpenPending;

  @Value("${GETS_URI_CLOSED}")
  private String getsUriClosed;

  @Autowired
  private RfiService rfiService;

  @Autowired
  private MetricController metricController;

  public RfiController(RfiService rfiService, RfiRepository rfiRepository) {
    this.rfiService = rfiService;
    this.rfiRepository = rfiRepository;
  }

  @GetMapping
  public List<Rfi> getAllRfis() throws Exception {
    String[] uris = {getsUriOpenPending, getsUriClosed};
    return this.rfiService.fetchRfis(uris);
  }

  @PostMapping(path = "/update-priority")
  public List<Rfi> create (@Valid @RequestBody RfiJson[] rfiJsons) {
    List<Rfi> rfis = new ArrayList<>();
    List<RfiPriorityChange> metrics = new ArrayList<>();

    for (RfiJson rfiJson : rfiJsons) {
      Rfi rfiToUpdate = rfiRepository.findByRfiId(rfiJson.getRfiId());
      if(rfiToUpdate != null) {
        metrics.add(
          new RfiPriorityChange(rfiToUpdate.getRfiId(), rfiToUpdate.getPriority(), rfiJson.getPriority(), new Date())
        );

        rfiToUpdate.setPriority(rfiJson.getPriority());
        rfis.add(rfiToUpdate);

      } else {
        System.err.println("Updating priority on previously unknown RFI!");
      }
    }

    metricController.addRfiPriorityChanges(metrics);

    return this.rfiRepository.saveAll(rfis);
  }
}
