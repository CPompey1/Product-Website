package com.ebazzar.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import com.ebazzar.ApplicationProperties.Accounts.Status;
import com.ebazzar.dao.impl.AccountDaoMongoImpl;
import com.ebazzar.dao.interfaces.AccountDao;
import com.ebazzar.models.payloads.RegisterAccount;
import com.ebazzar.utils.Context;

@Service
public class AccountsService {
    @Autowired
    private final Context context;

    private final AccountDao accountDao;

    @Autowired
    private final MongoTemplate mongoTemplate;

    public AccountsService(Context context, MongoTemplate mongoTemplate) {
        this.context = context;
        this.accountDao  = new AccountDaoMongoImpl(mongoTemplate, context);
        this.mongoTemplate = mongoTemplate;
    }

    // Service methods for account management
    public RegisterAccount.Response register(RegisterAccount.Request request) {
        // Registration logic here
        RegisterAccount.Response response = new RegisterAccount.Response();

        // Call the DAO layer to register the account
        Status status = accountDao.registerAccount(request.email, request.password);
        response.status = status;
        return response;
    }

    public HttpStatus accountStatusToHttpStatus(Status status) {
        switch (status) {
            case REGISTER_SUCCESS:
                return HttpStatus.CREATED;
            case REGISTER_FAILED:
                return HttpStatus.BAD_REQUEST;
            case LOGIN_SUCCESS:
                return HttpStatus.OK;
            case LOGIN_FAILED:
                return HttpStatus.UNAUTHORIZED;
            default:
                return HttpStatus.INTERNAL_SERVER_ERROR;
        }
    }
}
