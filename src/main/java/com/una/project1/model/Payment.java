package com.una.project1.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

import java.util.HashSet;
import java.util.Set;

@Entity
@JsonIgnoreProperties(value={"user", "insurances"})
@Table(name = "payment")
public class Payment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @NotBlank(message = "Card number is required.")
    @Size(min = 8, max = 40, message = "Card number must be between 8 and 40 numbers long.")
    @Column()
    private String number;
    @NotBlank(message = "Card name is required.")
    @Column()
    private String owner;
    @NotBlank(message = "Card expiration date is required.")
    @Column()
    private String expirationDate;
    @NotBlank(message = "Card security code is required.")
    @Column()
    private String securityCode;
    @NotBlank(message = "Billing address is required.")
    @Column()
    private String billingAddress;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="user_id", referencedColumnName = "id")
    private User user;

    @OneToMany(fetch = FetchType.LAZY, mappedBy = "payment", cascade = CascadeType.PERSIST)
    private Set<Insurance> insurances = new HashSet<>();

    public Payment() {

    }
    public Payment(String number, String owner, String expirationDate, String securityCode, String billingAddress) {
        this.number = number;
        this.owner = owner;
        this.expirationDate = expirationDate;
        this.securityCode = securityCode;
        this.billingAddress = billingAddress;
    }
    public Payment(String number, String owner, String expirationDate, String securityCode, String billingAddress, User user) {
        this.number = number;
        this.owner = owner;
        this.expirationDate = expirationDate;
        this.securityCode = securityCode;
        this.billingAddress = billingAddress;
        this.user = user;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNumber() {
        return number;
    }
    public String getSafeNumber() {
        String safeNumber = "*".repeat(number.length()-4) + number.substring(number.length()-4);
        return safeNumber;
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

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Set<Insurance> getInsurances() {
        return insurances;
    }

    public void setInsurances(Set<Insurance> insurances) {
        this.insurances = insurances;
    }

    @Override
    public String toString() {
        return "Payment{" +
                "id=" + id +
                ", number='" + number + '\'' +
                ", owner='" + owner + '\'' +
                ", expirationDate='" + expirationDate + '\'' +
                ", securityCode='" + securityCode + '\'' +
                '}';
    }
}
