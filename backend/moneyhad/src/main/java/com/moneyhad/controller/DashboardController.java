package com.moneyhad.controller;

import com.moneyhad.dto.DashboardResponse;
import com.moneyhad.dto.SuggestionResponse;
import com.moneyhad.service.UserService;
import org.springframework.web.bind.annotation.*;
import org.springframework.security.core.Authentication;
import com.moneyhad.dto.BudgetResponse;
import com.moneyhad.dto.SuggestionResponse;

@RestController
@RequestMapping("/api/dashboard")
public class DashboardController {

    private final UserService userService;

    public DashboardController(UserService userService) {
        this.userService = userService;
    }

   @GetMapping
public BudgetResponse getDashboard(
        Authentication authentication) {

    String email = authentication.getName();

    return userService.getDashboard(email);
}
 @GetMapping("/suggestion")
public SuggestionResponse getSuggestion(
        Authentication authentication) {

    String email = authentication.getName();

    return userService.getSuggestion(email);
}  
}