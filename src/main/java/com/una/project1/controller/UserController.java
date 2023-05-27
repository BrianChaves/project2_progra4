package com.una.project1.controller;


import com.una.project1.model.Role;
import com.una.project1.model.User;
import com.una.project1.form.UserPasswordHelper;
import com.una.project1.form.UserUpdateHelper;
import com.una.project1.service.InsuranceService;
import com.una.project1.service.RoleService;
import com.una.project1.service.UserService;
import jakarta.servlet.http.HttpSession;
import jakarta.transaction.Transactional;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/user")
public class UserController {
    @Autowired
    private UserService userService;
    @Autowired
    private RoleService roleService;
    @Autowired
    private InsuranceService insuranceService;

    @PreAuthorize("hasAuthority('AdministratorClient')")
    @GetMapping("")
    public List<User> userList() {
        return userService.findAll();
    }


    @PreAuthorize("hasAuthority('AdministratorClient')")
    @PostMapping("")
    public ResponseEntity<User> userCreate(@Valid @RequestBody User user, BindingResult result,
                                           @RequestParam("password2") String password2,
                                           @RequestParam("role") String role) {
        result = userService.validateCreation(user, password2, result, "create");
        if (result.hasErrors()) {
            throw new RuntimeException("User not found");
        }
        userService.assignRole(user, role);
        User createdUser = userService.createUser(user);
        return ResponseEntity.ok(createdUser);
    }


    @PreAuthorize("isSelfOrAdmin(#username)")
    @GetMapping("/{username}")
    public User userDetail(@PathVariable("username") String username) {
        Optional<User> user = userService.findByUsername(username);
        return user.orElse(null);
    }


    @PreAuthorize("isSelfOrAdmin(#username)")
    @PutMapping("/{username}")
    public ResponseEntity<User> updateUser(@Valid @RequestBody UserUpdateHelper userData,
                                           @PathVariable("username") String username) {
        Optional<User> existingUser = userService.findByUsername(username);
        if (!existingUser.isPresent()) {
            throw new RuntimeException("User not found");
        }

        userService.updateUser(existingUser.get(), userData);
        return ResponseEntity.ok(existingUser.get());
    }

    @PreAuthorize("isSelfOrAdmin(#username)")
    @GetMapping("/{username}/change_password")
    public ResponseEntity<User> userPasswordChange(@PathVariable("username") String username) {
        Optional<User> user = userService.findByUsername(username);
        if (!user.isPresent()) {
            throw new RuntimeException("User not found");
        }

        return ResponseEntity.ok(user.get());
    }

    @PreAuthorize("isSelfOrAdmin(#username)")
    @PostMapping("/{username}/change_password")
    public ResponseEntity<User> userPasswordChange(@Valid @RequestBody UserPasswordHelper userPasswordHelper,
                                                   @PathVariable("username") String username,
                                                   BindingResult result,
                                                   HttpSession session) {
        Optional<User> existingUser = userService.findByUsername(username);
        if (!existingUser.isPresent()) {
            throw new RuntimeException("User not found");
        }
        result = userService.validatePasswordChange(existingUser.get(), userPasswordHelper, result);
        if (result.hasErrors()) {
            throw new RuntimeException("Invalid password change");
        }
        userService.updatePassword(existingUser.get(), userPasswordHelper);
        userService.logout(session);
        return ResponseEntity.ok(existingUser.get());
    }



    @PreAuthorize("isSelfOrAdmin(#username)")
    @DeleteMapping("/{username}/delete")
    public ResponseEntity<Void> userDelete(@PathVariable("username") String username, HttpSession session,
                                           Authentication authentication) {
        Optional<User> user = userService.findByUsername(username);
        if (!user.isPresent()) {
            throw new RuntimeException("User not found");
        }

        userService.deleteUser(user.get());
        if (username.equals(authentication.getName())) {
            userService.logout(session);
        }

        return ResponseEntity.noContent().build();
    }
}
