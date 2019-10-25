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
@ActiveProfiles("test")
@Primary
public class StubGetsClient implements GetsClient {
    @Override
    public Document getRfis() throws Exception {
        DocumentBuilderFactory dbf = DocumentBuilderFactory.newInstance();
        DocumentBuilder builder = dbf.newDocumentBuilder();
        Document doc = builder.newDocument();

        Element root = doc.createElement("root");
        doc.appendChild(root);

        for (int i = 1; i < 4; i++) {
            Element mission = doc.createElement("missionMetaData");
            root.appendChild(mission);
            appendElementWithChild(doc, mission, "rfi_id", "rfi_id" + i);
            appendElementWithChild(doc, mission, "priority", "priority" + i);
            appendElementWithChild(doc, mission, "gets_status", "gets_status" + i);
            appendElementWithChild(doc, mission, "info", "info" + i);
            appendElementWithChild(doc, mission, "customer", "customer" + i);
            appendElementWithChild(doc, mission, "start", "start" + i);
            appendElementWithChild(doc, mission, "end", "end" + i);
            appendElementWithChild(doc, mission, "rfi_status", "rfi_status" + i);
            appendElementWithChild(doc, mission, "exploited_coi", "exploited_coi" + i);
            appendElementWithChild(doc, mission, "tracks", "tracks" + i);
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
      System.out.println("making request to GETS!!! in TEST env");
        return null;
    }
}
