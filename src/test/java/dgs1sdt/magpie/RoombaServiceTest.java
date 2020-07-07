package dgs1sdt.magpie;

import dgs1sdt.magpie.ixns.*;
import dgs1sdt.magpie.metrics.IxnApprovalStatus;
import dgs1sdt.magpie.rfis.Rfi;
import dgs1sdt.magpie.rfis.RfiRepository;
import dgs1sdt.magpie.tgts.Target;
import dgs1sdt.magpie.tgts.TargetJson;
import dgs1sdt.magpie.tgts.TargetRepository;
import dgs1sdt.magpie.tgts.exploitDates.ExploitDate;
import dgs1sdt.magpie.tgts.exploitDates.ExploitDateRepository;
import org.junit.Before;
import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;

import java.sql.Timestamp;
import java.text.SimpleDateFormat;
import java.util.Date;

import static org.junit.Assert.assertEquals;

public class RoombaServiceTest extends BaseIntegrationTest {
  @Autowired
  RoombaService roombaService;
  @Autowired
  RfiRepository rfiRepository;
  @Autowired
  ExploitDateRepository exploitDateRepository;
  @Autowired
  TargetRepository targetRepository;
  @Autowired
  SegmentRepository segmentRepository;
  @Autowired
  IxnRepository ixnRepository;
  @Autowired
  IxnService ixnService;

  @Before
  public void clean() throws Exception {
    rfiRepository.deleteAll();
    exploitDateRepository.deleteAll();
    targetRepository.deleteAll();
    segmentRepository.deleteAll();
    ixnRepository.deleteAll();
    setupIxns();
  }

  @Test
  public void deletesOldSegments() {
    Timestamp moreThanADayAgo = new Timestamp(new Date().getTime() - RoombaService.TIME_DELAY_IN_MS - 1);
    Segment segment = segmentRepository.findAll().get(0);
    segment.setDeleted(moreThanADayAgo);
    segmentRepository.save(segment);

    assertEquals(2, segmentRepository.findAll().size());
    assertEquals(10, ixnRepository.findAll().size());

    roombaService.clean();

    assertEquals(1, segmentRepository.findAll().size());
    assertEquals(5, ixnRepository.findAll().size());
  }

  @Test
  public void deletesOldTargets() {
    Timestamp moreThanADayAgo = new Timestamp(new Date().getTime() - RoombaService.TIME_DELAY_IN_MS - 1);
    Target target = targetRepository.findAll().get(0);
    target.setDeleted(moreThanADayAgo);
    targetRepository.save(target);

    assertEquals(2, targetRepository.findAll().size());
    assertEquals(2, segmentRepository.findAll().size());
    assertEquals(10, ixnRepository.findAll().size());

    roombaService.clean();

    assertEquals(1, targetRepository.findAll().size());
    assertEquals(1, segmentRepository.findAll().size());
    assertEquals(5, ixnRepository.findAll().size());
  }

  private void setupIxns() throws Exception {
    rfiRepository.save(
      new Rfi("DGS-1-SDT-2020-00338", "", "", new Date(), "", new Date(), "", "", "This is a justifiction", "", "", "",
        "", "", "", "", "", ""));
    long rfiId = rfiRepository.findByRfiNum("DGS-1-SDT-2020-00338").getId();
    Date exploitDate1 = new Date(new SimpleDateFormat("MM/dd/yyyy").parse("11/11/2020").getTime());
    exploitDateRepository.save(new ExploitDate(exploitDate1, rfiId));
    Date exploitDate2 = new Date(new SimpleDateFormat("MM/dd/yyyy").parse("11/10/2020").getTime());
    exploitDateRepository.save(new ExploitDate(exploitDate2, rfiId));


    long exploitDate1Id = exploitDateRepository.findAll().get(0).getId();
    long exploitDate2Id = exploitDateRepository.findAll().get(1).getId();

    targetRepository.save(new Target(new TargetJson(rfiId, exploitDate1Id, "SDT12-123", "12WQE1231231231", "", "")));
    long target1Id = targetRepository.findAll().get(0).getId();

    targetRepository.save(new Target(new TargetJson(rfiId, exploitDate2Id, "SDT12-123", "12WQE1231231231", "", "")));
    long target2Id = targetRepository.findAll().get(1).getId();


    segmentRepository.save(new Segment(
      new SegmentJson(rfiId, exploitDate1Id, target1Id, new Timestamp(new Date(0).getTime()),
        new Timestamp(new Date(56789).getTime()))));
    long segment1Id = segmentRepository.findAll().get(0).getId();

    segmentRepository.save(new Segment(
      new SegmentJson(rfiId, exploitDate2Id, target2Id, new Timestamp(new Date(0).getTime()),
        new Timestamp(new Date(56789).getTime()))));
    long segment2Id = segmentRepository.findAll().get(1).getId();

    ixnRepository.save(
      new Ixn(rfiId, exploitDate1Id, target1Id, segment1Id, "", new Timestamp(new Date(123000).getTime()), "", "", "",
        IxnStatus.IN_PROGRESS, "", IxnApprovalStatus.NOT_REVIEWED)); //123-003
    ixnRepository.save(
      new Ixn(rfiId, exploitDate1Id, target1Id, segment1Id, "", new Timestamp(new Date(234000).getTime()), "", "", "",
        IxnStatus.NOT_STARTED, "", IxnApprovalStatus.NOT_REVIEWED));
    ixnRepository.save(
      new Ixn(rfiId, exploitDate1Id, target1Id, segment1Id, "", new Timestamp(new Date(345000).getTime()), "", "", "",
        IxnStatus.IN_PROGRESS, "", IxnApprovalStatus.NOT_REVIEWED)); //123-004
    ixnRepository.save(
      new Ixn(rfiId, exploitDate1Id, target1Id, segment1Id, "", new Timestamp(new Date(456000).getTime()), "", "", "",
        IxnStatus.DOES_NOT_MEET_EEI, "", IxnApprovalStatus.NOT_REVIEWED));
    ixnRepository.save(
      new Ixn(rfiId, exploitDate1Id, target1Id, segment1Id, "", new Timestamp(new Date(567000).getTime()), "", "", "",
        IxnStatus.COMPLETED, "", IxnApprovalStatus.NOT_REVIEWED)); //123-005

    ixnRepository.save(
      new Ixn(rfiId, exploitDate2Id, target2Id, segment2Id, "", new Timestamp(new Date(123000).getTime()), "", "", "",
        IxnStatus.NOT_STARTED, "", IxnApprovalStatus.NOT_REVIEWED));
    ixnRepository.save(
      new Ixn(rfiId, exploitDate2Id, target2Id, segment2Id, "", new Timestamp(new Date(234000).getTime()), "", "", "",
        IxnStatus.NOT_STARTED, "", IxnApprovalStatus.NOT_REVIEWED));
    ixnRepository.save(
      new Ixn(rfiId, exploitDate2Id, target2Id, segment2Id, "", new Timestamp(new Date(345000).getTime()), "", "", "",
        IxnStatus.IN_PROGRESS, "", IxnApprovalStatus.NOT_REVIEWED));  //123-001
    ixnRepository.save(
      new Ixn(rfiId, exploitDate2Id, target2Id, segment2Id, "", new Timestamp(new Date(456000).getTime()), "", "", "",
        IxnStatus.DOES_NOT_MEET_EEI, "", IxnApprovalStatus.NOT_REVIEWED));
    ixnRepository.save(
      new Ixn(rfiId, exploitDate2Id, target2Id, segment2Id, "", new Timestamp(new Date(567000).getTime()), "", "", "",
        IxnStatus.COMPLETED, "", IxnApprovalStatus.NOT_REVIEWED)); //123-002
  }
}
