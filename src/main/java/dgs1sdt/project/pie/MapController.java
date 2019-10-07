package dgs1sdt.project.pie;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

@RestController
@RequestMapping(MapController.URI)
public class MapController {
  static final String URI = "/api/map";
  @GetMapping
  public String map() {
    final String uri = "https://ec2-96-127-73-112.us-gov-west-1.compute.amazonaws" +
      ".com/wami-soa-server/wami/CS?SERVICE=CS&VERSION=1.0.1&REQUEST=GetCapabilities";
    RestTemplate restTemplate = new RestTemplate();
    return restTemplate.getForObject(uri, String.class);
  }
}
