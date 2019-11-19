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
import java.util.*;

public class WebGETSClient implements GETSClient {

  private String getsBaseURL;

  public WebGETSClient(String getsUri){
    this.getsBaseURL = getsUri;
  }

  public List<RFI> getRFIs() throws Exception {
    List<RFI> rfiList = new ArrayList<>();
    String uri = getsBaseURL;

    Document document = this.makeRequest(uri + "&status=NEW,OPEN");
    NodeList htmlRFIs = document.getElementsByTagName("getsrfi:RFISummary");


    extractElements(rfiList, htmlRFIs);

    String minDate;
    SimpleDateFormat dateFormat = new SimpleDateFormat("yyyMMdd");
    Date date = new Date();
    date.setTime(date.getTime() - 5256000000L);

    minDate = dateFormat.format(date);

    document = this.makeRequest(uri + "&status=CLOSED&mincloseDate=" + minDate);
    htmlRFIs = document.getElementsByTagName("getsrfi:RFISummary");

    List<RFI> closedRfiList = new ArrayList<>();

    extractElements(closedRfiList, htmlRFIs);

    Collections.sort(closedRfiList, new SortByRecentFirst());

    for (int i = 0; i < 3 && i < closedRfiList.size(); i++)
      rfiList.add(closedRfiList.get(i));

    Collections.sort(rfiList, new SortByIDGreatestToLeast());


    return rfiList;
  }

  static void extractElements(List<RFI> rfiList, NodeList htmlRFIs) throws Exception {
    for (int i = 0; i < htmlRFIs.getLength(); i++) {
      Node node = htmlRFIs.item(i);
      Element element = (Element) node;

      int lastUpdate;

      try {
        lastUpdate = Utils.DateToUnixTime(element.getElementsByTagName("gets:lastUpdate").item(0).getTextContent());
      } catch (Exception e) {
        lastUpdate = Utils.DateToUnixTime(element.getElementsByTagName("getsrfi:receiveDate").item(0).getTextContent());
      }

      int ltiov;

      try {
        ltiov = Utils.DateToUnixTime(element.getElementsByTagName("gets:ltiov").item(0).getTextContent());
      } catch (Exception e) {
        ltiov = 0;
      }

      String rawUrl = element.getElementsByTagName("gets:url").item(0).getTextContent();

      String url = rawUrl.replace(".smil.mil", ".smil.mil/internal");

      rfiList.add(
        new RFI(
          node.getAttributes().getNamedItem("id").getNodeValue(),
          url,
          element.getElementsByTagName("getsrfi:responseStatus").item(0).getTextContent(),
          lastUpdate,
          element.getElementsByTagName("gets:unit").item(0).getTextContent(),
          ltiov
        )
      );
    }
  }


  private Document makeRequest(String uri) throws Exception {
    System.out.println(uri);
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
