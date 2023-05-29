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
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.validation.ObjectError;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/user")
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
    public ResponseEntity<?> userCreate(@Valid @RequestBody User user, BindingResult result,
                                           @RequestParam("password2") String password2,
                                           @RequestParam("role") String role) {
        result = userService.validateCreation(user, password2, result, "create");
        if (result.hasErrors()) {
            String errorString = "{'errors':[";
            for (ObjectError error: result.getAllErrors()) {
                errorString += String.format("{'%s': '%s'},", error.getObjectName(), error.getDefaultMessage());
            }
            errorString += "]}";
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .contentType(MediaType.APPLICATION_JSON)
                    .body(errorString);        }
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
    public ResponseEntity<?> userPasswordChange(@Valid @RequestBody UserPasswordHelper userPasswordHelper,
                                                   @PathVariable("username") String username,
                                                   BindingResult result,
                                                   HttpSession session) {
        Optional<User> existingUser = userService.findByUsername(username);
        if (!existingUser.isPresent()) {
            throw new RuntimeException("User not found");
        }
        result = userService.validatePasswordChange(existingUser.get(), userPasswordHelper, result);
        if (result.hasErrors()) {
            String errorString = "{'errors':[";
            for (ObjectError error: result.getAllErrors()) {
                errorString += String.format("{'%s': '%s'},", error.getObjectName(), error.getDefaultMessage());
            }
            errorString += "]}";
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .contentType(MediaType.APPLICATION_JSON)
                    .body(errorString);        }
        userService.updatePassword(existingUser.get(), userPasswordHelper);
        userService.logout(session);
        return ResponseEntity.ok(existingUser.get());
    }



    @PreAuthorize("isSelfOrAdmin(#username)")
    @DeleteMapping("/{username}/delete")
    public ResponseEntity<?> userDelete(@PathVariable("username") String username, HttpSession session,
                                           Authentication authentication) {
        Optional<User> user = userService.findByUsername(username);
        if (!user.isPresent()) {
            return ResponseEntity.status(HttpStatus.OK)
                    .contentType(MediaType.APPLICATION_JSON)
                    .body("{'message': 'User not found'}");        }

        userService.deleteUser(user.get());
        if (username.equals(authentication.getName())) {
            userService.logout(session);
        }

        return ResponseEntity.status(HttpStatus.OK)
                .contentType(MediaType.APPLICATION_JSON)
                .body("{'message': 'User Successfully Deleted'}");
        //esto lo que devuelve con codigo de estado hhtps 204diciendo que no tiene contenido y
        // como esto es un void en teoria no deberia retornar nada
    }
}
