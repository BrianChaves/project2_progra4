package com.una.project1.controller;

import com.una.project1.model.Insurance;
import com.una.project1.model.Payment;
import com.una.project1.model.Role;
import com.una.project1.model.User;
import com.una.project1.form.UserRegisterHelper;
import com.una.project1.service.InsuranceService;
import com.una.project1.service.PaymentService;
import com.una.project1.service.RoleService;
import com.una.project1.service.UserService;
import jakarta.validation.Valid;
import javassist.NotFoundException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import java.util.Collection;
import java.util.List;
import java.util.Optional;

@RestController
public class MainController {
    private static final Logger log = LoggerFactory.getLogger(MainController.class);

    @Autowired
    UserService userService;
    @Autowired
    RoleService roleService;
    @Autowired
    private PaymentService paymentService;



    @GetMapping("/")
    public String main(Authentication authentication) {
        Optional<User> user = userService.findByUsername(authentication.getName());
        Optional<Role> adminRole = roleService.findByName("AdministratorClient");
        if (!user.isPresent() || !adminRole.isPresent()){
            return "404";
        }
        return user.get().getRoles().contains(adminRole.get()) ? "redirect:/user" : "redirect:/insurance";
    }

    @GetMapping("/auth/register")
    public UserRegisterHelper registerGet() {
        return new UserRegisterHelper();
    }

    @PostMapping("/auth/register")
    public User registerPost(@Valid @RequestBody UserRegisterHelper userRegisterHelper, BindingResult result
                             ) {
        User user = new User(
                userRegisterHelper.getName(),
                userRegisterHelper.getUsername(),
                userRegisterHelper.getPasswordHash(),
                userRegisterHelper.getPhoneNumber(),
                userRegisterHelper.getEmail()
        );
        Payment payment = new Payment(
                userRegisterHelper.getNumber(),
                userRegisterHelper.getOwner(),
                userRegisterHelper.getExpirationDate(),
                userRegisterHelper.getSecurityCode(),
                userRegisterHelper.getBillingAddress()
        );
        userService.validateCreation(user, userRegisterHelper.getPassword2(),result, "create");
        paymentService.validateCreation(payment,result);

        user = userService.assignRole(user, "StandardClient");
        user = userService.createUser(user);
        payment = paymentService.assignUser(payment, user);
        payment = paymentService.savePayment(payment);
        return user;
    }

    @GetMapping("/auth/login")
    public String login() {
        return "auth/login";
    }

    @GetMapping("/auth/logout")
    public String logout() {
        return "auth/logout";
    }



}