package dgs1sdt.project.pie.rfi;

import dgs1sdt.project.pie.Interfaces.GetsClient;
import dgs1sdt.project.pie.gets.GetsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.*;
import java.util.List;


@RestController
@RequestMapping(RFIController.URI)
public class RFIController {

  public static final String URI = "/api/gets";


  @Value("${GETS_URL}")
  private String getsBaseURL;


  @Autowired
  RfiRepository rfiRepository;

  @GetMapping(produces = "application/json", path = "/rfis")

    public List<RfiModel> rfis() throws Exception {
    return rfiRepository.findAll();
  }





//  @GetMapping(produces = "application/xml", path = "/{urlString}")
//  public String rfi(@PathVariable String urlString) throws UnsupportedEncodingException {

    //    System.out.println("new Api String: " + urlString);

//    Base64.Decoder decoder = Base64.getDecoder();
//    byte[] decodedByte = decoder.decode(urlString);
//    final String decodedString = new String(decodedByte);
//    System.out.println(decodedString);  // Outputs: "Highlight"

//      urlString.replace("_", "/").replace("!","?").replace("*","=").replace("$","&");
//    RestTemplate restTemplate = new RestTemplate();
//    return restTemplate.getForObject(decodedString, String.class);

//  "https://www.gets.agi.nga.smil.mil/" +
//      "action/REST/rfiService/2.2.4/queryRFIs?taskedOrgid=DGS-1";
}
