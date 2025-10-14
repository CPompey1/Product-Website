package com.ebazzar.dao;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;

import com.ebazzar.ApplicationProperties.Accounts.Status;
import static com.ebazzar.ApplicationProperties.Accounts.Status.LOGIN_SUCCESS;
import com.ebazzar.ebazzar.dao.interfaces.AccountDao;
import com.ebazzar.ebazzar.utils.Context;


@SpringBootTest(classes = {com.ebazzar.ebazzar.Application.class,com.ebazzar.ebazzar.ApplicationConfiguration.class})
@ComponentScan(basePackages = {"com.ebazzar.dao.impl"})
public class AccountDaoMongoTest {

    @Autowired
    private AccountDao accountDao;

    @Autowired
    private MongoTemplate mongoTemplate;

    @Autowired
    private Context context;

    @Test
    public void NewlyRegisteredAccountPresentInDBTest() {
    String email = "test@example.com";
    String password = "password123";
    accountDao.registerAccount(email, password);
    boolean exists = mongoTemplate.exists(
        Query.query(
            Criteria.where("email").is(email)
        ),
        "accounts"
    );
    org.junit.jupiter.api.Assertions.assertTrue(exists);
    }

    @Test
    public void LoginWithCorrectCredentialsTest() {
        String email = "test1@example.com";
        String password = "password123";
        accountDao.registerAccount(email, password);
        Status status = accountDao.loginAccount(email, password);
        accountDao.deleteAccount(email);
        org.junit.jupiter.api.Assertions.assertEquals(LOGIN_SUCCESS, status);
    }

    @Test
    public void loginWithIncorrectCredentialsTest() {
        String email = "test2@example.com";
        String password = "password123";
        accountDao.registerAccount(email, password);
        Status status = accountDao.loginAccount(email, "wrongpassword");
        org.junit.jupiter.api.Assertions.assertNotEquals(Status.LOGIN_SUCCESS, status);
        accountDao.deleteAccount(email);
    }

    @Test
    public void twoRegistrationsWithSameEmailTest() {
        String email = "test3@example.com";
        String password = "password123";
        Status firstRegistrationStatus = accountDao.registerAccount(email, password);
        Status secondRegistrationStatus = accountDao.registerAccount(email, password);
        org.junit.jupiter.api.Assertions.assertEquals(Status.SUCCESS, firstRegistrationStatus);
        org.junit.jupiter.api.Assertions.assertEquals(Status.REGISTER_FAILED, secondRegistrationStatus);
        accountDao.deleteAccount(email);
    }

}