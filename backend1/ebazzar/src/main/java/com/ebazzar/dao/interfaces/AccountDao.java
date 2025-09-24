package com.ebazzar.dao.interfaces;

import com.ebazzar.ApplicationProperties.Accounts.Status;

public interface AccountDao {
    Status registerAccount(String email, String password);
    Status loginAccount(String email, String password);
}
