package com.una.project1.config;

import java.util.*;

import com.una.project1.model.User;
import com.una.project1.model.Role;
import com.una.project1.service.RoleService;
import com.una.project1.service.UserService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UsernameNotFoundException;


@Service
public class UserDetailsImplementation implements UserDetailsService {
    private static final Logger log = LoggerFactory.getLogger(UserDetailsImplementation.class);
    @Autowired
    private UserService userService;
    @Autowired
    private RoleService roleService;

    @Override
    @Transactional(readOnly = true)
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = userService
            .findByUsername(username)
            .orElseThrow(() -> new UsernameNotFoundException(username + " not found"));
        Collection<? extends GrantedAuthority> authorities = this.getAuthorities(user);
        return new org.springframework.security.core.userdetails.User(
            user.getUsername(),
            user.getPasswordHash(),
            true,
            true,
            true,
            true,
            authorities);
    }
    private Collection<? extends GrantedAuthority> getAuthorities(User user) {
        List<GrantedAuthority> authorities = new ArrayList<>();
        for (Role role : user.getRoles()) {
            authorities.add(new SimpleGrantedAuthority(role.getName()));
        }
        return authorities;
    }
}

