package com.moneyhad.controller;

import com.moneyhad.dto.ExpenseRequest;
import com.moneyhad.entity.Expense;
import com.moneyhad.service.ExpenseService;
import org.springframework.web.bind.annotation.*;
import org.springframework.security.core.Authentication;
import com.moneyhad.dto.ExpenseResponse;

import java.util.List;
import com.moneyhad.dto.AnalyticsResponse;
import com.moneyhad.dto.MonthlyReportResponse;

@RestController
@RequestMapping("/api/expense")
public class ExpenseController {

    private final ExpenseService expenseService;

    public ExpenseController(
            ExpenseService expenseService) {

        this.expenseService = expenseService;
    }

   @PostMapping("/add")
public String addExpense(
        @RequestBody ExpenseRequest request,
        Authentication authentication) {

    String email = authentication.getName();

    return expenseService.addExpense(
            request,
            email
    );
}

   @GetMapping("/all")
public List<ExpenseResponse> getExpenses(
        Authentication authentication) {

    String email = authentication.getName();

    return expenseService.getExpenses(email);
}
@GetMapping("/analytics")
public List<AnalyticsResponse> getAnalytics(
        Authentication authentication) {

    String email = authentication.getName();

    return expenseService
            .getCategoryWiseAnalytics(email);
}
@GetMapping("/monthly-report")
public List<MonthlyReportResponse> getMonthlyReport(
        Authentication authentication) {

    String email = authentication.getName();

    return expenseService.getMonthlyReport(email);
}
@DeleteMapping("/delete/{id}")
public String deleteExpense(
        @PathVariable Long id) {

    return expenseService.deleteExpense(id);

}
@PutMapping("/update/{id}")
public String updateExpense(
        @PathVariable Long id,
        @RequestBody ExpenseRequest request) {

    return expenseService.updateExpense(id, request);

}
}