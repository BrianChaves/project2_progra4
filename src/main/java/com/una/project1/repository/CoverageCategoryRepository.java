package com.una.project1.repository;

import com.una.project1.model.CoverageCategory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
@Repository
public interface CoverageCategoryRepository extends JpaRepository<CoverageCategory, Long> {
    Optional<CoverageCategory> findByName(String name);
    Optional<CoverageCategory> findById(Long id);
}
