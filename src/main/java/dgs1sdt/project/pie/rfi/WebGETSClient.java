package dgs1sdt.project.pie.rfi;
import dgs1sdt.project.pie.Utils;
import org.w3c.dom.Document;
import org.w3c.dom.Element;
import org.w3c.dom.Node;
import org.w3c.dom.NodeList;

import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.DocumentBuilderFactory;
import java.io.InputStream;
import java.net.HttpURLConnection;
import java.net.URL;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.TimeZone;

public class WebGETSClient implements GETSClient {

  private String getsBaseURL;

  public WebGETSClient(String getsUri){
    this.getsBaseURL = getsUri;
  }

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
          element.getElementsByTagName("gets:url").item(0).getTextContent(),
          element.getElementsByTagName("getsrfi:responseStatus").item(0).getTextContent(),
          Utils.DateToUnixTime(element.getElementsByTagName("gets:lastUpdate").item(0).getTextContent())
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
