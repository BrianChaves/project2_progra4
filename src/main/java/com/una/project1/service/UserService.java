package com.una.project1.service;

import com.una.project1.form.UserCreateHelper;
import com.una.project1.form.UserRegisterHelper;
import com.una.project1.model.Role;
import com.una.project1.model.User;
import com.una.project1.form.UserPasswordHelper;
import com.una.project1.form.UserUpdateHelper;
import com.una.project1.repository.UserRepository;
import jakarta.servlet.http.HttpSession;
import jakarta.transaction.Transactional;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.validation.BindingResult;

import java.util.List;
import java.util.Objects;
import java.util.Optional;

@Service
public class UserService {
    @Autowired
    private PasswordEncoder passwordEncoder;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private RoleService roleService;
    @Transactional
    public Optional<User> findByUsername(String username){
        return userRepository.findByUsername(username);
    }
    @Transactional
    public List<User> findAll() {
        return userRepository.findAll();
    }

    public BindingResult validateCreation(UserCreateHelper user, BindingResult result, String type){
        Optional<User> optionalUser = this.findByUsername(user.getUsername());
        if (!Objects.equals(user.getPasswordHash(), user.getPassword2())){
            result.rejectValue("passwordHash", "error.user", "Passwords must match.");
        }
        if (optionalUser.isPresent() && type == "create"){
            result.rejectValue("username", "error.user", "This username already exists.");
        }
        return result;
    }

    public BindingResult validateCreation(UserRegisterHelper user, BindingResult result, String type){
        Optional<User> optionalUser = this.findByUsername(user.getUsername());
        if (!Objects.equals(user.getPasswordHash(), user.getPassword2())){
            result.rejectValue("passwordHash", "error.user", "Passwords must match.");
        }
        if (optionalUser.isPresent() && type == "create"){
            result.rejectValue("username", "error.user", "This username already exists.");
        }
        return result;
    }

    public BindingResult validatePasswordChange(User existingUser, UserPasswordHelper userHelper, BindingResult result) {
        if (!passwordEncoder.matches(userHelper.getOldPassword(), existingUser.getPasswordHash())){
            result.rejectValue("oldPassword", "error.userHelper", "Wrong password.");
        }
        if (!userHelper.getPassword().equals(userHelper.getPassword2())){
            result.rejectValue("password2", "error.userHelper", "Passwords must match.");
        }
        return result;
    }

    public User assignRole(User user, String role) {
        Optional<Role> roleToAdd = roleService.findByName(role);
        if (roleToAdd.isPresent()) {
            user.addRole(roleToAdd.get());
        }
        return user;
    }

    public User createUser(User user){
        user.setPasswordHash(passwordEncoder.encode(user.getPasswordHash()));
        return userRepository.save(user);
    }

    public User updateUser(User existingUser, @Valid UserUpdateHelper userData){
        existingUser.setName(userData.getName());
        existingUser.setEmail(userData.getEmail());
        existingUser.setPhoneNumber(userData.getPhoneNumber());
        return userRepository.save(existingUser);
    }
    public User updatePassword(User existingUser, UserPasswordHelper user){
        existingUser.setPasswordHash(passwordEncoder.encode(user.getPassword()));
        return userRepository.save(existingUser);
    }

    public User saveUser(User user){
        return userRepository.save(user);
    }

    public void deleteUser(User user) {
        userRepository.delete(user);
    }

    public void logout(HttpSession session) {
        SecurityContextHolder.clearContext();
        if (session != null) {
            session.invalidate();
        }
    }

    public boolean existsByUsername(String username) {
        return userRepository.existsByUsername(username);
    }
}
