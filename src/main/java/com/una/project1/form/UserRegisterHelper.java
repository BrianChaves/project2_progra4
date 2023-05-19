package com.una.project1.form;

import jakarta.persistence.Column;
import jakarta.validation.constraints.NotBlank;


public class UserRegisterHelper {
    @NotBlank(message = "Name cannot be empty.")
    private String name;
    @NotBlank(message = "Username cannot be empty.")
    @Column(unique = true)
    private String username;
    @NotBlank(message = "Password cannot be empty.")
    @Column(length = 60)
    private String passwordHash;
    @NotBlank(message = "Password cannot be empty.")
    @Column(length = 60)
    private String password2;
    @Column()
    private String phoneNumber;
    @Column()
    private String email;
    @NotBlank(message = "Card number is required.")
    private String number;
    @NotBlank(message = "Card name is required.")
    private String owner;
    @NotBlank(message = "Card expiration date is required.")
    private String expirationDate;
    @NotBlank(message = "Card security code is required.")
    private String securityCode;
    @NotBlank(message = "Billing address is required.")
    private String billingAddress;

    public UserRegisterHelper() {
    }

    public UserRegisterHelper(String name, String username, String passwordHash, String phoneNumber, String email, String number, String owner, String expirationDate, String securityCode, String billingAddress) {
        this.name = name;
        this.username = username;
        this.passwordHash = passwordHash;
        this.phoneNumber = phoneNumber;
        this.email = email;
        this.number = number;
        this.owner = owner;
        this.expirationDate = expirationDate;
        this.securityCode = securityCode;
        this.billingAddress = billingAddress;
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

    public String getPassword2() {
        return password2;
    }

    public void setPassword2(String password2) {
        this.password2 = password2;
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

    public String getNumber() {
        return number;
    }

    public void setNumber(String number) {
        this.number = number;
    }

    public String getOwner() {
        return owner;
    }

    public void setOwner(String owner) {
        this.owner = owner;
    }

    public String getExpirationDate() {
        return expirationDate;
    }

    public void setExpirationDate(String expirationDate) {
        this.expirationDate = expirationDate;
    }

    public String getSecurityCode() {
        return securityCode;
    }

    public void setSecurityCode(String securityCode) {
        this.securityCode = securityCode;
    }

    public String getBillingAddress() {
        return billingAddress;
    }

    public void setBillingAddress(String billingAddress) {
        this.billingAddress = billingAddress;
    }
}
