package dgs1sdt.project.pie.gets;

import dgs1sdt.project.pie.Interfaces.GetsClient;
import dgs1sdt.project.pie.rfi.RfiModel;
import org.springframework.stereotype.Service;
import org.springframework.test.context.ActiveProfiles;
import org.w3c.dom.Document;

import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.DocumentBuilderFactory;
import java.io.InputStream;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.ArrayList;
import java.util.List;

@Service
@ActiveProfiles("prod")
public class WebGetsClient implements GetsClient {

    private String getsBaseURL = "${GETS_URL}";


    @Override
    public Document getRfis() throws Exception {
        List<RfiModel> rfiList = new ArrayList<>();
        String uri = getsBaseURL;
        System.out.println("requesting from site: " + getsBaseURL);
        return this.makeRequest(uri);
    }

    @Override
    public Document makeRequest(String uri) throws Exception {
      System.out.println("making request to GETS!!! in prod env");
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
