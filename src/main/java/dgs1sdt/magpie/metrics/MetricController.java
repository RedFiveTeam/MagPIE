package dgs1sdt.magpie.metrics;

import dgs1sdt.magpie.metrics.cancelAddSegment.MetricCancelAddSegment;
import dgs1sdt.magpie.metrics.clickGets.MetricClickGets;
import dgs1sdt.magpie.metrics.clickGets.MetricClickGetsJson;
import dgs1sdt.magpie.metrics.rfiFetchTime.MetricRfiFetchTime;
import dgs1sdt.magpie.metrics.rfiFetchTime.MetricRfiFetchTimeJson;
import dgs1sdt.magpie.metrics.sortClick.MetricClickSort;
import dgs1sdt.magpie.metrics.sortClick.MetricClickSortJson;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
@RequestMapping(MetricController.URI)
public class MetricController {
  public static final String URI = "/api/metrics";

  private MetricsService metricsService;

  @Autowired
  public MetricController(MetricsService metricsService) {
    this.metricsService = metricsService;
  }

  @Autowired
  public void setMetricsService(MetricsService metricsService) {
    this.metricsService = metricsService;
  }

  @GetMapping(path = "/site-visits")
  public long getSiteVisitCount() {
    return metricsService.getSiteVisitCount();
  }

  @GetMapping(path = "/site-visits-week")
  public int[] getSiteVisitsLast7Days() {
    return metricsService.getSiteVisitsLast7Days();
  }

  @GetMapping(path = "/refresh-clicks")
  public long getClickRefreshCount() {
    return metricsService.getClickRefreshCount();
  }

  @GetMapping(path = "/gets-clicks")
  public long[] getClickGetsCount() {
    return metricsService.getClickGetsCount();
  }

  @GetMapping(path = "/workflow-time")
  public long[] getAverageWorkflowTime() {
    return metricsService.getAverageWorkflowTime();
  }

  @GetMapping(path = "/targets-created-per-week")
  public int getTargetsCreatedPerWeek() {
    return metricsService.getAverageTgtCreationsPerWeek();
  }

  @GetMapping(path = "/ixns-created-per-week")
  public int getIxnsCreatedPerWeek() {
    return metricsService.getAverageIxnCreationsPerWeek();
  }

  @GetMapping(path = "/deletions-per-week")
  public long[] getDeletionsPerWeek() {
    return metricsService.getAverageDeletionsPerWeek();
  }

  @GetMapping(path = "/logins-per-week")
  public long getLoginsPerWeek() {
    return metricsService.getAverageUniqueLoginsPerWeek();
  }

  @PostMapping(path = "/refresh-click")
  public void addClickRefresh() {
    metricsService.addClickRefresh();
  }

  @PostMapping(path = "/site-visit")
  public void addSiteVisit() {
    metricsService.addSiteVisit();
  }

  @PostMapping(path = "/gets-click")
  public MetricClickGets createClickGets(@Valid @RequestBody MetricClickGetsJson metricClickGetsJson) {
    return metricsService.createClickGets(metricClickGetsJson);
  }

  @PostMapping(path = "/sort-click")
  public MetricClickSort createClickSort(@Valid @RequestBody MetricClickSortJson metricClickSortJson) {
    return metricsService.createClickSort(metricClickSortJson);
  }

  @PostMapping(path = "/rfi-fetch")
  public MetricRfiFetchTime createRfiFetchTime(@Valid @RequestBody MetricRfiFetchTimeJson metricRfiFetchTimeJson) {
    return metricsService.createRfiFetchTime(metricRfiFetchTimeJson);
  }

  @PostMapping(path = "/cancel-add-segment/{targetId}")
  public MetricCancelAddSegment createCancelAddSegment(@PathVariable("targetId") long targetId) {
    return metricsService.createCancelAddSegment(targetId);
  }
}
