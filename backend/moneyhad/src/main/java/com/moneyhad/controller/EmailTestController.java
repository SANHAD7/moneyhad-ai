package com.moneyhad.controller;

import com.moneyhad.service.EmailService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class EmailTestController {

    private final EmailService emailService;

    public EmailTestController(EmailService emailService) {
        this.emailService = emailService;
    }

    @GetMapping("/send-test-mail")
    public String sendMail() {

        emailService.sendOtpEmail(
                "sanhad34@gmail.com",
                "123456"
        );

        return "Mail Sent Successfully";
    }
}