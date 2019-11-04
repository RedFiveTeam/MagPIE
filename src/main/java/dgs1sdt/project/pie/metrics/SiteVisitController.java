package dgs1sdt.project.pie.metrics;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Date;

@RestController
@RequestMapping(SiteVisitController.URI)
public class SiteVisitController {
  public static final String URI = "/api/site-visit";

  private SiteVisitRepository siteVisitRepository;

  public SiteVisitController(SiteVisitRepository siteVisitRepository) {
    this.siteVisitRepository = siteVisitRepository;
  }

  @GetMapping
  public Long getSiteVisitCount() throws Exception {
    return siteVisitRepository.count();
  }

  @PostMapping
  public void logSiteVisit() {
    SiteVisit siteVisit = new SiteVisit(new Date());
    this.siteVisitRepository.save(siteVisit);
  }

}
