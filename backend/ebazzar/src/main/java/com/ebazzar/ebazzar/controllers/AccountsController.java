package com.ebazzar.ebazzar.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ebazzar.ApplicationProperties.Accounts.Status;
import static com.ebazzar.ApplicationProperties.HTTP_HEADERS;
import com.ebazzar.ebazzar.models.payloads.LoginAccount;
import com.ebazzar.ebazzar.models.payloads.RegisterAccount;
import com.ebazzar.ebazzar.service.AccountsService;
import com.ebazzar.ebazzar.utils.Context;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/accounts")
public class AccountsController {


    @Autowired
    private final AccountsService accountsService;

    private final Context context;

    @Autowired
    public AccountsController(AccountsService accountsService, Context context) {
        this.accountsService = accountsService;
        this.context = context;
    }

    @PostMapping("/register")
    public ResponseEntity<RegisterAccount.Response> registerAccount(@Valid @RequestBody RegisterAccount.Request request) {
        RegisterAccount.Response response = accountsService.register(request);
        return ResponseEntity.status(accountsService.accountStatusToHttpStatus(response.status)).body(response);
    }

    @PostMapping("/login")
    public ResponseEntity<LoginAccount.Response> loginAccount(@Valid @RequestBody LoginAccount.Request request) {
        LoginAccount.Response loginResponse = accountsService.login(request);

        if (loginResponse.status == Status.LOGIN_SUCCESS) {
            return ResponseEntity.status(accountsService.accountStatusToHttpStatus(loginResponse.status))
                            .headers((HttpHeaders) context.get(HTTP_HEADERS))
                            .body(loginResponse);
            
        }
        return ResponseEntity.status(accountsService.accountStatusToHttpStatus(loginResponse.status)).body(loginResponse);
    }

    @PostMapping("/validate_token/{token}")
    public ResponseEntity<Void> validateToken(@PathVariable String token) {
        // Validate the token using the AccountsService
        if (accountsService.validateToken(token)) {
            return ResponseEntity.ok().build();
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
    }

    @PostMapping("/logout")
    public ResponseEntity<Void> logout() {
        // Clear cookies by setting their max age to 0
        HttpHeaders headers = new HttpHeaders();
        headers.add(HttpHeaders.SET_COOKIE, "token=; HttpOnly; Path=/; Max-Age=0");
        return ResponseEntity.ok().headers(headers).build();
    }

}
