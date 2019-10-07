package dgs1sdt.project.pie.rfi;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

@RestController
@RequestMapping(RFIController.URI)
public class RFIController {
  static final String URI = "/api/rfi";

  @GetMapping
  public String rfi() {
    final String uri = "https://www.gets.agi.nga.smil.mil/" +
      "action.REST/rfiService/2.2.4/queryRFIs?taskedOrgid=DGS-1";
    RestTemplate restTemplate = new RestTemplate();
    return restTemplate.getForObject(uri, String.class);
  }
}
