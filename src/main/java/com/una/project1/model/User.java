package com.una.project1.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;

import java.util.*;

@Entity
@JsonIgnoreProperties(value={"insurances", "passwordHash"})
@Table(name = "profile")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @NotBlank(message = "Name cannot be empty.")
    private String name;
    @NotBlank(message = "Username cannot be empty.")
    @Column(unique = true, updatable = false)
    private String username;
    @NotBlank(message = "Password cannot be empty.")
    @Column(length = 60)
    private String passwordHash;
    @Column()
    private String phoneNumber;
    @Column()
    private String email;
    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(name = "user_role",
        joinColumns = @JoinColumn(name = "user_id", referencedColumnName = "id"),
        inverseJoinColumns = @JoinColumn(name = "role_id", referencedColumnName = "id"))
    private Set<Role> roles = new HashSet<>();

    @OneToMany(fetch = FetchType.EAGER, mappedBy = "user", cascade = CascadeType.REMOVE)
    private Set<Payment> payments = new HashSet<>();

    @OneToMany(fetch = FetchType.LAZY, mappedBy = "client", cascade = CascadeType.REMOVE)
    private Set<Insurance> insurances = new HashSet<>();

    public User() {

    }

    public User(String username, String name, String passwordHash, Set<Role> roles) {
        this.username = username;
        this.name = name;
        this.passwordHash = passwordHash;
        this.phoneNumber = "";
        this.email = "";
        this.roles = roles;
    }
    public User(String username, String name, String passwordHash, Set<Role> roles, Set<Payment> payments) {
        this.username = username;
        this.name = name;
        this.passwordHash = passwordHash;
        this.phoneNumber = "";
        this.email = "";
        this.roles = roles;
        this.payments = payments;
    }

    public User(String name, String username, String passwordHash, String phoneNumber, String email) {
        this.name = name;
        this.username = username;
        this.passwordHash = passwordHash;
        this.phoneNumber = phoneNumber;
        this.email = email;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
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

    public Set<Role> getRoles() {
        return roles;
    }

    public void setRoles(Set<Role> roles) {
        this.roles = roles;
    }

    public void addRole(Role role) {
        this.roles.add(role);
    }

    public Set<Payment> getPayments() {
        return payments;
    }

    public void setPayments(Set<Payment> payments) {
        this.payments = payments;
    }

    public void addPayment(Payment payment) {
        this.payments.add(payment);
    }

    public Set<Insurance> getInsurances() {
        return insurances;
    }

    public void setInsurance(Set<Insurance> insurances) {
        this.insurances = insurances;
    }

    public void addInsurance(Insurance insurance) {
        this.insurances.add(insurance);
    }

    @Override
    public String toString() {
        return "User{" +
            "id=" + id +
            ", name='" + name + '\'' +
            ", username='" + username + '\'' +
            ", passwordHash='" + passwordHash + '\'' +
            ", phoneNumber='" + phoneNumber + '\'' +
            ", email='" + email + '\'' +
            ", roles=" + roles +
            ", payments=" + payments +
        '}';
    }
}