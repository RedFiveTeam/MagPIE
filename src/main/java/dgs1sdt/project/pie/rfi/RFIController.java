package dgs1sdt.project.pie.rfi;

import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

import java.io.UnsupportedEncodingException;
import java.nio.charset.StandardCharsets;
import java.util.Base64;


@RestController
@RequestMapping(RFIController.URI)
public class RFIController {
  static final String URI = "/api/rfi";

  @GetMapping(produces = "application/xml", path = "/{urlString}")
  public String rfi(@PathVariable String urlString) throws UnsupportedEncodingException {
//    System.out.println("new Api String: " + urlString);

    Base64.Decoder decoder = Base64.getDecoder();
    byte[] decodedByte = decoder.decode(urlString);
    final String decodedString = new String(decodedByte);
    System.out.println(decodedString);  // Outputs: "Highlight"

//      urlString.replace("_", "/").replace("!","?").replace("*","=").replace("$","&");
    RestTemplate restTemplate = new RestTemplate();
    return restTemplate.getForObject(decodedString, String.class);
  }
//  "https://www.gets.agi.nga.smil.mil/" +
//      "action/REST/rfiService/2.2.4/queryRFIs?taskedOrgid=DGS-1";
}
