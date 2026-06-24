package com.moneyhad.controller;

import com.moneyhad.dto.ProfileResponse;
import com.moneyhad.service.UserService;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/user")
@CrossOrigin(origins = "http://localhost:5173")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {

        this.userService = userService;

    }

    @GetMapping("/profile")
    public ProfileResponse getProfile(
            Authentication authentication) {

        String email = authentication.getName();

        return userService.getProfile(email);

    }

}