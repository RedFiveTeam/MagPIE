package dgs1sdt.pie.metrics;

import dgs1sdt.pie.metrics.getsclick.GetsClick;
import dgs1sdt.pie.metrics.getsclick.GetsClickJSON;
import dgs1sdt.pie.metrics.getsclick.GetsClicksRepository;
import dgs1sdt.pie.metrics.refreshclicks.RefreshClicks;
import dgs1sdt.pie.metrics.refreshclicks.RefreshClicksRepository;
import dgs1sdt.pie.metrics.rfiexploitdateschange.RfiExploitDatesChange;
import dgs1sdt.pie.metrics.rfiexploitdateschange.RfiExploitDatesChangeRepository;
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
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.Calendar;
import java.util.Date;
import java.util.List;

@RestController
@RequestMapping(MetricController.URI)
@AllArgsConstructor
public class MetricController {
  public static final String URI = "/api/metrics";

  private GetsClicksRepository getsClicksRepository;
  private SiteVisitRepository siteVisitRepository;
  private SortClicksRepository sortClicksRepository;
  private RfiFetchRepository rfiFetchRepository;
  private RfiPriorityChangeRepository rfiPriorityChangeRepository;
  private RfiUpdateRepository rfiUpdateRepository;
  private RefreshClicksRepository refreshClicksRepository;
  private RfiExploitDatesChangeRepository rfiExploitDatesChangeRepository;

  @Autowired
  public void setGetsClicksRepository(GetsClicksRepository getsClicksRepository) {
    this.getsClicksRepository = getsClicksRepository;
  }
  @Autowired
  public void setSiteVisitRepository(SiteVisitRepository siteVisitRepository) {
    this.siteVisitRepository = siteVisitRepository;
  }
  @Autowired
  public void setSortClicksRepository(SortClicksRepository sortClicksRepository) {
    this.sortClicksRepository = sortClicksRepository;
  }
  @Autowired
  public void setRfiFetchRepository(RfiFetchRepository rfiFetchRepository) {
    this.rfiFetchRepository = rfiFetchRepository;
  }
  @Autowired
  public void setRfiPriorityChangeRepository(RfiPriorityChangeRepository rfiPriorityChangeRepository) {
    this.rfiPriorityChangeRepository = rfiPriorityChangeRepository;
  }
  @Autowired
  public void setRfiUpdateRepository(RfiUpdateRepository rfiUpdateRepository) {
    this.rfiUpdateRepository = rfiUpdateRepository;
  }
  @Autowired
  public void setRefreshClicksRepository(RefreshClicksRepository refreshClicksRepository) {
    this.refreshClicksRepository = refreshClicksRepository;
  }
  @Autowired
  public void setRfiExploitDatesChangeRepository(RfiExploitDatesChangeRepository rfiExploitDatesChangeRepository) {
    this.rfiExploitDatesChangeRepository = rfiExploitDatesChangeRepository;
  }

  @GetMapping(path = "/site-visits")
  public long getSiteVisitCount() {
    return siteVisitRepository.count();
  }

  @GetMapping(path = "/site-visits-week")
  public int[] getSiteVisitsLast7Days() throws Exception{
    List<SiteVisit> allSiteVisits = siteVisitRepository.findAll();

//    Array that has DATE epochs at midnight over the last 7 days
//    e.g. daysAgo[0] is midnight today, daysAgo[1] is midnight yesterday, etc.
    Date[] daysAgo = setupDaysAgo(7);

//    Returns array of site visits

    return matchSiteVisitsToDays(allSiteVisits, daysAgo);
  }

  private int[] matchSiteVisitsToDays(List<SiteVisit> allSiteVisits, Date[] daysAgo) {
    int [] last7Days = {0, 0, 0, 0, 0, 0, 0};
    for (SiteVisit siteVisit : allSiteVisits) {
      Date datetime = siteVisit.getDatetime();
      for (int i = 6; i > 0; i-- ) {
        if(datetime.after(daysAgo[i]) && datetime.before(daysAgo[i - 1])) {
          last7Days[6 - i]++;
        }
      }
      if (datetime.after(daysAgo[0])) {
        last7Days[6]++;
      }
    }
    return last7Days;
  }

  private Date[] setupDaysAgo(int numDays) {
    Date daysAgo[] = new Date[numDays];
    Long now = new Date().getTime();
    Long millisecondsInADay = 86400000L;
    Calendar cal[] = new Calendar[numDays];
    for(int i = 0; i < numDays ; i++) {
      cal[i] = Calendar.getInstance(); // locale-specific
      cal[i].setTime(new Date(now - i * millisecondsInADay));
      cal[i].set(Calendar.HOUR_OF_DAY, 0);
      cal[i].set(Calendar.MINUTE, 0);
      cal[i].set(Calendar.SECOND, 0);
      cal[i].set(Calendar.MILLISECOND, 0);
      daysAgo[i] = new Date(cal[i].getTimeInMillis());
    }
    return daysAgo;
  }

  @PostMapping(path = "/site-visit")
  public void logSiteVisit() {
    SiteVisit siteVisit = new SiteVisit(new Date());
    this.siteVisitRepository.save(siteVisit);
  }

  @GetMapping(path = "/refresh-clicks")
  public long getRefreshClickCount() {
    return refreshClicksRepository.count();
  }

  @PostMapping(path = "/refresh-click")
  public void logRefreshClick() {
    RefreshClicks refreshClicks = new RefreshClicks(new Date());
    this.refreshClicksRepository.save(refreshClicks);
  }

  @GetMapping(path = "/gets-clicks")
  public long getGetsClicks() {
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

  public RfiExploitDatesChange addRfiExploitDatesChange(RfiExploitDatesChange rfiExploitDatesChange) {
    return this.rfiExploitDatesChangeRepository.save(rfiExploitDatesChange);
  }
}
