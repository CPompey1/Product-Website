package com.ebazzar.dao.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.stereotype.Repository;

import com.ebazzar.ApplicationProperties.Accounts.Status;
import com.ebazzar.dao.interfaces.AccountDao;
import com.ebazzar.models.dao.Account;
import com.ebazzar.utils.Context;

import at.favre.lib.crypto.bcrypt.BCrypt;

@Repository
public class AccountDaoMongoImpl implements AccountDao {

    private final MongoTemplate mongoTemplate;
    private final Context context;
    @Autowired
    public AccountDaoMongoImpl(MongoTemplate mongoTemplate, Context context) {
        this.mongoTemplate = mongoTemplate;
        this.context = context;
    }

    @Override
    public Status registerAccount(String email, String password) {
        Query query = new Query();
        query.addCriteria(Criteria.where("email").is(email));
        if (mongoTemplate.exists(query, "accounts")) {
            return Status.REGISTER_FAILED; 
        }
        Account account = Account.builder()
                .email(email)
                .password_hash(BCrypt.withDefaults().hashToString(12, password.toCharArray()))
                .build();
        mongoTemplate.save(account);

        // Implement MongoDB specific registration logic
        return Status.REGISTER_SUCCESS;
    }

    @Override
    public Status loginAccount(String email, String password) {
        // Implement MongoDB specific login logic
        Query query = new Query();
        query.addCriteria(Criteria.where("email").is(email));
        Account account = mongoTemplate.findOne(query, Account.class);
        if (account == null || !BCrypt.verifyer().verify(password.toCharArray(), account.getPassword_hash()).verified) {
            return Status.LOGIN_FAILED; 
        }
        return Status.LOGIN_SUCCESS;
    }

}
