package dgs1sdt.magpie.metrics;

import dgs1sdt.magpie.ixns.Ixn;
import dgs1sdt.magpie.ixns.IxnJson;
import dgs1sdt.magpie.ixns.IxnStatus;
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
import dgs1sdt.magpie.metrics.changeScoi.MetricChangeScoi;
import dgs1sdt.magpie.metrics.changeScoi.MetricChangeScoiRepository;
import dgs1sdt.magpie.metrics.changeSegment.MetricChangeSegment;
import dgs1sdt.magpie.metrics.changeSegment.MetricChangeSegmentRepository;
import dgs1sdt.magpie.metrics.changeTarget.MetricChangeTarget;
import dgs1sdt.magpie.metrics.changeTarget.MetricChangeTargetRepository;
import dgs1sdt.magpie.metrics.clickCollapse.MetricClickCollapse;
import dgs1sdt.magpie.metrics.clickCollapse.MetricClickCollapseRepository;
import dgs1sdt.magpie.metrics.clickGets.MetricClickGets;
import dgs1sdt.magpie.metrics.clickGets.MetricClickGetsJson;
import dgs1sdt.magpie.metrics.clickGets.MetricClickGetsRepository;
import dgs1sdt.magpie.metrics.clickImport.MetricClickImport;
import dgs1sdt.magpie.metrics.clickImport.MetricClickImportJson;
import dgs1sdt.magpie.metrics.clickImport.MetricClickImportRepository;
import dgs1sdt.magpie.metrics.clickRefresh.MetricClickRefresh;
import dgs1sdt.magpie.metrics.clickRefresh.MetricClickRefreshRepository;
import dgs1sdt.magpie.metrics.clickRollup.MetricClickRollup;
import dgs1sdt.magpie.metrics.clickRollup.MetricClickRollupJson;
import dgs1sdt.magpie.metrics.clickRollup.MetricClickRollupRepository;
import dgs1sdt.magpie.metrics.clickScoreboard.MetricClickScoreboard;
import dgs1sdt.magpie.metrics.clickScoreboard.MetricClickScoreboardRepository;
import dgs1sdt.magpie.metrics.clickSort.MetricClickSort;
import dgs1sdt.magpie.metrics.clickSort.MetricClickSortJson;
import dgs1sdt.magpie.metrics.clickSort.MetricClickSortRepository;
import dgs1sdt.magpie.metrics.clickTrackNarrative.MetricClickTrackNarrative;
import dgs1sdt.magpie.metrics.clickTrackNarrative.MetricClickTrackNarrativeJson;
import dgs1sdt.magpie.metrics.clickTrackNarrative.MetricClickTrackNarrativeRepository;
import dgs1sdt.magpie.metrics.createExploitDate.MetricCreateExploitDate;
import dgs1sdt.magpie.metrics.createExploitDate.MetricCreateExploitDateRepository;
import dgs1sdt.magpie.metrics.createIxn.MetricCreateIxn;
import dgs1sdt.magpie.metrics.createIxn.MetricCreateIxnRepository;
import dgs1sdt.magpie.metrics.createScoi.MetricCreateScoi;
import dgs1sdt.magpie.metrics.createScoi.MetricCreateScoiRepository;
import dgs1sdt.magpie.metrics.createSegment.MetricCreateSegment;
import dgs1sdt.magpie.metrics.createSegment.MetricCreateSegmentRepository;
import dgs1sdt.magpie.metrics.createTarget.MetricCreateTarget;
import dgs1sdt.magpie.metrics.createTarget.MetricCreateTargetRepository;
import dgs1sdt.magpie.metrics.createTargetFromGets.MetricCreateTargetFromGets;
import dgs1sdt.magpie.metrics.createTargetFromGets.MetricCreateTargetFromGetsRepository;
import dgs1sdt.magpie.metrics.deleteExploitDate.MetricDeleteExploitDate;
import dgs1sdt.magpie.metrics.deleteExploitDate.MetricDeleteExploitDateRepository;
import dgs1sdt.magpie.metrics.deleteIxn.MetricDeleteIxn;
import dgs1sdt.magpie.metrics.deleteIxn.MetricDeleteIxnRepository;
import dgs1sdt.magpie.metrics.deleteSegment.MetricDeleteSegment;
import dgs1sdt.magpie.metrics.deleteSegment.MetricDeleteSegmentRepository;
import dgs1sdt.magpie.metrics.deleteTarget.MetricDeleteTarget;
import dgs1sdt.magpie.metrics.deleteTarget.MetricDeleteTargetRepository;
import dgs1sdt.magpie.metrics.downloadProduct.MetricDownloadProduct;
import dgs1sdt.magpie.metrics.downloadProduct.MetricDownloadProductRepository;
import dgs1sdt.magpie.metrics.login.MetricLogin;
import dgs1sdt.magpie.metrics.login.MetricLoginRepository;
import dgs1sdt.magpie.metrics.siteVisit.MetricSiteVisit;
import dgs1sdt.magpie.metrics.siteVisit.MetricSiteVisitRepository;
import dgs1sdt.magpie.metrics.undoChangeRfiPriority.MetricUndoChangeRfiPriority;
import dgs1sdt.magpie.metrics.undoChangeRfiPriority.MetricUndoChangeRfiPriorityRepository;
import dgs1sdt.magpie.metrics.undoExploitDateDelete.MetricUndoExploitDateDelete;
import dgs1sdt.magpie.metrics.undoExploitDateDelete.MetricUndoExploitDateDeleteRepository;
import dgs1sdt.magpie.metrics.undoIxnDelete.MetricUndoIxnDelete;
import dgs1sdt.magpie.metrics.undoIxnDelete.MetricUndoIxnDeleteRepository;
import dgs1sdt.magpie.metrics.undoSegmentDelete.MetricUndoSegmentDelete;
import dgs1sdt.magpie.metrics.undoSegmentDelete.MetricUndoSegmentDeleteRepository;
import dgs1sdt.magpie.metrics.undoTargetCreate.MetricUndoTargetCreate;
import dgs1sdt.magpie.metrics.undoTargetCreate.MetricUndoTargetCreateRepository;
import dgs1sdt.magpie.metrics.undoTargetDelete.MetricUndoTargetDelete;
import dgs1sdt.magpie.metrics.undoTargetDelete.MetricUndoTargetDeleteRepository;
import dgs1sdt.magpie.metrics.uploadProduct.MetricUploadProduct;
import dgs1sdt.magpie.metrics.uploadProduct.MetricUploadProductRepository;
import dgs1sdt.magpie.metrics.visitFeedbackPage.MetricVisitFeedbackPage;
import dgs1sdt.magpie.metrics.visitFeedbackPage.MetricVisitFeedbackPageRepository;
import dgs1sdt.magpie.metrics.visitScoiPage.MetricVisitScoiPage;
import dgs1sdt.magpie.metrics.visitScoiPage.MetricVisitScoiPageRepository;
import dgs1sdt.magpie.rfis.Rfi;
import dgs1sdt.magpie.rfis.RfiRepository;
import dgs1sdt.magpie.scois.Scoi;
import dgs1sdt.magpie.tgts.Target;
import dgs1sdt.magpie.tgts.TargetJson;
import dgs1sdt.magpie.tgts.TargetRepository;
import dgs1sdt.magpie.tgts.exploitDates.ExploitDateJson;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.List;

import static java.lang.Short.parseShort;

@Service
@Slf4j
public class MetricsService {
  static final long MILLISECONDS_IN_A_DAY = 86400000L;

  private RfiRepository rfiRepository;
  private TargetRepository targetRepository;
  private MetricClickGetsRepository metricClickGetsRepository;
  private MetricSiteVisitRepository metricSiteVisitRepository;
  private MetricClickSortRepository metricClickSortRepository;
  private MetricChangeRfiPriorityRepository metricChangeRfiPriorityRepository;
  private MetricChangeRfiRepository metricChangeRfiRepository;
  private MetricClickRefreshRepository metricClickRefreshRepository;
  private MetricCreateExploitDateRepository metricCreateExploitDateRepository;
  private MetricChangeExploitDateRepository metricChangeExploitDateRepository;
  private MetricDeleteExploitDateRepository metricDeleteExploitDateRepository;
  private MetricCreateTargetRepository metricCreateTargetRepository;
  private MetricCreateTargetFromGetsRepository metricCreateTargetFromGetsRepository;
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
  private MetricClickTrackNarrativeRepository metricClickTrackNarrativeRepository;
  private MetricClickRollupRepository metricClickRollupRepository;
  private MetricClickImportRepository metricClickImportRepository;
  private MetricClickCollapseRepository metricClickCollapseRepository;
  private MetricUndoChangeRfiPriorityRepository metricUndoChangeRfiPriorityRepository;
  private MetricUndoTargetCreateRepository metricUndoTargetCreateRepository;
  private MetricUploadProductRepository metricUploadProductRepository;
  private MetricDownloadProductRepository metricDownloadProductRepository;
  private MetricClickScoreboardRepository metricClickScoreboardRepository;
  private MetricVisitFeedbackPageRepository metricVisitFeedbackPageRepository;
  private MetricCreateScoiRepository metricCreateScoiRepository;
  private MetricChangeScoiRepository metricChangeScoiRepository;
  private MetricVisitScoiPageRepository metricVisitScoiPageRepository;

  @Autowired
  public void setRfiRepository(RfiRepository rfiRepository) {
    this.rfiRepository = rfiRepository;
  }

  @Autowired
  public void setTargetRepository(TargetRepository targetRepository) {
    this.targetRepository = targetRepository;
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
  public void setMetricChangeRfiPriorityRepository(
    MetricChangeRfiPriorityRepository metricChangeRfiPriorityRepository) {
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
  public void setMetricCreateExploitDateRepository(
    MetricCreateExploitDateRepository metricCreateExploitDateRepository) {
    this.metricCreateExploitDateRepository = metricCreateExploitDateRepository;
  }

  @Autowired
  public void setMetricChangeExploitDateRepository(
    MetricChangeExploitDateRepository metricChangeExploitDateRepository) {
    this.metricChangeExploitDateRepository = metricChangeExploitDateRepository;
  }

  @Autowired
  public void setMetricCreateTargetRepository(MetricCreateTargetRepository metricCreateTargetRepository) {
    this.metricCreateTargetRepository = metricCreateTargetRepository;
  }

  @Autowired
  public void setMetricCreateTargetFromGetsRepository(
    MetricCreateTargetFromGetsRepository metricCreateTargetFromGetsRepository) {
    this.metricCreateTargetFromGetsRepository = metricCreateTargetFromGetsRepository;
  }

  @Autowired
  public void setMetricDeleteTargetRepository(MetricDeleteTargetRepository metricDeleteTargetRepository) {
    this.metricDeleteTargetRepository = metricDeleteTargetRepository;
  }

  @Autowired
  public void setMetricDeleteExploitDateRepository(
    MetricDeleteExploitDateRepository metricDeleteExploitDateRepository) {
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
  public void setMetricUndoSegmentDeleteRepository(
    MetricUndoSegmentDeleteRepository metricUndoSegmentDeleteRepository) {
    this.metricUndoSegmentDeleteRepository = metricUndoSegmentDeleteRepository;
  }

  @Autowired
  public void setMetricUndoTargetDeleteRepository(MetricUndoTargetDeleteRepository metricUndoTargetDeleteRepository) {
    this.metricUndoTargetDeleteRepository = metricUndoTargetDeleteRepository;
  }

  @Autowired
  public void setMetricUndoExploitDateDeleteRepository(
    MetricUndoExploitDateDeleteRepository metricUndoExploitDateDeleteRepository) {
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

  @Autowired
  public void setMetricClickTrackNarrativeRepository(
    MetricClickTrackNarrativeRepository metricClickTrackNarrativeRepository) {
    this.metricClickTrackNarrativeRepository = metricClickTrackNarrativeRepository;
  }

  @Autowired
  public void setMetricClickRollupRepository(MetricClickRollupRepository metricClickRollupRepository) {
    this.metricClickRollupRepository = metricClickRollupRepository;
  }

  @Autowired
  public void setMetricClickImportRepository(MetricClickImportRepository metricClickImportRepository) {
    this.metricClickImportRepository = metricClickImportRepository;
  }

  @Autowired
  public void setMetricClickCollapseRepository(MetricClickCollapseRepository metricClickCollapseRepository) {
    this.metricClickCollapseRepository = metricClickCollapseRepository;
  }

  @Autowired
  public void setMetricUndoChangeRfiPriorityRepository(
    MetricUndoChangeRfiPriorityRepository metricUndoChangeRfiPriorityRepository) {
    this.metricUndoChangeRfiPriorityRepository = metricUndoChangeRfiPriorityRepository;
  }

  @Autowired
  public void setMetricUndoTargetCreateRepository(
    MetricUndoTargetCreateRepository metricUndoTargetCreateRepository) {
    this.metricUndoTargetCreateRepository = metricUndoTargetCreateRepository;
  }

  @Autowired
  public void setMetricVisitFeedbackPageRepository(
    MetricVisitFeedbackPageRepository metricVisitFeedbackPageRepository) {
    this.metricVisitFeedbackPageRepository = metricVisitFeedbackPageRepository;
  }

  @Autowired
  public void setMetricUploadProductRepository(
    MetricUploadProductRepository metricUploadProductRepository) {
    this.metricUploadProductRepository = metricUploadProductRepository;
  }

  @Autowired
  public void setMetricDownloadProductRepository(
    MetricDownloadProductRepository metricDownloadProductRepository) {
    this.metricDownloadProductRepository = metricDownloadProductRepository;
  }

  @Autowired
  public void setMetricClickScoreboardRepository(
    MetricClickScoreboardRepository metricClickScoreboardRepository) {
    this.metricClickScoreboardRepository = metricClickScoreboardRepository;
  }

  @Autowired
  public void setMetricCreateScoiRepository(
    MetricCreateScoiRepository metricCreateScoiRepository) {
    this.metricCreateScoiRepository = metricCreateScoiRepository;
  }

  @Autowired
  public void setMetricChangeScoiRepository(
    MetricChangeScoiRepository metricChangeScoiRepository) {
    this.metricChangeScoiRepository = metricChangeScoiRepository;
  }

  @Autowired
  public void setMetricVisitScoiPageRepository(MetricVisitScoiPageRepository metricVisitScoiPageRepository) {
    this.metricVisitScoiPageRepository = metricVisitScoiPageRepository;
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

  public long[] getClickGetsCount() {
    return new long[]{
      metricClickGetsRepository.findAllByStatus("OPEN").size(),
      metricClickGetsRepository.findAllByStatus("PENDING").size()
    };
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

  public List<MetricChangeRfiPriority> addChangeRfiPriority(List<MetricChangeRfiPriority> metricChangeRfiPriorities) {
    return this.metricChangeRfiPriorityRepository.saveAll(metricChangeRfiPriorities);
  }

  public MetricChangeRfi addChangeRfi(MetricChangeRfi metricChangeRfi) {
    return this.metricChangeRfiRepository.save(metricChangeRfi);
  }

  public MetricChangeExploitDate addChangeExploitDate(ExploitDateJson exploitDate) {
    return this.metricChangeExploitDateRepository.save(new MetricChangeExploitDate(exploitDate));
  }

  public MetricCreateTarget addCreateTarget(long targetId, TargetJson target, String name, String userName, Boolean isCopy) {
    return this.metricCreateTargetRepository.save(new MetricCreateTarget(targetId, target, name, userName, isCopy));
  }

  public MetricDeleteExploitDate addDeleteExploitDate(long exploitDateId) {
    return metricDeleteExploitDateRepository.save(new MetricDeleteExploitDate(exploitDateId));
  }

  public MetricDeleteTarget addDeleteTarget(long targetId) {
    return this.metricDeleteTargetRepository.save(new MetricDeleteTarget(targetId));
  }

  public List<MetricChangeTarget> addChangeTarget(Target oldTarget, TargetJson newTarget, String userName) {
    List<MetricChangeTarget> metrics = new ArrayList<>();
    Timestamp now = new Timestamp(new Date().getTime());
    for (String field : oldTarget.compare(newTarget)) {
      try {
        MetricChangeTarget changeTarget = new MetricChangeTarget(
          field,
          newTarget,
          now,
          userName
        );
        metrics.add(changeTarget);
      } catch (Exception e) {
        log.error("Error creating change target metric with unknown field: " + field);
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

  public MetricCreateIxn addCreateIxn(long ixnId, IxnJson ixn, String userName) {
    return metricCreateIxnRepository.save(new MetricCreateIxn(ixnId, ixn, userName));
  }

  public MetricDeleteIxn addDeleteIxn(long ixnId) {
    return metricDeleteIxnRepository.save(new MetricDeleteIxn(ixnId));
  }

  public List<MetricChangeIxn> addChangeIxn(IxnJson newIxn, Ixn oldIxn, String userName) {
    List<MetricChangeIxn> metrics = new ArrayList<>();
    Timestamp now = new Timestamp(new Date().getTime());
    for (String field : oldIxn.compare(newIxn)) {
      try {
        metrics.add(new MetricChangeIxn(field, newIxn, now, userName));
      } catch (Exception e) {
        log.error("Error creating change ixn metric with unknown field: " + field);
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

  public MetricUndoChangeRfiPriority addUndoChangeRfiPriority(long rfiId, String userName) {
    return metricUndoChangeRfiPriorityRepository.save(new MetricUndoChangeRfiPriority(rfiId, userName));
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

  public MetricUploadProduct addUploadFileMetric(String rfiId, long uploadId, String userName) {
    return metricUploadProductRepository.save(new MetricUploadProduct(parseShort(rfiId), uploadId, userName));
  }

  public MetricDownloadProduct addDownloadProduct(long rfiId, String userName) {
    return metricDownloadProductRepository.save(new MetricDownloadProduct(rfiId, userName));
  }

  public MetricClickScoreboard addClickScoreboard(String userName) {
    return metricClickScoreboardRepository.save(new MetricClickScoreboard(userName));
  }

  public void createVisitFeedbackPage(String rfiNum) {
    metricVisitFeedbackPageRepository.save(new MetricVisitFeedbackPage(rfiNum));
  }

  public void addCreateScoi(long scoiId, String userName) {
    metricCreateScoiRepository.save(new MetricCreateScoi(scoiId, userName));
  }

  public void addChangeScoiMetrics(Scoi oldScoi, Scoi newScoi, String userName) {
    Timestamp now = new Timestamp(new Date().getTime());
    for (String field : oldScoi.compare(newScoi)) {
      try {
        metricChangeScoiRepository.save(new MetricChangeScoi(field, newScoi, now, userName));
      } catch (Exception e) {
        log.error("Failed to save MetricChangeScoi with field " + field);
      }
    }
  }

  public MetricClickRollup createClickRollup(MetricClickRollupJson metricClickRollupJson) {
    return metricClickRollupRepository.save(new MetricClickRollup(metricClickRollupJson));
  }

  public MetricClickImport createClickImport(MetricClickImportJson metricClickImportJson) {
    return metricClickImportRepository.save(new MetricClickImport(metricClickImportJson));
  }

  public MetricVisitScoiPage addVisitScoiPage(String userName) {
    return metricVisitScoiPageRepository.save(new MetricVisitScoiPage(userName));
  }

  public MetricClickCollapse createClickCollapse(String userName) {
    return metricClickCollapseRepository.save(new MetricClickCollapse(userName));
  }

  public long[] getAverageWorkflowTime() {
    int totalTimePending = 0;
    int totalTimeOpen = 0;
    int numberRfis = 0;

    List<Rfi> closedRfis = rfiRepository.findAllClosedWithDefinedReceiveDate();

    for (Rfi rfi : closedRfis) {
      MetricChangeRfi metricOpen = metricChangeRfiRepository.findStatusChangeToOpenByRfiNum(rfi.getRfiNum());
      MetricChangeRfi metricClose = metricChangeRfiRepository.findStatusChangeToClosedByRfiNum(rfi.getRfiNum());
      if (metricOpen != null && metricClose != null &&
        metricClose.getDatetime().getTime() - metricOpen.getDatetime().getTime() > MILLISECONDS_IN_A_DAY) {

        Date openTime = metricOpen.getDatetime();
        long daysPending = (openTime.getTime() - rfi.getReceiveDate().getTime()) / MILLISECONDS_IN_A_DAY;
        totalTimePending += daysPending;

        Date closedTime = metricClose.getDatetime();
        long daysOpen = (closedTime.getTime() - openTime.getTime()) / MILLISECONDS_IN_A_DAY;
        totalTimeOpen += daysOpen;
        numberRfis++;
      }
    }

    if (numberRfis > 0) {
      return new long[]{totalTimeOpen / numberRfis, totalTimePending / numberRfis};
    }
    return new long[]{0, 0};
  }

  public long getAverageCompletionTimeLast3Rfis() {
    int totalTimeOpen = 0;
    int numberRfis = 0;

    List<Rfi> closedRfis = rfiRepository.findAllClosedWithDefinedReceiveDate();

    for (int i = 0; i < closedRfis.size() && numberRfis < 3; i++) {
      Rfi rfi = closedRfis.get(i);
      MetricChangeRfi metricOpen = metricChangeRfiRepository.findStatusChangeToOpenByRfiNum(rfi.getRfiNum());
      MetricChangeRfi metricClose = metricChangeRfiRepository.findStatusChangeToClosedByRfiNum(rfi.getRfiNum());
      if (metricOpen != null && metricClose != null &&
        metricClose.getDatetime().getTime() - metricOpen.getDatetime().getTime() > MILLISECONDS_IN_A_DAY) {

        Date openTime = metricOpen.getDatetime();
        Date closedTime = metricClose.getDatetime();
        long daysOpen = (closedTime.getTime() - openTime.getTime()) / MILLISECONDS_IN_A_DAY;
        totalTimeOpen += daysOpen;
        numberRfis++;
      }
    }

    if (numberRfis > 0) {
      return MILLISECONDS_IN_A_DAY * (totalTimeOpen / numberRfis);
    }

    return -1;
  }

  public long getAverageTgtCreationsPerWeek() {
    return getAveragePerWeek(metricCreateTargetRepository.findAll());
  }

  public long getAverageIxnCreationsPerWeek() {
    return getAveragePerWeek(metricCreateIxnRepository.findAll());
  }

  public long[] getAverageDeletionsPerWeek() {
    return new long[]{
      getAveragePerWeek(metricDeleteExploitDateRepository.findAll()),
      getAveragePerWeek(metricDeleteTargetRepository.findAll()),
      getAveragePerWeek(metricDeleteSegmentRepository.findAll()),
      getAveragePerWeek(metricDeleteIxnRepository.findAll())
    };
  }

  public long[] getAverageUndosPerWeek() {
    return new long[]{
      getAveragePerWeek(metricUndoExploitDateDeleteRepository.findAll()),
      getAveragePerWeek(metricUndoTargetDeleteRepository.findAll()),
      getAveragePerWeek(metricUndoSegmentDeleteRepository.findAll()),
      getAveragePerWeek(metricUndoIxnDeleteRepository.findAll())
    };
  }

  public long[] getAverageEditsPerWeek() {
    List<MetricChangeTarget> tgtEdits = new ArrayList<>();
    for (MetricChangeTarget metric : metricChangeTargetRepository.findAll()) {
      try {
        MetricChangeTarget lastMetric = tgtEdits.get(tgtEdits.size() - 1);
        if (!(metric.getTimestamp().equals(lastMetric.getTimestamp()) &&
          metric.getTargetId() == lastMetric.getTargetId())) {
          tgtEdits.add(metric);
        }
      } catch (Exception e) {
        tgtEdits.add(metric);
      }
    }

    List<MetricChangeIxn> ixnEdits = new ArrayList<>();
    for (MetricChangeIxn metric : metricChangeIxnRepository.findAll()) {
      try {
        MetricChangeIxn lastMetric = ixnEdits.get(ixnEdits.size() - 1);
        if (!(metric.getTimestamp().equals(lastMetric.getTimestamp()) && metric.getIxnId() == lastMetric.getIxnId())) {
          ixnEdits.add(metric);
        }
      } catch (Exception e) {
        ixnEdits.add(metric);
      }
    }

    return new long[]{
      getAveragePerWeek(metricChangeExploitDateRepository.findAll()),
      getAveragePerWeek(tgtEdits),
      getAveragePerWeek(metricChangeSegmentRepository.findAll()),
      getAveragePerWeek(ixnEdits)
    };
  }

  public long getAverageUniqueLoginsPerWeek() {
    if (metricLoginRepository.findAll().size() == 0) {
      return 0;
    }

    long totalUniqueWeeklyLogins = 0;
    long weeks = 1;
    long now = new Date().getTime();
    Timestamp weekStart = metricLoginRepository.findAll().get(0).getTimestamp();
    Timestamp weekEnd = new Timestamp(weekStart.getTime() + 7 * MILLISECONDS_IN_A_DAY);

    while (weekStart.getTime() < now) {
      long uniqueLoginsThisWeek = metricLoginRepository.findAllUniqueLoginsBetween(weekStart, weekEnd).size();
      totalUniqueWeeklyLogins += uniqueLoginsThisWeek;
      weekStart = weekEnd;
      weekEnd = new Timestamp(weekStart.getTime() + 7 * MILLISECONDS_IN_A_DAY);
      if (weekEnd.getTime() <= now) {
        weeks++;
      }
    }
    return Math.round((float) totalUniqueWeeklyLogins / (float) weeks);
  }

  public long getHoursWorkedBetween(Date startTime, Date endTime) {
    if (metricLoginRepository.findAll().size() == 0) {
      return 0;
    }

    long totalUniqueDailyLogins = 0;
    Timestamp dayStart = new Timestamp(startTime.getTime());
    Timestamp dayEnd = new Timestamp(dayStart.getTime() + MILLISECONDS_IN_A_DAY);

    while (dayStart.getTime() < endTime.getTime()) {
      long uniqueLoginsThisDay = metricLoginRepository.findAllUniqueLoginsBetween(dayStart, dayEnd).size();
      totalUniqueDailyLogins += uniqueLoginsThisDay;
      dayStart = dayEnd;
      dayEnd = new Timestamp(dayStart.getTime() + MILLISECONDS_IN_A_DAY);
    }
    return totalUniqueDailyLogins * 5; //estimating 5 hours worked per day per user
  }

  public long getAveragePrioritizationsPerWeek() {
    if (metricChangeRfiPriorityRepository.findAll().size() == 0) {
      return 0;
    }

    long totalUniqueWeeklyPrioritizations = 0;
    long weeks = 1;
    long now = new Date().getTime();
    Date weekStart = metricChangeRfiPriorityRepository.findAll().get(0).getDatetime();
    Date weekEnd = new Timestamp(weekStart.getTime() + 7 * MILLISECONDS_IN_A_DAY);

    while (weekStart.getTime() < now) {
      long uniquePrioritizationsThisWeek = metricChangeRfiPriorityRepository
        .findAllUniquePrioritizationsDuringWeek(weekStart, weekEnd).size();
      totalUniqueWeeklyPrioritizations += uniquePrioritizationsThisWeek;
      if (weekEnd.getTime() <= now) {
        weeks++;
      }
      weekStart = weekEnd;
      weekEnd = new Timestamp(weekStart.getTime() + 7 * MILLISECONDS_IN_A_DAY);
    }

    return Math.round((float) totalUniqueWeeklyPrioritizations / (float) weeks);
  }

  private long getAveragePerWeek(List<? extends TimestampMetric> metrics) {
    try {
      long startDate = metrics.get(0).getTimestamp().getTime();
      long count = metrics.size();
      long now = new Date().getTime();
      int weeksSinceStartDate = Math.round((float) (now - startDate) / (float) (7 * MILLISECONDS_IN_A_DAY));
      if (weeksSinceStartDate == 0) {
        weeksSinceStartDate = 1;
      }
      return Math.round((float) count / (float) weeksSinceStartDate);
    } catch (Exception e) {
      return 0;
    }
  }

  public MetricClickTrackNarrative createClickTrackNarrative(
    MetricClickTrackNarrativeJson metricClickTrackNarrativeJson) {
    return metricClickTrackNarrativeRepository.save(new MetricClickTrackNarrative(metricClickTrackNarrativeJson));
  }

  public int getLtiovMetPercentage() {
    List<Rfi> closedRfis = rfiRepository.findAllClosed();
    int totalRfis = 0;
    int completedBeforeLtiov = 0;

    for (Rfi rfi : closedRfis) {
      MetricChangeRfi metricOpen = metricChangeRfiRepository.findStatusChangeToOpenByRfiNum(rfi.getRfiNum());
      MetricChangeRfi metricClose = metricChangeRfiRepository.findStatusChangeToClosedByRfiNum(rfi.getRfiNum());
      Timestamp rfiLtiov = rfi.getLtiov();

      if (metricOpen != null && metricClose != null &&
        metricClose.getDatetime().getTime() - metricOpen.getDatetime().getTime() > MILLISECONDS_IN_A_DAY) {
        if (rfiLtiov == null || metricClose.getDatetime().before(rfiLtiov)) {
          completedBeforeLtiov++;
        }
        totalRfis++;
      }
    }

    if (totalRfis == 0) {
      return 0;
    } else {
      return Math.round(((float) completedBeforeLtiov / (float) totalRfis) * 100);
    }
  }

  public Date getRfiStartDate(String rfiNum) {
    MetricChangeRfi startDateMetric = metricChangeRfiRepository.findStatusChangeToOpenByRfiNum(rfiNum);
    if (startDateMetric == null) {
      return null;
    }
    return startDateMetric.getDatetime();
  }

  public MetricUndoTargetCreate addUndoTargetCreate(long targetId, String userName) {
    return metricUndoTargetCreateRepository.save(new MetricUndoTargetCreate(targetId, userName));
  }

  public MetricCreateTargetFromGets addCreateTargetFromGets(Target target, Timestamp timestamp) {
    return metricCreateTargetFromGetsRepository.save(new MetricCreateTargetFromGets(target, timestamp));
  }

  public Date getRfiCloseDate(String rfiNum) {
    try {
      return metricChangeRfiRepository.findStatusChangeToClosedByRfiNum(rfiNum).getDatetime();
    } catch (NullPointerException e) {
      log.trace("Close date not found for RFI " + rfiNum);
      return null;
    }
  }

  public long getRfisCompleted(Date startDate, Date endDate) {
    return metricChangeRfiRepository.findStatusChangeToClosedBetweenDateRange(
      startDate, endDate).size();
  }

  public long getTargetsCreatedWithinDateRange(Date startDate, Date endDate) {
    return metricCreateTargetRepository.findTargetsCreatedBetweenDateRange(
      startDate, endDate).size();
  }

  public int getUniqueCustomersBetween(Date startDate, Date endDate) {
    List<MetricChangeRfi> allClosedBetweenDateRange =
      metricChangeRfiRepository.findStatusChangeToClosedBetweenDateRange(startDate, endDate);

    List<String> uniqueCustomers = new ArrayList<>();

    for (MetricChangeRfi closedMetric : allClosedBetweenDateRange) {
      MetricChangeRfi openMetric = metricChangeRfiRepository.findStatusChangeToOpenByRfiNum(closedMetric.getRfiNum());
      if (openMetric != null && openMetric.getDatetime()
        .before(new Date(closedMetric.getDatetime().getTime() - MetricsService.MILLISECONDS_IN_A_DAY))) {
        String customer = rfiRepository.findByRfiNum(closedMetric.getRfiNum()).getCustomerUnit();

        if (!uniqueCustomers.contains(customer)) {
          uniqueCustomers.add(customer);
        }
      }
    }

    return uniqueCustomers.size();
  }

  public int getUnworkedRfiPercentage() {
    List<MetricChangeRfi> rfisOpened = metricChangeRfiRepository.findAllStatusChangeToOpen();
    int totalOpenedClosedRfis = 0;
    int unworkedRfis = 0;

    for (MetricChangeRfi rfiOpened : rfisOpened) {
      MetricChangeRfi rfiClosed = metricChangeRfiRepository.findStatusChangeToClosedByRfiNum(rfiOpened.getRfiNum());
      if (rfiClosed != null) {
        totalOpenedClosedRfis++;
        if (rfiClosed.getDatetime()
          .before(new Date(rfiOpened.getDatetime().getTime() + MetricsService.MILLISECONDS_IN_A_DAY))) {
          unworkedRfis++;
        }
      }
    }

    if (unworkedRfis == 0) {
      if (totalOpenedClosedRfis == 0) {
        return 0;
      } else {
        return 100;
      }
    }

    return Math.round(100 * (float) unworkedRfis / (float) totalOpenedClosedRfis);
  }

  public List<UserPerformanceMetric> getUserPerformanceMetrics() {
    List<MetricChangeIxn> trackCompletions = metricChangeIxnRepository.findAllStatusChangeToComplete();
    List<AcceptRejectTally> tallies = new ArrayList<>();

    for (MetricChangeIxn trackCompletion : trackCompletions) {
      try {
        //Get the first approval status change to approved or rejected after the track completion
        MetricChangeIxn firstTrackApproveReject = metricChangeIxnRepository
          .findRejectionOrAcceptanceByIxnIdAfterTime(trackCompletion.getIxnId(), trackCompletion.getTimestamp()).get(0);

        //Try to find the username within the existing list
        AcceptRejectTally tallyToIncrement = null;
        for (AcceptRejectTally tally : tallies) {
          if (tally.getUserName().equals(trackCompletion.getUserName())) {
            tallyToIncrement = tally;
            break;
          }
        }

        //username not found, add to list
        if (tallyToIncrement == null) {
          tallyToIncrement = new AcceptRejectTally(trackCompletion.getUserName());
          tallies.add(tallyToIncrement);
        }

        //increment accepted & total accordingly
        if (firstTrackApproveReject.getNewData().equals(IxnApprovalStatus.APPROVED)) {
          tallyToIncrement.incrementAccepted();
        }

        tallyToIncrement.incrementTotal();

//        System.out.println(tallyToIncrement);

      } catch (IndexOutOfBoundsException e) {
        // No approve or reject found, ignore
      }
    }

    List<UserPerformanceMetric> metrics = new ArrayList<>();
    for (AcceptRejectTally tally : tallies) {
      metrics.add(new UserPerformanceMetric(tally.getUserName(),
        Math.round(((float) tally.getAccepted() / tally.getTotal()) * 100)));
    }

    return metrics;
  }

  public long getAverageTracksCompletedPerWeek() {
    return getAveragePerWeek(metricChangeIxnRepository.findByNewDataEquals(IxnStatus.COMPLETED));
  }

  private Date daysAgo(int daysAgo) {
    return new Date(new Date().getTime() - daysAgo * MetricsService.MILLISECONDS_IN_A_DAY);
  }

  public long getEstimatedCompletionTimeByNumberOfTargets(long rfiId) {
    // Get rfis closed within last 6 months
    List<MetricChangeRfi> allClosedRfis =
      metricChangeRfiRepository.findStatusChangeToClosedBetweenDateRange(daysAgo(180), new Date());

    long totalOpenTime = 0;
    int totalNumTargets = 0;

    // filter out rfis without an open metric or targets associated
    // get number of targets (not deleted) for all of those rfis, exclude rfis with no targets
    // calculate total time the rfis were open
    for (MetricChangeRfi rfiClose : allClosedRfis) {
      long rfiCloseId = rfiRepository.findByRfiNum(rfiClose.getRfiNum()).getId();
      if (
        metricChangeRfiRepository.findStatusChangeToOpenByRfiNum(rfiClose.getRfiNum()) != null
          &&
          !targetRepository.findAllByRfiId(rfiCloseId).isEmpty()
      ) {
        long openTime = rfiClose.getDatetime().getTime() -
          metricChangeRfiRepository.findStatusChangeToOpenByRfiNum(rfiClose.getRfiNum()).getDatetime().getTime();
        int numTargets = targetRepository.findAllByRfiId(rfiCloseId).size();
        totalOpenTime += openTime;
        totalNumTargets += numTargets;
      }
    }

    try {
      // Get total number of targets for requested rfiId
      // divide total targets  by total rfis open time to get average tgt/day over past 6 months
      // return that number / tgts per day
      long numTargetsForRequestedRfi = targetRepository.findAllByRfiId(rfiId).size();

      //If tgts/day is 0 or undefined, or num targets for requested rfi is 0 return null
      if (totalOpenTime == 0 || totalNumTargets == 0 || numTargetsForRequestedRfi == 0)
        return -1;

      return (long) ((float) numTargetsForRequestedRfi / ((float) totalNumTargets / (float) totalOpenTime));
    } catch (Exception e) {
      log.trace("Could not get completion time by targets:", e);
      return -1;
    }
  }
}
