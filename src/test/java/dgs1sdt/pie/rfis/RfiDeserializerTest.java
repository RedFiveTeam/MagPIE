package dgs1sdt.pie.rfis;

import dgs1sdt.pie.Utils;
import org.junit.Test;
import org.springframework.core.io.ClassPathResource;
import org.w3c.dom.Document;
import org.w3c.dom.Node;
import org.w3c.dom.NodeList;
import org.xml.sax.SAXException;

import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.DocumentBuilderFactory;
import javax.xml.parsers.ParserConfigurationException;

import java.io.File;
import java.io.IOException;
import java.util.Date;

import static org.junit.Assert.*;

public class RfiDeserializerTest {
  @Test
  public void extractsRfiFromXml() throws Exception {
    DocumentBuilderFactory dbf = DocumentBuilderFactory.newInstance();
    DocumentBuilder db = dbf.newDocumentBuilder();
    Document document = db.parse(new File("src/test/java/dgs1sdt/pie/rfis/rfis.xml"));
    NodeList nodeList = document.getElementsByTagName("getsrfi:RequestForInformation");
    Node rfiNode = nodeList.item(0);

    Rfi rfi = RfiDeserializer.deserialize(rfiNode);

    assertEquals(
      new Rfi(
        "DGS-1-SDT-2020-00321",
        "http://www.google.com",
        "NEW",
        Utils.parseDate("2019-11-05T14:21:21Z"),
        "633d ABW",
        Utils.parseDate("2020-11-05T14:21:21Z"),
        "USA",
        "hello rfi"
      ),
      rfi
    );
  }

}
