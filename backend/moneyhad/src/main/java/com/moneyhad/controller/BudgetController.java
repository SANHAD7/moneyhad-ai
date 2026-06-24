package com.moneyhad.controller;

import com.moneyhad.dto.BudgetPlanResponse;
import com.moneyhad.dto.BudgetResponse;
import com.moneyhad.service.BudgetService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/budget")
public class BudgetController {

    private final BudgetService budgetService;

    public BudgetController(
            BudgetService budgetService) {

        this.budgetService = budgetService;
    }

    @GetMapping("/generate")
    public BudgetPlanResponse generateBudget(
            @RequestParam String email) {

        return budgetService.generateBudget(
                email
        );
    }
}