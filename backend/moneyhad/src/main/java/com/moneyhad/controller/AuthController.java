package com.moneyhad.controller;

import com.moneyhad.dto.RegisterRequest;
import com.moneyhad.service.UserService;
import org.springframework.web.bind.annotation.*;
import com.moneyhad.dto.VerifyOtpRequest;
import com.moneyhad.dto.LoginRequest;
import com.moneyhad.dto.LoginResponse;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final UserService userService;

    public AuthController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/register")
    public String register(@RequestBody RegisterRequest request) {

        return userService.registerUser(request);
    }
    @PostMapping("/verify-otp")
public String verifyOtp(
        @RequestBody VerifyOtpRequest request) {

    return userService.verifyOtp(
            request.getEmail(),
            request.getOtp()
    );
}
@PostMapping("/login")
public LoginResponse login(
        @RequestBody LoginRequest request) {

    return userService.loginUser(request);
}
}