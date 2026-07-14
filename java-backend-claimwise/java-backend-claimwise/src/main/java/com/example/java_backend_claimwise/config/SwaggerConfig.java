package com.example.java_backend_claimwise.config;

import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class SwaggerConfig {

    @Bean
    public OpenAPI claimWiseOpenAPI(){
        return new OpenAPI().info(new Info()
                .title("ClaimWise")
                .description("ClaimWise API")
                .version("1.0"));
    }
}
