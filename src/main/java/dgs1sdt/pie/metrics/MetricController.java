package dgs1sdt.pie.metrics;

import dgs1sdt.pie.metrics.clickgets.MetricClickGets;
import dgs1sdt.pie.metrics.clickgets.MetricClickGetsJson;
import dgs1sdt.pie.metrics.clickgets.MetricClickGetsRepository;
import dgs1sdt.pie.metrics.clickrefresh.MetricClickRefresh;
import dgs1sdt.pie.metrics.clickrefresh.MetricClickRefreshRepository;
import dgs1sdt.pie.metrics.changeexploitdate.MetricChangeExploitDate;
import dgs1sdt.pie.metrics.changeexploitdate.MetricChangeExploitDateRepository;
import dgs1sdt.pie.metrics.rfifetchtime.MetricRfiFetchTime;
import dgs1sdt.pie.metrics.rfifetchtime.MetricRfiFetchTimeJson;
import dgs1sdt.pie.metrics.rfifetchtime.MetricRfiFetchTimeRepository;
import dgs1sdt.pie.metrics.changerfipriority.MetricChangeRfiPriority;
import dgs1sdt.pie.metrics.changerfipriority.MetricChangeRfiPriorityRepository;
import dgs1sdt.pie.metrics.changerfi.MetricChangeRfi;
import dgs1sdt.pie.metrics.changerfi.MetricChangeRfiRepository;
import dgs1sdt.pie.metrics.sitevisit.MetricSiteVisit;
import dgs1sdt.pie.metrics.sitevisit.MetricSiteVisitRepository;
import dgs1sdt.pie.metrics.sortclick.MetricClickSort;
import dgs1sdt.pie.metrics.sortclick.MetricClickSortJson;
import dgs1sdt.pie.metrics.sortclick.MetricClickSortRepository;
import dgs1sdt.pie.rfis.exploitdates.ExploitDateJson;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.sql.Timestamp;
import java.util.Calendar;
import java.util.Date;
import java.util.List;

@RestController
@RequestMapping(MetricController.URI)
@AllArgsConstructor
public class MetricController {
  public static final String URI = "/api/metrics";

  private MetricClickGetsRepository metricClickGetsRepository;
  private MetricSiteVisitRepository metricSiteVisitRepository;
  private MetricClickSortRepository metricClickSortRepository;
  private MetricRfiFetchTimeRepository metricRfiFetchTimeRepository;
  private MetricChangeRfiPriorityRepository metricChangeRfiPriorityRepository;
  private MetricChangeRfiRepository metricChangeRfiRepository;
  private MetricClickRefreshRepository metricClickRefreshRepository;
  private MetricChangeExploitDateRepository metricChangeExploitDateRepository;

  @Autowired
  public void setMetricClickGetsRepository(MetricClickGetsRepository metricClickGetsRepository) {
    this.metricClickGetsRepository = metricClickGetsRepository;
  }
  @Autowired
  public void setMetricSiteVisitRepository(MetricSiteVisitRepository metricSiteVisitRepository) {
    this.metricSiteVisitRepository = metricSiteVisitRepository;
  }
  @Autowired
  public void setMetricClickSortRepository(MetricClickSortRepository metricClickSortRepository) {
    this.metricClickSortRepository = metricClickSortRepository;
  }
  @Autowired
  public void setMetricRfiFetchTimeRepository(MetricRfiFetchTimeRepository metricRfiFetchTimeRepository) {
    this.metricRfiFetchTimeRepository = metricRfiFetchTimeRepository;
  }
  @Autowired
  public void setMetricChangeRfiPriorityRepository(MetricChangeRfiPriorityRepository metricChangeRfiPriorityRepository) {
    this.metricChangeRfiPriorityRepository = metricChangeRfiPriorityRepository;
  }
  @Autowired
  public void setMetricChangeRfiRepository(MetricChangeRfiRepository metricChangeRfiRepository) {
    this.metricChangeRfiRepository = metricChangeRfiRepository;
  }
  @Autowired
  public void setMetricClickRefreshRepository(MetricClickRefreshRepository metricClickRefreshRepository) {
    this.metricClickRefreshRepository = metricClickRefreshRepository;
  }
  @Autowired
  public void setMetricChangeExploitDateRepository(MetricChangeExploitDateRepository metricChangeExploitDateRepository) {
    this.metricChangeExploitDateRepository = metricChangeExploitDateRepository;
  }

  @GetMapping(path = "/site-visits")
  public long getSiteVisitCount() {
    return metricSiteVisitRepository.count();
  }

  @GetMapping(path = "/site-visits-week")
  public int[] getSiteVisitsLast7Days() throws Exception{
    List<MetricSiteVisit> allMetricSiteVisits = metricSiteVisitRepository.findAll();

//    Array that has DATE epochs at midnight over the last 7 days
//    e.g. daysAgo[0] is midnight today, daysAgo[1] is midnight yesterday, etc.
    Date[] daysAgo = setupDaysAgo(7);

//    Returns array of site visits

    return matchSiteVisitsToDays(allMetricSiteVisits, daysAgo);
  }

  private int[] matchSiteVisitsToDays(List<MetricSiteVisit> allMetricSiteVisits, Date[] daysAgo) {
    int [] last7Days = {0, 0, 0, 0, 0, 0, 0};
    for (MetricSiteVisit metricSiteVisit : allMetricSiteVisits) {
      Date datetime = metricSiteVisit.getDatetime();
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
  public void addSiteVisit() {
    MetricSiteVisit metricSiteVisit = new MetricSiteVisit(new Date());
    this.metricSiteVisitRepository.save(metricSiteVisit);
  }

  @GetMapping(path = "/refresh-clicks")
  public long getClickRefreshCount() {
    return metricClickRefreshRepository.count();
  }

  @PostMapping(path = "/refresh-click")
  public void addClickRefresh() {
    MetricClickRefresh metricClickRefresh = new MetricClickRefresh(new Date());
    this.metricClickRefreshRepository.save(metricClickRefresh);
  }

  @GetMapping(path = "/gets-clicks")
  public long getClickGetsCount() {
    return metricClickGetsRepository.count();
  }

  @PostMapping(path = "/gets-click")
  public MetricClickGets createClickGets(@Valid @RequestBody MetricClickGetsJson metricClickGetsJson) {
    MetricClickGets metricClickGets = new MetricClickGets(
      new Date(),
      metricClickGetsJson.getStatus(),
      metricClickGetsJson.getUrl()

    );
    return this.metricClickGetsRepository.save(metricClickGets);
  }

  @PostMapping(path = "/sort-click")
  public MetricClickSort createClickSort(@Valid @RequestBody MetricClickSortJson metricClickSortJson) {
    MetricClickSort metricClickSort = new MetricClickSort(
      new Date(),
      metricClickSortJson.getKey(),
      metricClickSortJson.getOrder()
    );
    return this.metricClickSortRepository.save(metricClickSort);
  }

  @PostMapping(path = "/rfi-fetch")
  public MetricRfiFetchTime createRfiFetchTime(@Valid @RequestBody MetricRfiFetchTimeJson metricRfiFetchTimeJson) {
    System.out.println("logging rfi fetch metric " + metricRfiFetchTimeJson);
    MetricRfiFetchTime metricRfiFetchTime = new MetricRfiFetchTime(
      new Date(metricRfiFetchTimeJson.getStartTime()),
      new Date(metricRfiFetchTimeJson.getEndTime())
    );
    return this.metricRfiFetchTimeRepository.save(metricRfiFetchTime);
  }

  public List<MetricChangeRfiPriority> addChangeRfiPriority(List<MetricChangeRfiPriority> metricChangeRfiPriorities) {
    return this.metricChangeRfiPriorityRepository.saveAll(metricChangeRfiPriorities);
  }

  public MetricChangeRfi addChangeRfi(MetricChangeRfi metricChangeRfi) {
    return this.metricChangeRfiRepository.save(metricChangeRfi);
  }

  public MetricChangeExploitDate addChangeExploitDate(ExploitDateJson exploitDateJson) {
    MetricChangeExploitDate metricChangeExploitDate = new MetricChangeExploitDate(
      new Timestamp(new Date().getTime()),
      exploitDateJson.getOldExploitDate(),
      exploitDateJson.getNewExploitDate(),
      exploitDateJson.getRfiNum()
    );
    return this.metricChangeExploitDateRepository.save(metricChangeExploitDate);
  }
}
