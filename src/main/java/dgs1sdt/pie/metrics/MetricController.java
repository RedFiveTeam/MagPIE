package dgs1sdt.pie.metrics;

import dgs1sdt.pie.metrics.getsclick.GetsClickJSON;
import dgs1sdt.pie.metrics.getsclick.GETSClicksRepository;
import dgs1sdt.pie.metrics.getsclick.GetsClick;
import dgs1sdt.pie.metrics.sortclick.SortClick;
import dgs1sdt.pie.metrics.sortclick.SortClickJson;
import dgs1sdt.pie.metrics.sortclick.SortClicksRepository;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.Date;

@RestController
@RequestMapping(MetricController.URI)
public class MetricController {
  public static final String URI = "/api/metrics";

  private GETSClicksRepository getsClicksRepository;
  private SiteVisitRepository siteVisitRepository;
  private SortClicksRepository sortClicksRepository;

  public MetricController(GETSClicksRepository getsClicksRepository, SiteVisitRepository siteVisitRepository,
                          SortClicksRepository sortClicksRepository) {
    this.getsClicksRepository = getsClicksRepository;
    this.siteVisitRepository = siteVisitRepository;
    this.sortClicksRepository = sortClicksRepository;
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
  public GetsClick create (@Valid @RequestBody GetsClickJSON getsClickJSON) {
    GetsClick getsClick = new GetsClick(
      new Date(),
      getsClickJSON.getStatus(),
      getsClickJSON.getUrl()

    );
    return this.getsClicksRepository.save(getsClick);
  }

  @PostMapping(path = "/sort-click")
  public SortClick create (@Valid @RequestBody SortClickJson sortClickJSON) {
    SortClick sortClick = new SortClick(
      new Date(),
      sortClickJSON.getKey(),
      sortClickJSON.getOrder()
    );
    return this.sortClicksRepository.save(sortClick);
    }

}
