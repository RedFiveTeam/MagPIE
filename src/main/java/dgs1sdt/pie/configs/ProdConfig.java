package dgs1sdt.pie.configs;

import dgs1sdt.pie.rfis.GetsClient;
import dgs1sdt.pie.rfis.WebGetsClient;
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
    public GetsClient getsClient() {
        return new WebGetsClient();
    }
}
