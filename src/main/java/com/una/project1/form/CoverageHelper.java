package com.una.project1.form;

import com.una.project1.model.Coverage;
import com.una.project1.model.CoverageCategory;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.util.HashSet;
import java.util.Objects;
import java.util.Set;

public class CoverageHelper {
    @NotBlank(message = "Name cannot be empty.")
    private String name;
    @NotBlank(message = "Description cannot be empty.")
    private String description;
    @NotNull(message = "Minimum price cannot be empty.")
    private Double minimumPrice;
    @NotNull(message = "Percentage price cannot be empty.")
    private Double valuationPercentagePrice;
    @NotNull(message = "CoverageCategory price cannot be empty.")
    private Integer coverageCategory;

    public CoverageHelper() {
    }

    public CoverageHelper(String name, String description, Double minimumPrice, Double valuationPercentagePrice, Integer coverageCategory) {
        this.name = name;
        this.description = description;
        this.minimumPrice = minimumPrice;
        this.valuationPercentagePrice = valuationPercentagePrice;
        this.coverageCategory = coverageCategory;
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

    public Integer getCoverageCategory() {
        return coverageCategory;
    }

    public void setCoverageCategory(Integer coverageCategory) {
        this.coverageCategory = coverageCategory;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof CoverageHelper that)) return false;
        return getName().equals(that.getName()) && getDescription().equals(that.getDescription()) && getMinimumPrice().equals(that.getMinimumPrice()) && getValuationPercentagePrice().equals(that.getValuationPercentagePrice()) && getCoverageCategory().equals(that.getCoverageCategory());
    }

    @Override
    public int hashCode() {
        return Objects.hash(getName(), getDescription(), getMinimumPrice(), getValuationPercentagePrice(), getCoverageCategory());
    }
}
