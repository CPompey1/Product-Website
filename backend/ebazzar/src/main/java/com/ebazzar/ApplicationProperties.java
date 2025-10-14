package com.ebazzar;

import org.springframework.stereotype.Component;

import lombok.Getter;

@Component
public class ApplicationProperties {
    public static String HTTP_HEADERS = "httpHeaders";
    public static class Accounts {
        public static String EMAIL = "email";
        public static String ID = "id"; 
        public static String ACCOUNT = "account";
        public static String TOKEN = "token";
        public static enum Status {
            SUCCESS("REGISTER_SUCCESS"),
            REGISTER_FAILED("REGISTER_FAILED"),
            LOGIN_SUCCESS("LOGIN_SUCCESS"),
            LOGIN_FAILED("LOGIN_FAILED"),
            LOGIN_FAIL_PW_WRONG("LOGIN_FAIL_PW_WRONG"),
            LOGIN_FAIL_USER_LOCKED("LOGIN_FAIL_USER_LOCKED"),
            USER_NOT_FOUND("USER_NOT_FOUND"),
            INTERNAL_SERVER_ERROR("INTERNAL_SERVER_ERROR");
            
            private Status(String status) {
                this.status = status;
            }

            @Getter
            private String status;

        }


    }

}
