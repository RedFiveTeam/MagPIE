package dgs1sdt.project.pie.gets;

import dgs1sdt.project.pie.Interfaces.GetsClient;
import dgs1sdt.project.pie.rfi.Rfi;
import dgs1sdt.project.pie.rfi.RfiRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


@RestController
@RequestMapping(GetsController.URI)
public class GetsController {

  @Autowired
  GetsClient getsClient;

  @Autowired
  GetsService getsService;

  @Autowired
  RfiRepository rfiRepository;

  @Autowired
  StubGetsClient stubGetsClient;

  @Value("${PROFILE}")
  String profile = System.getenv("PROFILE");


  public static final String URI = "/api/gets";


  @GetMapping(produces = "application/json", path = "/rfis")
  public Iterable<Rfi> getall() throws Exception {
    switch (profile) {
      case "dev":
        System.out.println("returning data with profile: " + profile);
        return rfiRepository.findAll();
      case "test":
        System.out.println("returning data with profile: " + profile);
        return this.getsService.getRfis(stubGetsClient.getRfis());
      case "prod":
        System.out.println("returning data with default profile: " + profile);
        return this.getsService.getRfis(getsClient.getRfis());
      default:
        System.out.println("returning data with default profile: " + profile);
        return this.getsService.getRfis(getsClient.getRfis());
    }
  }
}


