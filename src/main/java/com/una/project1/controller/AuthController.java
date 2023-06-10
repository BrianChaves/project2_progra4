package com.una.project1.controller;

import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

//import javax.validation.Valid;

import com.una.project1.config.JwtUtils;
import com.una.project1.form.JwtResponse;
import com.una.project1.form.MessageResponse;
import com.una.project1.form.UserRegisterHelper;
import com.una.project1.form.UserSignInHelper;
import com.una.project1.model.Payment;
import com.una.project1.model.Role;
import com.una.project1.model.User;
import com.una.project1.service.PaymentService;
import com.una.project1.service.RoleService;
import com.una.project1.service.UserService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/auth")
public class AuthController {
    @Autowired
    AuthenticationManager authenticationManager;
    @Autowired
    UserService userService;
    @Autowired
    RoleService roleService;
    @Autowired
    PaymentService paymentService;
    @Autowired
    PasswordEncoder encoder;
    @Autowired
    JwtUtils jwtUtils;

    @PostMapping("/login")
    public ResponseEntity<?> authenticateUser( @RequestBody UserSignInHelper loginRequest) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(loginRequest.getUsername(), loginRequest.getPassword()));

        SecurityContextHolder.getContext().setAuthentication(authentication);
        String jwt = jwtUtils.generateJwtToken(authentication);

        org.springframework.security.core.userdetails.User userDetails = (org.springframework.security.core.userdetails.User) authentication.getPrincipal();
        List<String> roles = userDetails.getAuthorities().stream()
                .map(item -> item.getAuthority())
                .collect(Collectors.toList());

        return ResponseEntity.ok(
            new JwtResponse(
                jwt,
                userDetails.getUsername(),
                roles
            )
        );
    }

    @PostMapping("/register")
    public ResponseEntity<?> registerUser(
            @Valid @RequestBody UserRegisterHelper signUpRequest,
            BindingResult result
        ) {
        Set<Role> roles = new HashSet<>();
        User user = new User(
            signUpRequest.getName(),
            signUpRequest.getUsername(),
            signUpRequest.getPasswordHash(),
            signUpRequest.getPhoneNumber(),
            signUpRequest.getEmail()
        );
        Payment payment = new Payment(
                signUpRequest.getNumber(),
                signUpRequest.getOwner(),
                signUpRequest.getExpirationDate(),
                signUpRequest.getSecurityCode(),
                signUpRequest.getBillingAddress()
        );
        userService.validateCreation(signUpRequest, result, "create");
        if (result.hasErrors()) {
            return ResponseEntity.badRequest().body(result.getAllErrors());
        }
        user = userService.assignRole(user, "StandardClient");
        userService.createUser(user);
        payment = paymentService.assignUser(payment, user);
        paymentService.savePayment(payment);
        return ResponseEntity.ok(new MessageResponse("User registered successfully!"));
    }

    @GetMapping("/logout")
    public ResponseEntity<?> logout() {
        return ResponseEntity.ok(new MessageResponse("User successfully logged out!"));
    }
}