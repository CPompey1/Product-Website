package com.ebazzar.models.payloads;

import com.ebazzar.ApplicationProperties.Accounts.Status;

public class RegisterAccount {
    public static class Request {
        public String email;
        public String password;
    }
    public static class Response {
        public Status status;
    }
}
