package com.moneyhad.service;

import com.moneyhad.dto.BudgetPlanResponse;
import com.moneyhad.dto.BudgetResponse;
import com.moneyhad.entity.Budget;
import com.moneyhad.entity.User;
import com.moneyhad.repository.BudgetRepository;
import com.moneyhad.repository.UserRepository;
import org.springframework.stereotype.Service;
import com.moneyhad.dto.BudgetPlanResponse;

@Service
public class BudgetService {

    private final UserRepository userRepository;
    private final BudgetRepository budgetRepository;

    public BudgetService(
            UserRepository userRepository,
            BudgetRepository budgetRepository) {

        this.userRepository = userRepository;
        this.budgetRepository = budgetRepository;
    }

    public BudgetPlanResponse generateBudget(
            String email) {

        User user = userRepository
                .findByEmail(email)
                .orElse(null);

        if (user == null) {

    return new BudgetPlanResponse(
            0.0,
            0.0,
            0.0,
            0.0
    );
}

        double income =
                user.getMonthlyIncome();

        double needs = income * 0.50;

        double wants = income * 0.30;

        double savings = income * 0.20;

        Budget budget = new Budget();

        budget.setEmail(email);
        budget.setNeedsBudget(needs);
        budget.setWantsBudget(wants);
        budget.setSavingsTarget(savings);

        budgetRepository.save(budget);

        return new BudgetPlanResponse(
        income,
        needs,
        wants,
        savings
);
    }
}
