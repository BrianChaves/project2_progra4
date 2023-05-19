package com.una.project1.controller;

import com.una.project1.model.Payment;
import com.una.project1.model.User;
import com.una.project1.service.PaymentService;
import com.una.project1.service.UserService;
import jakarta.servlet.http.HttpSession;
import jakarta.transaction.Transactional;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.List;
import java.util.Optional;

@Controller
@RequestMapping("/payment")
public class PaymentController {
    @Autowired
    private PaymentService paymentService;
    @Autowired
    private UserService userService;

    @PreAuthorize("hasAuthority('StandardClient')")
    @GetMapping("")
    public String paymentList(
            Model model,
            Authentication authentication
    ){
        Optional<User> user= userService.findByUsername(authentication.getName());
        if (!user.isPresent()){
            return "404";
        }
        model.addAttribute("user", user.get());
        model.addAttribute("payment", new Payment());
        model.addAttribute("payments", user.get().getPayments());
        return "payment/list";
    }
    @PreAuthorize("hasAuthority('StandardClient')")
    @PostMapping("")
    public String paymentCreate(
            Model model,
            Authentication authentication,
            @Valid Payment payment,
            BindingResult result
    ){
        Optional<User> user= userService.findByUsername(authentication.getName());
        if (result.hasErrors()){
            model.addAttribute("payment", payment);
            model.addAttribute("payments", user.get().getPayments());
            return "payment/list";
        }
        paymentService.assignUser(payment, user.get());
        paymentService.createPayment(payment);
        return "redirect:payment?create=true";
    }

    @Transactional
    @PreAuthorize("hasAuthority('StandardClient')")
    @GetMapping("/{payment}")
    public String paymentDetail(
            Model model,
            Authentication authentication,
            @PathVariable("payment") Long paymentId
    ){
        Optional<Payment> optionalPayment = paymentService.findById(paymentId);
        if (!optionalPayment.isPresent()){
            return "404";
        }
        Payment payment = optionalPayment.get();
        User paymentUser = payment.getUser();
        if (!authentication.getName().equals(paymentUser.getUsername())){
            return "403";
        }

        model.addAttribute("payment",payment);
        return "payment/detail";
    }

    @Transactional
    @PreAuthorize("hasAuthority('StandardClient')")
    @PostMapping("/{payment}")
    public String paymentModify(
            Model model,
            Authentication authentication,
            @Valid Payment payment,
            BindingResult result,
            @PathVariable("payment") Long paymentId
    ){
        Optional<Payment> existingPayment = paymentService.findById(paymentId);
        if (!existingPayment.isPresent()){
            return "404";
        }
        if (!authentication.getName().equals(existingPayment.get().getUser().getUsername())){
            return "403";
        }
        if (result.hasErrors()){
            model.addAttribute("payment", payment);
            return "payment/detail";
        }
        paymentService.updatePayment(existingPayment.get(), payment);
        return "redirect:/payment?update=true";
    }

    @Transactional
    @PreAuthorize("hasAuthority('StandardClient')")
    @PostMapping("/{payment}/delete")
    public String paymentDelete(
            Model model,
            @PathVariable("payment") Long paymentId,
            Authentication authentication
    ){
        Optional<Payment> optionalPayment = paymentService.findById(paymentId);
        Optional<User> user = userService.findByUsername(authentication.getName());
        if (!optionalPayment.isPresent() || !user.isPresent()){
            return "404";
        }
        Payment payment = optionalPayment.get();
        User paymentUser = payment.getUser();
        if (!(authentication.getName().equals(payment.getUser().getUsername())) || !(user.get().getPayments().size() > 1)){
            return "403";
        }
        paymentService.deletePayment(payment);
        return "redirect:/payment?delete=true";
    }
}
