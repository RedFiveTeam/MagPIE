package dgs1sdt.pie.rfis;

import org.junit.Test;
import org.w3c.dom.Document;
import org.w3c.dom.NodeList;

import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.DocumentBuilderFactory;
import java.io.File;
import java.text.SimpleDateFormat;
import java.util.List;
import java.util.TimeZone;

import static org.junit.Assert.*;


public class WebGetsClientTest {

  @Test
  public void extractElementsTest() throws Exception {
    SimpleDateFormat dateFormatter = new SimpleDateFormat("MM/dd/yyyy HH:mm:ss");
    dateFormatter.setTimeZone(TimeZone.getTimeZone("UTC"));

    File xmlFile = new File("src/test/java/dgs1sdt/pie/rfis/rfis.xml");
    DocumentBuilderFactory dbf = DocumentBuilderFactory.newInstance();
    DocumentBuilder db = dbf.newDocumentBuilder();
    Document document = db.parse(xmlFile);
    NodeList htmlRfis = document.getElementsByTagName("getsrfi:RequestForInformation");


    List<Rfi> rfiList = WebGetsClient.rfisFromElements(htmlRfis);

    assertEquals("DGS-1-SDT-2020-00321", rfiList.get(0).getRfiId());
    assertEquals("http://www.google.com", rfiList.get(0).getGetsUrl());
    assertEquals("NEW", rfiList.get(0).getStatus());
    assertEquals(dateFormatter.parse("11/05/2019 14:21:21"), rfiList.get(0).getLastUpdate());
    assertEquals("633d ABW", rfiList.get(0).getCustomer());
    assertEquals(dateFormatter.parse("11/05/2020 14:21:21"), rfiList.get(0).getLtiov());
    assertEquals("USA", rfiList.get(0).getCountry());
    assertEquals(
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore " +
        "magna aliqua.",
      rfiList.get(0).getDescription()
    );
    assertEquals(2, rfiList.size());
  }
}
