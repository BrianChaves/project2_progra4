package com.una.project1.controller;

import com.una.project1.model.CoverageCategory;
import com.una.project1.model.Role;
import com.una.project1.model.User;
import com.una.project1.service.CoverageCategoryService;
import com.una.project1.service.RoleService;
import com.una.project1.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/role")
public class RoleController {
    @Autowired
    RoleService roleService;
    @Autowired
    private UserService userService;
    @GetMapping("")
    public List<Role> getRoleList(Authentication authentication) {
        Optional<User> user = userService.findByUsername(authentication.getName());
        if (!user.isPresent()) {
            throw new RuntimeException("User not found");
        }
        return roleService.findAll();
    }

}
