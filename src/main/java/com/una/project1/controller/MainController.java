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

@Controller
public class MainController {
    private static final Logger log = LoggerFactory.getLogger(MainController.class);

    @RequestMapping( method = {RequestMethod.OPTIONS, RequestMethod.GET},
            path = {"/home/**", "/profile/**",
                    "/user/**", "/payment/**", "/vehicle/**", "/category/**",
                    "/coverage/**", "/insurance/**", "/"} )
    public String forwardRegularPaths() {
        return "forward:/index.html";
    }
    @RequestMapping( method = {RequestMethod.OPTIONS, RequestMethod.GET},
            path = {"/login/**"} )
    public String forwardLoginPath() {
        return "forward:/index.html?page=login";
    }
    @RequestMapping( method = {RequestMethod.OPTIONS, RequestMethod.GET},
            path = {"/register/**"} )
    public String forwardRegisterPath() {
        return "forward:/index.html?page=register";
    }
}