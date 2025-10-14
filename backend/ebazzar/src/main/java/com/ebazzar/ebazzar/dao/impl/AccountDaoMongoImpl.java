package com.ebazzar.ebazzar.dao.impl;

import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.stereotype.Repository;

import static com.ebazzar.ApplicationProperties.Accounts.ACCOUNT;
import com.ebazzar.ApplicationProperties.Accounts.Status;
import com.ebazzar.ebazzar.dao.interfaces.AccountDao;
import com.ebazzar.ebazzar.models.dao.Acount;
import com.ebazzar.ebazzar.utils.Context;

import at.favre.lib.crypto.bcrypt.BCrypt;

@Repository
public class AccountDaoMongoImpl implements AccountDao {

    private final MongoTemplate mongoTemplate;
    private final Context context;
    
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
        Acount account = Acount.builder()
                .email(email)
                .password_hash(BCrypt.withDefaults().hashToString(12, password.toCharArray()))
                .build();
        mongoTemplate.save(account);

        // Implement MongoDB specific registration logic
        return Status.SUCCESS;
    }

    @Override
    public Status loginAccount(String email, String password) {
        // Implement MongoDB specific login logic
        Query query = new Query();
        query.addCriteria(Criteria.where("email").is(email));
        Acount account = mongoTemplate.findOne(query, Acount.class);
        if (account == null || !BCrypt.verifyer().verify(password.toCharArray(), account.getPassword_hash()).verified) {
            return Status.LOGIN_FAILED; 
        }
        context.set(ACCOUNT, account);
        return Status.LOGIN_SUCCESS;
    }

    @Override
    public Status deleteAccount(String email) {
        Query query = new Query();
        query.addCriteria(Criteria.where("email").is(email));
        if (!mongoTemplate.exists(query, "accounts")) {
            return Status.USER_NOT_FOUND;
        }
        mongoTemplate.remove(query, "accounts");
        return Status.SUCCESS;
    }

}
