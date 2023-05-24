package com.una.project1.controller;

import com.una.project1.model.Insurance;
import com.una.project1.model.User;
import com.una.project1.service.*;
import jakarta.servlet.http.HttpSession;
import jakarta.transaction.Transactional;
import jakarta.validation.Valid;
import jakarta.validation.ValidationException;
import javassist.NotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/insurance")
public class InsuranceController {
    @Autowired
    private InsuranceService insuranceService;
    @Autowired
    private PaymentScheduleService paymentScheduleService;
    @Autowired
    private VehicleService vehicleService;
    @Autowired
    private UserService userService;
    @Autowired
    private PaymentService paymentService;
    @Autowired
    private CoverageService coverageService;
    @GetMapping("")
    public List<Insurance> getInsuranceList(Authentication authentication,
                                            @RequestParam(value = "search", required = false) String search) {
        Optional<User> user = userService.findByUsername(authentication.getName());
        if (!user.isPresent()) {
            throw new RuntimeException("User not found");
        }
        List<Insurance> insurances = insuranceService.findByUser(user.get());
        if (search != null && !search.isBlank()) {
            return insurances.stream()
                    .filter(insurance -> insurance.getNumberPlate().contains(search))
                    .collect(Collectors.toList());
        }
        return insurances;
    }

    @PostMapping("")
    public Insurance createInsurance(@Valid @RequestBody Insurance insurance,
                                     BindingResult result,
                                     Authentication authentication) {
        Optional<User> user = userService.findByUsername(authentication.getName());
        if (!user.isPresent()) {
            throw new RuntimeException("User not found");
        }
        insuranceService.validateCreation(insurance, result, "create");
        if (result.hasErrors()) {
            throw new ValidationException(result.toString());
        }
        insuranceService.starDate(insurance);
        insuranceService.assignUser(insurance, user.get());
         insuranceService.createInsurance(insurance);
return insurance;//
    }


    @GetMapping("/{numberPlate}")
    public Insurance getInsuranceByNumberPlate(@PathVariable("numberPlate") String numberPlate,
                                               Authentication authentication) {
        Optional<Insurance> optionalInsurance = insuranceService.findByNumberPlate(numberPlate);
        Optional<User> user = userService.findByUsername(authentication.getName());
        if (!optionalInsurance.isPresent() || !user.isPresent()) {
            throw new RuntimeException("Insurance or User not found");
        }
        Insurance insurance = optionalInsurance.get();
        if (!authentication.getName().equals(insurance.getClient().getUsername())) {
            throw new RuntimeException("Access denied");
        }
        return insurance;
    }

    @PutMapping("/{numberPlate}")
    public Insurance updateInsurance(@PathVariable("numberPlate") String numberPlate,
                                     @Valid @RequestBody Insurance updatedInsurance,
                                     Authentication authentication) {
        Optional<User> user = userService.findByUsername(authentication.getName());
        Optional<Insurance> existingInsurance = insuranceService.findByNumberPlate(numberPlate);
        if (!user.isPresent() || !existingInsurance.isPresent()) {
            throw new RuntimeException("Insurance or User not found");
        }
        Insurance insurance = existingInsurance.get();
        if (!authentication.getName().equals(insurance.getClient().getUsername())) {
            throw new RuntimeException("Access denied");
        }
        insuranceService.updateInsurance(insurance, updatedInsurance);
        return insurance;
    }


    @DeleteMapping("/{id}")
    public void deleteInsurance(@PathVariable("id") Long id, Authentication authentication) {
        Optional<Insurance> optionalInsurance = insuranceService.findById(id);
        if (!optionalInsurance.isPresent()) {
            throw new RuntimeException("Insurance not found");
        }
        Insurance insurance = optionalInsurance.get();
        if (!authentication.getName().equals(insurance.getClient().getUsername())) {
            throw new RuntimeException("Access denied");
        }
        insuranceService.deleteInsurance(insurance);
    }

}
