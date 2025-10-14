package com.ebazzar.ebazzar.models.payloads;

import com.ebazzar.ApplicationProperties.Accounts.Status;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;

public class RegisterAccount {
    public static class Request {
        @NotBlank
        @Pattern(regexp = "^[a-zA-Z0-9 ._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$", 
                 message = "Email must be a valid email address")
        public String email;

        @NotBlank
        //Password must be at least 8 characters long, contain at least one uppercase letter, one lowercase letter, one digit, and one special character
        @Pattern(regexp = "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$", 
                 message = "Password must be at least 8 characters long, contain at least one uppercase letter, one lowercase letter, one digit, and one special character")
        public String password;
    }
    public static class Response {
        public Status status;
    }
}
