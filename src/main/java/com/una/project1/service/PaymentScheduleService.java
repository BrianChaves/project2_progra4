package com.una.project1.service;
import com.una.project1.model.PaymentSchedule;
import com.una.project1.repository.PaymentScheduleRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class PaymentScheduleService {
    @Autowired
    private PaymentScheduleRepository paymentScheduleRepository;
    @Transactional
    public Optional<PaymentSchedule> findByName(String name){
        return paymentScheduleRepository.findByName(name);
    }
    @Transactional
    public List<PaymentSchedule> findAll() {
        return paymentScheduleRepository.findAll();
    }





}
