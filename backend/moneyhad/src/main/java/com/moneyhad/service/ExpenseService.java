package com.moneyhad.service;

import com.moneyhad.dto.ExpenseRequest;
import com.moneyhad.entity.Expense;
import com.moneyhad.repository.ExpenseRepository;
import org.springframework.stereotype.Service;
import com.moneyhad.entity.User;
import com.moneyhad.repository.UserRepository;

import java.time.LocalDate;
import java.util.List;
import com.moneyhad.dto.ExpenseResponse;
import com.moneyhad.dto.AnalyticsResponse;
import java.util.Map;
import java.util.stream.Collectors;
import com.moneyhad.dto.MonthlyReportResponse;
import java.time.Month;

@Service
public class ExpenseService {

    private final ExpenseRepository expenseRepository;
    private final UserRepository userRepository;

   public ExpenseService(
        ExpenseRepository expenseRepository,
        UserRepository userRepository) {

    this.expenseRepository = expenseRepository;
    this.userRepository = userRepository;
}

   public String addExpense(
        ExpenseRequest request,
        String email) {

      User user = userRepository
        .findByEmail(email)
        .orElse(null);
if (user == null) {
    return "User not found";
}

        Expense expense = new Expense();

        expense.setUser(user);
        expense.setCategory(request.getCategory());
        expense.setAmount(request.getAmount());
        expense.setDescription(
                request.getDescription()
        );

        expense.setDate(LocalDate.now());

        expenseRepository.save(expense);

        return "Expense Added Successfully";
    }

   public List<ExpenseResponse> getExpenses(
        String email) {

    User user = userRepository
            .findByEmail(email)
            .orElse(null);

    if (user == null) {
        return List.of();
    }

    List<Expense> expenses =
            expenseRepository.findByUser(user);

    return expenses.stream()
            .map(expense ->
                    new ExpenseResponse(
        expense.getId(),
        expense.getCategory(),
        expense.getAmount(),
        expense.getDescription(),
        expense.getDate()
)
            )
            .toList();
}
public List<AnalyticsResponse> getCategoryWiseAnalytics(
        String email) {

    User user = userRepository
            .findByEmail(email)
            .orElse(null);

    if (user == null) {
        return List.of();
    }

    List<Expense> expenses =
            expenseRepository.findByUser(user);

    Map<String, Double> categoryTotals =
            expenses.stream()
                    .filter(expense -> expense.getAmount() != null)
                    .collect(
                            Collectors.groupingBy(
                                    Expense::getCategory,
                                    Collectors.summingDouble(
                                            Expense::getAmount
                                    )
                            )
                    );

    return categoryTotals.entrySet()
            .stream()
            .map(entry ->
                    new AnalyticsResponse(
                            entry.getKey(),
                            entry.getValue()
                    )
            )
            .toList();
}
public List<MonthlyReportResponse> getMonthlyReport(
        String email) {

    User user = userRepository
            .findByEmail(email)
            .orElse(null);

    if (user == null) {
        return List.of();
    }

    List<Expense> expenses =
            expenseRepository.findByUser(user);

    Map<Month, Double> monthlyTotals =
            expenses.stream()
                    .filter(expense -> expense.getAmount() != null)
                    .collect(
                            Collectors.groupingBy(
                                    expense -> expense.getDate()
                                            .getMonth(),
                                    Collectors.summingDouble(
                                            Expense::getAmount
                                    )
                            )
                    );

    return monthlyTotals.entrySet()
            .stream()
            .map(entry ->
                    new MonthlyReportResponse(
                            entry.getKey().toString(),
                            entry.getValue()
                    )
            )
            .toList();
}
public String deleteExpense(Long id) {

    expenseRepository.deleteById(id);

    return "Expense Deleted Successfully";

}
public String updateExpense(
        Long id,
        ExpenseRequest request) {

    Expense expense =
            expenseRepository.findById(id)
                    .orElse(null);

    if (expense == null) {

        return "Expense not found";

    }

    expense.setCategory(request.getCategory());
    expense.setAmount(request.getAmount());
    expense.setDescription(request.getDescription());

    expenseRepository.save(expense);

    return "Expense Updated Successfully";

}
}