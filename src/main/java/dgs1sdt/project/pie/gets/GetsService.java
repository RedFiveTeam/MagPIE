package dgs1sdt.project.pie.gets;

import dgs1sdt.project.pie.rfi.Rfi;
import org.springframework.stereotype.Service;
import org.w3c.dom.Document;
import org.w3c.dom.Element;
import org.w3c.dom.Node;
import org.w3c.dom.NodeList;

import java.util.ArrayList;
import java.util.List;

@Service
public class GetsService {
    public List<Rfi> getRfis(Document document) throws Exception {
        List<Rfi> rfiList = new ArrayList<>();
        NodeList htmlRfis = document.getElementsByTagName("rfiMetaData");
        for (int i = 0; i < htmlRfis.getLength(); i++) {
            Node element = htmlRfis.item(i);
            if (element.getNodeType() == Node.ELEMENT_NODE) {
                Element ele = (Element) element;
                Rfi rfi = new Rfi(
                        ele.getElementsByTagName("getsrfi:RequestForInformation.id").item(0).getTextContent(),
                        ele.getElementsByTagName("getsrfi:responseStatus").item(0).getTextContent(),
                        ele.getElementsByTagName("gets:ltiov").item(0).getTextContent(),
                        ele.getElementsByTagName("gets:unit").item(0).getTextContent(),
                        ele.getElementsByTagName("getsrfi:closeDate").item(0).getTextContent(),
                        ele.getElementsByTagName("submissionNumber").item(0).getTextContent(),
                        ele.getElementsByTagName("getsrfi:receiveDate").item(0).getTextContent(),
                        ele.getElementsByTagName("status").item(0).getTextContent(),
                        ele.getElementsByTagName("getsrfi:requestText").item(0).getTextContent(),
                        ele.getElementsByTagName("getsrfi:Targets").item(0).getTextContent()
                );
                rfiList.add(rfi);
            }
        }

        return rfiList;
    }
}
