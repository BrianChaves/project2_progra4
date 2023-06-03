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
    public List<Payment> getPaymentList(Authentication authentication) {
        Optional<User> user = userService.findByUsername(authentication.getName());
        if (!user.isPresent()) {
            throw new RuntimeException("User not found");
        }
        return user.get().getPayments().stream().toList();
    }


    @PreAuthorize("hasAuthority('StandardClient')")
    @PostMapping("")
    public ResponseEntity<Payment> createPayment(Authentication authentication, @Valid @RequestBody Payment payment) {
        Optional<User> user = userService.findByUsername(authentication.getName());
        if (!user.isPresent()) {
            throw new RuntimeException("User not found");
        }
        paymentService.assignUser(payment, user.get());
        Payment createdPayment = paymentService.createPayment(payment);
        return ResponseEntity.ok(createdPayment);
    }



    @PreAuthorize("hasAuthority('StandardClient')")
    @GetMapping("/{payment}")
    public Payment paymentDetail(
            @AuthenticationPrincipal User user,
            @PathVariable("payment") Long paymentId
    ) {
        Optional<Payment> optionalPayment = paymentService.findById(paymentId);
        if (!optionalPayment.isPresent()) {
            throw new RuntimeException("Payment not found");
        }

        Payment payment = optionalPayment.get();
        User paymentUser = payment.getUser();
        if (!user.getUsername().equals(paymentUser.getUsername())) {
            throw new RuntimeException("Access denied");
        }

        return payment;
    }

    //nose si esta correcto el de detail

    @PreAuthorize("hasAuthority('StandardClient')")
    @PutMapping("/{paymentId}")
    public ResponseEntity<Payment> updatePayment(Authentication authentication, @PathVariable("paymentId") Long paymentId, @Valid @RequestBody Payment updatedPayment) {
        Optional<Payment> existingPayment = paymentService.findById(paymentId);
        if (!existingPayment.isPresent()) {
            throw new RuntimeException("Payment not found");
        }
        if (!authentication.getName().equals(existingPayment.get().getUser().getUsername())) {
            throw new RuntimeException("Access denied");
        }
        Payment payment = paymentService.updatePayment(existingPayment.get(), updatedPayment);
        return ResponseEntity.ok(payment);
    }

    @PreAuthorize("hasAuthority('StandardClient')")
    @DeleteMapping("/{paymentId}")
    public ResponseEntity<?> deletePayment(Authentication authentication, @PathVariable("paymentId") Long paymentId) {
        Optional<Payment> optionalPayment = paymentService.findById(paymentId);
        Optional<User> user = userService.findByUsername(authentication.getName());
        if (!optionalPayment.isPresent() || !user.isPresent()) {
            return ResponseEntity.status(HttpStatus.OK)
                    .contentType(MediaType.APPLICATION_JSON)
                    .body("{'message': 'Payment not found'}");
        }
        Payment payment = optionalPayment.get();
        User paymentUser = payment.getUser();
        if (!(authentication.getName().equals(payment.getUser().getUsername())) || !(user.get().getPayments().size() > 1)) {
            return ResponseEntity.status(HttpStatus.OK)
                    .contentType(MediaType.APPLICATION_JSON)
                    .body("{'message': 'Access denied'}");
        }
        paymentService.deletePayment(payment);
        return ResponseEntity.status(HttpStatus.OK)
                .contentType(MediaType.APPLICATION_JSON)
                .body("{'message': 'Payment Successfully Deleted'}");    }

}







