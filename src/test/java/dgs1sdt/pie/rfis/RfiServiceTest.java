package dgs1sdt.pie.rfis;


import dgs1sdt.pie.BaseIntegrationTest;
import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.w3c.dom.Document;
import org.w3c.dom.Node;
import org.w3c.dom.NodeList;
import org.xml.sax.SAXException;

import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.DocumentBuilderFactory;
import javax.xml.parsers.ParserConfigurationException;
import java.io.File;
import java.io.IOException;
import java.util.*;
import java.util.stream.Collectors;

import static org.junit.Assert.*;

public class RfiServiceTest extends BaseIntegrationTest {
  @Autowired
  GetsClient getsClient;

  @Autowired
  RfiRepository rfiRepository;

  @Test
  public void marshallsXmlDocIntoRfis() throws Exception {
    RfiService rfiService = new RfiService(rfiRepository, getsClient);

    DocumentBuilderFactory dbf = DocumentBuilderFactory.newInstance();
    DocumentBuilder db = dbf.newDocumentBuilder();
    Document document = db.parse(new File("src/test/java/dgs1sdt/pie/rfis/rfis.xml"));
    List<Rfi> rfiList = rfiService.marshallDocumentToRfis(document);

    assertEquals(2, rfiList.size());
  }

  @Test
  public void returnsAllNewOpenAndLastThreeClosedRfis() throws Exception {
    String[] files = {
      "RfisNewOpen.xml",
      "RfisClosed.xml"
    };
    Rfi rfiExisting = new Rfi();
    rfiExisting.setRfiId("DGS-1-SDT-2020-00321");
    rfiExisting.setGetsUrl("jabberwocky");
    rfiRepository.save(rfiExisting);

    RfiService rfiService = new RfiService(rfiRepository, getsClient);
    List<Rfi> rfis = rfiService.fetchRfis(files);

    assertEquals(15, rfis.size());
    assertEquals(3, rfis.stream()
      .filter(rfi -> rfi.getStatus().equals("CLOSED"))
      .count()
    );
    assertEquals(
      "http://www.google.com",
      rfiRepository.findByRfiId("DGS-1-SDT-2020-00321").getGetsUrl()
    );
  }

  @Test
  public void assignsLastPriorityToNewlyOpenedRfis() throws Exception {
    RfiService rfiService = new RfiService(rfiRepository, getsClient);
    String[] filePath = {"RfisNewOpen.xml"};
    rfiService.fetchRfis(filePath);

    List<Rfi> savedOpenRfis = rfiRepository.findAll().stream()
      .filter(rfi -> rfi.getStatus().equals("OPEN"))
      .sorted(new SortByAscendingPriority())
      .collect(Collectors.toList());

    Rfi rfiFirst = savedOpenRfis.get(0);
    Rfi rfiSecond = savedOpenRfis.get(1);
    Rfi rfiThird = savedOpenRfis.get(2);
    Rfi rfiFourth = savedOpenRfis.get(3);
    assertEquals(1, rfiFirst.getPriority());
    assertEquals(2, rfiSecond.getPriority());
    assertEquals(3, rfiThird.getPriority());
    assertEquals(4, rfiFourth.getPriority());

    filePath[0] = "RfisNewOpenRefreshed.xml";
    rfiService.fetchRfis(filePath);

    rfiFirst = rfiRepository.findById(rfiFirst.getId()).get();
    assertEquals(1, rfiFirst.getPriority());

    Rfi newlyOpenedRfi = rfiRepository.findByRfiId("DGS-1-SDT-2020-00323");
    assertEquals(5, newlyOpenedRfi.getPriority());
  }
}
