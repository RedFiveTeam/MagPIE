package dgs1sdt.project.pie.gets;

import dgs1sdt.project.pie.Interfaces.GetsClient;
import org.springframework.context.annotation.Primary;
import org.springframework.stereotype.Service;
import org.springframework.test.context.ActiveProfiles;
import org.w3c.dom.Document;
import org.w3c.dom.Element;
import org.w3c.dom.Node;

import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.DocumentBuilderFactory;

@Service
public class StubGetsClient implements GetsClient {
    @Override
    public Document getRfis() throws Exception {
        DocumentBuilderFactory dbf = DocumentBuilderFactory.newInstance();
        DocumentBuilder builder = dbf.newDocumentBuilder();
        Document doc = builder.newDocument();

    Element root = doc.createElement("root");
    doc.appendChild(root);

    for (int i = 1; i < 4; i++) {
      Element rfi = doc.createElement("rfiMetaData");
      root.appendChild(rfi);
      appendElementWithChild(doc, rfi, "getsrfi:RequestForInformation.id", "rfi_id" + i);
      appendElementWithChild(doc, rfi, "getsrfi:responseStatus", "priority" + i);
      appendElementWithChild(doc, rfi, "gets:ltiov", "gets_status" + i);
      appendElementWithChild(doc, rfi, "gets:unit", "info" + i);
      appendElementWithChild(doc, rfi, "getsrfi:closeDate", "customer" + i);
      appendElementWithChild(doc, rfi, "submissionNumber", "start" + i);
      appendElementWithChild(doc, rfi, "getsrfi:receiveDate", "end" + i);
      appendElementWithChild(doc, rfi, "status", "rfi_status" + i);
      appendElementWithChild(doc, rfi, "getsrfi:requestText", "exploited_coi" + i);
      appendElementWithChild(doc, rfi, "getsrfi:Targets", "tracks" + i);
    }
    return doc;
  }

  private void appendElementWithChild(Document doc, Node element, String childName, String childValue) {
    Element child = doc.createElement(childName);
    child.appendChild(doc.createTextNode(childValue));
    element.appendChild(child);

  }


  @Override
  public Document makeRequest(String uri) throws Exception {
    return null;
  }

}
