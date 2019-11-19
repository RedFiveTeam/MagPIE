package dgs1sdt.project.pie.rfi;

import dgs1sdt.project.pie.Utils;
import org.apache.commons.io.IOUtils;
import org.springframework.stereotype.Service;
import org.springframework.test.context.ActiveProfiles;
import org.w3c.dom.Document;
import org.w3c.dom.Element;
import org.w3c.dom.Node;
import org.w3c.dom.NodeList;

import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.DocumentBuilderFactory;
import java.io.InputStream;
import java.util.*;

@Service
@ActiveProfiles("test")
public class StubGETSClient implements GETSClient {

  @Override
  public List<RFI> getRFIs() throws Exception {
    List<RFI> rfiList = new ArrayList<>();

    Document document = this.makeRequest(xmlPendingOpen);
    NodeList htmlRFIs = document.getElementsByTagName("getsrfi:RFISummary");


    extractElements(rfiList, htmlRFIs);

    document = this.makeRequest(xmlClosed);
    htmlRFIs = document.getElementsByTagName("getsrfi:RFISummary");

    List<RFI> closedRfiList = new ArrayList<>();

    extractElements(closedRfiList, htmlRFIs);

    Collections.sort(closedRfiList, new SortByRecentFirst());

      for (int i = 0; i < 3 && i < closedRfiList.size(); i++)
        rfiList.add(closedRfiList.get(i));

    Collections.sort(rfiList, new SortByIDGreatestToLeast());

    System.out.println(rfiList);

    return rfiList;
  }

  private void extractElements(List<RFI> rfiList, NodeList htmlRFIs) throws Exception {
    WebGETSClient.extractElements(rfiList, htmlRFIs);
  }


  private Document makeRequest(String xml) throws Exception {
    InputStream xmlIn = IOUtils.toInputStream(xml, "UTF-8");

    DocumentBuilderFactory dbf = DocumentBuilderFactory.newInstance();
    DocumentBuilder db = dbf.newDocumentBuilder();
    return db.parse(xmlIn);
  }

  private String xmlPendingOpen = "<GETS_RFI_Query_Results xmlns=\"GETS\">\n" +
    " <RFISummaryList>\n" +
    "   <getsrfi:RFISummary id=\"DGS-1-SDT-2020-00321\">\n" +
    "     <gets:url>http://www.google.com</gets:url>\n" +
    "     <getsrfi:responseStatus>NEW</getsrfi:responseStatus>\n" +
    "     <getsrfi:primaryOrganization>DGS-1</getsrfi:primaryOrganization>\n" +
    "     <gets:lastUpdate>2019-11-05T14:21:21Z</gets:lastUpdate>\n" +
    "     <gets:unit>633d ABW</gets:unit>\n" +
    "   </getsrfi:RFISummary>\n" +
    "   <getsrfi:RFISummary id=\"DGS-1-SDT-2020-00322\">\n" +
    "     <gets:url>http://www.yahoo.com</gets:url>\n" +
    "     <getsrfi:responseStatus>NEW</getsrfi:responseStatus>\n" +
    "     <getsrfi:primaryOrganization>DGS-1</getsrfi:primaryOrganization>\n" +
    "     <getsrfi:receiveDate>2019-11-11T14:21:22Z</getsrfi:receiveDate>\n" +
    "     <gets:unit>633d ABW</gets:unit>\n" +
    "   </getsrfi:RFISummary>\n" +
    "   <getsrfi:RFISummary id=\"DGS-1-SDT-2020-00323\">\n" +
    "     <gets:url>http://www.aol.com</gets:url>\n" +
    "     <getsrfi:responseStatus>NEW</getsrfi:responseStatus>\n" +
    "     <getsrfi:primaryOrganization>DGS-1</getsrfi:primaryOrganization>\n" +
    "     <gets:lastUpdate>2019-11-12T14:21:23Z</gets:lastUpdate>\n" +
    "     <getsrfi:receiveDate>2019-09-11T14:21:22Z</getsrfi:receiveDate>\n" +
    "     <gets:unit>633d ABW</gets:unit>\n" +
    "   </getsrfi:RFISummary>\n" +
    "   <getsrfi:RFISummary id=\"DGS-1-SDT-2020-00324\">\n" +
    "     <gets:url>http://www.msn.com</gets:url>\n" +
    "     <getsrfi:responseStatus>NEW</getsrfi:responseStatus>\n" +
    "     <getsrfi:primaryOrganization>DGS-1</getsrfi:primaryOrganization>\n" +
    "     <gets:lastUpdate>2019-11-10T14:21:24Z</gets:lastUpdate>\n" +
    "     <gets:unit>HQ ACC</gets:unit>\n" +
    "   </getsrfi:RFISummary>\n" +
    "   <getsrfi:RFISummary id=\"DGS-1-SDT-2020-00325\">\n" +
    "     <gets:url>http://www.ask.com</gets:url>\n" +
    "     <getsrfi:responseStatus>OPEN</getsrfi:responseStatus>\n" +
    "     <getsrfi:primaryOrganization>DGS-1</getsrfi:primaryOrganization>\n" +
    "     <gets:lastUpdate>2019-11-12T14:21:25Z</gets:lastUpdate>\n" +
    "     <gets:unit>633d ABW</gets:unit>\n" +
    "   </getsrfi:RFISummary>\n" +
    "      <getsrfi:RFISummary id=\"DGS-1-SDT-2020-00326\">\n" +
    "     <gets:url>http://www.google.com</gets:url>\n" +
    "     <getsrfi:responseStatus>OPEN</getsrfi:responseStatus>\n" +
    "     <getsrfi:primaryOrganization>DGS-1</getsrfi:primaryOrganization>\n" +
    "     <gets:lastUpdate>2019-10-16T20:21:26Z</gets:lastUpdate>\n" +
    "     <gets:unit>1 FW</gets:unit>\n" +
    "   </getsrfi:RFISummary>\n" +
    "   <getsrfi:RFISummary id=\"DGS-1-SDT-2020-00331\">\n" +
    "     <gets:url>http://www.google.com</gets:url>\n" +
    "     <getsrfi:responseStatus>NEW</getsrfi:responseStatus>\n" +
    "     <getsrfi:primaryOrganization>DGS-1</getsrfi:primaryOrganization>\n" +
    "     <gets:lastUpdate>2019-11-05T14:21:21Z</gets:lastUpdate>\n" +
    "     <gets:unit>633d ABW</gets:unit>\n" +
    "   </getsrfi:RFISummary>\n" +
    "   <getsrfi:RFISummary id=\"DGS-1-SDT-2020-00332\">\n" +
    "     <gets:url>http://www.yahoo.com</gets:url>\n" +
    "     <getsrfi:responseStatus>NEW</getsrfi:responseStatus>\n" +
    "     <getsrfi:primaryOrganization>DGS-1</getsrfi:primaryOrganization>\n" +
    "     <gets:lastUpdate>2019-11-11T14:21:22Z</gets:lastUpdate>\n" +
    "     <gets:unit>1 FW</gets:unit>\n" +
    "   </getsrfi:RFISummary>\n" +
    "   <getsrfi:RFISummary id=\"DGS-1-SDT-2020-00333\">\n" +
    "     <gets:url>http://www.aol.com</gets:url>\n" +
    "     <getsrfi:responseStatus>NEW</getsrfi:responseStatus>\n" +
    "     <getsrfi:primaryOrganization>DGS-1</getsrfi:primaryOrganization>\n" +
    "     <gets:lastUpdate>2019-11-12T14:21:23Z</gets:lastUpdate>\n" +
    "     <gets:unit>633d ABW</gets:unit>\n" +
    "   </getsrfi:RFISummary>\n" +
    "   <getsrfi:RFISummary id=\"DGS-1-SDT-2020-00334\">\n" +
    "     <gets:url>http://www.msn.com</gets:url>\n" +
    "     <getsrfi:responseStatus>NEW</getsrfi:responseStatus>\n" +
    "     <getsrfi:primaryOrganization>DGS-1</getsrfi:primaryOrganization>\n" +
    "     <gets:lastUpdate>2019-11-10T14:21:24Z</gets:lastUpdate>\n" +
    "     <gets:unit>633d ABW</gets:unit>\n" +
    "   </getsrfi:RFISummary>\n" +
    "   <getsrfi:RFISummary id=\"DGS-1-SDT-2020-00335\">\n" +
    "     <gets:url>http://www.ask.com</gets:url>\n" +
    "     <getsrfi:responseStatus>OPEN</getsrfi:responseStatus>\n" +
    "     <getsrfi:primaryOrganization>DGS-1</getsrfi:primaryOrganization>\n" +
    "     <gets:lastUpdate>2019-11-12T14:21:25Z</gets:lastUpdate>\n" +
    "     <gets:unit>633d ABW</gets:unit>\n" +
    "   </getsrfi:RFISummary>\n" +
    "      <getsrfi:RFISummary id=\"DGS-1-SDT-2020-00336\">\n" +
    "     <gets:url>http://www.google.com</gets:url>\n" +
    "     <getsrfi:responseStatus>OPEN</getsrfi:responseStatus>\n" +
    "     <getsrfi:primaryOrganization>DGS-1</getsrfi:primaryOrganization>\n" +
    "     <gets:lastUpdate>2019-10-16T20:21:26Z</gets:lastUpdate>\n" +
    "     <gets:unit>1 FW</gets:unit>\n" +
    "   </getsrfi:RFISummary>\n" +
    " </RFISummaryList>\n" +
    "</GETS_RFI_Query_Results>\n";

  private String xmlClosed = "<GETS_RFI_Query_Results xmlns=\"GETS\">\n" +
    " <RFISummaryList>\n" +
    "   <getsrfi:RFISummary id=\"DGS-1-SDT-2020-00327\">\n" +
    "     <gets:url>http://www.yahoo.com</gets:url>\n" +
    "     <getsrfi:responseStatus>CLOSED</getsrfi:responseStatus>\n" +
    "     <getsrfi:primaryOrganization>DGS-1</getsrfi:primaryOrganization>\n" +
    "     <gets:lastUpdate>2019-10-16T01:21:27Z</gets:lastUpdate>\n" +
    "     <gets:unit>1 FW</gets:unit>\n" +
    "   </getsrfi:RFISummary>\n" +
    "   <getsrfi:RFISummary id=\"DGS-1-SDT-2020-00328\">\n" +
    "     <gets:url>http://www.aol.com</gets:url>\n" +
    "     <getsrfi:responseStatus>CLOSED</getsrfi:responseStatus>\n" +
    "     <getsrfi:primaryOrganization>DGS-1</getsrfi:primaryOrganization>\n" +
    "     <gets:lastUpdate>2019-10-30T14:21:28Z</gets:lastUpdate>\n" +
    "     <gets:unit>1 FW</gets:unit>\n" +
    "   </getsrfi:RFISummary>\n" +
    "   <getsrfi:RFISummary id=\"DGS-1-SDT-2020-00329\">\n" +
    "     <gets:url>http://www.msn.com</gets:url>\n" +
    "     <getsrfi:responseStatus>CLOSED</getsrfi:responseStatus>\n" +
    "     <getsrfi:primaryOrganization>DGS-1</getsrfi:primaryOrganization>\n" +
    "     <gets:lastUpdate>2018-03-16T14:21:29Z</gets:lastUpdate>\n" +
    "     <gets:unit>1 FW</gets:unit>\n" +
    "   </getsrfi:RFISummary>\n" +
    "   <getsrfi:RFISummary id=\"DGS-1-SDT-2020-00330\">\n" +
    "     <gets:url>http://www.ask.com</gets:url>\n" +
    "     <getsrfi:responseStatus>CLOSED</getsrfi:responseStatus>\n" +
    "     <getsrfi:primaryOrganization>DGS-1</getsrfi:primaryOrganization>\n" +
    "     <gets:lastUpdate>2017-10-01T14:21:30Z</gets:lastUpdate>\n" +
    "     <gets:unit>1 FW</gets:unit>\n" +
    "   </getsrfi:RFISummary>\n" +
    " </RFISummaryList>\n" +
    "</GETS_RFI_Query_Results>\n";
}
