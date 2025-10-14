package com.ebazzar.ebazzar.utils;

import java.util.HashMap;
import java.util.Map;

import org.springframework.stereotype.Component;

@Component
public class Context {
    private final Map<String, Object> data;

    public Context() {
        this.data = new HashMap<>();
    }

    public void set(String key, Object value) {
        data.put(key, value);
    }
    public Object get(String key) {
        return data.get(key);
    }
}
