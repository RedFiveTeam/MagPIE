package dgs1sdt.magpie.rfis;

import dgs1sdt.magpie.Utilities;
import org.w3c.dom.Element;
import org.w3c.dom.Node;
import org.w3c.dom.NodeList;

import java.sql.Timestamp;
import java.util.Date;

public class RfiDeserializer {
  public static Rfi deserialize(Node rfiNode) throws Exception {
    Element element = (Element) rfiNode;

    Rfi rfi = new Rfi(
      getRfiNum(rfiNode),
      getUrl(element),
      getStatus(element),
      getLastUpdate(element),
      getStringFromElement(element, "gets:unit"),
      getLtiov(element),
      getStringFromElement(element, "gets:iso1366trigraph"),
      getStringFromElement(element, "getsrfi:requestText")
    );

    Timestamp receiveDate = getReceiveDate(element);

    if (receiveDate != null) {
      rfi.setReceiveDate(receiveDate);
    }

    return rfi;
  }

  private static String getRfiNum(Node node) {
    return node.getAttributes().getNamedItem("id").getNodeValue();
  }

  private static String getUrl(Element element) {
    String rawUrl = getStringFromElement(element, "gets:url");

    return rawUrl.replace(".smil.mil", ".smil.mil/internal");
  }

  private static String getStatus(Element element) {
    NodeList responses = element.getElementsByTagName("getsrfi:Response");

    for (int i = 0; i < responses.getLength(); i++) {
      Node node = responses.item(i);
      Element curr = (Element) node;
      if (curr.getElementsByTagName("gets:producerOrganizationID").item(0).getTextContent().contains("DGS-1")) {
        return curr.getElementsByTagName("getsrfi:responseStatus").item(0).getTextContent();
      }
    }
    return element.getElementsByTagName("getsrfi:responseStatus").item(0).getTextContent();
  }

  private static Timestamp getLastUpdate(Element element) throws Exception {
    Date lastUpdate;
    try {
      lastUpdate = Utilities.parseDate(getStringFromElement(element, "gets:lastUpdate"));
    } catch (Exception e) {
      lastUpdate = Utilities.parseDate(getStringFromElement(element, "getsrfi:receiveDate"));
    }
    return new Timestamp(lastUpdate.getTime());
  }

  private static Timestamp getLtiov(Element element) {
    Timestamp ltiov;
    try {
      Date date = Utilities.parseDate(getStringFromElement(element, "gets:ltiov"));
      ltiov = new Timestamp(date.getTime());
    } catch (Exception e) {
      ltiov = null;
    }
    return ltiov;
  }

  private static String getStringFromElement(Element element, String string) {
    if (element.getElementsByTagName(string) != null) {
      return element.getElementsByTagName(string).item(0).getTextContent();
    }
    return "N/A";
  }

  private static Timestamp getReceiveDate(Element element) {
    Timestamp receiveDate;
    try {
      Date date = Utilities.parseDate(getStringFromElement(element, "getsrfi:receiveDate"));
      receiveDate = new Timestamp(date.getTime());
    } catch (Exception e) {
      receiveDate = null;
    }
    return receiveDate;
  }
}
