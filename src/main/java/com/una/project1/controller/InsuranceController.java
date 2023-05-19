package com.una.project1.controller;

import com.una.project1.model.Insurance;
import com.una.project1.model.User;
import com.una.project1.service.*;
import jakarta.servlet.http.HttpSession;
import jakarta.transaction.Transactional;
import jakarta.validation.Valid;
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

@Controller
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

    @Transactional
    @PreAuthorize("hasAuthority('StandardClient')")
    @GetMapping("")
    public String insuranceList(
            Model model,
            Authentication authentication,
            @RequestParam(value = "error", required = false) String error,
            @RequestParam(value = "search", required = false) String search
    ){
        Optional<User> user= userService.findByUsername(authentication.getName());
        if (!user.isPresent()){
            return "404";
        }
        List<Insurance> insurances = insuranceService.findByUser(user.get());
        List<Insurance> filteredInsurances = new ArrayList<>();
        if (search != null && !search.isBlank()){
            for (Insurance insurance : insurances){
                if (insurance.getNumberPlate().contains(search)){
                    filteredInsurances.add(insurance);
                }
            }
        }
        else{
            filteredInsurances = insurances;
        }
        model.addAttribute("insurance", new Insurance());
        model.addAttribute("insurances", filteredInsurances);
        model.addAttribute("payments", user.get().getPayments());
        model.addAttribute("vehicles", vehicleService.findAll());
        model.addAttribute("coverages", coverageService.findAll());
        model.addAttribute("paymentSchedules", paymentScheduleService.findAll());
        return "insurance/list";
    }

    @Transactional
    @PreAuthorize("hasAuthority('StandardClient')")
    @PostMapping("")
    public String insuranceCreate(
            Model model,
            @Valid Insurance insurance,
            BindingResult result,
            Authentication authentication,
            @RequestParam(value = "error", required = false) String error
    ){
        Optional<User> user= userService.findByUsername(authentication.getName());
        if (!user.isPresent()){
            return "404";
        }
        List<Insurance> insurances = insuranceService.findByUser(user.get());
        result = insuranceService.validateCreation(insurance, result, "create");
        if (result.hasErrors()){
            model.addAttribute("paymentSchedules", paymentScheduleService.findAll());
            model.addAttribute("vehicles", vehicleService.findAll());
            model.addAttribute("payments", user.get().getPayments());
            model.addAttribute("coverages", coverageService.findAll());
            model.addAttribute("insurances", insurances);
            model.addAttribute("insurance", insurance);
            model.addAttribute("error", "true");
            return "insurance/list";
        }
        insuranceService.starDate(insurance);
        insuranceService.assignUser(insurance, user.get());
        insuranceService.createInsurance(insurance);
        return "redirect:/insurance";
    }

    @Transactional
    @PreAuthorize("hasAuthority('StandardClient')")
    @GetMapping("/{numberPlate}")
    public String insuranceByNumberplateDetail(
            Model model,
            @PathVariable("numberPlate") String numberPlate,
            Authentication authentication
    ){
        Optional<Insurance> optionalInsurance = insuranceService.findByNumberPlate(numberPlate);
        Optional<User> user= userService.findByUsername(authentication.getName());
        if (!optionalInsurance.isPresent() || !user.isPresent()){
            return "404";
        }
        Insurance insurance = optionalInsurance.get();
        if (!(authentication.getName().equals(insurance.getClient().getUsername()))){
            return "403";
        }
        model.addAttribute("paymentSchedules", paymentScheduleService.findAll());
        model.addAttribute("vehicles", vehicleService.findAll());
        model.addAttribute("payments", user.get().getPayments());
        model.addAttribute("coverages", coverageService.findAll());
        model.addAttribute("insurance",optionalInsurance.get());
        return "insurance/detail";
    }

    @Transactional
    @PreAuthorize("hasAuthority('StandardClient')")
    @PostMapping("/{numberPlate}")
    public String insuranceModify(
            Model model,
            @Valid Insurance insurance,
            BindingResult result,
            @PathVariable("numberPlate") String numberPlate,
            Authentication authentication,
            @RequestParam(value = "error", required = false) String error
    ){
        Optional<User> user= userService.findByUsername(authentication.getName());
        Optional<Insurance> existingInsurance = insuranceService.findByNumberPlate(numberPlate);
        if (!user.isPresent() || !existingInsurance.isPresent()){
            return "404";
        }
        if (!(authentication.getName().equals(insurance.getClient().getUsername()))){
            return "403";
        }
        if (result.hasErrors()){
            model.addAttribute("paymentSchedules", paymentScheduleService.findAll());
            model.addAttribute("vehicles", vehicleService.findAll());
            model.addAttribute("payments", user.get().getPayments());
            model.addAttribute("coverages", coverageService.findAll());
            model.addAttribute("insurance", insurance);
            model.addAttribute("error", "true");
            return "insurance/list";
        }
        insuranceService.updateInsurance(existingInsurance.get(), insurance);
        return "redirect:/insurance";
    }

    @PreAuthorize("hasAuthority('StandardClient')")
    @PostMapping("/{id}/delete")
    public String deleteInsurance(Model model, @PathVariable("id") Long id, Authentication authentication) {
        Optional<Insurance> optionalInsurance = insuranceService.findById(id);
        if (!optionalInsurance.isPresent()){
            return "404";
        }
        Insurance insurance = optionalInsurance.get();
        if (!(authentication.getName().equals(insurance.getClient().getUsername()))){
            return "403";
        }
        insuranceService.deleteInsurance(insurance);
        return "redirect:/insurance";
    }
}
