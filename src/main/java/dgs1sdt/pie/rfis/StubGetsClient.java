package dgs1sdt.pie.rfis;

import org.springframework.core.io.ClassPathResource;
import org.springframework.stereotype.Service;
import org.springframework.test.context.ActiveProfiles;
import org.w3c.dom.Document;

import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.DocumentBuilderFactory;
import java.net.URL;

@Service
@ActiveProfiles("test")
public class StubGetsClient implements GetsClient {
  @Override
  public Document rfiResponseDocument(String uri) throws Exception {
    DocumentBuilderFactory dbf = DocumentBuilderFactory.newInstance();
    DocumentBuilder db = dbf.newDocumentBuilder();
    if (uri.contains("xml")) {
      return db.parse(new ClassPathResource(uri).getInputStream());
    }
    return db.parse(new URL(uri).openStream());
  }
}
