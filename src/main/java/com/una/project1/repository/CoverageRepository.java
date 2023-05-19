package com.una.project1.repository;

import com.una.project1.model.Coverage;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface CoverageRepository extends JpaRepository<Coverage, Long> {

    Optional<Coverage> findByName(String name);
    Optional<Coverage> findById(Long id);

}
