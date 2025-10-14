package com.ebazzar.ebazzar.service;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseCookie;
import org.springframework.stereotype.Service;

import static com.ebazzar.ApplicationProperties.Accounts.ACCOUNT;
import com.ebazzar.ApplicationProperties.Accounts.Status;
import static com.ebazzar.ApplicationProperties.Accounts.TOKEN;
import static com.ebazzar.ApplicationProperties.HTTP_HEADERS;
import com.ebazzar.ebazzar.dao.impl.AccountDaoMongoImpl;
import com.ebazzar.ebazzar.dao.interfaces.AccountDao;
import com.ebazzar.ebazzar.models.dao.Acount;
import com.ebazzar.ebazzar.models.payloads.LoginAccount;
import com.ebazzar.ebazzar.models.payloads.RegisterAccount;
import com.ebazzar.ebazzar.utils.Context;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;

@Service
public class AccountsService {
    @Autowired
    private final Context context;

    private final AccountDao accountDao;

    @Value("${JWT_SALT}")
    private String JWT_SALT;

    private final int COOKIE_EXPIRATION = 24 * 60 * 60; // 24 hours

    @Autowired
    private final MongoTemplate mongoTemplate;

    public AccountsService(Context context, MongoTemplate mongoTemplate) {
        this.context = context;
        this.accountDao  = new AccountDaoMongoImpl(mongoTemplate, context);
        this.mongoTemplate = mongoTemplate;
    }

    // Service methods for account management
    public RegisterAccount.Response register(RegisterAccount.Request request) {
        
        RegisterAccount.Response response = new RegisterAccount.Response();
        // Call the DAO layer to register the account
        Status status = accountDao.registerAccount(request.email, request.password);
        response.status = status;
        return response;
    }

    public HttpStatus accountStatusToHttpStatus(Status status) {
        return switch (status) {
            case SUCCESS -> HttpStatus.CREATED;
            case REGISTER_FAILED -> HttpStatus.BAD_REQUEST;
            case LOGIN_SUCCESS -> HttpStatus.OK;
            case LOGIN_FAILED -> HttpStatus.UNAUTHORIZED;
            default -> HttpStatus.INTERNAL_SERVER_ERROR;
        };
    }

    public LoginAccount.Response login(LoginAccount.Request request) {
        LoginAccount.Response response = new LoginAccount.Response();
        // Call the DAO layer to login the account
        Status status = accountDao.loginAccount(request.email, request.password);
        response.status = status;
        Acount account = (Acount) context.get(ACCOUNT);
        if (account == null) {
            response.status = Status.INTERNAL_SERVER_ERROR;
            return response;
        }

        //if status is LOGIN_SUCCESS, generate a jwt token based on account
        if (status == Status.LOGIN_SUCCESS) {
            Map<String,Object> claims = new HashMap<>();
            claims.put("id", account.getId());
            claims.put("email", account.getEmail());
            String token = Jwts.builder()
                            .setClaims(claims)
                            .signWith(SignatureAlgorithm.HS256, JWT_SALT)
                            .compact();

            context.set(TOKEN, token);

        }
        //set jwt token as cookie in response headers
        String token = (String) context.get(TOKEN);
        HttpHeaders headers = new HttpHeaders();
        ResponseCookie cookie = ResponseCookie.from("token", token)
                        .httpOnly(true)
                        .path("/")
                        .maxAge(COOKIE_EXPIRATION) // 1 day
                        .build();
        headers.add(HttpHeaders.SET_COOKIE, cookie.toString());
        context.set(HTTP_HEADERS, headers);
        return response;
    }

    public boolean validateToken(String token) {
        try {
            Jwts.parserBuilder()
                .setSigningKey(JWT_SALT)
                .build()
                .parseClaimsJws(token);
            return true;
        } catch (Exception e) {
            return false;
        }
    }
}
