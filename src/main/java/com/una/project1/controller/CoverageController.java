package com.una.project1.controller;

import com.una.project1.model.Coverage;
import com.una.project1.model.CoverageCategory;
import com.una.project1.model.Insurance;
import com.una.project1.model.User;
import com.una.project1.service.CoverageCategoryService;
import com.una.project1.service.CoverageService;
import com.una.project1.service.InsuranceService;
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

@Controller
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
    @Transactional
    @PreAuthorize("hasAuthority('AdministratorClient')")
    @GetMapping("")
    public String coverageList(
            Model model,
            Authentication authentication
    ){

        Optional<User> user= userService.findByUsername(authentication.getName());
        List<Coverage> coverages = coverageService.findAll();
        if (!user.isPresent()){
            return "404";
        }
        model.addAttribute("user", user.get());
        model.addAttribute("coverageCategories", coverageCategoryService.findAll());
        model.addAttribute("coverages", coverages);
        model.addAttribute("coverage", new Coverage());
        return "coverage/list";
    }

    @Transactional
    @PreAuthorize("hasAuthority('AdministratorClient')")
    @PostMapping("")
    public String coverageCreate(
            Model model,
            Authentication authentication,
            @Valid Coverage coverage,
            BindingResult result
    ){
        Optional<User> user= userService.findByUsername(authentication.getName());
        List<Coverage> coverages = coverageService.findAll();
        if (result.hasErrors()){
            model.addAttribute("coverageCategories", coverageCategoryService.findAll());
            model.addAttribute("coverage", coverage);
            model.addAttribute("coverages", coverages);
            return "coverage/list";
        }
        coverageService.save(coverage);
        return "redirect:/coverage?create=true";
    }

    @Transactional
    @PreAuthorize("hasAuthority('AdministratorClient')")
    @GetMapping("/{coverage}")
    public String coverageDetail(
            Model model,
            Authentication authentication,
            @PathVariable("coverage") Long coverageId
    ){
        Optional<Coverage> optionaloptionalCoverage = coverageService.findById(coverageId);
        if (!optionaloptionalCoverage.isPresent()){
            return "404";
        }
        Coverage coverage = optionaloptionalCoverage.get();
        model.addAttribute("coverageCategories", coverageCategoryService.findAll());
        model.addAttribute("coverage",coverage);
        return "coverage/detail";
    }


    @Transactional
    @PreAuthorize("hasAuthority('AdministratorClient')")
    @PostMapping("/{coverage}")
    public String coverageModify(
            Model model,
            Authentication authentication,
            @Valid Coverage coverage,
            BindingResult result,
            @PathVariable("coverage") Long coverageId
    ){
        Optional<Coverage> existingCoverage = coverageService.findById(coverageId);
        if (!existingCoverage.isPresent()){
            return "404";
        }
        if (result.hasErrors()){
            model.addAttribute("coverageCategories", coverageCategoryService.findAll());
            model.addAttribute("coverage", coverage);
            return "coverage/detail";
        }
        coverageService.save(coverage);
        return "redirect:/coverage?update=true";
    }


    @PreAuthorize("hasAuthority('AdministratorClient')")
    @PostMapping("/{coverage}/delete")
    public String coverageDelete(
            Model model,
            @PathVariable("coverage") Long coverageId,
            Authentication authentication
    ){
        Optional<Coverage> optionalcoverage = coverageService.findById(coverageId);
        if (!optionalcoverage.isPresent()){
            return "404";
        }
        Coverage coverage = optionalcoverage.get();
        for(Insurance insurance : insuranceService.findAll()){
            if (insurance.getCoverages().contains(coverage)){
                return "403";
            }
        }
        coverageService.deleteById(coverage.getId());
        return "redirect:/coverage?delete=true";
    }

}
