package com.ebazzar.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ebazzar.models.payloads.RegisterAccount;
import com.ebazzar.service.AccountsService;
import com.ebazzar.utils.Context;

@RestController
@RequestMapping("/accounts")
public class AccountsController {


    @Autowired
    private AccountsService accountsService;

    @PostMapping("/register")
    public ResponseEntity<RegisterAccount.Response> registerAccount(@RequestBody RegisterAccount.Request request) {
        RegisterAccount.Response response = accountsService.register(request);
        return ResponseEntity.status(accountsService.accountStatusToHttpStatus(response.status)).body(response);
    }

    


}
