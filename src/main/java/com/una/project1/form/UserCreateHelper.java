package com.una.project1.form;

import jakarta.persistence.Column;
import jakarta.validation.constraints.NotBlank;

public class UserCreateHelper {
    @NotBlank(message = "Name cannot be empty.")
    private String name;
    @NotBlank(message = "Username cannot be empty.")
    @Column(unique = true)
    private String username;
    @NotBlank(message = "Password cannot be empty.")
    @Column(length = 60)
    private String passwordHash;
    @Column()
    private String phoneNumber;
    @Column()
    private String email;
    @NotBlank(message = "Password cannot be empty.")
    @Column(length = 60)
    private String password2;
    @NotBlank(message = "Role cannot be empty.")
    @Column(length = 60)
    private String role;

    public UserCreateHelper() {
    }

    public UserCreateHelper(String name, String username, String passwordHash, String phoneNumber, String email, String password2, String role) {
        this.name = name;
        this.username = username;
        this.passwordHash = passwordHash;
        this.phoneNumber = phoneNumber;
        this.email = email;
        this.password2 = password2;
        this.role = role;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPasswordHash() {
        return passwordHash;
    }

    public void setPasswordHash(String passwordHash) {
        this.passwordHash = passwordHash;
    }

    public String getPhoneNumber() {
        return phoneNumber;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword2() {
        return password2;
    }

    public void setPassword2(String password2) {
        this.password2 = password2;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }
}
