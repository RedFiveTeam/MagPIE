package dgs1sdt.pie.rfis;

import org.w3c.dom.Document;

public interface GetsClient {
  Document rfiResponseDocument(String uri) throws Exception;
}
