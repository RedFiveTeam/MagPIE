package dgs1sdt.pie.rfis;

import dgs1sdt.pie.Utils;
import org.w3c.dom.Element;
import org.w3c.dom.Node;
import org.w3c.dom.NodeList;

import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.util.Date;

public class RfiDeserializer {
  public static Rfi deserialize(Node rfiNode) throws Exception {
    Element element = (Element) rfiNode;

    return new Rfi(
      getRfiID(rfiNode),
      getUrl(element),
      getStatus(element),
      getLastUpdate(element),
      getTextFromElement(element, "gets:unit"),
      getLtiov(element),
      getTextFromElement(element, "gets:iso1366trigraph"),
      getTextFromElement(element, "getsrfi:requestText")
    );
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

}
