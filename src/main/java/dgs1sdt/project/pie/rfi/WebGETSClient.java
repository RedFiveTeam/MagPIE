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
    NodeList htmlRFIs = document.getElementsByTagName("getsrfi:RFISummary");


    extractElements(rfiList, htmlRFIs);

    String minDate;
    SimpleDateFormat dateFormat = new SimpleDateFormat("yyyMMdd");
    Date date = new Date();
    date.setTime(date.getTime() - 5256000000L);

    minDate = dateFormat.format(date);

    document = this.makeRequest(uri + "&status=CLOSED&mincloseDate=" + minDate);
    htmlRFIs = document.getElementsByTagName("getsrfi:RFISummary");

    List<RFI> closedRfiList = new ArrayList<>();

    extractElements(closedRfiList, htmlRFIs);

    Collections.sort(closedRfiList, new SortByRecentFirst());

    for (int i = 0; i < 3 && i < closedRfiList.size(); i++)
      rfiList.add(closedRfiList.get(i));

    Collections.sort(rfiList, new SortByIDGreatestToLeast());


    return rfiList;
  }

  private void extractElements(List<RFI> rfiList, NodeList htmlRFIs) throws Exception {
    StubGETSClient.extractElements(rfiList, htmlRFIs);
  }


  private Document makeRequest(String uri) throws Exception {
    System.out.println(uri);
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
