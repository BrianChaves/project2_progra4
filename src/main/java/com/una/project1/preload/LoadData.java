package com.una.project1.preload;


import com.una.project1.model.*;
import com.una.project1.repository.*;
import com.una.project1.service.UserService;
import com.una.project1.service.VehicleService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.Collections;
import java.util.Date;
import java.util.Set;

import static com.una.project1.utils.ImageUtil.getStaticImage;

@Configuration
class LoadData {
    private static final Logger log = LoggerFactory.getLogger(LoadData.class);

    @Autowired
    private UserService userService;
    private VehicleService vehicleService;
    @Bean
    CommandLineRunner initDatabase(
            UserRepository userRepository,
            RoleRepository roleRepository,
            PaymentRepository paymentRepository,
            PaymentScheduleRepository paymentScheduleRepository,
            VehicleRepository vehicleRepository,
            CoverageCategoryRepository coverageCategoryRepository,
            CoverageRepository coverageRepository,
            InsuranceRepository insuranceRepository
    ) {
        return args -> {
            log.info("Loading Roles...");
            Set<Role> adminRoleSet = new java.util.HashSet<>(Collections.emptySet());
            Set<Role> userRoleSet = new java.util.HashSet<>(Collections.emptySet());
            Set<Coverage> coverageSet = new java.util.HashSet<>(Collections.emptySet());
            Role adminClient = roleRepository.save(new Role("AdministratorClient"));
            Role standardClient = roleRepository.save(new Role("StandardClient"));
            adminRoleSet.add(adminClient);
            userRoleSet.add(standardClient);
            log.info("Loading Users...");
            User user1 = userService.createUser(new User("jdiaz", "Jose","12345", adminRoleSet));
            User user2 = userService.createUser(new User("elopez", "Eliecer","12345", userRoleSet));
            User user3 = userService.createUser(new User("caar", "Carlos","12345", userRoleSet));
            User user4 = userService.createUser(new User("jar", "Eduargo","12345", userRoleSet));
            User user5 = userService.createUser(new User("bra", "Brian","12345", userRoleSet));
            userRepository.save(user1);
            userRepository.save(user2);
            userRepository.save(user3);
            userRepository.save(user4);
            userRepository.save(user5);
            log.info("Loading Payments...");
            Payment payment2 = new Payment("9876543219876543","Eliecer Lopez", "10/24", "456", "New York, United States", user2);
            Payment payment3 = new Payment("1237863123786233","Carlos Alvarez", "11/26", "652", "Cartago, Costa Rica", user3);
            Payment payment4 = new Payment("1231231235555434","Jose Alvarez", "13/28", "677", "Managua, Nicaragua ", user4);
            Payment payment5 = new Payment("1231235471355555","Brian Chaves", "27/26", "420", "Limon City, Costa Rica", user5);
            paymentRepository.save(payment2);
            paymentRepository.save(payment3);
            paymentRepository.save(payment4);
            paymentRepository.save(payment5);
            PaymentSchedule quarterlyPayment = new PaymentSchedule("Quarterly");
            PaymentSchedule biannualPayment = new PaymentSchedule("Biannual");
            PaymentSchedule yearlyPayment = new PaymentSchedule("Yearly");
            paymentScheduleRepository.save(quarterlyPayment);
            paymentScheduleRepository.save(biannualPayment);
            paymentScheduleRepository.save(yearlyPayment);
            log.info("Loading Vehicles...");
            Vehicle vehicle1 = new Vehicle("Toyota", "Corolla", getStaticImage("src/main/resources/static/images/toyota_corolla_2020.jpg"));
            Vehicle vehicle2 = new Vehicle("Honda", "Civic", getStaticImage("src/main/resources/static/images/honda_civic_2020.jpg"));
            Vehicle vehicle3 = new Vehicle("Ford", "Mustang", getStaticImage("src/main/resources/static/images/ford_mustang_2020.jpg"));
            Vehicle vehicle4 = new Vehicle("Nissan", "Sentra", getStaticImage("src/main/resources/static/images/nissan_sentra_2020.jpg"));
            Vehicle vehicle5 = new Vehicle("Chevrolet", "Camaro", getStaticImage("src/main/resources/static/images/chevrolet_camaro_2020.jpg"));
            vehicleRepository.save(vehicle1);
            vehicleRepository.save(vehicle2);
            vehicleRepository.save(vehicle3);
            vehicleRepository.save(vehicle4);
            vehicleRepository.save(vehicle5);
            CoverageCategory coverageCategory1 = new CoverageCategory("Natural Disasters", "Coverages against natural disasters and climate damages.");
            CoverageCategory coverageCategory2 = new CoverageCategory("Civil Responsibility", "Coverages of third-party damage.");
            CoverageCategory coverageCategory3 = new CoverageCategory("Collisions and Overturns", "Collisions against objects on the road or vehicles.");
            CoverageCategory coverageCategory4 = new CoverageCategory("Theft", "Theft of vehicle.");
            CoverageCategory coverageCategory5 = new CoverageCategory("Personal", "Personal injury protection");
            coverageCategoryRepository.save(coverageCategory1);
            coverageCategoryRepository.save(coverageCategory2);
            coverageCategoryRepository.save(coverageCategory3);
            coverageCategoryRepository.save(coverageCategory4);
            coverageCategoryRepository.save(coverageCategory5);
            Coverage coverage1 = new Coverage("Fire damage", "Fires started by natural causes.", 40000.0, 3.0, coverageCategory1);
            Coverage coverage2 = new Coverage("Flooding", "Sea or river flooding above wheel level.", 80000.0, 4.0, coverageCategory1);
            Coverage coverage3 = new Coverage("Death or injury of third-party", "Third-party injuries and death related to collisions with drivers or pedestrians.", 100000.0, 10.0, coverageCategory2);
            Coverage coverage4 = new Coverage("Third-party property damage", "Third-party damage of property related to collisions.", 80000.0, 8.0, coverageCategory2);
            Coverage coverage5 = new Coverage("Collisions", "Collisions against other vehicles.", 60000.0, 3.5, coverageCategory3);
            Coverage coverage6 = new Coverage("Overturns", "Overturns related to road conditions or losing vehicle control.", 40000.0, 10.0, coverageCategory3);
            Coverage coverage7 = new Coverage("Car Theft", "Vehicle steal and subsequent damages.", 40000.0, 10.0, coverageCategory4);
            Coverage coverage8 = new Coverage("Car Hijacking", "Hijacking of vehicle while it's being driven or occupied.", 40000.0, 10.0, coverageCategory4);
            Coverage coverage9 = new Coverage("Hurricane", "Damages by impact of objects flying against the car or falling due to high winds or hurricanes.", 30000.0, 5.0, coverageCategory1);
            Coverage coverage10 = new Coverage("Death", "A death benefit is a payout to the beneficiary of a lifeBeneficiaries must submit proof of death and proof of the deceased’s coverage to the insurer to receive the benefit.", 70000.0, 5.0, coverageCategory5);
            coverageRepository.save(coverage1);
            coverageRepository.save(coverage2);
            coverageRepository.save(coverage3);
            coverageRepository.save(coverage4);
            coverageRepository.save(coverage5);
            coverageRepository.save(coverage6);
            coverageRepository.save(coverage7);
            coverageRepository.save(coverage8);
            coverageRepository.save(coverage9);
            coverageRepository.save(coverage10);
            coverageSet.add(coverage1);
            Date date2 = new Date();
            Date date3 = new Date();
            Date date4 = new Date();
            Date date5 = new Date();
            Insurance insurance2 = new Insurance("123456", 2011, 15000000, date2, payment2, yearlyPayment, user2, vehicle1, coverageSet);
            Insurance insurance3 = new Insurance("345678", 2022, 10000000, date3, payment3, quarterlyPayment, user3, vehicle2, coverageSet);
            Insurance insurance4 = new Insurance("123123", 2005, 25000000, date4, payment4, biannualPayment, user4, vehicle4, coverageSet);
            Insurance insurance5 = new Insurance("7t2713", 2023, 33000000, date5, payment5, biannualPayment, user5, vehicle5, coverageSet);
            insuranceRepository.save(insurance2);
            insuranceRepository.save(insurance3);
            insuranceRepository.save(insurance4);
            insuranceRepository.save(insurance5);


        };
    }
}