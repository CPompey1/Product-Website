package com.ebazzar.utils;

import java.util.HashMap;
import java.util.Map;

import org.springframework.stereotype.Component;

import lombok.Data;

@Data
@Component
public class Context {
    private Map<String, Object> data;

    public Context() {
        this.data = new HashMap<>();
    }
}
