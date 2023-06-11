package com.una.project1.controller;

import com.una.project1.form.CoverageHelper;
import com.una.project1.model.Coverage;
import com.una.project1.model.CoverageCategory;
import com.una.project1.model.Insurance;
import com.una.project1.model.User;
import com.una.project1.service.CoverageCategoryService;
import com.una.project1.service.CoverageService;
import com.una.project1.service.InsuranceService;
import com.una.project1.service.UserService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;

import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/coverage")
public class CoverageController {

    @Autowired
    CoverageCategoryService coverageCategoryService;
    @Autowired
    private CoverageService coverageService;
    @Autowired
    private InsuranceService insuranceService;
    @Autowired
    private UserService userService;


    @PreAuthorize("authentication.principal.username != ''")
    @GetMapping("")
    public ResponseEntity<?> getCoverageList(Authentication authentication) {
        Optional<User> user = userService.findByUsername(authentication.getName());
        if (!user.isPresent()) {
            return ResponseEntity.badRequest().body("User not found");
        }
        return ResponseEntity.ok().body(coverageService.findAll());
    }


    @PreAuthorize("hasAuthority('AdministratorClient')")
    @PostMapping("")
    public ResponseEntity<?> createCoverage(
            Authentication authentication,
            @RequestBody CoverageHelper coverageHelper
    ) {
        Optional<User> user = userService.findByUsername(authentication.getName());
        if (!user.isPresent()) {
            return ResponseEntity.badRequest().body("User not found");
        }
        if (coverageService.findByName(coverageHelper.getName()).isPresent()) {
            return ResponseEntity.badRequest().body("A coverage with the same name already exist");
        }
        CoverageCategory coverageCategory = coverageCategoryService.findById(Long.valueOf(coverageHelper.getCoverageCategory())).get();
        Coverage coverage = new Coverage(
                coverageHelper.getName(),
                coverageHelper.getDescription(),
                coverageHelper.getMinimumPrice(),
                coverageHelper.getValuationPercentagePrice(),
                coverageCategory
        );
        Coverage createdCoverage = coverageService.save(coverage);
        return ResponseEntity.ok(createdCoverage);
    }



    @PreAuthorize("hasAuthority('AdministratorClient')")
    @GetMapping("/{name}")
    public ResponseEntity<?> coverageDetail(@PathVariable("name") String name) {
        Optional<Coverage> optionalCoverage = coverageService.findByName(name);
        if (!optionalCoverage.isPresent()){
            return ResponseEntity.badRequest().body("Coverage does not exist");
        }
        return ResponseEntity.ok().body(optionalCoverage.get());
    }

    @PreAuthorize("hasAuthority('AdministratorClient')")
    @PutMapping("/{name}")
    public ResponseEntity<?> updateCoverage(
            @PathVariable String name,
            @RequestBody CoverageHelper coverageHelper
    ) {
        Optional<Coverage> existingCoverage = coverageService.findByName(name);
        if (!existingCoverage.isPresent()) {
            return ResponseEntity.badRequest().body("Coverage does not exist");
        }
        if (coverageService.findByName(coverageHelper.getName()).isPresent()){
            return ResponseEntity.badRequest().body("A coverage with the same name already exist");
        }
        CoverageCategory coverageCategory = coverageCategoryService.findById(Long.valueOf(coverageHelper.getCoverageCategory())).get();
        Coverage coverage = new Coverage(
                coverageHelper.getName(),
                coverageHelper.getDescription(),
                coverageHelper.getMinimumPrice(),
                coverageHelper.getValuationPercentagePrice(),
                coverageCategory
        );
        coverageService.updateCoverage(existingCoverage.get(), coverage);
        return ResponseEntity.ok().body(existingCoverage.get());
    }

    @PreAuthorize("hasAuthority('AdministratorClient')")
    @DeleteMapping("/{id}/delete")
    public ResponseEntity<?> deleteCoverage(@PathVariable Long id) {
        Optional<Coverage> optionalCoverage = coverageService.findById(id);
        if (!optionalCoverage.isPresent()) {
            return ResponseEntity.badRequest().body("Coverage does not exist");       }
        Coverage coverage = optionalCoverage.get();

        for (Insurance insurance : insuranceService.findAll()) {
            if (insurance.getCoverages().contains(coverage)) {
                return ResponseEntity.ok().body("Coverage is associated with an insurance");
            }
        }
        coverageService.deleteById(coverage.getId());
        return ResponseEntity.ok().body("Coverage successfully deleted");
    }
}







