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
    NodeList htmlRFIs = document.getElementsByTagName("getsrfi:RequestForInformation");

    extractElements(rfiList, htmlRFIs);

    String minDate = getDateOneMonthAgo();
    System.out.println("this is the minimum date: " + minDate);

    document = this.makeRequest(uri + "&status=CLOSED&mincloseDate=" + minDate);
    htmlRFIs = document.getElementsByTagName("getsrfi:RequestForInformation");

    List<RFI> closedRfiList = new ArrayList<>();

    extractElements(closedRfiList, htmlRFIs);

    Collections.sort(closedRfiList, new SortByRecentFirst());

    for (int i = 0; i < 3 && i < closedRfiList.size(); i++)
      rfiList.add(closedRfiList.get(i));

    return rfiList;
  }

  private String getDateOneMonthAgo() {
    String minDate;
    SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss'Z'");
    Date date = new Date();
    date.setTime(date.getTime() - 2628000000L);
    System.out.println(date + ": DATE DATE DATE");
    minDate = dateFormat.format(date);
    System.out.println("min date" + minDate);
    return minDate;
  }

  static void extractElements(List<RFI> rfiList, NodeList htmlRFIs) throws Exception {
    for (int i = 0; i < htmlRFIs.getLength(); i++) {
      Node node = htmlRFIs.item(i);
      Element element = (Element) node;

      System.out.println(getRFIID(node));

      rfiList.add(
        new RFI(
          getRFIID(node),
          getUrl(element),
          getStatus(element),
          getLastUpdate(element),
          getTextFromElement(element, "gets:unit"),
          getLtiov(element),
          getTextFromElement(element, "gets:iso1366trigraph"),
          getTextFromElement(element, "getsrfi:requestText")
        )
      );
    }
  }

  private static String getStatus(Element element) {
    NodeList responses = element.getElementsByTagName("getsrfi:Response");

    for( int i = 0; i < responses.getLength(); i++) {
      Node node = responses.item(i);
      Element curr = (Element) node;
      if (curr.getElementsByTagName("gets:producerOrganizationID").item(0).getTextContent().equals("DGS-1")) {
        return curr.getElementsByTagName("getsrfi:responseStatus").item(0).getTextContent();
      }
    }

    System.out.println("could not find status for DGS-1 RFI!<---------------------------");
    return element.getElementsByTagName("getsrfi:responseStatus").item(0).getTextContent();
  }

  private static String getTextFromElement(Element element, String s) {
    return element.getElementsByTagName(s).item(0).getTextContent();
  }

  private static String getRFIID(Node node) {
    String id = node.getAttributes().getNamedItem("id").getNodeValue();

    return id.substring(id.lastIndexOf("-") - 2);
  }

  private static String getUrl(Element element) {
    String rawUrl = getTextFromElement(element, "gets:url");

    return rawUrl.replace(".smil.mil", ".smil.mil/internal");
  }

  private static int getLtiov(Element element) {
    int ltiov;
    try {
      ltiov = Utils.DateToUnixTime(getTextFromElement(element, "gets:ltiov"));
    } catch (Exception e) {
      ltiov = 0;
    }
    return ltiov;
  }

  private static int getLastUpdate(Element element) throws Exception {
    int lastUpdate;
    try {
      lastUpdate = Utils.DateToUnixTime(getTextFromElement(element, "gets:lastUpdate"));
    } catch (Exception e) {
      lastUpdate = Utils.DateToUnixTime(getTextFromElement(element, "getsrfi:receiveDate"));
    }
    return lastUpdate;
  }

  private Document makeRequest(String uri) throws Exception {
    URL url = new URL(uri);
    System.out.println(uri);
    HttpURLConnection connection = (HttpURLConnection) url.openConnection();
    connection.setRequestMethod("GET");
    connection.setRequestProperty("Accept", "application/xml");

    InputStream xml = connection.getInputStream();

    DocumentBuilderFactory dbf = DocumentBuilderFactory.newInstance();
    DocumentBuilder db = dbf.newDocumentBuilder();
    return db.parse(xml);
  }
}
