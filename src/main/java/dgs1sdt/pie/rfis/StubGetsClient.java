package dgs1sdt.pie.rfis;

import org.springframework.core.io.ClassPathResource;
import org.springframework.stereotype.Service;
import org.springframework.test.context.ActiveProfiles;
import org.w3c.dom.Document;
import org.w3c.dom.NodeList;

import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.DocumentBuilderFactory;
import java.io.File;
import java.net.URL;
import java.util.ArrayList;
import java.util.List;

@Service
@ActiveProfiles("test")
public class StubGetsClient implements GetsClient {

  public static NodeList elementsFrom(String uri) throws Exception {
    Document document = makeRequest(uri);
    return document.getElementsByTagName("getsrfi:RequestForInformation");
  }

  @Override
  public List<Rfi> getRfis() throws Exception {
    List<Rfi> rfiList = new ArrayList<>();

    rfiList.addAll(
      WebGetsClient.rfisFromElements(
        elementsFrom("RfisNewOpen.xml")
      )
    );

    rfiList.addAll(
      WebGetsClient.rfisFromElements(
        elementsFrom("RfisClosed.xml")
      )
    );

    return rfiList;
  }

  @Override
  public List<Rfi> getRfis(String uri) throws Exception {
    return new ArrayList<>(
      WebGetsClient.rfisFromElements(
        elementsFrom(uri)
      )
    );
  }

  private static Document makeRequest(String uri) throws Exception {
    DocumentBuilderFactory dbf = DocumentBuilderFactory.newInstance();
    DocumentBuilder db = dbf.newDocumentBuilder();
    if (uri.contains("xml")) {
      return db.parse(new ClassPathResource(uri).getInputStream());
    }
    return db.parse(new URL(uri).openStream());
  }
}
