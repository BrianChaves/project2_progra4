package com.una.project1.service;

import com.una.project1.model.Vehicle;
import com.una.project1.repository.VehicleRepository;
import jakarta.transaction.Transactional;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.validation.BindingResult;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Optional;
import java.util.Set;

@Service
public class VehicleService {

    @Autowired
    private VehicleRepository vehicleRepository;
    @Transactional
    public Set<Vehicle> findByBrand(String brand){return vehicleRepository.findByBrand(brand);}
    @Transactional
    public Optional<Vehicle> findByBrandAndModel(String brand, String model) {
        return vehicleRepository.findByBrandAndModel(brand, model);
    }
    @Transactional
    public List<Vehicle> findAll() {
        List<Vehicle> vehicleList = vehicleRepository.findAll();
        return vehicleRepository.findAll();
    }

    public BindingResult validateCreation(Vehicle vehicle, MultipartFile carImage, BindingResult result, String type) {
        Optional<Vehicle> optionalVehicle = this.findByBrandAndModel(vehicle.getBrand(), vehicle.getModel());
        if (optionalVehicle.isPresent() && type.equals("create")) {
            result.rejectValue("brand", "error.vehicle", "A vehicle with this brand and model already exists.");
        }
        if (carImage.getOriginalFilename() == ""){
            result.rejectValue("carImage", "error.vehicle", "Image is required.");
        }
        return result;
    }
    public Vehicle createVehicle(Vehicle vehicle, MultipartFile carImage) throws IOException {
        Vehicle savedVehicle = new Vehicle(vehicle.getBrand(), vehicle.getModel(), carImage.getBytes());
        return vehicleRepository.save(savedVehicle);
    }

    public void deleteVehicle(Vehicle vehicle) {
        vehicleRepository.delete(vehicle);
    }

    public void deleteByBrandAndModel(String brand, String model) {
        vehicleRepository.deleteByBrandAndModel(brand, model);
    }

    public Optional<Vehicle> findById(Long id) {
        Optional<Vehicle> vehicle = vehicleRepository.findById(id);
        return vehicle;
    }
    @Transactional
    public byte[] getImage(Long id) {
        Optional<Vehicle> vehicle = vehicleRepository.findById(id);
        byte[] image = vehicle.get().getCarImage() == null || vehicle.get().getCarImage().length == 0 ? null : vehicle.get().getCarImage();
        return image;
    }
    public void save(Vehicle vehicle) {
        vehicleRepository.save(vehicle);
    }
    public void deleteById(Long id) {
        vehicleRepository.deleteById(id);
    }

    public Vehicle updateVehicle(Vehicle existingVehicle, @Valid Vehicle vehicleData, MultipartFile carImage) throws IOException {
        existingVehicle.setBrand(vehicleData.getBrand());
        existingVehicle.setModel(vehicleData.getModel());
        existingVehicle.setCarImage(carImage.getBytes());
        return vehicleRepository.save(existingVehicle);
    }

}


