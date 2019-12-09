package dgs1sdt.pie.rfis;

import dgs1sdt.pie.Utils;
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

public class WebGetsClient implements GetsClient {

  private String getsBaseURL;

  public WebGetsClient(String getsUri) {
    this.getsBaseURL = getsUri;
  }

  public static NodeList elementsFrom(String uri) throws Exception {
    Document document = makeRequest(uri);
    return document.getElementsByTagName("getsrfi:RequestForInformation");
  }

  public List<Rfi> getRfis() throws Exception {
    List<Rfi> rfiList = new ArrayList<>();
    String uri = getsBaseURL;

    rfiList.addAll(
      rfisFromElements(
        elementsFrom(uri + "&status=NEW,OPEN")
      )
    );

    rfiList.addAll(
      rfisFromElements(
        elementsFrom(uri + "&status=CLOSED&mincloseDate=" + getDateOneMonthsAgo())
      )
    );

    return rfiList;
  }

  @Override
  public List<Rfi> getRfis(String uri) throws Exception {
    return null;
  }

  private String getDateOneMonthsAgo() {
    String minDate;
    SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss'Z'");
    Date date = new Date();
    date.setTime(date.getTime() - 2628000000L);
    System.out.println(date + ": DATE DATE DATE");
    minDate = dateFormat.format(date);
    System.out.println("min date" + minDate);
    return minDate;
  }

  public static List<Rfi> rfisFromElements(NodeList htmlRfis) throws Exception {
    List<Rfi> rfiList = new ArrayList<>();

    for (int i = 0; i < htmlRfis.getLength(); i++) {
      Node node = htmlRfis.item(i);
      Element element = (Element) node;

      rfiList.add(
        new Rfi(
          getRfiID(node),
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
    return rfiList;
  }

  private static String getStatus(Element element) {
    NodeList responses = element.getElementsByTagName("getsrfi:Response");

    for (int i = 0; i < responses.getLength(); i++) {
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

  private static String getRfiID(Node node) {
    return node.getAttributes().getNamedItem("id").getNodeValue();
  }

  private static String getUrl(Element element) {
    String rawUrl = getTextFromElement(element, "gets:url");

    return rawUrl.replace(".smil.mil", ".smil.mil/internal");
  }

  private static Date getLtiov(Element element) {
    Date ltiov;
    try {
      ltiov = Utils.parseDate(getTextFromElement(element, "gets:ltiov"));
    } catch (Exception e) {
      ltiov = null;
    }
    return ltiov;
  }

  private static Date getLastUpdate(Element element) throws Exception {
    Date lastUpdate;
    try {
      lastUpdate = Utils.parseDate(getTextFromElement(element, "gets:lastUpdate"));
    } catch (Exception e) {
      lastUpdate = Utils.parseDate(getTextFromElement(element, "getsrfi:receiveDate"));
    }
    return lastUpdate;
  }

  private static Document makeRequest(String uri) throws Exception {
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
