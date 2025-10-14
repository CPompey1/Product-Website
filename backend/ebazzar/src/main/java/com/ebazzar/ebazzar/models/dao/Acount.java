package com.ebazzar.ebazzar.models.dao;

import org.springframework.data.mongodb.core.mapping.Document;

import lombok.Builder;
import lombok.Data;

@Data
@Document(collection = "accounts")
@Builder
public class Acount {
    private String id;
    private String email;
    private String password_hash;

}
