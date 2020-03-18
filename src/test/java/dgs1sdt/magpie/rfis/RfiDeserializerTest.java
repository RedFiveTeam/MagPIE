package dgs1sdt.magpie.rfis;

import dgs1sdt.magpie.Utilities;
import org.junit.Test;
import org.w3c.dom.Document;
import org.w3c.dom.Node;
import org.w3c.dom.NodeList;

import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.DocumentBuilderFactory;
import java.io.File;
import java.sql.Timestamp;
import java.util.Date;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertTrue;

public class RfiDeserializerTest {
  @Test
  public void extractsRfiFromXml() throws Exception {
    DocumentBuilderFactory dbf = DocumentBuilderFactory.newInstance();
    DocumentBuilder db = dbf.newDocumentBuilder();
    Document document = db.parse(new File("src/main/resources/rfis.xml"));
    NodeList nodeList = document.getElementsByTagName("getsrfi:RequestForInformation");
    Node rfiNode = nodeList.item(0);

    Rfi rfi = RfiDeserializer.deserialize(rfiNode);

    assertEquals("DGS-1-SDT-2020-00321", rfi.getRfiNum());
    assertEquals("http://www.google.com", rfi.getGetsUrl());
    assertEquals("NEW", rfi.getStatus());
    assertEquals(Utilities.parseDate("2019-11-05T14:21:21Z"), rfi.getLastUpdate());
    assertEquals("633d ABW", rfi.getCustomer());
    assertEquals(Utilities.parseDate("2020-11-05T14:21:21Z"), rfi.getLtiov());
    assertEquals("USA", rfi.getCountry());
    assertEquals("hello rfi", rfi.getDescription());

//    receive date undefined in GETS API. Should be system time when received (within the last few seconds)
    assertTrue(rfi.getReceiveDate().after(new Timestamp(new Date().getTime() - 5000L)));

//    receive date defined in GETS API
    Rfi rfi2 = RfiDeserializer.deserialize(nodeList.item(1));

    assertEquals(Utilities.parseDate("2019-11-11T14:21:22Z"), rfi2.getReceiveDate());

  }
}
