package dgs1sdt.project.pie.Interfaces;

import org.w3c.dom.Document;

public interface GetsClient {
    Document getRfis() throws Exception;

    Document makeRequest(String uri) throws Exception;
}
