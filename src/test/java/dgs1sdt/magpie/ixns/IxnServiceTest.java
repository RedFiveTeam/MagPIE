package dgs1sdt.magpie.ixns;

import dgs1sdt.magpie.BaseIntegrationTest;
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

public class IxnServiceTest extends BaseIntegrationTest {
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
  public void clean() {
    rfiRepository.deleteAll();
    exploitDateRepository.deleteAll();
    targetRepository.deleteAll();
    segmentRepository.deleteAll();
    ixnRepository.deleteAll();
  }

  @Test
  public void properlyAssignsTrackIDs() throws Exception {
    setupIxns();
    long rfiId = rfiRepository.findAll().get(0).getId();
    long exploitDate2Id = exploitDateRepository.findAll().get(1).getId();
    long target2Id = targetRepository.findAll().get(1).getId();
    long segment2Id = segmentRepository.findAll().get(1).getId();

    ixnService.assignTracks(rfiId, "SDT12-123");

    Ixn ixn1 = ixnRepository.findAll().get(7);
    Ixn ixn2 = ixnRepository.findAll().get(9);
    Ixn ixn3 = ixnRepository.findAll().get(0);
    Ixn ixn4 = ixnRepository.findAll().get(2);
    Ixn ixn5 = ixnRepository.findAll().get(4);

    assertEquals("123-001", ixn1.getTrack());
    assertEquals("123-002", ixn2.getTrack());
    assertEquals("123-003", ixn3.getTrack());
    assertEquals("123-004", ixn4.getTrack());
    assertEquals("123-005", ixn5.getTrack());

    ixnRepository.save(new Ixn(rfiId, exploitDate2Id, target2Id, segment2Id, "", new Timestamp(new Date(678000)
      .getTime()), "", "", "", IxnStatus.COMPLETED, "", "")); //123-003

    ixnService.assignTracks(rfiId, "SDT12-123");

    ixn1 = ixnRepository.findAll().get(7);
    ixn2 = ixnRepository.findAll().get(9);
    ixn3 = ixnRepository.findAll().get(10);
    ixn4 = ixnRepository.findAll().get(0);
    ixn5 = ixnRepository.findAll().get(2);
    Ixn ixn6 = ixnRepository.findAll().get(4);

    assertEquals("123-001", ixn1.getTrack());
    assertEquals("123-002", ixn2.getTrack());
    assertEquals("123-003", ixn3.getTrack());
    assertEquals("123-004", ixn4.getTrack());
    assertEquals("123-005", ixn5.getTrack());
    assertEquals("123-006", ixn6.getTrack());
  }

  private void setupIxns() throws Exception {
    rfiRepository.save(new Rfi("DGS-1-SDT-2020-00338", "", "", new Date(), "", new Date(), "", "", "This is a " +
      "justifiction", "", "", "", "", "", "", "", ""));
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
        IxnStatus.IN_PROGRESS, "", "")); //123-003
    ixnRepository.save(
      new Ixn(rfiId, exploitDate1Id, target1Id, segment1Id, "", new Timestamp(new Date(234000).getTime()), "", "", "",
        IxnStatus.NOT_STARTED, "", ""));
    ixnRepository.save(
      new Ixn(rfiId, exploitDate1Id, target1Id, segment1Id, "", new Timestamp(new Date(345000).getTime()), "", "", "",
        IxnStatus.IN_PROGRESS, "", "")); //123-004
    ixnRepository.save(
      new Ixn(rfiId, exploitDate1Id, target1Id, segment1Id, "", new Timestamp(new Date(456000).getTime()), "", "", "",
        IxnStatus.DOES_NOT_MEET_EEI, "", ""));
    ixnRepository.save(
      new Ixn(rfiId, exploitDate1Id, target1Id, segment1Id, "", new Timestamp(new Date(567000).getTime()), "", "", "",
        IxnStatus.COMPLETED, "", "")); //123-005

    ixnRepository.save(
      new Ixn(rfiId, exploitDate2Id, target2Id, segment2Id, "", new Timestamp(new Date(123000).getTime()), "", "", "",
        IxnStatus.NOT_STARTED, "", ""));
    ixnRepository.save(
      new Ixn(rfiId, exploitDate2Id, target2Id, segment2Id, "", new Timestamp(new Date(234000).getTime()), "", "", "",
        IxnStatus.NOT_STARTED, "", ""));
    ixnRepository.save(
      new Ixn(rfiId, exploitDate2Id, target2Id, segment2Id, "", new Timestamp(new Date(345000).getTime()), "", "", "",
        IxnStatus.IN_PROGRESS, "", ""));  //123-001
    ixnRepository.save(
      new Ixn(rfiId, exploitDate2Id, target2Id, segment2Id, "", new Timestamp(new Date(456000).getTime()), "", "", "",
        IxnStatus.DOES_NOT_MEET_EEI, "", ""));
    ixnRepository.save(
      new Ixn(rfiId, exploitDate2Id, target2Id, segment2Id, "", new Timestamp(new Date(567000).getTime()), "", "", "",
        IxnStatus.COMPLETED, "", "")); //123-002
  }
}
