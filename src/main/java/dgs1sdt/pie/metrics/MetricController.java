package dgs1sdt.pie.metrics;

import dgs1sdt.pie.metrics.getsclick.GETSClicksRepository;
import dgs1sdt.pie.metrics.getsclick.GetsClick;
import dgs1sdt.pie.metrics.getsclick.GetsClickJSON;
import dgs1sdt.pie.metrics.refreshclick.RefreshClick;
import dgs1sdt.pie.metrics.refreshclick.RefreshClickRepository;
import dgs1sdt.pie.metrics.rfifetch.RfiFetch;
import dgs1sdt.pie.metrics.rfifetch.RfiFetchJson;
import dgs1sdt.pie.metrics.rfifetch.RfiFetchRepository;
import dgs1sdt.pie.metrics.rfiprioritychange.RfiPriorityChange;
import dgs1sdt.pie.metrics.rfiprioritychange.RfiPriorityChangeRepository;
import dgs1sdt.pie.metrics.rfiupdate.RfiUpdate;
import dgs1sdt.pie.metrics.rfiupdate.RfiUpdateRepository;
import dgs1sdt.pie.metrics.sitevisit.SiteVisit;
import dgs1sdt.pie.metrics.sitevisit.SiteVisitRepository;
import dgs1sdt.pie.metrics.sortclick.SortClick;
import dgs1sdt.pie.metrics.sortclick.SortClickJson;
import dgs1sdt.pie.metrics.sortclick.SortClicksRepository;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.Date;
import java.util.List;

@RestController
@RequestMapping(MetricController.URI)
public class MetricController {
  public static final String URI = "/api/metrics";

  private GETSClicksRepository getsClicksRepository;
  private SiteVisitRepository siteVisitRepository;
  private SortClicksRepository sortClicksRepository;
  private RfiFetchRepository rfiFetchRepository;
  private RfiPriorityChangeRepository rfiPriorityChangeRepository;
  private RfiUpdateRepository rfiUpdateRepository;
  private RefreshClickRepository refreshClickRepository;

  public MetricController(GETSClicksRepository getsClicksRepository,
                          SiteVisitRepository siteVisitRepository,
                          SortClicksRepository sortClicksRepository,
                          RfiFetchRepository rfiFetchRepository,
                          RfiPriorityChangeRepository rfiPriorityChangeRepository,
                          RfiUpdateRepository rfiUpdateRepository,
                          RefreshClickRepository refreshClickRepository
  ) {
    this.getsClicksRepository = getsClicksRepository;
    this.siteVisitRepository = siteVisitRepository;
    this.sortClicksRepository = sortClicksRepository;
    this.rfiFetchRepository = rfiFetchRepository;
    this.rfiPriorityChangeRepository = rfiPriorityChangeRepository;
    this.rfiUpdateRepository = rfiUpdateRepository;
    this.refreshClickRepository = refreshClickRepository;
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

  @GetMapping(path = "/refresh-clicks")
  public long getRefreshClickCount() {
    return refreshClickRepository.count();
  }

  @PostMapping(path = "/refresh-click")
  public void logRefreshClick() {
    RefreshClick refreshClick = new RefreshClick(new Date());
    this.refreshClickRepository.save(refreshClick);
  }

  @GetMapping(path = "/gets-clicks")
  public long getGETSClicks() {
    return getsClicksRepository.count();
  }

  @PostMapping(path = "/gets-click")
  public GetsClick create(@Valid @RequestBody GetsClickJSON getsClickJSON) {
    GetsClick getsClick = new GetsClick(
      new Date(),
      getsClickJSON.getStatus(),
      getsClickJSON.getUrl()

    );
    return this.getsClicksRepository.save(getsClick);
  }

  @PostMapping(path = "/sort-click")
  public SortClick create(@Valid @RequestBody SortClickJson sortClickJSON) {
    SortClick sortClick = new SortClick(
      new Date(),
      sortClickJSON.getKey(),
      sortClickJSON.getOrder()
    );
    return this.sortClicksRepository.save(sortClick);
  }

  @PostMapping(path = "/rfi-fetch")
  public RfiFetch create (@Valid @RequestBody RfiFetchJson rfiFetchJson) {
    RfiFetch rfiFetch = new RfiFetch(
      new Date(rfiFetchJson.getStart_time()),
      new Date(rfiFetchJson.getEnd_time())
    );
    return this.rfiFetchRepository.save(rfiFetch);
  }

  public List<RfiPriorityChange> addRfiPriorityChanges(List<RfiPriorityChange> rfiPriorityChanges) {
    return this.rfiPriorityChangeRepository.saveAll(rfiPriorityChanges);
  }

  public RfiUpdate addRfiUpdate(RfiUpdate rfiUpdate) {
    return this.rfiUpdateRepository.save(rfiUpdate);
  }

}
