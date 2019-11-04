package dgs1sdt.project.pie.rfi;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.test.context.ActiveProfiles;
import org.w3c.dom.Document;
import org.w3c.dom.Element;
import org.w3c.dom.Node;
import org.w3c.dom.NodeList;

import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.DocumentBuilderFactory;
import java.io.InputStream;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.ArrayList;
import java.util.List;

@Service
@ActiveProfiles("!test")
public class WebGETSClient implements GETSClient {

  @Value("${GETS_URL}")
  String getsBaseURL = System.getenv("GETS_URL");


  @Override
  public List<RFI> getRFIs() throws Exception {
    List<RFI> rfiList = new ArrayList<>();
    String uri = getsBaseURL;
    Document document = this.makeRequest(uri);
    NodeList htmlRFIs = document.getElementsByTagName("getsrfi:RFISummary");
    System.out.println("====================INSIDE the WebGetsClient");
    System.out.println("+++++++++++++++++++++++++rfis" + htmlRFIs);

    for (int i = 0; i < htmlRFIs.getLength(); i++) {
      Node node = htmlRFIs.item(i);
      Element element = (Element) node;
      rfiList.add(
        new RFI(
          node.getAttributes().getNamedItem("id").getNodeValue(),
          element.getElementsByTagName("gets:url").item(0).getTextContent()
        )
      );
    }
    return rfiList;
  }

  private Document makeRequest(String uri) throws Exception {
    URL url = new URL(uri);
    HttpURLConnection connection = (HttpURLConnection) url.openConnection();
    connection.setRequestMethod("GET");
    connection.setRequestProperty("Accept", "application/xml");

    InputStream xml = connection.getInputStream();

    DocumentBuilderFactory dbf = DocumentBuilderFactory.newInstance();
    DocumentBuilder db = dbf.newDocumentBuilder();
    return db.parse(xml);
  }
}
