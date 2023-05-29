package com.una.project1.controller;


import com.una.project1.form.UserCreateHelper;
import com.una.project1.model.Role;
import com.una.project1.model.User;
import com.una.project1.form.UserPasswordHelper;
import com.una.project1.form.UserUpdateHelper;
import com.una.project1.service.InsuranceService;
import com.una.project1.service.RoleService;
import com.una.project1.service.UserService;
import jakarta.servlet.http.HttpSession;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.validation.BindingResult;
import org.springframework.validation.ObjectError;
import org.springframework.web.bind.annotation.*;

import javax.swing.text.html.Option;
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
    public ResponseEntity<?> userCreate(
            @Valid @RequestBody UserCreateHelper userCreateHelper,
            BindingResult result
    ) {
        result = userService.validateCreation(userCreateHelper, result, "create");
        if (result.hasErrors()) {
            return ResponseEntity.badRequest().body(result.getAllErrors());
        }
        User user = new User(
            userCreateHelper.getUsername(),
            userCreateHelper.getName(),
            userCreateHelper.getPasswordHash(),
            userCreateHelper.getPhoneNumber(),
            userCreateHelper.getEmail()
        );
        userService.assignRole(user, userCreateHelper.getRole());
        return ResponseEntity.ok().body(userService.createUser(user));
    }

    @PreAuthorize("isSelfOrAdmin(#username)")
    @GetMapping("/{username}")
    public ResponseEntity<?> userDetail(@PathVariable("username") String username) {
        Optional<User> user = userService.findByUsername(username);
        if (!user.isPresent()){
            return ResponseEntity.badRequest().body("{message: \"User does not exist\"}");
        }
        return ResponseEntity.ok().body(user.get());
    }

    @PreAuthorize("isSelfOrAdmin(#username)")
    @PutMapping("/{username}")
    public ResponseEntity<?> userModify(
            @Valid @RequestBody UserUpdateHelper userData,
            BindingResult result,
            @PathVariable("username") String username
    ) {
        Optional<User> existingUser = userService.findByUsername(username);
        if (!existingUser.isPresent()) {
            return ResponseEntity.badRequest().body("{message: \"User does not exist\"}");
        }
        if (result.hasErrors()) {
            return ResponseEntity.badRequest().body(result.getAllErrors());
        }
        userService.updateUser(existingUser.get(), userData);
        return ResponseEntity.ok().body(existingUser.get());
    }

    @PreAuthorize("isSelfOrAdmin(#username)")
    @PostMapping("/{username}/change_password")
    public ResponseEntity<?> userPasswordChange(
            @Valid @RequestBody UserPasswordHelper userPasswordHelper,
            @PathVariable("username") String username,
            BindingResult result,
            HttpSession session
    ) {
        Optional<User> existingUser = userService.findByUsername(username);
        if (!existingUser.isPresent()) {
            return ResponseEntity.badRequest().body("{message: \"User does not exist\"}");
        }
        result = userService.validatePasswordChange(existingUser.get(), userPasswordHelper, result);
        if (result.hasErrors()) {
            return ResponseEntity.badRequest().body(result.getAllErrors());
        }
        userService.updatePassword(existingUser.get(), userPasswordHelper);
        userService.logout(session);
        return ResponseEntity.ok().body(existingUser.get());
    }
    @PreAuthorize("isSelfOrAdmin(#username)")
    @DeleteMapping("/{username}/delete")
    public ResponseEntity<?>  userDelete(
            @PathVariable("username") String username,
            HttpSession session,
            Authentication authentication) {
        Optional<User> user = userService.findByUsername(username);
        if (!user.isPresent()) {
            return ResponseEntity.badRequest().body("{message: \"User does not exist\"}");
        }
        userService.deleteUser(user.get());
        if (username.equals(authentication.getName())) {
            userService.logout(session);
        }
        return ResponseEntity.ok().body("{message: \"User successfully deleted\"}");
    }
}
