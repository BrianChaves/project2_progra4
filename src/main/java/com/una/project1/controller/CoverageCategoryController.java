package com.una.project1.controller;

import com.una.project1.model.*;
import com.una.project1.service.CoverageCategoryService;
import com.una.project1.service.UserService;
import jakarta.transaction.Transactional;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/coverage/category")
public class CoverageCategoryController {
    @Autowired
    CoverageCategoryService coverageCategoryService;
    @Autowired
    private UserService userService;

 @PreAuthorize("authentication.principal.username != ''")
    @GetMapping("")
 public List<CoverageCategory> getCoverageCategoryList(Authentication authentication) {
     Optional<User> user = userService.findByUsername(authentication.getName());
     if (!user.isPresent()) {
         throw new RuntimeException("User not found");
     }
     return coverageCategoryService.findAll();
 }



    @PreAuthorize("hasAuthority('AdministratorClient')")
    @PostMapping("")
    public ResponseEntity<CoverageCategory> createCoverageCategory(
            Authentication authentication,
            @Valid @RequestBody CoverageCategory coverageCategory
    ) {
        Optional<User> user = userService.findByUsername(authentication.getName());
        if (!user.isPresent()) {
            throw new RuntimeException("User not found");
        }


        return ResponseEntity.ok().body(coverageCategoryService.save(coverageCategory));

    }



    @PreAuthorize("hasAuthority('AdministratorClient')")
    @GetMapping("/{name}")
    public ResponseEntity<?> coverageCategoryDetail(@PathVariable("name") String name) {
        Optional<CoverageCategory> optionalCoverageCategory = coverageCategoryService.findByName(name);
        if (!optionalCoverageCategory.isPresent()){
            return ResponseEntity.badRequest().body("{message: \"CoverageCategory does not exist\"}");
        }
        return ResponseEntity.ok().body(optionalCoverageCategory.get());
    }

    @PreAuthorize("hasAuthority('AdministratorClient')")
    @PutMapping("/{name}")
    public ResponseEntity<?> updateCoverageCategory(
            @PathVariable String name,
            @Valid @RequestBody CoverageCategory coverageCategory
    ) {
        Optional<CoverageCategory> existingCoverageCategory = coverageCategoryService.findByName(name);
        if (!existingCoverageCategory.isPresent()) {
            return ResponseEntity.badRequest().body("{message: \"Coverage Category does not exist\"}");
        }
        coverageCategoryService.save(coverageCategory);
        return ResponseEntity.ok().body(existingCoverageCategory.get());

    }

    @PreAuthorize("hasAuthority('AdministratorClient')")
    @DeleteMapping("/{coverageCategoryId}/delete")
    public ResponseEntity<?> deleteCoverageCategory(@PathVariable Long coverageCategoryId) {
        Optional<CoverageCategory> optionalCoverageCategory = coverageCategoryService.findById(coverageCategoryId);
        if (!optionalCoverageCategory.isPresent()) {
            return ResponseEntity.badRequest().body("{message: \"Coverage Category does not exist\"}");
        }

        coverageCategoryService.deleteById(coverageCategoryId);
        return ResponseEntity.ok().body("{message: \"Coverage Category successfully deleted\"}");
    }
}
