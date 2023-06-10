package com.una.project1.controller;

import com.una.project1.model.Coverage;
import com.una.project1.model.CoverageCategory;
import com.una.project1.model.Payment;
import com.una.project1.model.User;
import com.una.project1.service.PaymentScheduleService;
import com.una.project1.service.PaymentService;
import com.una.project1.service.UserService;
import jakarta.servlet.http.HttpSession;
import jakarta.transaction.Transactional;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/payment")
public class PaymentController {
    @Autowired
    private PaymentService paymentService;
    @Autowired
    private UserService userService;

    @PreAuthorize("hasAuthority('StandardClient')")
    @GetMapping("")
    public ResponseEntity<?> getPaymentList(Authentication authentication) {
        Optional<User> user = userService.findByUsername(authentication.getName());
        if (!user.isPresent()) {
            return ResponseEntity.badRequest().body("User does not exist");
        }
        return ResponseEntity.ok().body(user.get().getPayments().stream().toList());
    }


    @PreAuthorize("hasAuthority('StandardClient')")
    @PostMapping("")
    public ResponseEntity<?> createPayment(Authentication authentication, @Valid @RequestBody Payment payment) {
        Optional<User> user = userService.findByUsername(authentication.getName());
        if (!user.isPresent()) {
            return ResponseEntity.badRequest().body("User does not exist");
        }
        paymentService.assignUser(payment, user.get());
        Payment createdPayment = paymentService.createPayment(payment);
        return ResponseEntity.ok(createdPayment);
    }

    @Transactional
    @PreAuthorize("hasAuthority('StandardClient')")
    @GetMapping("/{id}")
    public ResponseEntity<?> paymentDetail(
            Authentication authentication,
            @PathVariable("id") Long id
    ) {
        Optional<Payment> optionalPayment = paymentService.findById(id);
        if (!optionalPayment.isPresent()) {
            return ResponseEntity.badRequest().body("Payment does not exist");
        }
        Payment payment = optionalPayment.get();
        User paymentUser = payment.getUser();
        if (!authentication.getName().equals(paymentUser.getUsername())) {
            return ResponseEntity.ok().body("Access denied");
        }

        return ResponseEntity.ok().body(optionalPayment.get());
    }

    @Transactional
    @PreAuthorize("hasAuthority('StandardClient')")
    @PutMapping("/{number}")
    public ResponseEntity<?> updatePayment(Authentication authentication,
                                           @PathVariable("number") String number,
                                           @Valid @RequestBody Payment updatedPayment) {
        Optional<Payment> existingPayment = paymentService.findByNumber(number);
        if (!existingPayment.isPresent()) {
            return ResponseEntity.badRequest().body("Payment does not exist");
        }
        if (!authentication.getName().equals(existingPayment.get().getUser().getUsername())) {
            return ResponseEntity.ok().body("Access denied");
        }
        paymentService.updatePayment(existingPayment.get(), updatedPayment);
        return ResponseEntity.ok().body(existingPayment.get());
    }

    @Transactional
    @PreAuthorize("hasAuthority('StandardClient')")
    @DeleteMapping("/{id}/delete")
    public ResponseEntity<?> deletePayment(Authentication authentication, @PathVariable("id") Long id) {
        Optional<Payment> optionalPayment = paymentService.findById(id);
        Optional<User> user = userService.findByUsername(authentication.getName());
        if (!optionalPayment.isPresent() || !user.isPresent()) {
            return ResponseEntity.badRequest().body("Payment does not exist");
        }
        Payment payment = optionalPayment.get();
        if (!(authentication.getName().equals(payment.getUser().getUsername()))) {
            return ResponseEntity.ok().body("Access denied");
        }
        if(payment.getInsurances().size() != 0){
            return ResponseEntity.ok().body("Payment is linked with an insurance");
        }
        paymentService.deleteById(payment.getId());
        return ResponseEntity.ok().body("Payment successfully deleted");
    }
}







