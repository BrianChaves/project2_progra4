package com.una.project1.repository;

import com.una.project1.model.Vehicle;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.Set;

@Repository
public interface VehicleRepository extends JpaRepository<Vehicle, Long> {

    Optional<Vehicle> findById(Long id);
    Optional<Vehicle> findByBrandAndModel(String brand, String model);
    Set<Vehicle> findByBrand(String brand);
    void deleteByBrandAndModel(String brand, String model);

}
