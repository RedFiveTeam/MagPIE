package dgs1sdt.pie.rfis;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.ClassPathResource;
import org.w3c.dom.Document;

import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.DocumentBuilderFactory;
import java.net.URL;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;

public class WebGetsClient implements GetsClient {
  @Value("${GETS_REQUEST_TIME_FRAME_IN_DAYS}")
  private int requestDays;

  private static String calculateDateStringDaysBeforeNow(int days) {
    DateTimeFormatter dateFormat = DateTimeFormatter.ofPattern("yyyyMMdd");
    LocalDate localDate = LocalDate.now().minusDays(days);
    return dateFormat.format(localDate);
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
