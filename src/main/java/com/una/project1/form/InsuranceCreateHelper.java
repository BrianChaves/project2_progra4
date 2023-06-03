package com.una.project1.form;

import com.una.project1.model.*;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.util.Date;
import java.util.HashSet;
import java.util.Set;

public class InsuranceCreateHelper {
    @NotBlank(message = "numberPlate is required.")
    @Column()
    private String numberPlate;
    @NotNull(message = "A year is required.")
    @Column()
    private int carYear;
    @NotNull(message = "A valuation is required.")
    @Column()
    private int valuation;
    @Column()
    private Date startDate;
    @NotNull(message = "A payment is required.")
    private int payment;

    @NotNull(message = "A paymentSchedule is required.")
    private int paymentSchedule;

    @NotNull(message = "A vehicle is required.")
    private int vehicle;

    private Set<Integer> coverages = new HashSet<>();

    public InsuranceCreateHelper() {
    }

    public InsuranceCreateHelper(String numberPlate, int carYear, int valuation, Date startDate, int payment, int paymentSchedule, int vehicle, Set<Integer> coverages) {
        this.numberPlate = numberPlate;
        this.carYear = carYear;
        this.valuation = valuation;
        this.startDate = startDate;
        this.payment = payment;
        this.paymentSchedule = paymentSchedule;
        this.vehicle = vehicle;
        this.coverages = coverages;
    }

    public String getNumberPlate() {
        return numberPlate;
    }

    public void setNumberPlate(String numberPlate) {
        this.numberPlate = numberPlate;
    }

    public int getCarYear() {
        return carYear;
    }

    public void setCarYear(int carYear) {
        this.carYear = carYear;
    }

    public int getValuation() {
        return valuation;
    }

    public void setValuation(int valuation) {
        this.valuation = valuation;
    }

    public Date getStartDate() {
        return startDate;
    }

    public void setStartDate(Date startDate) {
        this.startDate = startDate;
    }

    public int getPayment() {
        return payment;
    }

    public void setPayment(int payment) {
        this.payment = payment;
    }

    public int getPaymentSchedule() {
        return paymentSchedule;
    }

    public void setPaymentSchedule(int paymentSchedule) {
        this.paymentSchedule = paymentSchedule;
    }

    public int getVehicle() {
        return vehicle;
    }

    public void setVehicle(int vehicle) {
        this.vehicle = vehicle;
    }

    public Set<Integer> getCoverages() {
        return coverages;
    }

    public void setCoverages(Set<Integer> coverages) {
        this.coverages = coverages;
    }
}
