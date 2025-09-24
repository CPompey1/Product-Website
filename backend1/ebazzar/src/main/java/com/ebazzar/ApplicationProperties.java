package com.ebazzar;

import org.springframework.stereotype.Component;

import lombok.Getter;

@Component
public class ApplicationProperties {
    public static class Accounts {

        
        public static enum Status {
            REGISTER_SUCCESS("REGISTER_SUCCESS"),
            REGISTER_FAILED("REGISTER_FAILED"),
            LOGIN_SUCCESS("LOGIN_SUCCESS"),
            LOGIN_FAILED("LOGIN_FAILED"),
            LOGIN_FAIL_PW_WRONG("LOGIN_FAIL_PW_WRONG"),
            LOGIN_FAIL_USER_LOCKED("LOGIN_FAIL_USER_LOCKED"),
            LOGIN_FAIL_USER_NOT_FOUND("LOGIN_FAIL_USER_NOT_FOUND");
            
            private Status(String status) {
                this.status = status;
            }

            @Getter
            private String status;

        }


    }

}
