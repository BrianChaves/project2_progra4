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
@RequestMapping("/vehicle")
public class VehicleController {
    @Autowired
    private VehicleService vehicleService;
    @Autowired
    private InsuranceService insuranceService;

    @PreAuthorize("hasAuthority('AdministratorClient')")
    @GetMapping("")
    public List<Vehicle> getVehicleList() {
        return vehicleService.findAll();

    }

    @PostMapping("")
    public Vehicle createVehicle(
            @Valid @RequestBody Vehicle vehicle,
            BindingResult result,
            @RequestParam("image") MultipartFile file
    ) throws IOException {
        result = vehicleService.validateCreation(vehicle, file, result, "create");
        if (result.hasErrors()) {
            throw new RuntimeException("Invalid vehicle data");
        }
        return vehicleService.createVehicle(vehicle, file);
    }

    @GetMapping("/image/{id}")
        public ResponseEntity<InputStreamResource> showVehicleImage(@PathVariable String id) {
            InputStream is = new ByteArrayInputStream(vehicleService.getImage(Long.valueOf(id)));
            return ResponseEntity.status(HttpStatus.OK)
                    .contentType(MediaType.IMAGE_JPEG)
                    .body(new InputStreamResource(is));
        }

    @GetMapping("/{vehicleId}")
    public Vehicle vehicleDetail(@PathVariable Long vehicleId){
        Optional<Vehicle> optionalVehicle = vehicleService.findById(vehicleId);
        return optionalVehicle.orElseThrow(() -> new RuntimeException("Vehicle not found"));
    }

    @PutMapping("/{vehicleId}")
    public ResponseEntity<String> updateVehicle(
            @PathVariable Long vehicleId,
            @Valid @RequestBody Vehicle vehicle,
            BindingResult result,
            @RequestParam("image") MultipartFile file

    ) throws IOException {
        Optional<Vehicle> existingVehicle = vehicleService.findById(vehicleId);
        if (!existingVehicle.isPresent()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .contentType(MediaType.APPLICATION_JSON)
                    .body("{'errors':[ {'vehicle': 'Vehicle Not Found'}]}");
        }
        if (result.hasErrors()) {
            String errorString = "{'errors':[";
            for (ObjectError error: result.getAllErrors()) {
                errorString += String.format("{'%s': '%s'},", error.getObjectName(), error.getDefaultMessage());
            }
            errorString += "]}";
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .contentType(MediaType.APPLICATION_JSON)
                    .body(errorString);
        }
        vehicleService.updateVehicle(existingVehicle.get(), vehicle, file);
       return ResponseEntity.status(HttpStatus.OK)
               .contentType(MediaType.APPLICATION_JSON)
               .body("{'message': 'Vehicle Successfully Updated'}");
    }

    @DeleteMapping("/{vehicleId}")
    public ResponseEntity<String> deleteVehicle(@PathVariable Long vehicleId) {
        Optional<Vehicle> optionalVehicle = vehicleService.findById(vehicleId);
        if (!optionalVehicle.isPresent()) {
            throw new RuntimeException("Vehicle not found");
        }
        Vehicle vehicle = optionalVehicle.get();
        for (Insurance insurance : insuranceService.findAll()) {
            if (insurance.getVehicle().equals(vehicle)) {
                throw new RuntimeException("Vehicle is associated with an insurance");
            }
        }
        vehicleService.deleteById(vehicle.getId());
        return ResponseEntity.status(HttpStatus.OK)
                .contentType(MediaType.APPLICATION_JSON)
                .body("{'message': 'Vehicle Successfully Deleted'}");
    }

}







