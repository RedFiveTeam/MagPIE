package dgs1sdt.magpie.metrics;

import dgs1sdt.magpie.BaseIntegrationTest;
import dgs1sdt.magpie.ixns.IxnJson;
import dgs1sdt.magpie.ixns.IxnStatus;
import dgs1sdt.magpie.ixns.SegmentJson;
import dgs1sdt.magpie.metrics.changeExploitDate.MetricChangeExploitDate;
import dgs1sdt.magpie.metrics.changeExploitDate.MetricChangeExploitDateRepository;
import dgs1sdt.magpie.metrics.changeIxn.MetricChangeIxn;
import dgs1sdt.magpie.metrics.changeIxn.MetricChangeIxnRepository;
import dgs1sdt.magpie.metrics.changeRfi.MetricChangeRfi;
import dgs1sdt.magpie.metrics.changeRfi.MetricChangeRfiRepository;
import dgs1sdt.magpie.metrics.changeRfiPriority.MetricChangeRfiPriority;
import dgs1sdt.magpie.metrics.changeRfiPriority.MetricChangeRfiPriorityRepository;
import dgs1sdt.magpie.metrics.changeSegment.MetricChangeSegment;
import dgs1sdt.magpie.metrics.changeSegment.MetricChangeSegmentRepository;
import dgs1sdt.magpie.metrics.changeTarget.MetricChangeTarget;
import dgs1sdt.magpie.metrics.changeTarget.MetricChangeTargetRepository;
import dgs1sdt.magpie.metrics.clickGets.MetricClickGets;
import dgs1sdt.magpie.metrics.clickGets.MetricClickGetsRepository;
import dgs1sdt.magpie.metrics.clickRefresh.MetricClickRefreshRepository;
import dgs1sdt.magpie.metrics.createIxn.MetricCreateIxn;
import dgs1sdt.magpie.metrics.createIxn.MetricCreateIxnRepository;
import dgs1sdt.magpie.metrics.createTarget.MetricCreateTarget;
import dgs1sdt.magpie.metrics.createTarget.MetricCreateTargetRepository;
import dgs1sdt.magpie.metrics.deleteExploitDate.MetricDeleteExploitDate;
import dgs1sdt.magpie.metrics.deleteExploitDate.MetricDeleteExploitDateRepository;
import dgs1sdt.magpie.metrics.deleteIxn.MetricDeleteIxn;
import dgs1sdt.magpie.metrics.deleteIxn.MetricDeleteIxnRepository;
import dgs1sdt.magpie.metrics.deleteSegment.MetricDeleteSegment;
import dgs1sdt.magpie.metrics.deleteSegment.MetricDeleteSegmentRepository;
import dgs1sdt.magpie.metrics.deleteTarget.MetricDeleteTarget;
import dgs1sdt.magpie.metrics.deleteTarget.MetricDeleteTargetRepository;
import dgs1sdt.magpie.metrics.login.MetricLogin;
import dgs1sdt.magpie.metrics.login.MetricLoginRepository;
import dgs1sdt.magpie.metrics.siteVisit.MetricSiteVisit;
import dgs1sdt.magpie.metrics.siteVisit.MetricSiteVisitRepository;
import dgs1sdt.magpie.metrics.clickSort.MetricClickSortRepository;
import dgs1sdt.magpie.metrics.undoExploitDateDelete.MetricUndoExploitDateDelete;
import dgs1sdt.magpie.metrics.undoExploitDateDelete.MetricUndoExploitDateDeleteRepository;
import dgs1sdt.magpie.metrics.undoIxnDelete.MetricUndoIxnDelete;
import dgs1sdt.magpie.metrics.undoIxnDelete.MetricUndoIxnDeleteRepository;
import dgs1sdt.magpie.metrics.undoSegmentDelete.MetricUndoSegmentDelete;
import dgs1sdt.magpie.metrics.undoSegmentDelete.MetricUndoSegmentDeleteRepository;
import dgs1sdt.magpie.metrics.undoTargetDelete.MetricUndoTargetDelete;
import dgs1sdt.magpie.metrics.undoTargetDelete.MetricUndoTargetDeleteRepository;
import dgs1sdt.magpie.rfis.Rfi;
import dgs1sdt.magpie.rfis.RfiRepository;
import dgs1sdt.magpie.tgts.Target;
import dgs1sdt.magpie.tgts.TargetJson;
import dgs1sdt.magpie.tgts.TargetStatus;
import dgs1sdt.magpie.tgts.exploitDates.ExploitDateJson;
import org.junit.Before;
import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;

import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

import static org.junit.Assert.assertArrayEquals;
import static org.junit.Assert.assertEquals;

public class MetricsServiceTest extends BaseIntegrationTest {

  @Autowired
  private MetricsService metricsService;
  @Autowired
  private RfiRepository rfiRepository;
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
  @Autowired
  private MetricCreateIxnRepository metricCreateIxnRepository;
  @Autowired
  private MetricChangeIxnRepository metricChangeIxnRepository;
  @Autowired
  private MetricChangeSegmentRepository metricChangeSegmentRepository;
  @Autowired
  private MetricDeleteExploitDateRepository metricDeleteExploitDateRepository;
  @Autowired
  private MetricDeleteTargetRepository metricDeleteTargetRepository;
  @Autowired
  private MetricDeleteSegmentRepository metricDeleteSegmentRepository;
  @Autowired
  private MetricDeleteIxnRepository metricDeleteIxnRepository;
  @Autowired
  private MetricLoginRepository metricLoginRepository;
  @Autowired
  private MetricUndoExploitDateDeleteRepository metricUndoExploitDateDeleteRepository;
  @Autowired
  private MetricUndoTargetDeleteRepository metricUndoTargetDeleteRepository;
  @Autowired
  private MetricUndoSegmentDeleteRepository metricUndoSegmentDeleteRepository;
  @Autowired
  private MetricUndoIxnDeleteRepository metricUndoIxnDeleteRepository;

  @Before
  public void setup() {
    rfiRepository.deleteAll();
    metricClickGetsRepository.deleteAll();
    metricSiteVisitRepository.deleteAll();
    metricClickSortRepository.deleteAll();
    metricChangeRfiPriorityRepository.deleteAll();
    metricChangeRfiRepository.deleteAll();
    metricClickRefreshRepository.deleteAll();
    metricChangeExploitDateRepository.deleteAll();
    metricCreateTargetRepository.deleteAll();
    metricChangeTargetRepository.deleteAll();
    metricCreateIxnRepository.deleteAll();
    metricChangeIxnRepository.deleteAll();
    metricChangeSegmentRepository.deleteAll();
    metricDeleteExploitDateRepository.deleteAll();
    metricDeleteTargetRepository.deleteAll();
    metricDeleteSegmentRepository.deleteAll();
    metricDeleteIxnRepository.deleteAll();
    metricLoginRepository.deleteAll();
    metricUndoExploitDateDeleteRepository.deleteAll();
    metricUndoTargetDeleteRepository.deleteAll();
    metricUndoSegmentDeleteRepository.deleteAll();
    metricUndoIxnDeleteRepository.deleteAll();
  }

  @Test
  public void createsNewPriorityChangeMetric() {
    MetricChangeRfiPriority metricChangeRfiPriority1 = new MetricChangeRfiPriority("20-001", 1, 2, "q", new Date());
    MetricChangeRfiPriority metricChangeRfiPriority2 = new MetricChangeRfiPriority("20-002", 2, 1, "q", new Date());

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
      "",
      "",
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

    metricsService.addChangeTarget(oldTarget, newTarget, "bbj");
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

  private long convertDaysToMS(int days) {
    return ((long) days) * 86400000L;
  }

  @Test
  public void returnsAverageTimeRfisAreInPendingAndOpen() {
    assertArrayEquals(new long[]{0, 0}, metricsService.getAverageWorkflowTime());

    Rfi rfi1 =
      new Rfi("SDT20-321", "", "CLOSED", new Date(), "", null, "", "", "This is a justifiction", "", "", "", "", "", "",
        "", "", "");
    Rfi rfi2 =
      new Rfi("SDT20-322", "", "CLOSED", new Date(), "", null, "", "", "This is a justifiction", "", "", "", "", "", "",
        "", "", "");
    Rfi rfi3 =
      new Rfi("SDT20-323", "", "CLOSED", new Date(), "", null, "", "", "This is a justifiction", "", "", "", "", "", "",
        "", "", "");
    Rfi rfi4 =
      new Rfi("SDT20-324", "", "CLOSED", new Date(), "", null, "", "", "This is a justifiction", "", "", "", "", "", "",
        "", "", "");

    //status is not closed, ignore
    Rfi rfi5 =
      new Rfi("SDT20-325", "", "NEW", new Date(), "", null, "", "", "This is a justifiction", "", "", "", "", "", "",
        "", "", "");
    Rfi rfi6 =
      new Rfi("SDT20-326", "", "OPEN", new Date(), "", null, "", "", "This is a justifiction", "", "", "", "", "", "",
        "", "", "");

    rfi1.setReceiveDate(new Timestamp(0));
    rfi2.setReceiveDate(new Timestamp(0));
    rfi3.setReceiveDate(new Timestamp(0));

    //receive date unknown, ignore
    rfi4.setReceiveDate(null);

    rfiRepository.saveAll(new ArrayList<>(Arrays.asList(rfi1, rfi2, rfi3, rfi4, rfi5, rfi6)));

    //closed immediately, ignore
    metricChangeRfiRepository.save(new MetricChangeRfi("SDT20-321", new Timestamp(convertDaysToMS(7)), "status", "NEW"
      , "OPEN"));
    metricChangeRfiRepository.save(new MetricChangeRfi("SDT20-321", new Timestamp(convertDaysToMS(7) + 10000L),
      "status", "OPEN", "CLOSED"));

    //pending for 10 days
    metricChangeRfiRepository.save(new MetricChangeRfi("SDT20-322", new Timestamp(convertDaysToMS(10)), "status",
      "NEW", "OPEN"));
    //open for 7 days
    metricChangeRfiRepository.save(new MetricChangeRfi("SDT20-322", new Timestamp(convertDaysToMS(17) + 10000L),
      "status", "OPEN", "CLOSED"));

    //pending for 20 days
    metricChangeRfiRepository.save(new MetricChangeRfi("SDT20-323", new Timestamp(convertDaysToMS(20)), "status",
      "NEW", "OPEN"));
    //open for 21 days
    metricChangeRfiRepository.save(new MetricChangeRfi("SDT20-323", new Timestamp(convertDaysToMS(41) + 10000L),
      "status", "OPEN", "CLOSED"));

    assertArrayEquals(new long[]{14, 15}, metricsService.getAverageWorkflowTime());
  }

  @Test
  public void returnsAvgTargetsPerWeek() {
    assertEquals(0, metricsService.getAverageTgtCreationsPerWeek());

    long threeWeeksAgo = new Date().getTime() - convertDaysToMS(21);

    TargetJson target = new TargetJson(1, 1, 1, "ASD12-123", "12QWE1231231231", "", "", TargetStatus.NOT_STARTED, "",
      "");
    MetricCreateTarget metric1 = new MetricCreateTarget(1, target, "billy.bob.joe", Boolean.FALSE);
    MetricCreateTarget metric2 = new MetricCreateTarget(1, target, "billy.bob.joe", Boolean.FALSE);
    MetricCreateTarget metric3 = new MetricCreateTarget(1, target, "billy.bob.joe", Boolean.FALSE);
    MetricCreateTarget metric4 = new MetricCreateTarget(1, target, "billy.bob.joe", Boolean.FALSE);
    MetricCreateTarget metric5 = new MetricCreateTarget(1, target, "billy.bob.joe", Boolean.FALSE);
    MetricCreateTarget metric6 = new MetricCreateTarget(1, target, "billy.bob.joe", Boolean.FALSE);
    MetricCreateTarget metric7 = new MetricCreateTarget(1, target, "billy.bob.joe", Boolean.FALSE);
    MetricCreateTarget metric8 = new MetricCreateTarget(1, target, "billy.bob.joe", Boolean.FALSE);
    MetricCreateTarget metric9 = new MetricCreateTarget(1, target, "billy.bob.joe", Boolean.FALSE);
    metric1.setTimestamp(new Timestamp(threeWeeksAgo));
    metric2.setTimestamp(new Timestamp(threeWeeksAgo + convertDaysToMS(2)));
    metric3.setTimestamp(new Timestamp(threeWeeksAgo + convertDaysToMS(5)));
    metric4.setTimestamp(new Timestamp(threeWeeksAgo + convertDaysToMS(7)));
    metric5.setTimestamp(new Timestamp(threeWeeksAgo + convertDaysToMS(7)));
    metric6.setTimestamp(new Timestamp(threeWeeksAgo + convertDaysToMS(8)));
    metric7.setTimestamp(new Timestamp(threeWeeksAgo + convertDaysToMS(11)));
    metric8.setTimestamp(new Timestamp(threeWeeksAgo + convertDaysToMS(14)));
    metric9.setTimestamp(new Timestamp(threeWeeksAgo + convertDaysToMS(19)));

    List<MetricCreateTarget> metrics = new ArrayList<>(Arrays.asList(
      metric1, metric2, metric3, metric4, metric5, metric6, metric7, metric8, metric9
    ));

    metricCreateTargetRepository.saveAll(metrics);

    assertEquals(3, metricsService.getAverageTgtCreationsPerWeek());
  }

  @Test
  public void returnsAvgIxnsPerWeek() {
    assertEquals(0, metricsService.getAverageIxnCreationsPerWeek());

    long twoWeeksAgo = new Date().getTime() - convertDaysToMS(14);

    IxnJson ixn =
      new IxnJson(1, 1, 1, 1, 1, "Billy", new Timestamp(23456), "", "", IxnStatus.IN_PROGRESS, "", "", "", "");
    MetricCreateIxn metric1 = new MetricCreateIxn(1, ixn, "guy");
    MetricCreateIxn metric2 = new MetricCreateIxn(1, ixn, "guy");
    MetricCreateIxn metric3 = new MetricCreateIxn(1, ixn, "guy");
    MetricCreateIxn metric4 = new MetricCreateIxn(1, ixn, "guy");
    MetricCreateIxn metric5 = new MetricCreateIxn(1, ixn, "guy");
    MetricCreateIxn metric6 = new MetricCreateIxn(1, ixn, "guy");
    MetricCreateIxn metric7 = new MetricCreateIxn(1, ixn, "guy");
    MetricCreateIxn metric8 = new MetricCreateIxn(1, ixn, "guy");
    MetricCreateIxn metric9 = new MetricCreateIxn(1, ixn, "guy");
    metric1.setTimestamp(new Timestamp(twoWeeksAgo));
    metric2.setTimestamp(new Timestamp(twoWeeksAgo + convertDaysToMS(2)));
    metric3.setTimestamp(new Timestamp(twoWeeksAgo + convertDaysToMS(5)));
    metric4.setTimestamp(new Timestamp(twoWeeksAgo + convertDaysToMS(7)));
    metric5.setTimestamp(new Timestamp(twoWeeksAgo + convertDaysToMS(7)));
    metric6.setTimestamp(new Timestamp(twoWeeksAgo + convertDaysToMS(8)));
    metric7.setTimestamp(new Timestamp(twoWeeksAgo + convertDaysToMS(11)));
    metric8.setTimestamp(new Timestamp(twoWeeksAgo + convertDaysToMS(12)));
    metric9.setTimestamp(new Timestamp(twoWeeksAgo + convertDaysToMS(13)));

    List<MetricCreateIxn> metrics = new ArrayList<>(Arrays.asList(
      metric1, metric2, metric3, metric4, metric5, metric6, metric7, metric8, metric9
    ));

    metricCreateIxnRepository.saveAll(metrics);

    assertEquals(5, metricsService.getAverageIxnCreationsPerWeek());
  }

  @Test
  public void returnsGetsClicksByStatusType() {
    assertArrayEquals(new long[]{0, 0}, metricsService.getClickGetsCount());

    MetricClickGets metric1 = new MetricClickGets(new Date(), "OPEN", "bing.com");
    MetricClickGets metric2 = new MetricClickGets(new Date(), "PENDING", "bing.com");
    MetricClickGets metric3 = new MetricClickGets(new Date(), "OPEN", "bing.com");
    MetricClickGets metric4 = new MetricClickGets(new Date(), "PENDING", "bing.com");
    MetricClickGets metric5 = new MetricClickGets(new Date(), "PENDING", "bing.com");
    MetricClickGets metric6 = new MetricClickGets(new Date(), "CLOSED", "bing.com");

    List<MetricClickGets> metrics = new ArrayList<>(Arrays.asList(
      metric1, metric2, metric3, metric4, metric5, metric6
    ));

    metricClickGetsRepository.saveAll(metrics);

    assertArrayEquals(new long[]{2, 3}, metricsService.getClickGetsCount());
  }

  @Test
  public void returnsDeletionsByDataType() {
    assertArrayEquals(new long[]{0, 0, 0, 0}, metricsService.getAverageDeletionsPerWeek());

    long twoWeeksAgo = new Date().getTime() - convertDaysToMS(14);

    MetricDeleteExploitDate metric1 = new MetricDeleteExploitDate(1);
    MetricDeleteExploitDate metric2 = new MetricDeleteExploitDate(1);

    MetricDeleteTarget metric3 = new MetricDeleteTarget(1);
    MetricDeleteTarget metric4 = new MetricDeleteTarget(1);
    MetricDeleteTarget metric5 = new MetricDeleteTarget(1);
    MetricDeleteTarget metric6 = new MetricDeleteTarget(1);

    MetricDeleteSegment metric7 = new MetricDeleteSegment(1, false);

    MetricDeleteIxn metric8 = new MetricDeleteIxn(1);
    MetricDeleteIxn metric9 = new MetricDeleteIxn(1);
    MetricDeleteIxn metric10 = new MetricDeleteIxn(1);
    MetricDeleteIxn metric11 = new MetricDeleteIxn(1);
    MetricDeleteIxn metric12 = new MetricDeleteIxn(1);
    MetricDeleteIxn metric13 = new MetricDeleteIxn(1);

    metric1.setTimestamp(new Timestamp(twoWeeksAgo));
    metric2.setTimestamp(new Timestamp(twoWeeksAgo + convertDaysToMS(2)));

    metric3.setTimestamp(new Timestamp(twoWeeksAgo + convertDaysToMS(3)));
    metric4.setTimestamp(new Timestamp(twoWeeksAgo + convertDaysToMS(4)));
    metric5.setTimestamp(new Timestamp(twoWeeksAgo + convertDaysToMS(5)));
    metric6.setTimestamp(new Timestamp(twoWeeksAgo + convertDaysToMS(6)));

    metric7.setTimestamp(new Timestamp(twoWeeksAgo + convertDaysToMS(5)));

    metric8.setTimestamp(new Timestamp(twoWeeksAgo + convertDaysToMS(1)));
    metric9.setTimestamp(new Timestamp(twoWeeksAgo + convertDaysToMS(9)));
    metric10.setTimestamp(new Timestamp(twoWeeksAgo + convertDaysToMS(10)));
    metric11.setTimestamp(new Timestamp(twoWeeksAgo + convertDaysToMS(11)));
    metric12.setTimestamp(new Timestamp(twoWeeksAgo + convertDaysToMS(12)));
    metric13.setTimestamp(new Timestamp(twoWeeksAgo + convertDaysToMS(13)));

    List<MetricDeleteExploitDate> exploitDateDeletes = new ArrayList<>(Arrays.asList(
      metric1, metric2
    ));

    List<MetricDeleteTarget> targetDeletes = new ArrayList<>(Arrays.asList(
      metric3, metric4, metric5, metric6
    ));

    List<MetricDeleteIxn> ixnDeletes = new ArrayList<>(Arrays.asList(
      metric8, metric9, metric10, metric11, metric12, metric13
    ));

    metricDeleteExploitDateRepository.saveAll(exploitDateDeletes);
    metricDeleteTargetRepository.saveAll(targetDeletes);
    metricDeleteSegmentRepository.save(metric7);
    metricDeleteIxnRepository.saveAll(ixnDeletes);

    assertArrayEquals(new long[]{1, 2, 1, 3}, metricsService.getAverageDeletionsPerWeek());
  }

  @Test
  public void returnsAverageLoginsPerWeek() {
    assertEquals(0, metricsService.getAverageUniqueLoginsPerWeek());

    long twoWeeksAgo = new Date().getTime() - convertDaysToMS(14);

    MetricLogin metric1 = new MetricLogin("billy");
    MetricLogin metric2 = new MetricLogin("bob");
    MetricLogin metric3 = new MetricLogin("joe");
    MetricLogin metric4 = new MetricLogin("billy");
    MetricLogin metric5 = new MetricLogin("billy");
    MetricLogin metric6 = new MetricLogin("billy");
    MetricLogin metric7 = new MetricLogin("bob");
    MetricLogin metric8 = new MetricLogin("bob");
    MetricLogin metric9 = new MetricLogin("rob");

    metric1.setTimestamp(new Timestamp(twoWeeksAgo + convertDaysToMS(0)));
    metric2.setTimestamp(new Timestamp(twoWeeksAgo + convertDaysToMS(2)));
    metric3.setTimestamp(new Timestamp(twoWeeksAgo + convertDaysToMS(5)));
    metric4.setTimestamp(new Timestamp(twoWeeksAgo + convertDaysToMS(7)));
    metric5.setTimestamp(new Timestamp(twoWeeksAgo + convertDaysToMS(7)));
    metric6.setTimestamp(new Timestamp(twoWeeksAgo + convertDaysToMS(8)));
    metric7.setTimestamp(new Timestamp(twoWeeksAgo + convertDaysToMS(11)));
    metric8.setTimestamp(new Timestamp(twoWeeksAgo + convertDaysToMS(12)));
    metric9.setTimestamp(new Timestamp(twoWeeksAgo + convertDaysToMS(13)));

    List<MetricLogin> metrics = new ArrayList<>(Arrays.asList(
      metric1, metric2, metric3, metric4, metric5, metric6, metric7, metric8, metric9
    ));

    metricLoginRepository.saveAll(metrics);

    assertEquals(3, metricsService.getAverageUniqueLoginsPerWeek());
  }

  @Test
  public void returnsAverageUndosPerWeekByDataType() {
    assertArrayEquals(new long[]{0, 0, 0, 0}, metricsService.getAverageUndosPerWeek());

    long twoWeeksAgo = new Date().getTime() - convertDaysToMS(14);

    MetricUndoExploitDateDelete metric1 = new MetricUndoExploitDateDelete(1);
    MetricUndoExploitDateDelete metric2 = new MetricUndoExploitDateDelete(1);

    MetricUndoTargetDelete metric3 = new MetricUndoTargetDelete(1);
    MetricUndoTargetDelete metric4 = new MetricUndoTargetDelete(1);
    MetricUndoTargetDelete metric5 = new MetricUndoTargetDelete(1);
    MetricUndoTargetDelete metric6 = new MetricUndoTargetDelete(1);

    MetricUndoSegmentDelete metric7 = new MetricUndoSegmentDelete(1);

    MetricUndoIxnDelete metric8 = new MetricUndoIxnDelete(1);
    MetricUndoIxnDelete metric9 = new MetricUndoIxnDelete(1);
    MetricUndoIxnDelete metric10 = new MetricUndoIxnDelete(1);
    MetricUndoIxnDelete metric11 = new MetricUndoIxnDelete(1);
    MetricUndoIxnDelete metric12 = new MetricUndoIxnDelete(1);
    MetricUndoIxnDelete metric13 = new MetricUndoIxnDelete(1);

    metric1.setTimestamp(new Timestamp(twoWeeksAgo));
    metric2.setTimestamp(new Timestamp(twoWeeksAgo + convertDaysToMS(2)));

    metric3.setTimestamp(new Timestamp(twoWeeksAgo + convertDaysToMS(3)));
    metric4.setTimestamp(new Timestamp(twoWeeksAgo + convertDaysToMS(4)));
    metric5.setTimestamp(new Timestamp(twoWeeksAgo + convertDaysToMS(5)));
    metric6.setTimestamp(new Timestamp(twoWeeksAgo + convertDaysToMS(6)));

    metric7.setTimestamp(new Timestamp(twoWeeksAgo + convertDaysToMS(5)));

    metric8.setTimestamp(new Timestamp(twoWeeksAgo + convertDaysToMS(1)));
    metric9.setTimestamp(new Timestamp(twoWeeksAgo + convertDaysToMS(9)));
    metric10.setTimestamp(new Timestamp(twoWeeksAgo + convertDaysToMS(10)));
    metric11.setTimestamp(new Timestamp(twoWeeksAgo + convertDaysToMS(11)));
    metric12.setTimestamp(new Timestamp(twoWeeksAgo + convertDaysToMS(12)));
    metric13.setTimestamp(new Timestamp(twoWeeksAgo + convertDaysToMS(13)));

    List<MetricUndoExploitDateDelete> exploitDateUndos = new ArrayList<>(Arrays.asList(
      metric1, metric2
    ));

    List<MetricUndoTargetDelete> targetUndos = new ArrayList<>(Arrays.asList(
      metric3, metric4, metric5, metric6
    ));

    List<MetricUndoIxnDelete> ixnUndos = new ArrayList<>(Arrays.asList(
      metric8, metric9, metric10, metric11, metric12, metric13
    ));

    metricUndoExploitDateDeleteRepository.saveAll(exploitDateUndos);
    metricUndoTargetDeleteRepository.saveAll(targetUndos);
    metricUndoSegmentDeleteRepository.save(metric7);
    metricUndoIxnDeleteRepository.saveAll(ixnUndos);

    assertArrayEquals(new long[]{1, 2, 1, 3}, metricsService.getAverageUndosPerWeek());
  }

  @Test
  public void returnsAveragePrioritizationActionsPerWeek() {
    Date date1 = new Date(new Date().getTime() - convertDaysToMS(13));
    Date date2 = new Date(new Date().getTime() - convertDaysToMS(10));
    Date date3 = new Date(new Date().getTime() - convertDaysToMS(5));
    Date date4 = new Date(new Date().getTime() - convertDaysToMS(1));
    metricChangeRfiPriorityRepository.saveAll(new ArrayList<>(Arrays.asList(
      new MetricChangeRfiPriority("ABC-00123", 5, 1, "q", date1),
      new MetricChangeRfiPriority("ABC-00124", 1, 2, "q", date1),
      new MetricChangeRfiPriority("ABC-00125", 2, 3, "q", date1),
      new MetricChangeRfiPriority("ABC-00126", 3, 4, "q", date1),
      new MetricChangeRfiPriority("ABC-00127", 4, 5, "q", date1),

      new MetricChangeRfiPriority("ABC-00123", 1, 2, "q", date2),
      new MetricChangeRfiPriority("ABC-00124", 2, 1, "q", date2),

      new MetricChangeRfiPriority("ABC-00124", 4, 2, "q", date3),
      new MetricChangeRfiPriority("ABC-00125", 2, 3, "q", date3),
      new MetricChangeRfiPriority("ABC-00126", 3, 4, "q", date3),

      new MetricChangeRfiPriority("ABC-00124", 5, 2, "q", date4),
      new MetricChangeRfiPriority("ABC-00125", 2, 3, "q", date4),
      new MetricChangeRfiPriority("ABC-00126", 3, 4, "q", date4),
      new MetricChangeRfiPriority("ABC-00127", 4, 5, "q", date4)
    )));

    assertEquals(2, metricsService.getAveragePrioritizationsPerWeek());
  }

  @Test
  public void returnsEditsByDataType() throws Exception {
    assertArrayEquals(new long[]{0, 0, 0, 0}, metricsService.getAverageDeletionsPerWeek());

    long twoWeeksAgo = new Date().getTime() - convertDaysToMS(14) + 10000L;

    MetricChangeExploitDate metric1 = new MetricChangeExploitDate(new ExploitDateJson(1, 1, new Timestamp(23456)));
    MetricChangeExploitDate metric2 = new MetricChangeExploitDate(new ExploitDateJson(1, 1, new Timestamp(45678)));
    metric1.setTimestamp(new Timestamp(twoWeeksAgo));
    metric2.setTimestamp(new Timestamp(twoWeeksAgo + convertDaysToMS(2)));

    TargetJson targetJson1 = new TargetJson(1, 1, 1, "SDT12-123", "12ASD1231231231", "notes", "description",
      TargetStatus.NOT_STARTED, "", "");
    TargetJson targetJson2 = new TargetJson(2, 1, 1, "SDT12-123", "12ASD1231231231", "notes", "description",
      TargetStatus.NOT_STARTED, "", "");
    MetricChangeTarget metric3 = new MetricChangeTarget("mgrs", targetJson1,
      new Timestamp(twoWeeksAgo + convertDaysToMS(3)), "billy.bob.joe");
    MetricChangeTarget metric4 = new MetricChangeTarget("description", targetJson1,
      new Timestamp(twoWeeksAgo + convertDaysToMS(3)), "billy.bob.joe");
    MetricChangeTarget metric5 = new MetricChangeTarget("name", targetJson1,
      new Timestamp(twoWeeksAgo + convertDaysToMS(12)), "billy.bob.joe");
    MetricChangeTarget metric6 = new MetricChangeTarget("notes", targetJson2,
      new Timestamp(twoWeeksAgo + convertDaysToMS(12)), "billy.bob.joe");
    MetricChangeTarget metric60 = new MetricChangeTarget("notes", targetJson2,
      new Timestamp(twoWeeksAgo + convertDaysToMS(13)), "billy.bob.joe");

    MetricChangeSegment metric7 = new MetricChangeSegment(new SegmentJson(1, 1, 1, 1, new Timestamp(123),
      new Timestamp(234)));
    metric7.setTimestamp(new Timestamp(twoWeeksAgo + convertDaysToMS(5)));

    IxnJson ixnJson1 =
      new IxnJson(1, 1, 1, 1, 1, "", new Timestamp(2345), "", "", IxnStatus.IN_PROGRESS, "", "", "", "");
    IxnJson ixnJson2 =
      new IxnJson(2, 1, 1, 1, 1, "", new Timestamp(2345), "", "", IxnStatus.IN_PROGRESS, "", "", "", "");
    IxnJson ixnJson3 =
      new IxnJson(3, 1, 1, 1, 1, "", new Timestamp(2345), "", "", IxnStatus.IN_PROGRESS, "", "", "", "");
    MetricChangeIxn metric8 = new MetricChangeIxn("time", ixnJson1, new Timestamp(twoWeeksAgo + convertDaysToMS(3)),
      "guy");
    MetricChangeIxn metric9 = new MetricChangeIxn("activity", ixnJson1,
      new Timestamp(twoWeeksAgo + convertDaysToMS(3)), "guy");
    MetricChangeIxn metric10 = new MetricChangeIxn("time", ixnJson1, new Timestamp(twoWeeksAgo + convertDaysToMS(4)),
      "guy");
    MetricChangeIxn metric11 = new MetricChangeIxn("time", ixnJson2, new Timestamp(twoWeeksAgo + convertDaysToMS(4)),
      "guy");
    MetricChangeIxn metric12 = new MetricChangeIxn("time", ixnJson3, new Timestamp(twoWeeksAgo + convertDaysToMS(12)),
      "guy");
    MetricChangeIxn metric13 = new MetricChangeIxn("activity", ixnJson3,
      new Timestamp(twoWeeksAgo + convertDaysToMS(12)), "guy");
    MetricChangeIxn metric14 = new MetricChangeIxn("time", ixnJson3, new Timestamp(twoWeeksAgo + convertDaysToMS(13)),
      "guy");

    List<MetricChangeExploitDate> exploitDateChanges = new ArrayList<>(Arrays.asList(
      metric1, metric2
    ));

    List<MetricChangeTarget> targetChanges = new ArrayList<>(Arrays.asList(
      metric3, metric4, metric5, metric6, metric60
    ));

    List<MetricChangeIxn> ixnChanges = new ArrayList<>(Arrays.asList(
      metric8, metric9, metric10, metric11, metric12, metric13, metric14
    ));

    metricChangeExploitDateRepository.saveAll(exploitDateChanges);
    metricChangeTargetRepository.saveAll(targetChanges);
    metricChangeSegmentRepository.save(metric7);
    metricChangeIxnRepository.saveAll(ixnChanges);

    assertArrayEquals(new long[]{1, 2, 1, 3}, metricsService.getAverageEditsPerWeek());
  }

  @Test
  public void returnsPercentageOfRfisThatMeetLTIOV() {
    assertEquals(0, metricsService.getLtiovMetPercentage());

    Rfi rfi1 =
      new Rfi("SDT20-321", "", "CLOSED", new Date(), "", new Date(convertDaysToMS(30)), "", "", "This is a ", "", "",
        "", "", "", "", "", "justifiction", "");
    Rfi rfi2 = new Rfi("SDT20-322", "", "CLOSED", new Date(), "", new Date(convertDaysToMS(20)), "", "",
      "This is a justifiction", "", "", "", "", "", "", "", "", "");
    Rfi rfi3 = new Rfi("SDT20-323", "", "CLOSED", new Date(), "", new Date(convertDaysToMS(35)), "", "",
      "This is a justifiction", "", "", "", "", "", "", "", "", "");
    Rfi rfi4 =
      new Rfi("SDT20-324", "", "CLOSED", new Date(), "", null, "", "", "This is a justifiction", "", "", "", "", "", "",
        "", "", "");

    //status is not closed, ignore
    Rfi rfi5 =
      new Rfi("SDT20-325", "", "NEW", new Date(), "", null, "", "", "This is a justifiction", "", "", "", "", "", "",
        "", "", "");
    Rfi rfi6 =
      new Rfi("SDT20-326", "", "OPEN", new Date(), "", null, "", "", "This is a justifiction", "", "", "", "", "", "",
        "", "", "");

    rfiRepository.saveAll(new ArrayList<>(Arrays.asList(rfi1, rfi2, rfi3, rfi4, rfi5, rfi6)));

    //closed immediately, ignore
    metricChangeRfiRepository.save(new MetricChangeRfi("SDT20-321", new Timestamp(convertDaysToMS(7)), "status", "NEW"
      , "OPEN"));
    metricChangeRfiRepository.save(new MetricChangeRfi("SDT20-321", new Timestamp(convertDaysToMS(7) + 10000L),
      "status", "OPEN", "CLOSED"));

    //Closed before LTIOV
    metricChangeRfiRepository.save(new MetricChangeRfi("SDT20-322", new Timestamp(convertDaysToMS(10)), "status",
      "NEW", "OPEN"));
    metricChangeRfiRepository.save(new MetricChangeRfi("SDT20-322", new Timestamp(convertDaysToMS(17) + 10000L),
      "status", "OPEN", "CLOSED"));

    //Closed after LTIOV
    metricChangeRfiRepository.save(new MetricChangeRfi("SDT20-323", new Timestamp(convertDaysToMS(20)), "status",
      "NEW", "OPEN"));
    metricChangeRfiRepository.save(new MetricChangeRfi("SDT20-323", new Timestamp(convertDaysToMS(41) + 10000L),
      "status", "OPEN", "CLOSED"));

    //No LTIOV
    metricChangeRfiRepository.save(new MetricChangeRfi("SDT20-324", new Timestamp(convertDaysToMS(20)), "status",
      "NEW", "OPEN"));
    metricChangeRfiRepository.save(new MetricChangeRfi("SDT20-324", new Timestamp(convertDaysToMS(41) + 10000L),
      "status", "OPEN", "CLOSED"));

    assertEquals(67, metricsService.getLtiovMetPercentage());
  }

  @Test
  public void returnsEstimatedCompletionTime() {
    assertEquals(-1, metricsService.getEstimatedCompletionTime());

    Rfi rfi1 =
      new Rfi("SDT20-321", "", "CLOSED", new Date(), "", new Date(convertDaysToMS(30)), "", "", "This is a ", "", "",
        "", "", "", "", "", "justifiction", "");
    rfi1.setReceiveDate(new Timestamp(convertDaysToMS(0)));
    Rfi rfi2 = new Rfi("SDT20-322", "", "CLOSED", new Date(), "", new Date(convertDaysToMS(20)), "", "",
      "This is a justifiction", "", "", "", "", "", "", "", "", "");
    rfi1.setReceiveDate(new Timestamp(convertDaysToMS(1)));
    Rfi rfi3 = new Rfi("SDT20-323", "", "CLOSED", new Date(), "", new Date(convertDaysToMS(35)), "", "",
      "This is a justifiction", "", "", "", "", "", "", "", "", "");
    rfi1.setReceiveDate(new Timestamp(convertDaysToMS(3)));
    Rfi rfi4 =
      new Rfi("SDT20-324", "", "CLOSED", new Date(), "", null, "", "", "This is a justifiction", "", "", "", "", "", "",
        "", "", "");
    rfi1.setReceiveDate(new Timestamp(convertDaysToMS(9)));

    MetricChangeRfi rfi1open = new MetricChangeRfi("SDT20-321", new Date(convertDaysToMS(1)), "status", "NEW", "OPEN");
    MetricChangeRfi rfi1close = new MetricChangeRfi("SDT20-321", new Date(convertDaysToMS(3)), "status", "OPEN", "CLOSED");

    MetricChangeRfi rfi2open = new MetricChangeRfi("SDT20-322", new Date(convertDaysToMS(2)), "status", "NEW", "OPEN");
    MetricChangeRfi rfi2close = new MetricChangeRfi("SDT20-322", new Date(convertDaysToMS(5)), "status", "OPEN", "CLOSED");

    MetricChangeRfi rfi3open = new MetricChangeRfi("SDT20-323", new Date(convertDaysToMS(4)), "status", "NEW", "OPEN");
    MetricChangeRfi rfi3close = new MetricChangeRfi("SDT20-323", new Date(convertDaysToMS(8)), "status", "OPEN", "CLOSED");

    MetricChangeRfi rfi4open = new MetricChangeRfi("SDT20-324", new Date(convertDaysToMS(10)), "status", "NEW", "OPEN");
    MetricChangeRfi rfi4close = new MetricChangeRfi("SDT20-324", new Date(convertDaysToMS(12)), "status", "OPEN", "CLOSED");

    rfiRepository.save(rfi1);
    metricChangeRfiRepository.saveAll(Arrays.asList(rfi1open, rfi1close));

    assertEquals(convertDaysToMS(2), metricsService.getEstimatedCompletionTime());

    rfiRepository.saveAll(Arrays.asList(rfi2, rfi3, rfi4));
    metricChangeRfiRepository.saveAll(Arrays.asList(rfi2open, rfi2close, rfi3open, rfi3close, rfi4open, rfi4close));

    assertEquals(convertDaysToMS(3), metricsService.getEstimatedCompletionTime());
  }

  @Test
  public void returnsRfisCompletedWithinDateRange() {
    MetricChangeRfi rfi1open = new MetricChangeRfi("SDT20-321", new Date(convertDaysToMS(1)), "status", "NEW", "OPEN");
    MetricChangeRfi rfi1close = new MetricChangeRfi("SDT20-321", new Date(convertDaysToMS(3)), "status", "OPEN", "CLOSED");

    MetricChangeRfi rfi2open = new MetricChangeRfi("SDT20-322", new Date(convertDaysToMS(2)), "status", "NEW", "OPEN");
    MetricChangeRfi rfi2close = new MetricChangeRfi("SDT20-322", new Date(convertDaysToMS(5)), "status", "OPEN", "CLOSED");

    MetricChangeRfi rfi3open = new MetricChangeRfi("SDT20-323", new Date(convertDaysToMS(4)), "status", "NEW", "OPEN");
    MetricChangeRfi rfi3close = new MetricChangeRfi("SDT20-323", new Date(convertDaysToMS(8)), "status", "OPEN", "CLOSED");

    MetricChangeRfi rfi4open = new MetricChangeRfi("SDT20-324", new Date(convertDaysToMS(10)), "status", "NEW", "OPEN");
    MetricChangeRfi rfi4close = new MetricChangeRfi("SDT20-324", new Date(convertDaysToMS(12)), "status", "OPEN", "CLOSED");

    metricChangeRfiRepository.saveAll(Arrays.asList(rfi1open, rfi1close, rfi2open, rfi2close, rfi3open, rfi3close, rfi4open,
      rfi4close));

    assertEquals(2,
      metricsService.getRfisCompleted(new Date(4 * MetricsService.MILLISECONDS_IN_A_DAY),
        new Date(9 * MetricsService.MILLISECONDS_IN_A_DAY)));
  }
}
