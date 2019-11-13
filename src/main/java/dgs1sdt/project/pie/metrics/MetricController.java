package dgs1sdt.project.pie.metrics;

import dgs1sdt.project.pie.metrics.getsclick.GETSClickJSON;
import dgs1sdt.project.pie.metrics.getsclick.GETSClicksRepository;
import dgs1sdt.project.pie.metrics.getsclick.GetsClick;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.Date;

@RestController
@RequestMapping(MetricController.URI)
public class MetricController {
  public static final String URI = "/api/metrics";

  private GETSClicksRepository getsClicksRepository;
  private SiteVisitRepository siteVisitRepository;

  public MetricController(GETSClicksRepository getsClicksRepository, SiteVisitRepository siteVisitRepository) {
    this.getsClicksRepository = getsClicksRepository;
    this.siteVisitRepository = siteVisitRepository;
  }

  @GetMapping(path = "/site-visits")
  public long getSiteVisitCount() {
    return siteVisitRepository.count();
  }

  @PostMapping(path = "/site-visit")
  public void logSiteVisit() {
    SiteVisit siteVisit = new SiteVisit(new Date());
    this.siteVisitRepository.save(siteVisit);
  }

  @GetMapping(path = "/gets-clicks")
  public long getGETSClicks() {
    return getsClicksRepository.count();
  }

  @PostMapping(path = "/gets-click")
  public @ResponseBody
  GetsClick create (@Valid @RequestBody GETSClickJSON getsClickJSON) {
    GetsClick getsClick = new GetsClick(
      new Date(),
      getsClickJSON.getStatus(),
      getsClickJSON.getUrl()

    );
    System.out.print(getsClick);
    return this.getsClicksRepository.save(getsClick);
  }

}
