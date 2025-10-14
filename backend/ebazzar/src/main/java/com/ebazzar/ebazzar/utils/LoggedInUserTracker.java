package com.ebazzar.ebazzar.utils;

import java.util.HashMap;
import java.util.Map;

import javax.crypto.SecretKey;

import com.ebazzar.ebazzar.models.dao.Acount;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;

import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;

public class LoggedInUserTracker {
    private SecretKey jwtSecretKey = Keys.secretKeyFor(SignatureAlgorithm.HS256);

    private Map<String, Acount> loggedInUsers = new HashMap<>();

    private String generateToken(Acount account) {
        String token = io.jsonwebtoken.Jwts.builder()
                .setClaims(new ObjectMapper().convertValue(account, new TypeReference<Map<String, Object>>() {}))
                .signWith(jwtSecretKey)
                .compact();
        return token;
    }

    private Acount parseToken(String token) {
        try {
            Map<String, Object> claims = io.jsonwebtoken.Jwts.parserBuilder()
                    .setSigningKey(jwtSecretKey)
                    .build()
                    .parseClaimsJws(token)
                    .getBody();
            return new ObjectMapper().convertValue(claims, Acount.class);
        } catch (Exception e) {
            throw new RuntimeException("Error parsing jwt token(check parser logic in LoggedInUserTracker)", e);
        }
    }
}
