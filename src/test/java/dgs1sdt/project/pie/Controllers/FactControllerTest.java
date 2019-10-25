package dgs1sdt.project.pie.Controllers;

import dgs1sdt.project.pie.BaseIntegrationTest;
import dgs1sdt.project.pie.fact.Fact;
import dgs1sdt.project.pie.fact.FactRepository;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.boot.web.server.LocalServerPort;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.junit4.SpringRunner;

import static org.assertj.core.api.Assertions.assertThat;

@ActiveProfiles("test")
@RunWith(SpringRunner.class)
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
public class FactControllerTest extends BaseIntegrationTest {

  @LocalServerPort
  private int port;

  @Autowired
  private TestRestTemplate restTemplate;

  @Autowired
  private FactRepository factRepository;

  @Test
  public void getFact() throws Exception {
    Fact fact = new Fact("your fact goes here");
    factRepository.save(fact);

    assertThat(
      this.restTemplate.getForObject("http://localhost:" + port + "/api/fact", String.class))
      .contains("your fact goes here");
  }

  @Test
  public void hibernateAndSpringWiredCorrectly() {
    Fact fact = new Fact("your fact goes here");
    factRepository.save(fact);
    Fact found = factRepository.findAll().get(0);

    assertThat(found.getContent()).isEqualTo(fact.getContent());
  }
}
