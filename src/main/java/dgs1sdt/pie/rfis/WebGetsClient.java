package dgs1sdt.pie.rfis;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.ClassPathResource;
import org.w3c.dom.Document;
import org.w3c.dom.Node;
import org.w3c.dom.NodeList;

import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.DocumentBuilderFactory;
import java.net.URL;
import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

public class WebGetsClient implements GetsClient {
  @Value("${GETS_REQUEST_TIME_FRAME_IN_DAYS}")
  private int requestDays;

  private static String calculateDateStringDaysBeforeNow(int days) {
    SimpleDateFormat dateFormat = new SimpleDateFormat("yyyyMMdd");
    LocalDate date = LocalDate.now().minusDays(days);
    return dateFormat.format(date);
  }

  @Override
  public Document rfiResponseDocument(String uri) throws Exception {
    DocumentBuilderFactory dbf = DocumentBuilderFactory.newInstance();
    DocumentBuilder db = dbf.newDocumentBuilder();
    if (uri.contains("xml")) {
      return db.parse(new ClassPathResource(uri).getInputStream());
    }
    if (uri.contains("&mincloseDate=")) {
      uri += calculateDateStringDaysBeforeNow(requestDays);
    }
    return db.parse(new URL(uri).openStream());
  }
}
