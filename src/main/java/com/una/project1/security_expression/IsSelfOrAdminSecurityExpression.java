package com.una.project1.security_expression;

import com.una.project1.model.Role;
import com.una.project1.model.User;
import com.una.project1.service.RoleService;
import com.una.project1.service.UserService;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.security.access.expression.SecurityExpressionRoot;
import org.springframework.security.access.expression.method.MethodSecurityExpressionOperations;
import org.springframework.security.core.Authentication;

import java.util.Optional;

public class IsSelfOrAdminSecurityExpression extends SecurityExpressionRoot implements MethodSecurityExpressionOperations {

    private HttpServletRequest request;
    private Object filterObject;
    private Object returnObject;
    private Object target;
    private UserService userService = new UserService();
    private RoleService roleService = new RoleService();

    public IsSelfOrAdminSecurityExpression(Authentication authentication) {
        super(authentication);
    }
    /**
     checks if the authenticated user have access to the user detail with the id
     Only a user have access to his own user details or an admin
     */
    public boolean isSelfOrAdmin(String username){
        String auth_username = this.getAuthentication().getName();
        Optional<User> user =  userService.findByUsername(auth_username);
        Optional<Role> optionalAdminRole =  roleService.findByName("AdministratorClient");
        if(user.isPresent() && optionalAdminRole.isPresent()){
            Role adminRole = optionalAdminRole.get();
            boolean isRoleAdmin = user.get().getRoles().contains(adminRole);
            boolean isUserSelf = auth_username.equals(username);
            return  isRoleAdmin || isUserSelf;
        }
        return false;
    }

    //We need this setter method to set the UserService from another class because this one dosen't have access to Application Context.

    public void setUserService(UserService userService){
        this.userService=userService;
    }

    public void setRoleService(RoleService roleService) {
        this.roleService=roleService;
    }

    @Override
    public void setFilterObject(Object filterObject) {
        this.filterObject = filterObject;
    }

    @Override
    public Object getFilterObject() {
        return filterObject;
    }

    @Override
    public void setReturnObject(Object returnObject) {
        this.returnObject = returnObject;
    }

    @Override
    public Object getReturnObject() {
        return returnObject;
    }

    @Override
    public Object getThis() {
        return target;
    }
}
