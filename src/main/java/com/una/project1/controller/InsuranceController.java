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
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.validation.ObjectError;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/insurance")
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
    @PreAuthorize("hasAuthority('StandardClient')")
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

    @PreAuthorize("hasAuthority('StandardClient')")
    @PostMapping("")
    public ResponseEntity<?> createInsurance(@Valid @RequestBody Insurance insurance,
                                                     BindingResult result,
                                                     Authentication authentication) {
        Optional<User> user = userService.findByUsername(authentication.getName());
        if (!user.isPresent()) {
            throw new RuntimeException("User not found");
        }
        insuranceService.validateCreation(insurance, result, "create");
        if (result.hasErrors()) {
            String errorString = "{'errors':[";
            for (ObjectError error: result.getAllErrors()) {
                errorString += String.format("{'%s': '%s'},", error.getObjectName(), error.getDefaultMessage());
            }
            errorString += "]}";
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .contentType(MediaType.APPLICATION_JSON)
                    .body(errorString);        }
        insuranceService.starDate(insurance);
        insuranceService.assignUser(insurance, user.get());
        insuranceService.createInsurance(insurance);
        return ResponseEntity.ok(insurance);
    }


    @PreAuthorize("hasAuthority('StandardClient')")
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


    @PreAuthorize("hasAuthority('StandardClient')")
    @PutMapping("/{numberPlate}")
    public ResponseEntity<Insurance> updateInsurance(@PathVariable("numberPlate") String numberPlate,
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
        return ResponseEntity.ok(insurance);
    }

    @PreAuthorize("hasAuthority('StandardClient')")
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteInsurance(@PathVariable("id") Long id, Authentication authentication) {
        Optional<Insurance> optionalInsurance = insuranceService.findById(id);
        if (!optionalInsurance.isPresent()) {
            return ResponseEntity.status(HttpStatus.OK)
                    .contentType(MediaType.APPLICATION_JSON)
                    .body("{'message': 'Insurance not found'}");
        }
        Insurance insurance = optionalInsurance.get();
        if (!authentication.getName().equals(insurance.getClient().getUsername())) {
            return ResponseEntity.status(HttpStatus.OK)
                    .contentType(MediaType.APPLICATION_JSON)
                    .body("{'message': 'Access denied'}");
        }
        insuranceService.deleteInsurance(insurance);
        return ResponseEntity.status(HttpStatus.OK)
                .contentType(MediaType.APPLICATION_JSON)
                .body("{'message': 'Insurance Successfully Deleted'}");    }

}
