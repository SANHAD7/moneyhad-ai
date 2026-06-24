package com.moneyhad.controller;

import com.moneyhad.dto.GoalRequest;
import com.moneyhad.dto.GoalResponse;
import com.moneyhad.service.GoalService;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/goal")
public class GoalController {

    private final GoalService goalService;

    public GoalController(
            GoalService goalService) {

        this.goalService = goalService;
    }

    @PostMapping("/save")
    public String saveGoal(
            @RequestBody GoalRequest request,
            Authentication authentication) {

        String email = authentication.getName();

        return goalService.saveGoal(
                request,
                email
        );
    }

    @GetMapping
    public GoalResponse getGoal(
            Authentication authentication) {

        String email = authentication.getName();

        return goalService.getGoal(email);
    }

}