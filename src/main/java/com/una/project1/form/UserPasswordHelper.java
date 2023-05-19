package com.una.project1.form;

import jakarta.persistence.Column;
import jakarta.validation.constraints.NotBlank;

public class UserPasswordHelper {
    @NotBlank(message = "Password cannot be empty.")
    @Column(length = 60)
    private String oldPassword;
    @NotBlank(message = "Password cannot be empty.")
    @Column(length = 60)
    private String password;
    @NotBlank(message = "Password cannot be empty.")
    @Column(length = 60)
    private String password2;

    public UserPasswordHelper() {
    }

    public UserPasswordHelper(String oldPassword, String password, String password2) {
        this.oldPassword = oldPassword;
        this.password = password;
        this.password2 = password2;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getPassword2() {
        return password2;
    }

    public void setPassword2(String password2) {
        this.password2 = password2;
    }

    public String getOldPassword() {
        return oldPassword;
    }

    public void setOldPassword(String oldPassword) {
        this.oldPassword = oldPassword;
    }
}
