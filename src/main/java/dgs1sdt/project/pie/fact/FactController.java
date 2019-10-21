package dgs1sdt.project.pie.fact;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Random;

@RestController
@RequestMapping(FactController.URI)
public class FactController {
  static final String URI = "/api/fact";
  @Autowired
  private FactRepository factRepository;
  @GetMapping
  public String fact() {
    List<Fact> facts = factRepository.findAll();
    if (facts.size() == 0) {
      return "I'm proud of you!";
    }
    int factId = (new Random().nextInt(facts.size()));
    return facts.get(factId).getContent();
  }


}
