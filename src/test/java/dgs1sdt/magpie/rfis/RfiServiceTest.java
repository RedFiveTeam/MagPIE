package dgs1sdt.magpie.rfis;


import dgs1sdt.magpie.BaseIntegrationTest;
import dgs1sdt.magpie.metrics.MetricController;
import dgs1sdt.magpie.metrics.changeRfi.MetricChangeRfiRepository;
import org.junit.Before;
import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.w3c.dom.Document;

import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.DocumentBuilderFactory;
import java.io.File;
import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

import static org.junit.Assert.assertEquals;

public class RfiServiceTest extends BaseIntegrationTest {
  @Autowired
  GetsClient getsClient;

  @Autowired
  MetricController metricController;

  @Autowired
  RfiService rfiService;

  @Autowired
  RfiRepository rfiRepository;

  @Autowired
  MetricChangeRfiRepository metricChangeRfiRepository;

  @Before
  public void clean() {
    rfiRepository.deleteAll();
  }

  @Test
  public void marshallsXmlDocIntoRfis() throws Exception {
    DocumentBuilderFactory dbf = DocumentBuilderFactory.newInstance();
    DocumentBuilder db = dbf.newDocumentBuilder();
    Document document = db.parse(new File("src/main/resources/rfis.xml"));
    List<Rfi> rfiList = rfiService.marshallDocumentToRfis(document);

    assertEquals(2, rfiList.size());
  }

  @Test
  public void returnsAllNewOpenAndLastThreeClosedRfis() throws Exception {

    String[] files = {
      "RfisNewOpen.xml",
      "RfisClosed.xml"
    };

    rfiService.fetchRfisFromUris(files);
    List<Rfi> rfis = rfiService.fetchRfisFromRepo();

    long rfiCount = rfiRepository.count();

    assertEquals(rfiCount - 1, rfis.size());
    assertEquals(3, rfis.stream()
      .filter(rfi -> rfi.getStatus().equals("CLOSED"))
      .count()
    );
  }

  @Test
  public void assignsLastPriorityToNewlyOpenedRfis() throws Exception {
    String[] filePath = {"RfisNewOpen.xml"};
    rfiService.fetchRfisFromUris(filePath);

    List<Rfi> savedOpenRfis = rfiRepository.findAll().stream()
      .filter(rfi -> rfi.getStatus().equals("OPEN"))
      .sorted(new SortByAscendingPriority())
      .collect(Collectors.toList());

    long rfiCount = savedOpenRfis.size();

    Rfi rfiFirst = savedOpenRfis.get(0);
    Rfi rfiSecond = savedOpenRfis.get(1);
    Rfi rfiThird = savedOpenRfis.get(2);
    Rfi rfiFourth = savedOpenRfis.get(3);
    assertEquals(1, rfiFirst.getPriority());
    assertEquals(2, rfiSecond.getPriority());
    assertEquals(3, rfiThird.getPriority());
    assertEquals(4, rfiFourth.getPriority());

    filePath[0] = "RfisNewOpenRefreshed.xml";
    rfiService.fetchRfisFromUris(filePath);

    rfiFirst = rfiRepository.findById(rfiFirst.getId()).get();
    assertEquals(1, rfiFirst.getPriority());

    Rfi newlyOpenedRfi = rfiRepository.findByRfiNum("DGS-1-SDT-2020-00323");
    assertEquals(rfiCount + 1, newlyOpenedRfi.getPriority());
  }

  @Test
  public void sendsRfiUpdateMetricIfThereIsAChangeInAnRfi() {
    Date rfi1ltiov = new Date();

    Rfi rfi = new Rfi("rfiNum", "url", "NEW", new Date(), "customer", rfi1ltiov, "USA", "a description", "This is a " +
      "justifiction");
    Rfi updatedRfi = new Rfi("rfiNum", "url", "NEW", new Date(), "customer", rfi1ltiov, "USA", "a new and improved " +
      "description", "This is a justifiction");
    Rfi rfi2 = new Rfi("2", "url2", "NEW", new Date(), "customer2", new Date(), "USA", "description", "This is a justifiction");

    long rfiUpdateCount = metricChangeRfiRepository.count();

    rfiRepository.save(rfi);
    rfiRepository.save(rfi2);

    List<Rfi> rfis = new ArrayList<>();
    rfis.add(updatedRfi);
    rfis.add(rfi2);

    rfiService.updateAndSaveRfis(rfis);
    assertEquals(rfiUpdateCount + 1, metricChangeRfiRepository.count());
  }

  @Test
  public void updatesRfisInRepoWithUpdatesFromGets() {
    Date rfiltiov = new Date();

    Rfi rfi1 = new Rfi("SDT-0321", "url", "NEW", new Date(), "1 FW", rfiltiov, "USA", "a description", "This is a justifiction");
    Rfi rfi2 = new Rfi("SDT-0322", "url", "OPEN", new Date(), "1 FW", rfiltiov, "CAN", "one description", "This is a justifiction");

    rfiRepository.save(rfi1);
    rfiRepository.save(rfi2);

    Timestamp receiveDate1 = rfiRepository.findByRfiNum("SDT-0321").getReceiveDate();
    Timestamp receiveDate2 = rfiRepository.findByRfiNum("SDT-0322").getReceiveDate();

    rfiService.fetchRfisFromUris(new String[]{"UpdatedRfis.xml"});

    assertEquals("A new and improved description", rfiRepository.findByRfiNum("SDT-0321").getDescription());

    assertEquals("CLOSED", rfiRepository.findByRfiNum("SDT-0322").getStatus());

    assertEquals(receiveDate1, rfiRepository.findByRfiNum("SDT-0321").getReceiveDate());
    assertEquals(receiveDate2, rfiRepository.findByRfiNum("SDT-0322").getReceiveDate());
  }

  @Test
  public void reprioritizesBasedOnClosedRfis() {
    String[] filePath = {"RfisNewOpen.xml"};
    rfiService.fetchRfisFromUris(filePath);

    List<Rfi> savedOpenRfis = rfiRepository.findAll().stream()
      .filter(rfi -> rfi.getStatus().equals("OPEN"))
      .sorted(new SortByAscendingPriority())
      .collect(Collectors.toList());

    Rfi rfiFirst = savedOpenRfis.get(0);
    Rfi rfiSecond = savedOpenRfis.get(1);
    Rfi rfiThird = savedOpenRfis.get(2);
    Rfi rfiFourth = savedOpenRfis.get(3);
    Rfi rfiFifth = savedOpenRfis.get(4);

    assertEquals(5, savedOpenRfis.size());

    assertEquals(1, rfiFirst.getPriority());
    assertEquals(2, rfiSecond.getPriority());
    assertEquals(3, rfiThird.getPriority());
    assertEquals(4, rfiFourth.getPriority());
    assertEquals(5, rfiFifth.getPriority());

    filePath = new String[]{"RfisNewOpenRefreshed.xml", "RfisClosedRefreshed.xml"};
    rfiService.fetchRfisFromUris(filePath);

    savedOpenRfis = rfiRepository.findAll().stream()
      .filter(rfi -> rfi.getStatus().equals("OPEN"))
      .sorted(new SortByAscendingPriority())
      .collect(Collectors.toList());

    assertEquals(4, savedOpenRfis.size());

    rfiFirst = savedOpenRfis.get(0);
    rfiSecond = savedOpenRfis.get(1);
    rfiThird = savedOpenRfis.get(2);
    rfiFourth = savedOpenRfis.get(3);

    assertEquals(1, rfiFirst.getPriority());
    assertEquals(2, rfiSecond.getPriority());
    assertEquals(3, rfiThird.getPriority());
    assertEquals(4, rfiFourth.getPriority());
  }
}
