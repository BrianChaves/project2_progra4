package com.una.project1.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;

import java.util.HashSet;
import java.util.Objects;
import java.util.Set;


@Entity
@JsonIgnoreProperties(value={"insurances"})
@Table(name = "paymentSchedule")
public class PaymentSchedule {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @NotBlank(message = "Name cannot be empty.")
    private String name;

    @OneToMany(fetch = FetchType.LAZY, mappedBy = "paymentSchedule", cascade = CascadeType.PERSIST)
    private Set<Insurance> insurances = new HashSet<>();

    public PaymentSchedule() {
    }

    public PaymentSchedule(String name) {
        this.name = name;
    }

    public PaymentSchedule(Long id, String name) {
        this.id = id;
        this.name = name;
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

    public Set<Insurance> getInsurances() {
        return insurances;
    }

    public void setInsurances(Set<Insurance> insurances) {
        this.insurances = insurances;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof PaymentSchedule paymentSchedule)) return false;
        return getId().equals(paymentSchedule.getId()) && getName().equals(paymentSchedule.getName());
    }

    @Override
    public int hashCode() {
        return Objects.hash(getId(), getName());
    }

    @Override
    public String toString() {
        return "PaymentSchedule{" +
                "id=" + id +
                ", name='" + name + '\'' +
                '}';
    }
}
