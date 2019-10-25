package dgs1sdt.project.pie.gets;

import dgs1sdt.project.pie.rfi.RfiModel;
import org.springframework.stereotype.Service;
import org.w3c.dom.Document;
import org.w3c.dom.Element;
import org.w3c.dom.Node;
import org.w3c.dom.NodeList;

import java.util.ArrayList;
import java.util.List;

@Service
public class GetsService {
    public List<RfiModel> getRfis(Document document) throws Exception {
        List<RfiModel> rfiList = new ArrayList<>();
        NodeList htmlRfis = document.getElementsByTagName("rfiMetaData");
        for (int i = 0; i < htmlRfis.getLength(); i++) {
            Node element = htmlRfis.item(i);
            if (element.getNodeType() == Node.ELEMENT_NODE) {
                Element ele = (Element) element;
                RfiModel rfi = new RfiModel(
                        ele.getElementsByTagName("rfi_id").item(0).getTextContent(),
                        ele.getElementsByTagName("priority").item(0).getTextContent(),
                        ele.getElementsByTagName("gets_status").item(0).getTextContent(),
                        ele.getElementsByTagName("info").item(0).getTextContent(),
                        ele.getElementsByTagName("customer").item(0).getTextContent(),
                        ele.getElementsByTagName("start").item(0).getTextContent(),
                        ele.getElementsByTagName("end").item(0).getTextContent(),
                        ele.getElementsByTagName("rfi_status").item(0).getTextContent(),
                        ele.getElementsByTagName("exploited_coi").item(0).getTextContent(),
                        ele.getElementsByTagName("tracks").item(0).getTextContent()
                );
                rfiList.add(rfi);
            }
        }
      System.out.println("returning gets data from GetsClient:" + rfiList);
        return rfiList;
    }
}
