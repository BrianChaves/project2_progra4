package com.una.project1.controller;

import com.una.project1.model.*;
import com.una.project1.service.CoverageCategoryService;
import com.una.project1.service.UserService;
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

@RestController
@RequestMapping("/coverage/category")
public class CoverageCategoryController {
    @Autowired
    CoverageCategoryService coverageCategoryService;
    @Autowired
    private UserService userService;

 @GetMapping("")
 public List<CoverageCategory> getCoverageCategoryList(Authentication authentication) {
     Optional<User> user = userService.findByUsername(authentication.getName());
     if (!user.isPresent()) {
         throw new RuntimeException("User not found");
     }
     return coverageCategoryService.findAll();
 }



    @PostMapping("")
    public CoverageCategory createCoverageCategory(
            Authentication authentication,
            @Valid @RequestBody CoverageCategory coverageCategory

    ) {
        Optional<User> user = userService.findByUsername(authentication.getName());
        if (!user.isPresent()) {
            throw new RuntimeException("User not found");
        }
        return coverageCategoryService.save(coverageCategory);
    }



@GetMapping("/{coverageCategoryId}")
public CoverageCategory coverageCategoryDetail(@PathVariable Long coverageCategoryId) {
    Optional<CoverageCategory> optionalCoverageCategory = coverageCategoryService.findById(coverageCategoryId);
    return optionalCoverageCategory.orElseThrow(() -> new RuntimeException("CoverageCategory not found"));
}


@PutMapping("/{coverageCategoryId}")
public CoverageCategory updateCoverageCategory(
        @PathVariable Long coverageCategoryId,
        @Valid @RequestBody CoverageCategory coverageCategory
) {
    Optional<CoverageCategory> existingCoverageCategory = coverageCategoryService.findById(coverageCategoryId);
    if (!existingCoverageCategory.isPresent()) {
        throw new RuntimeException("CoverageCategory not found");
    }
    return coverageCategoryService.save(coverageCategory);
}

@DeleteMapping("/{coverageCategoryId}")
public void deleteCoverageCategory(@PathVariable Long coverageCategoryId) {
    Optional<CoverageCategory> optionalCoverageCategory = coverageCategoryService.findById(coverageCategoryId);
    if (!optionalCoverageCategory.isPresent()) {
        throw new RuntimeException("Coverage category not found");
    }

    coverageCategoryService.deleteById(coverageCategoryId);
}

}
