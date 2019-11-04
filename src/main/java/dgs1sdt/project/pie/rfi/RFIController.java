package dgs1sdt.project.pie.rfi;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;


@RestController
@RequestMapping(RFIController.URI)
public class RFIController {
  public static final String URI = "/api/rfis";

  @Autowired
  private GETSClient getsClient;

  public RFIController(GETSClient getsClient) {
    this.getsClient = getsClient;
  }

  @GetMapping
  public List<RFI> getAllRFIs() throws Exception {
    return this.getsClient.getRFIs();
  }
}
