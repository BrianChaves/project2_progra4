package com.una.project1.repository;

import com.una.project1.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    Boolean existsByUsername(String username);
    Optional<User> findByUsername(String username);
    Optional<User> findById(Long id);
}
