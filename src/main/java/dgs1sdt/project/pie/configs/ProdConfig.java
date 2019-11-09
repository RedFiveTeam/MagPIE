package dgs1sdt.project.pie.configs;

import dgs1sdt.project.pie.rfi.GETSClient;
import dgs1sdt.project.pie.rfi.WebGETSClient;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;
import org.springframework.stereotype.Component;

@Component
@Profile("prod")
@Configuration
public class ProdConfig {
    @Bean
    public GETSClient getsClient(@Value("${GETS_URL}") String uri) {
        return new WebGETSClient(uri);
    }
}