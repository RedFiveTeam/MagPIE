package dgs1sdt.pie.rfis;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;


@RestController
@RequestMapping(RfiController.URI)
public class RfiController {
  public static final String URI = "/api/rfis";

  @Value("${GETS_URI_OPEN_PENDING}")
  private String getsUriOpenPending;

  @Value("${GETS_URI_CLOSED}")
  private String getsUriClosed;

  @Autowired
  private RfiService rfiService;

  public RfiController(RfiService rfiService) {
    this.rfiService = rfiService;
  }

  @GetMapping
  public List<Rfi> getAllRfis() throws Exception {
    String[] uris = {getsUriOpenPending, getsUriClosed};
    return this.rfiService.fetchRfis(uris);
  }
}
