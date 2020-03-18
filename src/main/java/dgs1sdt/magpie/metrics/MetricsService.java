package dgs1sdt.magpie.metrics;

import dgs1sdt.magpie.ixns.Ixn;
import dgs1sdt.magpie.ixns.IxnJson;
import dgs1sdt.magpie.ixns.SegmentJson;
import dgs1sdt.magpie.metrics.cancelAddSegment.MetricCancelAddSegment;
import dgs1sdt.magpie.metrics.cancelAddSegment.MetricCancelAddSegmentRepository;
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
import dgs1sdt.magpie.metrics.clickGets.MetricClickGetsJson;
import dgs1sdt.magpie.metrics.clickGets.MetricClickGetsRepository;
import dgs1sdt.magpie.metrics.clickRefresh.MetricClickRefresh;
import dgs1sdt.magpie.metrics.clickRefresh.MetricClickRefreshRepository;
import dgs1sdt.magpie.metrics.createExploitDate.MetricCreateExploitDate;
import dgs1sdt.magpie.metrics.createExploitDate.MetricCreateExploitDateRepository;
import dgs1sdt.magpie.metrics.createIxn.MetricCreateIxn;
import dgs1sdt.magpie.metrics.createIxn.MetricCreateIxnRepository;
import dgs1sdt.magpie.metrics.createSegment.MetricCreateSegment;
import dgs1sdt.magpie.metrics.createSegment.MetricCreateSegmentRepository;
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
import dgs1sdt.magpie.metrics.rfiFetchTime.MetricRfiFetchTime;
import dgs1sdt.magpie.metrics.rfiFetchTime.MetricRfiFetchTimeJson;
import dgs1sdt.magpie.metrics.rfiFetchTime.MetricRfiFetchTimeRepository;
import dgs1sdt.magpie.metrics.siteVisit.MetricSiteVisit;
import dgs1sdt.magpie.metrics.siteVisit.MetricSiteVisitRepository;
import dgs1sdt.magpie.metrics.sortClick.MetricClickSort;
import dgs1sdt.magpie.metrics.sortClick.MetricClickSortJson;
import dgs1sdt.magpie.metrics.sortClick.MetricClickSortRepository;
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
import dgs1sdt.magpie.tgts.exploitDates.ExploitDateJson;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.List;

@Service
public class MetricsService {
  private RfiRepository rfiRepository;
  private MetricClickGetsRepository metricClickGetsRepository;
  private MetricSiteVisitRepository metricSiteVisitRepository;
  private MetricClickSortRepository metricClickSortRepository;
  private MetricRfiFetchTimeRepository metricRfiFetchTimeRepository;
  private MetricChangeRfiPriorityRepository metricChangeRfiPriorityRepository;
  private MetricChangeRfiRepository metricChangeRfiRepository;
  private MetricClickRefreshRepository metricClickRefreshRepository;
  private MetricCreateExploitDateRepository metricCreateExploitDateRepository;
  private MetricChangeExploitDateRepository metricChangeExploitDateRepository;
  private MetricDeleteExploitDateRepository metricDeleteExploitDateRepository;
  private MetricCreateTargetRepository metricCreateTargetRepository;
  private MetricChangeTargetRepository metricChangeTargetRepository;
  private MetricDeleteTargetRepository metricDeleteTargetRepository;
  private MetricCreateSegmentRepository metricCreateSegmentRepository;
  private MetricChangeSegmentRepository metricChangeSegmentRepository;
  private MetricDeleteSegmentRepository metricDeleteSegmentRepository;
  private MetricCreateIxnRepository metricCreateIxnRepository;
  private MetricChangeIxnRepository metricChangeIxnRepository;
  private MetricDeleteIxnRepository metricDeleteIxnRepository;
  private MetricUndoIxnDeleteRepository metricUndoIxnDeleteRepository;
  private MetricUndoSegmentDeleteRepository metricUndoSegmentDeleteRepository;
  private MetricUndoTargetDeleteRepository metricUndoTargetDeleteRepository;
  private MetricUndoExploitDateDeleteRepository metricUndoExploitDateDeleteRepository;
  private MetricCancelAddSegmentRepository metricCancelAddSegmentRepository;
  private MetricLoginRepository metricLoginRepository;

  @Autowired
  public void setRfiRepository(RfiRepository rfiRepository) {
    this.rfiRepository = rfiRepository;
  }

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
  public void setMetricCreateExploitDateRepository(MetricCreateExploitDateRepository metricCreateExploitDateRepository) {
    this.metricCreateExploitDateRepository = metricCreateExploitDateRepository;
  }

  @Autowired
  public void setMetricChangeExploitDateRepository(MetricChangeExploitDateRepository metricChangeExploitDateRepository) {
    this.metricChangeExploitDateRepository = metricChangeExploitDateRepository;
  }

  @Autowired
  public void setMetricCreateTargetRepository(MetricCreateTargetRepository metricCreateTargetRepository) {
    this.metricCreateTargetRepository = metricCreateTargetRepository;
  }

  @Autowired
  public void setMetricDeleteTargetRepository(MetricDeleteTargetRepository metricDeleteTargetRepository) {
    this.metricDeleteTargetRepository = metricDeleteTargetRepository;
  }

  @Autowired
  public void setMetricDeleteExploitDateRepository(MetricDeleteExploitDateRepository metricDeleteExploitDateRepository) {
    this.metricDeleteExploitDateRepository = metricDeleteExploitDateRepository;
  }

  @Autowired
  public void setMetricChangeTargetRepository(MetricChangeTargetRepository metricChangeTargetRepository) {
    this.metricChangeTargetRepository = metricChangeTargetRepository;
  }

  @Autowired
  public void setMetricCreateSegmentRepository(MetricCreateSegmentRepository metricCreateSegmentRepository) {
    this.metricCreateSegmentRepository = metricCreateSegmentRepository;
  }

  @Autowired
  public void setMetricChangeSegmentRepository(MetricChangeSegmentRepository metricChangeSegmentRepository) {
    this.metricChangeSegmentRepository = metricChangeSegmentRepository;
  }

  @Autowired
  public void setMetricDeleteSegmentRepository(MetricDeleteSegmentRepository metricDeleteSegmentRepository) {
    this.metricDeleteSegmentRepository = metricDeleteSegmentRepository;
  }

  @Autowired
  public void setMetricCreateIxnRepository(MetricCreateIxnRepository metricCreateIxnRepository) {
    this.metricCreateIxnRepository = metricCreateIxnRepository;
  }

  @Autowired
  public void setMetricChangeIxnRepository(MetricChangeIxnRepository metricChangeIxnRepository) {
    this.metricChangeIxnRepository = metricChangeIxnRepository;
  }

  @Autowired
  public void setMetricDeleteIxnRepository(MetricDeleteIxnRepository metricDeleteIxnRepository) {
    this.metricDeleteIxnRepository = metricDeleteIxnRepository;
  }

  @Autowired
  public void setMetricUndoIxnDeleteRepository(MetricUndoIxnDeleteRepository metricUndoIxnDeleteRepository) {
    this.metricUndoIxnDeleteRepository = metricUndoIxnDeleteRepository;
  }

  @Autowired
  public void setMetricUndoSegmentDeleteRepository(MetricUndoSegmentDeleteRepository metricUndoSegmentDeleteRepository) {
    this.metricUndoSegmentDeleteRepository = metricUndoSegmentDeleteRepository;
  }

  @Autowired
  public void setMetricUndoTargetDeleteRepository(MetricUndoTargetDeleteRepository metricUndoTargetDeleteRepository) {
    this.metricUndoTargetDeleteRepository = metricUndoTargetDeleteRepository;
  }

  @Autowired
  public void setMetricUndoExploitDateDeleteRepository(MetricUndoExploitDateDeleteRepository metricUndoExploitDateDeleteRepository) {
    this.metricUndoExploitDateDeleteRepository = metricUndoExploitDateDeleteRepository;
  }

  @Autowired
  public void setMetricCancelAddSegmentRepository(MetricCancelAddSegmentRepository metricCancelAddSegmentRepository) {
    this.metricCancelAddSegmentRepository = metricCancelAddSegmentRepository;
  }

  @Autowired
  public void setMetricLoginRepository(MetricLoginRepository metricLoginRepository) {
    this.metricLoginRepository = metricLoginRepository;
  }

  public long getSiteVisitCount() {
    return metricSiteVisitRepository.count();
  }

  public int[] getSiteVisitsLast7Days() {
    List<MetricSiteVisit> allMetricSiteVisits = metricSiteVisitRepository.findAll();

//    Array that has DATE epochs at midnight over the last 7 days
//    e.g. daysAgo[0] is midnight today, daysAgo[1] is midnight yesterday, etc.
    Date[] daysAgo = setupDaysAgo();

//    Returns array of site visits

    return matchSiteVisitsToDays(allMetricSiteVisits, daysAgo);
  }

  private int[] matchSiteVisitsToDays(List<MetricSiteVisit> allMetricSiteVisits, Date[] daysAgo) {
    int[] last7Days = {0, 0, 0, 0, 0, 0, 0};
    for (MetricSiteVisit metricSiteVisit : allMetricSiteVisits) {
      Date datetime = metricSiteVisit.getDatetime();
      for (int i = 6; i > 0; i--) {
        if (datetime.after(daysAgo[i]) && datetime.before(daysAgo[i - 1])) {
          last7Days[6 - i]++;
        }
      }
      if (datetime.after(daysAgo[0])) {
        last7Days[6]++;
      }
    }
    return last7Days;
  }

  private Date[] setupDaysAgo() {
    Date[] daysAgo = new Date[7];
    long now = new Date().getTime();
    long millisecondsInADay = 86400000L;
    Calendar[] cal = new Calendar[7];
    for (int i = 0; i < 7; i++) {
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

  public void addSiteVisit() {
    MetricSiteVisit metricSiteVisit = new MetricSiteVisit(new Date());
    this.metricSiteVisitRepository.save(metricSiteVisit);
  }

  public long getClickRefreshCount() {
    return metricClickRefreshRepository.count();
  }

  public void addClickRefresh() {
    MetricClickRefresh metricClickRefresh = new MetricClickRefresh(new Date());
    this.metricClickRefreshRepository.save(metricClickRefresh);
  }

  public long getClickGetsCount() {
    return metricClickGetsRepository.count();
  }

  public MetricClickGets createClickGets(MetricClickGetsJson metricClickGetsJson) {
    MetricClickGets metricClickGets = new MetricClickGets(
      new Date(),
      metricClickGetsJson.getStatus(),
      metricClickGetsJson.getUrl()

    );
    return this.metricClickGetsRepository.save(metricClickGets);
  }

  public MetricClickSort createClickSort(MetricClickSortJson metricClickSortJson) {
    MetricClickSort metricClickSort = new MetricClickSort(
      new Date(),
      metricClickSortJson.getKey(),
      metricClickSortJson.getOrder()
    );
    return this.metricClickSortRepository.save(metricClickSort);
  }

  public MetricRfiFetchTime createRfiFetchTime(MetricRfiFetchTimeJson metricRfiFetchTimeJson) {
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

  public MetricChangeExploitDate addChangeExploitDate(ExploitDateJson exploitDate) {
    return this.metricChangeExploitDateRepository.save(new MetricChangeExploitDate(exploitDate));
  }

  public MetricCreateTarget addCreateTarget(long targetId, TargetJson target) {
    return this.metricCreateTargetRepository.save(new MetricCreateTarget(targetId, target));
  }

  public MetricDeleteExploitDate addDeleteExploitDate(long exploitDateId) {
    return metricDeleteExploitDateRepository.save(new MetricDeleteExploitDate(exploitDateId));
  }

  public MetricDeleteTarget addDeleteTarget(long targetId) {
    return this.metricDeleteTargetRepository.save(new MetricDeleteTarget(targetId));
  }

  public List<MetricChangeTarget> addChangeTarget(Target oldTarget, TargetJson newTarget) {
    List<MetricChangeTarget> metrics = new ArrayList<>();
    Timestamp now = new Timestamp(new Date().getTime());
    for (String field : oldTarget.Compare(newTarget)) {
      try {
        MetricChangeTarget changeTarget = new MetricChangeTarget(
          field,
          newTarget,
          now
        );
        metrics.add(changeTarget);
      } catch (Exception e) {
        System.err.println("Error creating change target metric with unknown field: " + field);
      }
    }
    return metricChangeTargetRepository.saveAll(metrics);
  }

  public MetricCreateSegment addCreateSegment(long segmentId, SegmentJson segmentJson) {
    return metricCreateSegmentRepository.save(new MetricCreateSegment(segmentId, segmentJson));
  }

  public MetricChangeSegment addChangeSegment(SegmentJson newSegment) {
    return metricChangeSegmentRepository.save(new MetricChangeSegment(newSegment));
  }

  public MetricDeleteSegment addDeleteSegment(long segmentId, boolean hadIxns) {
    return metricDeleteSegmentRepository.save(new MetricDeleteSegment(segmentId, hadIxns));
  }

  public MetricCreateIxn addCreateIxn(long ixnId, IxnJson ixn) {
    return metricCreateIxnRepository.save(new MetricCreateIxn(ixnId, ixn));
  }

  public MetricDeleteIxn addDeleteIxn(long ixnId) {
    return metricDeleteIxnRepository.save(new MetricDeleteIxn(ixnId));
  }

  public List<MetricChangeIxn> addChangeIxn(IxnJson newIxn, Ixn oldIxn) {
    List<MetricChangeIxn> metrics = new ArrayList<>();
    Timestamp now = new Timestamp(new Date().getTime());
    for (String field : oldIxn.Compare(newIxn)) {
      try {
        metrics.add(new MetricChangeIxn(field, newIxn, now));
      } catch (Exception e) {
        System.err.println("Error creating change ixn metric with unknown field: " + field);
      }
    }
    return metricChangeIxnRepository.saveAll(metrics);
  }

  public MetricCreateExploitDate addCreateExploitDate(long lastExploitDateId, ExploitDateJson exploitDateJson) {
    return metricCreateExploitDateRepository.save(new MetricCreateExploitDate(lastExploitDateId, exploitDateJson));
  }

  public MetricUndoIxnDelete addUndoIxnDelete(long ixnId) {
    return metricUndoIxnDeleteRepository.save(new MetricUndoIxnDelete(ixnId));
  }

  public MetricUndoSegmentDelete addUndoSegmentDelete(long segmentId) {
    return metricUndoSegmentDeleteRepository.save(new MetricUndoSegmentDelete(segmentId));
  }

  public MetricUndoTargetDelete addUndoTargetDelete(long targetId) {
    return metricUndoTargetDeleteRepository.save(new MetricUndoTargetDelete(targetId));
  }

  public MetricUndoExploitDateDelete addUndoExploitDateDelete(long exploitDateId) {
    return metricUndoExploitDateDeleteRepository.save(new MetricUndoExploitDateDelete(exploitDateId));
  }

  public MetricCancelAddSegment createCancelAddSegment(long targetId) {
    return metricCancelAddSegmentRepository.save(new MetricCancelAddSegment(targetId));
  }

  public MetricLogin addLoginMetric(String userName) {
    return metricLoginRepository.save(new MetricLogin(userName));
  }

  public long[] getAverageWorkflowTime() {
    final long MillisecondsInADay = 86400000L;
    int totalTimePending = 0;
    int totalTimeOpen = 0;
    int numberRfis = 0;

    List<Rfi> closedRfis = rfiRepository.findAllClosedWithDefinedReceiveDate();

    for (Rfi rfi : closedRfis) {
      MetricChangeRfi metricOpen = metricChangeRfiRepository.findStatusChangeToOpenByRfiNum(rfi.getRfiNum());
      MetricChangeRfi metricClose = metricChangeRfiRepository.findStatusChangeToClosedByRfiNum(rfi.getRfiNum());
      if (metricOpen != null && metricClose != null &&
        metricClose.getDatetime().getTime() - metricOpen.getDatetime().getTime() > MillisecondsInADay) {

        Date openTime = metricOpen.getDatetime();
        long daysPending = (openTime.getTime() - rfi.getReceiveDate().getTime()) / MillisecondsInADay;
        totalTimePending += daysPending;

        Date closedTime = metricClose.getDatetime();
        long daysOpen = (closedTime.getTime() - openTime.getTime()) / MillisecondsInADay;
        totalTimeOpen += daysOpen;
        numberRfis++;
      }
    }

    if (numberRfis > 0)
      return new long[]{totalTimeOpen / numberRfis, totalTimePending / numberRfis};
    return new long[]{0, 0};
  }
}
