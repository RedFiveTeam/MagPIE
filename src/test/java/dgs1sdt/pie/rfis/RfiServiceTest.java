package dgs1sdt.pie.rfis;


import dgs1sdt.pie.BaseIntegrationTest;
import dgs1sdt.pie.metrics.MetricController;
import dgs1sdt.pie.metrics.rfiupdate.RfiUpdateRepository;
import org.junit.Before;
import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.w3c.dom.Document;

import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.DocumentBuilderFactory;
import java.io.File;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

import static org.junit.Assert.assertEquals;

public class RfiServiceTest extends BaseIntegrationTest {
  @Autowired
  GetsClient getsClient;

  @Autowired
  RfiRepository rfiRepository;

  @Autowired
  RfiService rfiService;

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

  @Autowired
  MetricController metricController;

  @Autowired
  RfiUpdateRepository rfiUpdateRepository;

  @Test
  public void sendsRfiUpdateMetricIfThereIsAChangeInAnRfi() {
    RandomRfi randomRfi = new RandomRfi();

    Rfi rfi1 = randomRfi.toRfi();
    Rfi rfi1mod = new Rfi(rfi1);
    rfi1mod.setDescription(randomRfi.get.randomDescription());
    Rfi rfi2 = randomRfi.toRfi();

    long rfiUpdateCount = rfiUpdateRepository.count();
    rfiRepository.save(rfi1);
    rfiRepository.save(rfi2);
    rfiService.updateAndSaveRfis(Arrays.asList(rfi1mod, rfi2));

    assertEquals(rfiUpdateCount + 1, rfiUpdateRepository.count());
  }
}
