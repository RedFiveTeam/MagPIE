package dgs1sdt.magpie.metrics;

import dgs1sdt.magpie.BaseIntegrationTest;
import dgs1sdt.magpie.metrics.changeExploitDate.MetricChangeExploitDateRepository;
import dgs1sdt.magpie.metrics.changeRfi.MetricChangeRfi;
import dgs1sdt.magpie.metrics.changeRfi.MetricChangeRfiRepository;
import dgs1sdt.magpie.metrics.changeRfiPriority.MetricChangeRfiPriority;
import dgs1sdt.magpie.metrics.changeRfiPriority.MetricChangeRfiPriorityRepository;
import dgs1sdt.magpie.metrics.changeTarget.MetricChangeTarget;
import dgs1sdt.magpie.metrics.changeTarget.MetricChangeTargetRepository;
import dgs1sdt.magpie.metrics.clickGets.MetricClickGetsRepository;
import dgs1sdt.magpie.metrics.clickRefresh.MetricClickRefreshRepository;
import dgs1sdt.magpie.metrics.createTarget.MetricCreateTargetRepository;
import dgs1sdt.magpie.metrics.siteVisit.MetricSiteVisit;
import dgs1sdt.magpie.metrics.siteVisit.MetricSiteVisitRepository;
import dgs1sdt.magpie.metrics.sortClick.MetricClickSortRepository;
import dgs1sdt.magpie.tgts.Target;
import dgs1sdt.magpie.tgts.TargetJson;
import dgs1sdt.magpie.tgts.TargetStatus;
import org.junit.Before;
import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

import static org.junit.Assert.assertArrayEquals;
import static org.junit.Assert.assertEquals;

public class MetricsServiceTest extends BaseIntegrationTest {

  @Autowired
  private MetricsService metricsService;

  @Autowired
  private MetricClickGetsRepository metricClickGetsRepository;

  @Autowired
  private MetricSiteVisitRepository metricSiteVisitRepository;

  @Autowired
  private MetricClickSortRepository metricClickSortRepository;

  @Autowired
  private MetricChangeRfiPriorityRepository metricChangeRfiPriorityRepository;

  @Autowired
  private MetricChangeRfiRepository metricChangeRfiRepository;

  @Autowired
  private MetricClickRefreshRepository metricClickRefreshRepository;

  @Autowired
  private MetricChangeExploitDateRepository metricChangeExploitDateRepository;

  @Autowired
  private MetricCreateTargetRepository metricCreateTargetRepository;

  @Autowired
  private MetricChangeTargetRepository metricChangeTargetRepository;

  @Before
  public void setup() {
    metricClickGetsRepository.deleteAll();
    metricSiteVisitRepository.deleteAll();
    metricClickSortRepository.deleteAll();
    metricChangeRfiPriorityRepository.deleteAll();
    metricChangeRfiRepository.deleteAll();
    metricClickRefreshRepository.deleteAll();
    metricChangeExploitDateRepository.deleteAll();
    metricCreateTargetRepository.deleteAll();
    metricChangeTargetRepository.deleteAll();
  }

  @Test
  public void createsNewPriorityChangeMetric() {
    MetricChangeRfiPriority metricChangeRfiPriority1 = new MetricChangeRfiPriority("20-001", 1, 2, new Date());
    MetricChangeRfiPriority metricChangeRfiPriority2 = new MetricChangeRfiPriority("20-002", 2, 1, new Date());

    List<MetricChangeRfiPriority> priChanges = new ArrayList<>();
    priChanges.add(metricChangeRfiPriority1);
    priChanges.add(metricChangeRfiPriority2);

    metricsService.addChangeRfiPriority(priChanges);

    assertEquals(2, metricChangeRfiPriorityRepository.count());
  }

  @Test
  public void createsNewRfiUpdateMetric() {
    MetricChangeRfi metricChangeRfi1 = new MetricChangeRfi("20-005", new Date(), "field", "old", "new");
    MetricChangeRfi metricChangeRfi2 = new MetricChangeRfi("20-005", new Date(), "field", "old", "new");

    long rfiUpdateCount = metricChangeRfiRepository.count();

    metricsService.addChangeRfi(metricChangeRfi1);
    metricsService.addChangeRfi(metricChangeRfi2);

    assertEquals(rfiUpdateCount + 2, metricChangeRfiRepository.count());
  }

  @Test
  public void getsSiteVisitsOverLast7Days() throws Exception {
    Date sixDaysAgo = new Date(new Date().getTime() - 518400000L);
    Date fourDaysAgo = new Date(new Date().getTime() - 345600000L);
    Date oneDayAgo = new Date(new Date().getTime() - 86400000L);

    List<MetricSiteVisit> metricSiteVisits = new ArrayList<>();
    for (int i = 0; i < 356; i++) {
      metricSiteVisits.add(new MetricSiteVisit(sixDaysAgo));
    }

    for (int i = 0; i < 23; i++) {
      metricSiteVisits.add(new MetricSiteVisit(fourDaysAgo));
    }

    for (int i = 0; i < 1; i++) {
      metricSiteVisits.add(new MetricSiteVisit(oneDayAgo));
    }

    for (int i = 0; i < 65; i++) {
      metricSiteVisits.add(new MetricSiteVisit(new Date()));
    }

    metricSiteVisitRepository.saveAll(metricSiteVisits);

    int[] last7DaysActual = metricsService.getSiteVisitsLast7Days();
    int[] last7DaysExpected = {356, 0, 23, 0, 0, 1, 65};

    assertArrayEquals(last7DaysExpected, last7DaysActual);

  }

  @Test
  public void addsChangeTargetMetric() {
    Target oldTarget = new Target(
      1, 1, 1,
      "SDT20-123",
      "12ABC1234567890",
      "These are old notes",
      "This is an old description",
      TargetStatus.NOT_STARTED,
      null
    );
    TargetJson newTarget = new TargetJson(
      oldTarget.getRfiId(),
      oldTarget.getExploitDateId(),
      "ABC11-999",
      "99BBB9999999999",
      "These are new notes",
      "And an improved description"
    );

    metricsService.addChangeTarget(oldTarget, newTarget);
    assertEquals(4, metricChangeTargetRepository.findAll().size());

    MetricChangeTarget name = metricChangeTargetRepository.findAll()
      .stream().filter((metric) -> metric.getField().equals("name")).collect(Collectors.toList()).get(0);
    MetricChangeTarget mgrs = metricChangeTargetRepository.findAll()
      .stream().filter((metric) -> metric.getField().equals("mgrs")).collect(Collectors.toList()).get(0);
    MetricChangeTarget notes = metricChangeTargetRepository.findAll()
      .stream().filter((metric) -> metric.getField().equals("notes")).collect(Collectors.toList()).get(0);
    MetricChangeTarget description = metricChangeTargetRepository.findAll()
      .stream().filter((metric) -> metric.getField().equals("description")).collect(Collectors.toList()).get(0);

    assertEquals(newTarget.getName(), name.getNewData());

    assertEquals(newTarget.getMgrs(), mgrs.getNewData());

    assertEquals(newTarget.getNotes(), notes.getNewData());

    assertEquals(newTarget.getDescription(), description.getNewData());
  }
}
