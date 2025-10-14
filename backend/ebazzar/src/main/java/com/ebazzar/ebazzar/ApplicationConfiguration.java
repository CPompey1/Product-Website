package com.ebazzar.ebazzar;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import com.ebazzar.ebazzar.utils.Context;



@Configuration
public class ApplicationConfiguration {

    @Value("${JWT_SALT}") // Injects the value of the environment variable named MY_ENV_VAR
    private String JWT_SALT;

    @Bean
    public Context context() {
        return new Context();
    }

    

}
