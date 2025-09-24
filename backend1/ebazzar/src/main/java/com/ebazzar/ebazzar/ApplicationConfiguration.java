package com.ebazzar.ebazzar;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import com.ebazzar.utils.Context;

@Configuration
public class ApplicationConfiguration {

    @Bean
    public Context context() {
        return new Context();
    }

}
