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
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@Controller
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
    public String userList(
            Model model
    ){
        List<User> users = userService.findAll();
        List<Role> roles = roleService.findAll();
        model.addAttribute("roles", roles);
        model.addAttribute("users", users);
        model.addAttribute("user", new User());
        return "user/list";
    }
    @PreAuthorize("hasAuthority('AdministratorClient')")
    @PostMapping("")
    public String userCreate(
            Model model,
            @Valid User user,
            BindingResult result,
            @RequestParam("password2") String password2,
            @RequestParam("role") String role
    ){
        List<User> users = userService.findAll();
        List<Role> roles = roleService.findAll();
        result = userService.validateCreation(user, password2, result, "create");
        if (result.hasErrors()){
            model.addAttribute("roles", roles);
            model.addAttribute("users", users);
            model.addAttribute("user", user);
            return "user/list";
        }
        userService.assignRole(user, role);
        userService.createUser(user);
        return "redirect:user?create=true";
    }
    @Transactional
    @PreAuthorize("isSelfOrAdmin(#username)")
    @GetMapping("/{username}")
    public String userDetail(
            Model model,
            @PathVariable("username") String username
    ){
        Optional<User> user = userService.findByUsername(username);
        if (!user.isPresent()){
            return "404";
        }

        model.addAttribute("user",user.get());
        model.addAttribute("insurances",insuranceService.findByUser(user.get()));
        return "user/detail";
    }
    @Transactional
    @PreAuthorize("isSelfOrAdmin(#username)")
    @PostMapping("/{username}")
    public String userModify(
            Model model,
            @Valid UserUpdateHelper userData,
            BindingResult result,
            @PathVariable("username") String username
    ){
        Optional<User> existingUser = userService.findByUsername(username);
        if (!existingUser.isPresent()){
            return "404";
        }
        if (result.hasErrors()){
            model.addAttribute("user",existingUser.get());
            model.addAttribute("userData", userData);
            return "user/detail";
        }
        userService.updateUser(existingUser.get(), userData);
        model.addAttribute("user",existingUser.get());
        return "redirect:/user/{username}?update=true";
    }
    @PreAuthorize("isSelfOrAdmin(#username)")
    @GetMapping("/{username}/change_password")
    public String userPasswordChange(
            Model model,
            @PathVariable("username") String username
    ){
        Optional<User> user = userService.findByUsername(username);
        if (!user.isPresent()){
            return "404";
        }
        model.addAttribute("user",user.get());
        model.addAttribute("userPasswordHelper",new UserPasswordHelper());
        return "user/change_password";
    }
    @PreAuthorize("isSelfOrAdmin(#username)")
    @PostMapping("/{username}/change_password")
    public String userPasswordChange(
            Model model,
            @Valid UserPasswordHelper userPasswordHelper,
            BindingResult result,
            @PathVariable("username") String username,
            HttpSession session
    ){
        Optional<User> existingUser = userService.findByUsername(username);
        if (!existingUser.isPresent()){
            return "404";
        }
        result = userService.validatePasswordChange(existingUser.get(), userPasswordHelper, result);
        if (result.hasErrors()){
            model.addAttribute("user",existingUser.get());
            model.addAttribute("userPasswordHelper",userPasswordHelper);
            return "user/change_password";
        }
        userService.updatePassword(existingUser.get(), userPasswordHelper);
        model.addAttribute("user",existingUser.get());
        userService.logout(session);
        return "redirect:/?password=true";
    }
    @PreAuthorize("isSelfOrAdmin(#username)")
    @PostMapping("/{username}/delete")
    public String userDelete(
            Model model,
            @PathVariable("username") String username,
            HttpSession session,
            Authentication authentication
    ){
        Optional<User> user = userService.findByUsername(username);
        if (!user.isPresent()){
            return "404";
        }
        userService.deleteUser(user.get());
        if(username.equals(authentication.getName())){
            userService.logout(session);
        }
        return "redirect:/?delete=true";
    }
}
