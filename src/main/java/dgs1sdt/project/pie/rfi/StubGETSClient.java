package dgs1sdt.project.pie.rfi;

import org.springframework.stereotype.Service;
import org.springframework.test.context.ActiveProfiles;

import java.util.Arrays;
import java.util.List;

@Service
@ActiveProfiles("test")
public class StubGETSClient implements GETSClient {
    @Override
    public List<RFI> getRFIs() throws Exception {
      return Arrays.asList(
        new RFI("2019-00111", "http://www.google.com"),
        new RFI("2020-00222", "http://www.yahoo.com")
      );
    }
}
