package com.una.project1.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;

import java.util.HashSet;
import java.util.Objects;
import java.util.Set;

@Entity
@Table(name = "coverage")
public class Coverage {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    @NotBlank(message = "Name cannot be empty.")
    private String name;
    @NotBlank(message = "Description cannot be empty.")
    private String description;
    @NotNull(message = "Minimum price cannot be empty.")
    private Double minimumPrice;
    @NotNull(message = "Percentage price cannot be empty.")
    private Double valuationPercentagePrice;


    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="coverageCategory_id", referencedColumnName = "id")
    private CoverageCategory coverageCategory;

    @ManyToMany(fetch = FetchType.LAZY, mappedBy = "coverages")
    private Set<Insurance> insurances = new HashSet<>();



    public Coverage() {
    }

    public Coverage(String name, String description, Double minimumPrice, Double valuationPercentagePrice, CoverageCategory coverageCategory) {
        this.name = name;
        this.description = description;
        this.minimumPrice = minimumPrice;
        this.valuationPercentagePrice = valuationPercentagePrice;
        this.coverageCategory = coverageCategory;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Double getMinimumPrice() {
        return minimumPrice;
    }

    public void setMinimumPrice(Double minimumPrice) {
        this.minimumPrice = minimumPrice;
    }

    public Double getValuationPercentagePrice() {
        return valuationPercentagePrice;
    }

    public void setValuationPercentagePrice(Double valuationPercentagePrice) {
        this.valuationPercentagePrice = valuationPercentagePrice;
    }

    public CoverageCategory getCoverageCategory() {
        return coverageCategory;
    }

    public void setCoverageCategory(CoverageCategory coverageCategory) {
        this.coverageCategory = coverageCategory;
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
        if (!(o instanceof Coverage coverage)) return false;
        return getId() == coverage.getId() && getName().equals(coverage.getName()) && Objects.equals(getDescription(), coverage.getDescription()) && getMinimumPrice().equals(coverage.getMinimumPrice()) && getValuationPercentagePrice().equals(coverage.getValuationPercentagePrice());
    }

    @Override
    public int hashCode() {
        return Objects.hash(getId(), getName(), getDescription(), getMinimumPrice(), getValuationPercentagePrice());
    }

    @Override
    public String toString() {
        return "Coverage{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", description='" + description + '\'' +
                ", minimumPrice=" + minimumPrice +
                ", valuationPercentagePrice=" + valuationPercentagePrice +
                '}';
    }
}
