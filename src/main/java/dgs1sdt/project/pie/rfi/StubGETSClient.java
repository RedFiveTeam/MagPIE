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
import java.text.SimpleDateFormat;
import java.util.*;

@Service
@ActiveProfiles("test")
public class StubGETSClient implements GETSClient {

  @Override
  public List<RFI> getRFIs() throws Exception {
    List<RFI> rfiList = new ArrayList<>();

    Document document = this.makeRequest(xmlPendingOpen);
    NodeList htmlRFIs = document.getElementsByTagName("getsrfi:RequestForInformation");

    extractElements(rfiList, htmlRFIs);

    document = this.makeRequest(xmlClosed);
    htmlRFIs = document.getElementsByTagName("getsrfi:RequestForInformation");
    List<RFI> closedRfiList = new ArrayList<>();
    extractElements(closedRfiList, htmlRFIs);

    Collections.sort(closedRfiList, new SortByRecentFirst());

      for (int i = 0; i < 3 && i < closedRfiList.size(); i++)
        rfiList.add(closedRfiList.get(i));

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

  //language=XML
  private String xmlPendingOpen = "<GETS_RFI_Query_Results xmlns=\"GETS\">\n" +
    "  <RFIList>\n" +
    "    <getsrfi:RequestForInformation id=\"DGS-1-SDT-2020-00321\">\n" +
    "      <getsrfi:Request id=\"DGS-1-SDT-2020-00321\">\n" +
    "        <getsrfi:requestText>hi</getsrfi:requestText>\n" +
    "        <gets:url>http://www.google.com</gets:url>\n" +
    "        <getsrfi:primaryOrganization>DGS-1</getsrfi:primaryOrganization>\n" +
    "        <gets:lastUpdate>2019-11-05T14:21:21Z</gets:lastUpdate>\n" +
    "        <getsrfi:RequestingPOC>\n" +
    "          <gets:unit>633d ABW</gets:unit>\n" +
    "        </getsrfi:RequestingPOC>\n" +
    "        <gets:ltiov>2020-11-05T14:21:21Z</gets:ltiov>\n" +
    "        <gets:CountryCodeList>\n" +
    "          <gets:iso1366trigraph>USA</gets:iso1366trigraph>\n" +
    "        </gets:CountryCodeList>\n" +
    "      </getsrfi:Request>\n" +
    "      <getsrfi:ResponseList>\n" +
    "        <getsrfi:Response id=\"DGS-1-SDT-2020-00321\" orgid=\"DGS-1\">\n" +
    "          <gets:producerOrganizationID>DGS-1</gets:producerOrganizationID>\n" +
    "          <getsrfi:responseStatus>NEW</getsrfi:responseStatus>\n" +
    "        </getsrfi:Response>\n" +
    "        <getsrfi:Response id=\"DGS-1-SDT-2020-00321\" orgid=\"633 ABW\">\n" +
    "          <gets:producerOrganizationID>633 ABW</gets:producerOrganizationID>\n" +
    "          <getsrfi:responseStatus>CLOSED</getsrfi:responseStatus>\n" +
    "        </getsrfi:Response>\n" +
    "      </getsrfi:ResponseList>\n" +
    "    </getsrfi:RequestForInformation>\n" +
    "    <getsrfi:RequestForInformation id=\"DGS-1-ABC-2020-00322\">\n" +
    "      <getsrfi:Request id=\"DGS-1-ABC-2020-00322\">\n" +
    "        <getsrfi:requestText>\n" +
    "  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et" +
    " dolore" +
    "          magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea" +
    " commodo" +
    "          consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat " +
    "nulla" +
    "          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit " +
    "anim id es" +
    "          laborum." +
    "        </getsrfi:requestText>\n" +
    "        <gets:url>http://www.yahoo.com</gets:url>\n" +
    "        <getsrfi:primaryOrganization>DGS-1</getsrfi:primaryOrganization>\n" +
    "        <getsrfi:receiveDate>2019-11-11T00:00:00Z</getsrfi:receiveDate>\n" +
    "        <getsrfi:RequestingPOC>\n" +
    "          <gets:unit>633 ABW KUYGEUYGIUYGWOUY FJWUYTDAUIYGDUYFID UYBSOIUHOIUD</gets:unit>\n" +
    "        </getsrfi:RequestingPOC>\n" +
    "        <gets:CountryCodeList>\n" +
    "          <gets:iso1366trigraph>CAN</gets:iso1366trigraph>\n" +
    "        </gets:CountryCodeList>\n" +
    "      </getsrfi:Request>\n" +
    "      <getsrfi:ResponseList>\n" +
    "        <getsrfi:Response id=\"DGS-1-ABC-2020-00322\" orgid=\"DGS-1\">\n" +
    "          <gets:producerOrganizationID>DGS-1</gets:producerOrganizationID>\n" +
    "          <getsrfi:responseStatus>NEW</getsrfi:responseStatus>\n" +
    "        </getsrfi:Response>\n" +
    "      </getsrfi:ResponseList>\n" +
    "    </getsrfi:RequestForInformation>\n" +
    "    <getsrfi:RequestForInformation id=\"DGS-1-SDT-2020-00323\">\n" +
    "      <getsrfi:Request id=\"DGS-1-SDT-2020-00323\">\n" +
    "        <getsrfi:requestText>\n" +
    "  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et" +
    " dolore" +
    "          magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea" +
    " commodo" +
    "          consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat " +
    "nulla" +
    "          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit " +
    "anim id es" +
    "          laborum."+
    "        </getsrfi:requestText>\n" +
    "        <gets:url>http://www.aol.com</gets:url>\n" +
    "        <getsrfi:primaryOrganization>DGS-1</getsrfi:primaryOrganization>\n" +
    "        <gets:lastUpdate>2019-11-12T14:21:23Z</gets:lastUpdate>\n" +
    "        <getsrfi:receiveDate>2019-09-11T14:21:22Z</getsrfi:receiveDate>\n" +
    "        <getsrfi:RequestingPOC>\n" +
    "          <gets:unit>633d ABW</gets:unit>\n" +
    "        </getsrfi:RequestingPOC>\n" +
    "        <gets:CountryCodeList>\n" +
    "          <gets:iso1366trigraph>USA</gets:iso1366trigraph>\n" +
    "        </gets:CountryCodeList>\n" +
    "      </getsrfi:Request>\n" +
    "      <getsrfi:ResponseList>\n" +
    "        <getsrfi:Response id=\"DGS-1-SDT-2020-00323\" orgid=\"DGS-1\">\n" +
    "          <gets:producerOrganizationID>DGS-1</gets:producerOrganizationID>\n" +
    "          <getsrfi:responseStatus>NEW</getsrfi:responseStatus>\n" +
    "        </getsrfi:Response>\n" +
    "      </getsrfi:ResponseList>\n" +
    "    </getsrfi:RequestForInformation>\n" +
    "    <getsrfi:RequestForInformation id=\"DGS-1-SDT-2020-00324\">\n" +
    "      <getsrfi:Request id=\"DGS-1-SDT-2020-00324\">\n" +
    "        <getsrfi:requestText>\n" +
    "  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et" +
    " dolore" +
    "          magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea" +
    " commodo" +
    "          consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat " +
    "nulla" +
    "          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit " +
    "anim id es" +
    "          laborum." +
    "        </getsrfi:requestText>\n" +
    "        <gets:url>http://www.msn.com</gets:url>\n" +
    "        <getsrfi:primaryOrganization>DGS-1</getsrfi:primaryOrganization>\n" +
    "        <gets:lastUpdate>2019-05-10T14:21:24Z</gets:lastUpdate>\n" +
    "        <getsrfi:RequestingPOC>\n" +
    "          <gets:unit>HQ ACC</gets:unit>\n" +
    "        </getsrfi:RequestingPOC>\n" +
    "        <gets:ltiov>2020-05-05T04:21:21Z</gets:ltiov>\n" +
    "        <gets:CountryCodeList>\n" +
    "          <gets:iso1366trigraph>MEX</gets:iso1366trigraph>\n" +
    "        </gets:CountryCodeList>\n" +
    "      </getsrfi:Request>\n" +
    "      <getsrfi:ResponseList>\n" +
    "        <getsrfi:Response id=\"DGS-1-SDT-2020-00324\" orgid=\"DGS-1\">\n" +
    "          <gets:producerOrganizationID>DGS-1</gets:producerOrganizationID>\n" +
    "          <getsrfi:responseStatus>NEW</getsrfi:responseStatus>\n" +
    "        </getsrfi:Response>\n" +
    "      </getsrfi:ResponseList>\n" +
    "    </getsrfi:RequestForInformation>\n" +
    "    <getsrfi:RequestForInformation id=\"DGS-1-SDT-2020-00325\">\n" +
    "      <getsrfi:Request id=\"DGS-1-SDT-2020-00325\">\n" +
    "        <getsrfi:requestText>\n" +
    "  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et" +
    " dolore" +
    "          magna aliqua.\n" +
    "        </getsrfi:requestText>\n" +
    "        <gets:url>http://www.ask.com</gets:url>\n" +
    "        <getsrfi:primaryOrganization>DGS-1</getsrfi:primaryOrganization>\n" +
    "        <gets:lastUpdate>2019-11-12T14:21:25Z</gets:lastUpdate>\n" +
    "        <getsrfi:RequestingPOC>\n" +
    "          <gets:unit>633d ABW</gets:unit>\n" +
    "        </getsrfi:RequestingPOC>\n" +
    "        <gets:ltiov>2020-11-10T14:21:21Z</gets:ltiov>\n" +
    "        <gets:CountryCodeList>\n" +
    "          <gets:iso1366trigraph>USA</gets:iso1366trigraph>\n" +
    "        </gets:CountryCodeList>\n" +
    "      </getsrfi:Request>\n" +
    "      <getsrfi:ResponseList>\n" +
    "        <getsrfi:Response id=\"DGS-1-SDT-2020-00325\" orgid=\"DGS-1\">\n" +
    "          <gets:producerOrganizationID>DGS-1</gets:producerOrganizationID>\n" +
    "          <getsrfi:responseStatus>OPEN</getsrfi:responseStatus>\n" +
    "        </getsrfi:Response>\n" +
    "      </getsrfi:ResponseList>\n" +
    "    </getsrfi:RequestForInformation>\n" +
    "    <getsrfi:RequestForInformation id=\"DGS-1-SDT-2020-00326\">\n" +
    "      <getsrfi:Request id=\"DGS-1-SDT-2020-00326\">\n" +
    "        <getsrfi:requestText>\n" +
    "  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et" +
    " dolore" +
    "          magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea" +
    " commodo" +
    "          consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat " +
    "nulla" +
    "          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit " +
    "anim id es" +
    "          laborum." +
    "  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et" +
    " dolore" +
    "          magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea" +
    " commodo" +
    "          consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat " +
    "nulla" +
    "          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit " +
    "anim id es" +
    "          laborum." +
    "  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et" +
    " dolore" +
    "          magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea" +
    " commodo" +
    "          consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat " +
    "nulla" +
    "          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit " +
    "anim id es" +
    "          laborum." +
    "  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et" +
    " dolore" +
    "          magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea" +
    " commodo" +
    "          consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat " +
    "nulla" +
    "          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit " +
    "anim id es" +
    "          laborum." +
    "        </getsrfi:requestText>\n" +
    "        <gets:url>http://www.google.com</gets:url>\n" +
    "        <getsrfi:primaryOrganization>DGS-1</getsrfi:primaryOrganization>\n" +
    "        <gets:lastUpdate>2019-10-16T04:59:58Z</gets:lastUpdate>\n" +
    "        <getsrfi:RequestingPOC>\n" +
    "          <gets:unit>1 FW</gets:unit>\n" +
    "        </getsrfi:RequestingPOC>\n" +
    "        <gets:ltiov>2022-11-09T00:00:00Z</gets:ltiov>\n" +
    "        <gets:CountryCodeList>\n" +
    "          <gets:iso1366trigraph>CAN</gets:iso1366trigraph>\n" +
    "        </gets:CountryCodeList>\n" +
    "      </getsrfi:Request>\n" +
    "      <getsrfi:ResponseList>\n" +
    "        <getsrfi:Response id=\"DGS-1-SDT-2020-00326\" orgid=\"DGS-1\">\n" +
    "          <gets:producerOrganizationID>DGS-1</gets:producerOrganizationID>\n" +
    "          <getsrfi:responseStatus>OPEN</getsrfi:responseStatus>\n" +
    "        </getsrfi:Response>\n" +
    "      </getsrfi:ResponseList>\n" +
    "    </getsrfi:RequestForInformation>\n" +
    "    <getsrfi:RequestForInformation id=\"DGS-1-SDT-2020-00331\">\n" +
    "      <getsrfi:Request id=\"DGS-1-SDT-2020-00331\">\n" +
    "        <getsrfi:requestText>\n" +
    "  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et" +
    " dolore" +
    "          magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea" +
    " commodo" +
    "          consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat " +
    "nulla" +
    "          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit " +
    "anim id es" +
    "          laborum." +
    "        </getsrfi:requestText>\n" +
    "        <gets:url>http://www.google.com</gets:url>\n" +
    "        <getsrfi:primaryOrganization>DGS-1</getsrfi:primaryOrganization>\n" +
    "        <gets:lastUpdate>2019-11-05T14:21:21Z</gets:lastUpdate>\n" +
    "        <getsrfi:RequestingPOC>\n" +
    "          <gets:unit>633d ABW</gets:unit>\n" +
    "        </getsrfi:RequestingPOC>\n" +
    "        <gets:CountryCodeList>\n" +
    "          <gets:iso1366trigraph>USA</gets:iso1366trigraph>\n" +
    "        </gets:CountryCodeList>\n" +
    "      </getsrfi:Request>\n" +
    "      <getsrfi:ResponseList>\n" +
    "        <getsrfi:Response id=\"DGS-1-SDT-2020-00331\" orgid=\"DGS-1\">\n" +
    "          <gets:producerOrganizationID>DGS-1</gets:producerOrganizationID>\n" +
    "          <getsrfi:responseStatus>NEW</getsrfi:responseStatus>\n" +
    "        </getsrfi:Response>\n" +
    "      </getsrfi:ResponseList>\n" +
    "    </getsrfi:RequestForInformation>\n" +
    "    <getsrfi:RequestForInformation id=\"DGS-1-SDT-2020-00332\">\n" +
    "      <getsrfi:Request id=\"DGS-1-SDT-2020-00332\">\n" +
    "        <getsrfi:requestText>\n" +
    "  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et" +
    " dolore" +
    "          magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea" +
    " commodo" +
    "          consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat " +
    "nulla" +
    "          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit " +
    "anim id es" +
    "          laborum." +
    "        </getsrfi:requestText>\n" +
    "        <gets:url>http://www.yahoo.com</gets:url>\n" +
    "        <getsrfi:primaryOrganization>DGS-1</getsrfi:primaryOrganization>\n" +
    "        <gets:lastUpdate>2019-11-11T14:21:22Z</gets:lastUpdate>\n" +
    "        <getsrfi:RequestingPOC>\n" +
    "          <gets:unit>1 FW</gets:unit>\n" +
    "        </getsrfi:RequestingPOC>\n" +
    "        <gets:ltiov>2020-02-04T14:21:21Z</gets:ltiov>\n" +
    "        <gets:CountryCodeList>\n" +
    "          <gets:iso1366trigraph>MEX</gets:iso1366trigraph>\n" +
    "        </gets:CountryCodeList>\n" +
    "      </getsrfi:Request>\n" +
    "      <getsrfi:ResponseList>\n" +
    "        <getsrfi:Response id=\"DGS-1-SDT-2020-00332\" orgid=\"DGS-1\">\n" +
    "          <gets:producerOrganizationID>DGS-1</gets:producerOrganizationID>\n" +
    "          <getsrfi:responseStatus>NEW</getsrfi:responseStatus>\n" +
    "        </getsrfi:Response>\n" +
    "      </getsrfi:ResponseList>\n" +
    "    </getsrfi:RequestForInformation>\n" +
    "    <getsrfi:RequestForInformation id=\"633-ABW-2020-00333\">\n" +
    "      <getsrfi:Request id=\"633-ABW-2020-00333\">\n" +
    "        <getsrfi:requestText>\n" +
    "  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et" +
    " dolore" +
    "          magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea" +
    " commodo" +
    "          consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat " +
    "nulla" +
    "          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit " +
    "anim id es" +
    "          laborum." +
    "        </getsrfi:requestText>\n" +
    "        <gets:url>http://www.aol.com</gets:url>\n" +
    "        <getsrfi:primaryOrganization>DGS-1</getsrfi:primaryOrganization>\n" +
    "        <gets:lastUpdate>2019-11-12T14:21:23Z</gets:lastUpdate>\n" +
    "        <getsrfi:RequestingPOC>\n" +
    "          <gets:unit>633d ABW</gets:unit>\n" +
    "        </getsrfi:RequestingPOC>\n" +
    "        <gets:CountryCodeList>\n" +
    "          <gets:iso1366trigraph>CAN</gets:iso1366trigraph>\n" +
    "        </gets:CountryCodeList>\n" +
    "      </getsrfi:Request>\n" +
    "      <getsrfi:ResponseList>\n" +
    "        <getsrfi:Response id=\"633-ABW-2020-00333\" orgid=\"DGS-1\">\n" +
    "          <gets:producerOrganizationID>DGS-1</gets:producerOrganizationID>\n" +
    "          <getsrfi:responseStatus>NEW</getsrfi:responseStatus>\n" +
    "        </getsrfi:Response>\n" +
    "      </getsrfi:ResponseList>\n" +
    "    </getsrfi:RequestForInformation>\n" +
    "    <getsrfi:RequestForInformation id=\"DGS-1-SDT-2020-00334\">\n" +
    "      <getsrfi:Request id=\"DGS-1-SDT-2020-00334\">\n" +
    "        <getsrfi:requestText>\n" +
    "  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et" +
    " dolore" +
    "          magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea" +
    " commodo" +
    "          consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat " +
    "nulla" +
    "          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit " +
    "anim id es" +
    "          laborum." +
    "  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et" +
    " dolore" +
    "          magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea" +
    " commodo" +
    "          consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat " +
    "nulla" +
    "          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit " +
    "anim id es" +
    "          laborum." +
    "  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et" +
    " dolore" +
    "          magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea" +
    " commodo" +
    "          consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat " +
    "nulla" +
    "          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit " +
    "anim id es" +
    "          laborum." +
    "  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et" +
    " dolore" +
    "          magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea" +
    " commodo" +
    "          consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat " +
    "nulla" +
    "          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit " +
    "anim id es" +
    "          laborum." +
    "  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et" +
    " dolore" +
    "          magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea" +
    " commodo" +
    "          consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat " +
    "nulla" +
    "          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit " +
    "anim id es" +
    "          laborum." +
    "  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et" +
    " dolore" +
    "          magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea" +
    " commodo" +
    "          consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat " +
    "nulla" +
    "          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit " +
    "anim id es" +
    "          laborum." +
    "  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et" +
    " dolore" +
    "          magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea" +
    " commodo" +
    "          consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat " +
    "nulla" +
    "          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit " +
    "anim id es" +
    "          laborum." +
    "  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et" +
    " dolore" +
    "          magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea" +
    " commodo" +
    "          consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat " +
    "nulla" +
    "          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit " +
    "anim id es" +
    "          laborum." +
    "  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et" +
    " dolore" +
    "          magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea" +
    " commodo" +
    "          consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat " +
    "nulla" +
    "          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit " +
    "anim id es" +
    "          laborum." +
    "        </getsrfi:requestText>\n" +
    "        <gets:url>http://www.msn.com</gets:url>\n" +
    "        <getsrfi:primaryOrganization>DGS-1</getsrfi:primaryOrganization>\n" +
    "        <gets:lastUpdate>2019-11-10T14:21:24Z</gets:lastUpdate>\n" +
    "        <getsrfi:RequestingPOC>\n" +
    "          <gets:unit>633d ABW</gets:unit>\n" +
    "        </getsrfi:RequestingPOC>\n" +
    "        <gets:CountryCodeList>\n" +
    "          <gets:iso1366trigraph>USA</gets:iso1366trigraph>\n" +
    "        </gets:CountryCodeList>\n" +
    "      </getsrfi:Request>\n" +
    "      <getsrfi:ResponseList>\n" +
    "        <getsrfi:Response id=\"DGS-1-SDT-2020-00334\" orgid=\"633 ABW\">\n" +
    "          <gets:producerOrganizationID>633 ABW</gets:producerOrganizationID>\n" +
    "          <getsrfi:responseStatus>OPEN</getsrfi:responseStatus>\n" +
    "        </getsrfi:Response>\n" +
    "        <getsrfi:Response id=\"DGS-1-SDT-2020-00334\" orgid=\"DGS-1\">\n" +
    "          <gets:producerOrganizationID>DGS-1</gets:producerOrganizationID>\n" +
    "          <getsrfi:responseStatus>NEW</getsrfi:responseStatus>\n" +
    "        </getsrfi:Response>\n" +
    "      </getsrfi:ResponseList>\n" +
    "    </getsrfi:RequestForInformation>\n" +
    "    <getsrfi:RequestForInformation id=\"DGS-1-SDT-2020-00335\">\n" +
    "      <getsrfi:Request id=\"DGS-1-SDT-2020-00335\">\n" +
    "        <getsrfi:requestText>\n" +
    "  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et" +
    " dolore" +
    "          magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea" +
    " commodo" +
    "          consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat " +
    "nulla" +
    "          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit " +
    "anim id es" +
    "          laborum." +
    "        </getsrfi:requestText>\n" +
    "        <gets:url>http://www.ask.com</gets:url>\n" +
    "        <getsrfi:primaryOrganization>DGS-1</getsrfi:primaryOrganization>\n" +
    "        <gets:lastUpdate>2019-11-12T14:21:25Z</gets:lastUpdate>\n" +
    "        <getsrfi:RequestingPOC>\n" +
    "          <gets:unit>633d ABW</gets:unit>\n" +
    "        </getsrfi:RequestingPOC>\n" +
    "        <gets:CountryCodeList>\n" +
    "          <gets:iso1366trigraph>MEX</gets:iso1366trigraph>\n" +
    "        </gets:CountryCodeList>\n" +
    "        <gets:ltiov>2019-11-30T14:21:21Z</gets:ltiov>\n" +
    "      </getsrfi:Request>\n" +
    "      <getsrfi:ResponseList>\n" +
    "        <getsrfi:Response id=\"DGS-1-SDT-2020-00335\" orgid=\"DGS-1\">\n" +
    "          <gets:producerOrganizationID>DGS-1</gets:producerOrganizationID>\n" +
    "          <getsrfi:responseStatus>OPEN</getsrfi:responseStatus>\n" +
    "        </getsrfi:Response>\n" +
    "      </getsrfi:ResponseList>\n" +
    "    </getsrfi:RequestForInformation>\n" +
    "    <getsrfi:RequestForInformation id=\"DGS-1-SDT-2020-00336\">\n" +
    "      <getsrfi:Request id=\"DGS-1-SDT-2020-00336\">\n" +
    "        <getsrfi:requestText>\n" +
    "  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et" +
    " dolore" +
    "          magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea" +
    " commodo" +
    "          consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat " +
    "nulla" +
    "          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit " +
    "anim id es" +
    "          laborum." +
    "        </getsrfi:requestText>\n" +
    "        <gets:url>http://www.google.com</gets:url>\n" +
    "        <getsrfi:primaryOrganization>DGS-1</getsrfi:primaryOrganization>\n" +
    "        <gets:lastUpdate>2019-10-16T20:21:26Z</gets:lastUpdate>\n" +
    "        <getsrfi:RequestingPOC>\n" +
    "          <gets:unit>1 FW</gets:unit>\n" +
    "        </getsrfi:RequestingPOC>\n" +
    "        <gets:CountryCodeList>\n" +
    "          <gets:iso1366trigraph>CAN</gets:iso1366trigraph>\n" +
    "        </gets:CountryCodeList>\n" +
    "      </getsrfi:Request>\n" +
    "      <getsrfi:ResponseList>\n" +
    "        <getsrfi:Response id=\"DGS-1-SDT-2020-00336\" orgid=\"DGS-1\">\n" +
    "          <gets:producerOrganizationID>DGS-1</gets:producerOrganizationID>\n" +
    "          <getsrfi:responseStatus>OPEN</getsrfi:responseStatus>\n" +
    "        </getsrfi:Response>\n" +
    "      </getsrfi:ResponseList>\n" +
    "    </getsrfi:RequestForInformation>\n" +
    "  </RFIList>\n" +
    "</GETS_RFI_Query_Results>";

  //language=xml
  private String xmlClosed = "<GETS_RFI_Query_Results xmlns=\"GETS\">\n" +
    "<RFIList>\n" +
    "  <getsrfi:RequestForInformation id=\"DGS-1-SDT-2020-00327\">\n" +
    "    <getsrfi:Request id=\"DGS-1-SDT-2020-00327\">\n" +
    "      <getsrfi:requestText>\n" +
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et " +
    "dolore" +
    "        magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea " +
    "commodo" +
    "        consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat " +
    "nulla" +
    "        pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim" +
    " id est" +
    "        laborum." +
    "      </getsrfi:requestText>\n" +
    "      <gets:url>http://www.yahoo.com</gets:url>\n" +
    "      <getsrfi:primaryOrganization>DGS-1</getsrfi:primaryOrganization>\n" +
    "      <gets:lastUpdate>2019-10-16T01:21:27Z</gets:lastUpdate>\n" +
    "      <getsrfi:RequestingPOC>\n" +
    "        <gets:unit>1 FW</gets:unit>\n" +
    "      </getsrfi:RequestingPOC>\n" +
    "      <gets:CountryCodeList>\n" +
    "        <gets:iso1366trigraph>USA</gets:iso1366trigraph>\n" +
    "      </gets:CountryCodeList>\n" +
    "    </getsrfi:Request>\n" +
    "    <getsrfi:ResponseList>\n" +
    "      <getsrfi:Response id=\"DGS-1-SDT-2020-00327\" orgid=\"DGS-1\">\n" +
    "        <gets:producerOrganizationID>DGS-1</gets:producerOrganizationID>\n" +
    "        <getsrfi:responseStatus>CLOSED</getsrfi:responseStatus>\n" +
    "      </getsrfi:Response>\n" +
    "    </getsrfi:ResponseList>\n" +
    "  </getsrfi:RequestForInformation>\n" +
    "  <getsrfi:RequestForInformation id=\"DGS-1-SDT-2020-00328\">\n" +
    "    <getsrfi:Request id=\"DGS-1-SDT-2020-00328\">\n" +
    "      <getsrfi:requestText>\n" +
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et " +
    "dolore" +
    "        magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea " +
    "commodo" +
    "        consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat " +
    "nulla" +
    "        pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim" +
    " id est" +
    "        laborum." +
    "      </getsrfi:requestText>\n" +
    "      <gets:url>http://www.aol.com</gets:url>\n" +
    "      <getsrfi:primaryOrganization>DGS-1</getsrfi:primaryOrganization>\n" +
    "      <gets:lastUpdate>2019-10-20T14:21:28Z</gets:lastUpdate>\n" +
    "      <getsrfi:RequestingPOC>\n" +
    "        <gets:unit>1 FW</gets:unit>\n" +
    "      </getsrfi:RequestingPOC>\n" +
    "      <gets:CountryCodeList>\n" +
    "        <gets:iso1366trigraph>USA</gets:iso1366trigraph>\n" +
    "      </gets:CountryCodeList>\n" +
    "      <gets:ltiov>2019-11-05T14:21:21Z</gets:ltiov>\n" +
    "    </getsrfi:Request>\n" +
    "    <getsrfi:ResponseList>\n" +
    "      <getsrfi:Response id=\"DGS-1-SDT-2020-00328\" orgid=\"DGS-1\">\n" +
    "        <gets:producerOrganizationID>DGS-1</gets:producerOrganizationID>\n" +
    "        <getsrfi:responseStatus>CLOSED</getsrfi:responseStatus>\n" +
    "      </getsrfi:Response>\n" +
    "    </getsrfi:ResponseList>\n" +
    "  </getsrfi:RequestForInformation>\n" +
    "  <getsrfi:RequestForInformation id=\"DGS-1-SDT-2020-00329\">\n" +
    "    <getsrfi:Request id=\"DGS-1-SDT-2020-00329\">\n" +
    "      <getsrfi:requestText>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et " +
    "dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea " +
    "commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat " +
    "nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim" +
    " id est laborum.</getsrfi:requestText>\n" +
    "      <gets:url>http://www.msn.com</gets:url>\n" +
    "      <getsrfi:primaryOrganization>DGS-1</getsrfi:primaryOrganization>\n" +
    "      <gets:lastUpdate>2018-03-16T14:21:29Z</gets:lastUpdate>\n" +
    "      <getsrfi:RequestingPOC>\n" +
    "        <gets:unit>1 FW</gets:unit>\n" +
    "      </getsrfi:RequestingPOC>\n" +
    "      <gets:CountryCodeList>\n" +
    "        <gets:iso1366trigraph>MEX</gets:iso1366trigraph>\n" +
    "      </gets:CountryCodeList>\n" +
    "    </getsrfi:Request>\n" +
    "    <getsrfi:ResponseList>\n" +
    "      <getsrfi:Response id=\"DGS-1-SDT-2020-00329\" orgid=\"633 ABW\">\n" +
    "        <gets:producerOrganizationID>633 ABW</gets:producerOrganizationID>\n" +
    "        <getsrfi:responseStatus>OPEN</getsrfi:responseStatus>\n" +
    "      </getsrfi:Response>\n" +
    "      <getsrfi:Response id=\"DGS-1-SDT-2020-00329\" orgid=\"DGS-1\">\n" +
    "        <gets:producerOrganizationID>DGS-1</gets:producerOrganizationID>\n" +
    "        <getsrfi:responseStatus>CLOSED</getsrfi:responseStatus>\n" +
    "      </getsrfi:Response>\n" +
    "    </getsrfi:ResponseList>\n" +
    "  </getsrfi:RequestForInformation>\n" +
    "  <getsrfi:RequestForInformation id=\"DGS-1-SDT-2020-00330\">\n" +
    "    <getsrfi:Request id=\"DGS-1-SDT-2020-00330\">\n" +
    "      <getsrfi:requestText>\n" +
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et " +
    "dolore" +
    "        magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea " +
    "commodo" +
    "        consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat " +
    "nulla" +
    "        pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim" +
    " id est" +
    "        laborum." +
    "      </getsrfi:requestText>\n" +
    "      <gets:url>http://www.ask.com</gets:url>\n" +
    "      <getsrfi:primaryOrganization>DGS-1</getsrfi:primaryOrganization>\n" +
    "      <gets:lastUpdate>2017-10-01T14:21:30Z</gets:lastUpdate>\n" +
    "      <getsrfi:RequestingPOC>\n" +
    "        <gets:unit>1 FW</gets:unit>\n" +
    "      </getsrfi:RequestingPOC>\n" +
    "      <gets:CountryCodeList>\n" +
    "        <gets:iso1366trigraph>CAN</gets:iso1366trigraph>\n" +
    "      </gets:CountryCodeList>\n" +
    "    </getsrfi:Request>\n" +
    "    <getsrfi:ResponseList>\n" +
    "      <getsrfi:Response id=\"DGS-1-SDT-2020-00330\" orgid=\"DGS-1\">\n" +
    "        <gets:producerOrganizationID>DGS-1</gets:producerOrganizationID>\n" +
    "        <getsrfi:responseStatus>CLOSED</getsrfi:responseStatus>\n" +
    "      </getsrfi:Response>\n" +
    "    </getsrfi:ResponseList>\n" +
    "  </getsrfi:RequestForInformation>\n" +
    "  <getsrfi:RequestForInformation id=\"DGS-1-SDT-2020-00331\">\n" +
    "    <getsrfi:Request id=\"DGS-1-SDT-2020-00331\">\n" +
    "        <getsrfi:requestText>this is a test</getsrfi:requestText>\n" +
    "      <gets:url>http://www.ask.com</gets:url>\n" +
    "      <getsrfi:primaryOrganization>DGS-1</getsrfi:primaryOrganization>\n" +
    "      <gets:lastUpdate>2019-07-01T14:21:30Z</gets:lastUpdate>\n" +
    "      <getsrfi:RequestingPOC>\n" +
    "        <gets:unit>1 FW</gets:unit>\n" +
    "      </getsrfi:RequestingPOC>\n" +
    "      <gets:CountryCodeList>\n" +
    "        <gets:iso1366trigraph>CAN</gets:iso1366trigraph>\n" +
    "      </gets:CountryCodeList>\n" +
    "      <gets:ltiov>2019-07-01T14:21:30Z</gets:ltiov>\n" +
    "    </getsrfi:Request>\n" +
    "    <getsrfi:ResponseList>\n" +
    "      <getsrfi:Response id=\"DGS-1-SDT-2020-00330\" orgid=\"DGS-1\">\n" +
    "        <gets:producerOrganizationID>DGS-1</gets:producerOrganizationID>\n" +
    "        <getsrfi:responseStatus>CLOSED</getsrfi:responseStatus>\n" +
    "      </getsrfi:Response>\n" +
    "    </getsrfi:ResponseList>\n" +
    "  </getsrfi:RequestForInformation>\n" +
    "</RFIList>\n" +
    "</GETS_RFI_Query_Results>";
}
