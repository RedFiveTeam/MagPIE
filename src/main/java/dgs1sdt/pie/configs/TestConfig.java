package dgs1sdt.pie.configs;

import dgs1sdt.pie.rfis.GetsClient;
import dgs1sdt.pie.rfis.StubGetsClient;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;
import org.springframework.stereotype.Component;

@Component
@Profile("test")
@Configuration
public class TestConfig {
  @Bean
  public GetsClient getsClient() {
    return new StubGetsClient();
  }
}
