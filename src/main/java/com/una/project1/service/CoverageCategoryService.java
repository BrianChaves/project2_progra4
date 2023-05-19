package com.una.project1.service;

import com.una.project1.model.CoverageCategory;
import com.una.project1.repository.CoverageCategoryRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CoverageCategoryService {

    @Autowired
    private CoverageCategoryRepository coverageCategoryRepository;

    @Transactional
    public Optional<CoverageCategory> findById(Long id) {
        return coverageCategoryRepository.findById(id);
    }

    @Transactional
    public Optional<CoverageCategory> findByName(String name) {
        return coverageCategoryRepository.findByName(name);
    }

    @Transactional
    public List<CoverageCategory> findAll() {
        return coverageCategoryRepository.findAll();
    }

    @Transactional
    public CoverageCategory save(CoverageCategory coverageCategory) {
        return coverageCategoryRepository.save(coverageCategory);
    }

    @Transactional
    public void deleteById(Long id) {
        coverageCategoryRepository.deleteById(id);
    }

}
