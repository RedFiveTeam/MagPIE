package dgs1sdt.magpie.metrics;

import dgs1sdt.magpie.metrics.cancelAddSegment.MetricCancelAddSegment;
import dgs1sdt.magpie.metrics.clickCollapse.MetricClickCollapse;
import dgs1sdt.magpie.metrics.clickGets.MetricClickGets;
import dgs1sdt.magpie.metrics.clickGets.MetricClickGetsJson;
import dgs1sdt.magpie.metrics.clickImport.MetricClickImport;
import dgs1sdt.magpie.metrics.clickImport.MetricClickImportJson;
import dgs1sdt.magpie.metrics.clickRollup.MetricClickRollup;
import dgs1sdt.magpie.metrics.clickRollup.MetricClickRollupJson;
import dgs1sdt.magpie.metrics.clickSort.MetricClickSort;
import dgs1sdt.magpie.metrics.clickSort.MetricClickSortJson;
import dgs1sdt.magpie.metrics.clickTrackNarrative.MetricClickTrackNarrative;
import dgs1sdt.magpie.metrics.clickTrackNarrative.MetricClickTrackNarrativeJson;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.Date;

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
  public long getTargetsCreatedPerWeek() {
    return metricsService.getAverageTgtCreationsPerWeek();
  }

  @GetMapping(path = "/ixns-created-per-week")
  public long getIxnsCreatedPerWeek() {
    return metricsService.getAverageIxnCreationsPerWeek();
  }

  @GetMapping(path = "/deletions-per-week")
  public long[] getDeletionsPerWeek() {
    return metricsService.getAverageDeletionsPerWeek();
  }

  @GetMapping(path = "/undos-per-week")
  public long[] getUndosPerWeek() {
    return metricsService.getAverageUndosPerWeek();
  }

  @GetMapping(path = "/edits-per-week")
  public long[] getEditsPerWeek() {
    return metricsService.getAverageEditsPerWeek();
  }

  @GetMapping(path = "/logins-per-week")
  public long getLoginsPerWeek() {
    return metricsService.getAverageUniqueLoginsPerWeek();
  }

  @GetMapping(path = "/prioritizations-per-week")
  public long getPrioritizationsPerWeek() {
    return metricsService.getAveragePrioritizationsPerWeek();
  }

  @GetMapping(path = "/percent-rfis-met-ltiov")
  public int getLtiovMetPercentage() {
    return metricsService.getLtiovMetPercentage();
  }

  @GetMapping(path = "/percent-rfis-unworked")
  public int getUnworkedRfiPercentage() {
    return metricsService.getUnworkedRfiPercentage();
  }

  // USER METRICS
  @GetMapping(path = "/rfis-completed")
  public long getRfisCompleted(
    @Valid @RequestParam(value = "startDate") @DateTimeFormat(pattern = "MM/dd/yyyy") Date startDate,
    @Valid @RequestParam(value = "endDate") @DateTimeFormat(pattern = "MM/dd/yyyy") Date endDate
  ) {
    System.out.println(startDate);
    System.out.println(endDate);
    // Add a day to make the selection inclusive, i.e. include metrics from the end date
    return metricsService
      .getRfisCompleted(startDate, new Date(endDate.getTime() + MetricsService.MILLISECONDS_IN_A_DAY));
  }

  @GetMapping(path = "/hours-worked")
  public long getHoursWorked(
    @Valid @RequestParam(value = "startDate") @DateTimeFormat(pattern = "MM/dd/yyyy") Date startDate,
    @Valid @RequestParam(value = "endDate") @DateTimeFormat(pattern = "MM/dd/yyyy") Date endDate
  ) {
    return metricsService
      .getHoursWorkedBetween(startDate, new Date(endDate.getTime() + MetricsService.MILLISECONDS_IN_A_DAY));
  }

  @GetMapping(path = "/unique-customers")
  public long getUniqueCustomers(
    @Valid @RequestParam(value = "startDate") @DateTimeFormat(pattern = "MM/dd/yyyy") Date startDate,
    @Valid @RequestParam(value = "endDate") @DateTimeFormat(pattern = "MM/dd/yyyy") Date endDate
  ) {
    return metricsService
      .getUniqueCustomersBetween(startDate, new Date(endDate.getTime() + MetricsService.MILLISECONDS_IN_A_DAY));
  }

  @GetMapping(path = "/targets-created")
  public long getsTargetsCreated(
    @Valid @RequestParam(value = "startDate") @DateTimeFormat(pattern = "MM/dd/yyyy") Date startDate,
    @Valid @RequestParam(value = "endDate") @DateTimeFormat(pattern = "MM/dd/yyyy") Date endDate
  ) {
    return metricsService
      .getTargetsCreatedWithinDateRange(startDate, new Date(endDate.getTime() + MetricsService.MILLISECONDS_IN_A_DAY));
  }

  // END OF USER METRICS

  @PostMapping(path = "/site-visit")
  public void addSiteVisit() {
    metricsService.addSiteVisit();
  }

  @PostMapping(path = "/cancel-add-segment/{targetId}")
  public MetricCancelAddSegment createCancelAddSegment(@PathVariable("targetId") long targetId) {
    return metricsService.createCancelAddSegment(targetId);
  }

  @PostMapping(path = "/click-refresh")
  public void addClickRefresh() {
    metricsService.addClickRefresh();
  }

  @PostMapping(path = "/click-gets")
  public MetricClickGets createClickGets(@Valid @RequestBody MetricClickGetsJson metricClickGetsJson) {
    return metricsService.createClickGets(metricClickGetsJson);
  }

  @PostMapping(path = "/click-import")
  public MetricClickImport createClickImport(@Valid @RequestBody MetricClickImportJson metricClickImportJson) {
    return metricsService.createClickImport(metricClickImportJson);
  }

  @PostMapping(path = "/click-sort")
  public MetricClickSort createClickSort(@Valid @RequestBody MetricClickSortJson metricClickSortJson) {
    return metricsService.createClickSort(metricClickSortJson);
  }

  @PostMapping(path = "/click-track-narrative")
  public MetricClickTrackNarrative createClickTrackNarrative(
    @Valid @RequestBody MetricClickTrackNarrativeJson metricClickTrackNarrativeJson) {
    return metricsService.createClickTrackNarrative(metricClickTrackNarrativeJson);
  }

  @PostMapping(path = "/click-rollup")
  public MetricClickRollup createClickRollup(@Valid @RequestBody MetricClickRollupJson metricClickRollupJson) {
    return metricsService.createClickRollup(metricClickRollupJson);
  }

  @PostMapping(path = "/click-collapse")
  public MetricClickCollapse createClickCollapse(@Valid @RequestBody String userName) {
    return metricsService.createClickCollapse(userName);
  }
}
