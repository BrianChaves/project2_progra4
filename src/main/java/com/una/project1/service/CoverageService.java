package com.una.project1.service;

import com.una.project1.model.Coverage;
import com.una.project1.repository.CoverageRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.validation.BindingResult;

import java.util.List;
import java.util.Optional;

@Service
public class CoverageService {

    @Autowired
    private CoverageRepository coverageRepository;

    @Transactional
    public Optional<Coverage> findById(Long id) {
        return coverageRepository.findById(id);
    }

    @Transactional
    public Optional<Coverage> findByName(String name) {
        return coverageRepository.findByName(name);
    }

    @Transactional
    public List<Coverage> findAll() {
        return coverageRepository.findAll();
    }
    @Transactional
    public Coverage save(Coverage coverage) {
        return coverageRepository.save(coverage);
    }

    @Transactional
    public void deleteById(Long id) {
        coverageRepository.deleteById(id);
    }

    @Transactional
    public void deleteCoverage(Coverage coverage) {
        coverageRepository.delete(coverage);
    }
    @Transactional
    public Coverage createCoverage(Coverage coverage) {
        return coverageRepository.save(coverage);
    }

    public BindingResult validateCreation(Coverage coverage, BindingResult result, String type) {
        Optional<Coverage> optionalCoverage = this.findByName(coverage.getName());
        if (optionalCoverage.isPresent()&& type.equals("create")) {
            result.rejectValue("name", "error.coverage", "A coverage with this name already exists.");
        }
        return result;
    }

}
