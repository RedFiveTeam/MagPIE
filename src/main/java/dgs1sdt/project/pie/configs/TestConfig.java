package dgs1sdt.project.pie.configs;

import dgs1sdt.project.pie.rfi.GETSClient;
import dgs1sdt.project.pie.rfi.StubGETSClient;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;
import org.springframework.stereotype.Component;

@Component
@Profile("test")
@Configuration
public class TestConfig {
  @Bean
  public GETSClient getsClient() {
    return new StubGETSClient();
  }
}
