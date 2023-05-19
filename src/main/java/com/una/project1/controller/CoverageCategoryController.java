package com.una.project1.controller;

import com.una.project1.model.CoverageCategory;
import com.una.project1.model.Payment;
import com.una.project1.model.User;
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
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.List;
import java.util.Optional;

@Controller
@RequestMapping("/coverage/category")
public class CoverageCategoryController {
    @Autowired
    CoverageCategoryService coverageCategoryService;
    @Autowired
    private UserService userService;

    @PreAuthorize("hasAuthority('AdministratorClient')")
    @GetMapping("")
    public String coverageCategoryList(
            Model model,
            Authentication authentication
    ){
        Optional<User> user= userService.findByUsername(authentication.getName());
        List<CoverageCategory> coverageCategories = coverageCategoryService.findAll();
        if (!user.isPresent()){
            return "404";
        }
        model.addAttribute("user", user.get());
        model.addAttribute("coverageCategory", new CoverageCategory());
        model.addAttribute("coverageCategories", coverageCategories);
        return "coverageCategory/list";
    }
    @PreAuthorize("hasAuthority('AdministratorClient')")
    @PostMapping("")
    public String coverageCategoryCreate(
            Model model,
            Authentication authentication,
            @Valid CoverageCategory coverageCategory,
            BindingResult result
    ){
        Optional<User> user= userService.findByUsername(authentication.getName());
        List<CoverageCategory> coverageCategories = coverageCategoryService.findAll();
        if (result.hasErrors()){
            model.addAttribute("coverageCategory", coverageCategory);
            model.addAttribute("coverageCategories", coverageCategories);
            return "coverageCategory/list";
        }
        coverageCategoryService.save(coverageCategory);
        return "redirect:/coverage/category?create=true";
    }

    @PreAuthorize("hasAuthority('AdministratorClient')")
    @GetMapping("/{coverageCategory}")
    public String coverageCategoryDetail(
            Model model,
            Authentication authentication,
            @PathVariable("coverageCategory") Long coverageCategoryId
    ){
        Optional<CoverageCategory> optionaloptionalCoverageCategory = coverageCategoryService.findById(coverageCategoryId);
        if (!optionaloptionalCoverageCategory.isPresent()){
            return "404";
        }
        CoverageCategory coverageCategory = optionaloptionalCoverageCategory.get();
        model.addAttribute("coverageCategory",coverageCategory);
        return "coverageCategory/detail";
    }

    @PreAuthorize("hasAuthority('AdministratorClient')")
    @PostMapping("/{coverageCategory}")
    public String coverageCategoryModify(
            Model model,
            Authentication authentication,
            @Valid CoverageCategory coverageCategory,
            BindingResult result,
            @PathVariable("coverageCategory") Long coverageCategoryId
    ){
        Optional<CoverageCategory> existingCoverageCategory = coverageCategoryService.findById(coverageCategoryId);
        if (!existingCoverageCategory.isPresent()){
            return "404";
        }
        if (result.hasErrors()){
            model.addAttribute("coverageCategory", coverageCategory);
            return "coverageCategory/detail";
        }
        coverageCategoryService.save(coverageCategory);
        return "redirect:/coverage/category?update=true";
    }

    @PreAuthorize("hasAuthority('AdministratorClient')")
    @PostMapping("/{coverageCategory}/delete")
    public String coverageCategoryDelete(
            Model model,
            @PathVariable("coverageCategory") Long coverageCategoryId,
            Authentication authentication
    ){
        Optional<CoverageCategory> optionalcoverageCategory = coverageCategoryService.findById(coverageCategoryId);
        if (!optionalcoverageCategory.isPresent()){
            return "404";
        }
        CoverageCategory coverageCategory = optionalcoverageCategory.get();
        coverageCategoryService.deleteById(coverageCategory.getId());
        return "redirect:/coverage/category?delete=true";
    }
}
