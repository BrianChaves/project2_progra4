package com.una.project1.controller;

import com.una.project1.model.Coverage;
import com.una.project1.model.Insurance;
import com.una.project1.model.User;
import com.una.project1.service.CoverageCategoryService;
import com.una.project1.service.CoverageService;
import com.una.project1.service.InsuranceService;
import com.una.project1.service.UserService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;

import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/coverage")
public class CoverageController {

    @Autowired
    CoverageCategoryService coverageCategoryService;
    @Autowired
    private CoverageService coverageService;
    @Autowired
    private InsuranceService insuranceService;
    @Autowired
    private UserService userService;


    @GetMapping("")
    public List<Coverage> getCoverageList(Authentication authentication) {
        Optional<User> user = userService.findByUsername(authentication.getName());
        if (!user.isPresent()) {
            throw new RuntimeException("User not found");
        }
        return coverageService.findAll();
    }


    @PostMapping("")
    public Coverage createCoverage(
            Authentication authentication,
            @Valid @RequestBody Coverage coverage
    ) {
        Optional<User> user = userService.findByUsername(authentication.getName());
        if (!user.isPresent()) {
            throw new RuntimeException("User not found");
        }
        return coverageService.save(coverage);
    }




    @GetMapping("/{coverageId}")
    public Coverage coverageDetail(@PathVariable Long coverageId) {
        Optional<Coverage> optionalCoverage = coverageService.findById(coverageId);
        return optionalCoverage.orElseThrow(() -> new RuntimeException("Coverage not found"));
    }



    @PutMapping("/{coverageId}")
    public Coverage updateCoverage(
            @PathVariable Long coverageId,
            @Valid @RequestBody Coverage coverage
    ) {
        Optional<Coverage> existingCoverage = coverageService.findById(coverageId);
        if (!existingCoverage.isPresent()) {
            throw new RuntimeException("Coverage not found");
        }
        return coverageService.save(coverage);
    }

    @DeleteMapping("/{coverageId}")
    public void deleteCoverage(@PathVariable Long coverageId) {
        Optional<Coverage> optionalCoverage = coverageService.findById(coverageId);
        if (!optionalCoverage.isPresent()) {
            throw new RuntimeException("Coverage not found");
        }
        Coverage coverage = optionalCoverage.get();
        for (Insurance insurance : insuranceService.findAll()) {
            if (insurance.getCoverages().contains(coverage)) {
                throw new RuntimeException("Coverage is associated with an insurance");
            }
        }
        coverageService.deleteById(coverage.getId());
    }
}







