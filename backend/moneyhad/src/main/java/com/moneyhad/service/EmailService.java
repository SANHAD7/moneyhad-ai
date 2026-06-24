package com.moneyhad.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class EmailService {

    @Autowired
    private JavaMailSender mailSender;

    public void sendOtpEmail(String toEmail, String otp) {

        SimpleMailMessage message = new SimpleMailMessage();
        message.setFrom("sanhad34@gmail.com");
        message.setTo(toEmail);
        message.setSubject("MoneyHad Email Verification");

        message.setText(
                "Welcome to MoneyHad!\n\n" +
                "Your OTP is: " + otp +
                "\n\nDo not share this OTP."
        );

        mailSender.send(message);
    }
}