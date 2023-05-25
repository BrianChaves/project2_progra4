package com.una.project1.controller;

import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

//import javax.validation.Valid;

import com.una.project1.config.JwtUtils;
import com.una.project1.config.UserDetailsImplementation;
import com.una.project1.form.JwtResponse;
import com.una.project1.form.MessageResponse;
import com.una.project1.form.UserRegisterHelper;
import com.una.project1.form.UserSignInHelper;
import com.una.project1.model.Role;
import com.una.project1.model.User;
import com.una.project1.repository.RoleRepository;
import com.una.project1.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/auth")
public class AuthController {
    @Autowired
    AuthenticationManager authenticationManager;

    @Autowired
    UserRepository userRepository;

    @Autowired
    RoleRepository roleRepository;

    @Autowired
    PasswordEncoder encoder;

    @Autowired
    JwtUtils jwtUtils;

    @PostMapping("/signin")
    public ResponseEntity<?> authenticateUser( @RequestBody UserSignInHelper loginRequest) {

        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(loginRequest.getUsername(), loginRequest.getPassword()));

        SecurityContextHolder.getContext().setAuthentication(authentication);
        String jwt = jwtUtils.generateJwtToken(authentication);

        org.springframework.security.core.userdetails.User userDetails = (org.springframework.security.core.userdetails.User) authentication.getPrincipal();
        List<String> roles = userDetails.getAuthorities().stream()
                .map(item -> item.getAuthority())
                .collect(Collectors.toList());

        return ResponseEntity.ok(new JwtResponse(jwt,
                userDetails.getUsername(),
                roles));
    }

    @PostMapping("/signup")
    public ResponseEntity<?> registerUser( @RequestBody UserRegisterHelper signUpRequest) {
        if (userRepository.existsByUsername(signUpRequest.getUsername())) {
            return ResponseEntity
                    .badRequest()
                    .body(new MessageResponse("Error: Username is already taken!"));
        }
        Set<Role> roles = new HashSet<>();
        Optional<Role> standardRole = roleRepository.findByName("StandardClient");
        if (standardRole.isPresent()){
            roles.add(standardRole.get());
        }
        // Create new user's account
        User user = new User(signUpRequest.getUsername(),
                signUpRequest.getName(),
                encoder.encode(signUpRequest.getPasswordHash()),
                roles);

        userRepository.save(user);
        return ResponseEntity.ok(new MessageResponse("User registered successfully!"));
    }
}