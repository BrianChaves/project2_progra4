package com.una.project1.controller;

import com.una.project1.model.Insurance;
import com.una.project1.model.Vehicle;
import com.una.project1.service.InsuranceService;
import com.una.project1.service.VehicleService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.InputStreamResource;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.validation.BindingResult;
import org.springframework.validation.ObjectError;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/vehicle")
public class VehicleController {
    @Autowired
    private VehicleService vehicleService;
    @Autowired
    private InsuranceService insuranceService;

    @PreAuthorize("hasAuthority('AdministratorClient') || hasAuthority('StandardClient')")
    @GetMapping("")
    public List<Vehicle> getVehicleList() {
        return vehicleService.findAll();

    }

    @PreAuthorize("hasAuthority('AdministratorClient')")
    @PostMapping("")
    public ResponseEntity<?> createVehicle(
            @Valid @ModelAttribute Vehicle vehicle,
            BindingResult result,
            @RequestParam("image") MultipartFile file
    ) throws IOException {
        result = vehicleService.validateCreation(vehicle, file, result, "create");
        if (result.hasErrors()) {
            return ResponseEntity.badRequest().body(result.getAllErrors());
        }
        Vehicle createdVehicle = vehicleService.createVehicle(vehicle, file);
        return ResponseEntity.ok(createdVehicle);
    }

    @GetMapping("/image/{id}")
    public ResponseEntity<InputStreamResource> showVehicleImage(@PathVariable String id) {
        InputStream is = new ByteArrayInputStream(vehicleService.getImage(Long.valueOf(id)));
        return ResponseEntity.status(HttpStatus.OK)
            .contentType(MediaType.IMAGE_JPEG)
            .body(new InputStreamResource(is)
        );
    }

    @PreAuthorize("hasAuthority('AdministratorClient')")
    @GetMapping("/{vehicleId}")
    public ResponseEntity<?> vehicleDetail(@PathVariable Long vehicleId){
        Optional<Vehicle> optionalVehicle = vehicleService.findById(vehicleId);
        if (!optionalVehicle.isPresent()){
            return ResponseEntity.badRequest().body("Vehicle does not exist");
        }
        return ResponseEntity.ok(optionalVehicle.get());
    }

    @PreAuthorize("hasAuthority('AdministratorClient')")
    @PutMapping("/{vehicleId}")
    public ResponseEntity<?> updateVehicle(
            @PathVariable Long vehicleId,
            @Valid @ModelAttribute Vehicle vehicle,
            BindingResult result,
            @RequestParam("image") MultipartFile file
    ) throws IOException {
        Optional<Vehicle> existingVehicle = vehicleService.findById(vehicleId);
        result = vehicleService.validateCreation(vehicle, file, result, "create");
        if (!existingVehicle.isPresent()) {
            result.rejectValue("vehicle", "error.Vehicle", "Vehicle not found.");
        }
        if (result.hasErrors()) {
            return ResponseEntity.badRequest().body(result.getAllErrors());
        }
        vehicleService.updateVehicle(existingVehicle.get(), vehicle, file);
        return ResponseEntity.ok().body("Vehicle successfully updated");
    }

    @PreAuthorize("hasAuthority('AdministratorClient')")
    @DeleteMapping("/{vehicleId}/delete")
    public ResponseEntity<?> deleteVehicle(@PathVariable Long vehicleId) {
        Optional<Vehicle> optionalVehicle = vehicleService.findById(vehicleId);
        if (!optionalVehicle.isPresent()) {
            return ResponseEntity.badRequest().body("Vehicle does not exist");
        }
        Vehicle vehicle = optionalVehicle.get();
        for (Insurance insurance : insuranceService.findAll()) {
            if (insurance.getVehicle().equals(vehicle)) {
                return ResponseEntity.badRequest().body("Vehicle is associated with an insurance");
            }
        }
        vehicleService.deleteById(vehicle.getId());
        return ResponseEntity.ok().body("Vehicle successfully deleted");
    }
}







