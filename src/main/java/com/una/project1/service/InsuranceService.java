package com.una.project1.service;

import com.una.project1.model.Insurance;
import com.una.project1.model.User;
import com.una.project1.repository.InsuranceRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.validation.BindingResult;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
public class InsuranceService {

    @Autowired
    private InsuranceRepository insuranceRepository;
    @Transactional
    public Optional<Insurance> findById(Long id){
        return insuranceRepository.findById(id);
    }

    @Transactional
    public List<Insurance> findByUser(User user){
        List<Insurance> insurances = this.findAll();
        List<Insurance> userInsurances = new ArrayList<>();
        for (Insurance insurance : insurances){
            if (insurance.getClient().getId() == user.getId()){
                userInsurances.add(insurance);
            }
        }
        return userInsurances;
    };
    @Transactional
    public  List<Insurance> findAll() {
        return insuranceRepository.findAll();
    }

    @Transactional
    public Optional<Insurance> findByNumberPlate(String numberPlate) {
        return insuranceRepository.findByNumberPlate(numberPlate);
    }

    public BindingResult validateCreation(Insurance insurance, BindingResult result, String type) {
        Optional<Insurance> optionalVehicle = this.findByNumberPlate(insurance.getNumberPlate());
        if (optionalVehicle.isPresent() && type.equals("create")) {
            result.rejectValue("numberPlate", "error.Insurance", "An insurance with this number plate already exists.");
        }
        return result;
    }
    public Insurance assignUser(Insurance insurance, User user) {
        insurance.setClient(user);
        return insurance;
    }

    public Insurance starDate(Insurance insurance){
        Date date = new Date();
        insurance.setStartDate(date);
        return insurance;
    }

    public Insurance saveInsurance(Insurance insurance) {
        return insuranceRepository.save(insurance);
    }


    public void createInsurance(Insurance insurance) {
        insuranceRepository.save(insurance);
    }


    //agregar update
    public void deleteInsurance(Insurance insurance) {
        insuranceRepository.delete(insurance);
    }


    public void updateInsurance(Insurance existingInsurance, Insurance insuranceData) {
        existingInsurance.setNumberPlate(insuranceData.getNumberPlate());
        existingInsurance.setCarYear(insuranceData.getCarYear());
        existingInsurance.setValuation(insuranceData.getValuation());
        existingInsurance.setPayment(insuranceData.getPayment());
        existingInsurance.setPaymentSchedule(insuranceData.getPaymentSchedule());
        existingInsurance.setVehicle(insuranceData.getVehicle());
        existingInsurance.setCoverages(insuranceData.getCoverages());
        insuranceRepository.save(existingInsurance);
    }
}
