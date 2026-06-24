package com.moneyhad.service;

import com.moneyhad.dto.GoalRequest;
import com.moneyhad.dto.GoalResponse;
import com.moneyhad.entity.Goal;
import com.moneyhad.entity.User;
import com.moneyhad.repository.GoalRepository;
import com.moneyhad.repository.UserRepository;
import org.springframework.stereotype.Service;
import com.moneyhad.entity.Expense;

@Service
public class GoalService {

    private final GoalRepository goalRepository;
    private final UserRepository userRepository;
    // private final DashboardService dashboardService;

    public GoalService(
            GoalRepository goalRepository,
            UserRepository userRepository
            ) {

        this.goalRepository = goalRepository;
        this.userRepository = userRepository;
        // this.dashboardService = dashboardService;
    }

    public String saveGoal(
            GoalRequest request,
            String email) {

        User user = userRepository
                .findByEmail(email)
                .orElse(null);

        if (user == null) {
            return "User not found";
        }

        Goal goal = goalRepository
                .findByUser(user)
                .orElse(new Goal());

        goal.setGoalName(request.getGoalName());
        goal.setTargetAmount(request.getTargetAmount());
        goal.setUser(user);

        goalRepository.save(goal);

        return "Goal Saved Successfully";
    }

    public GoalResponse getGoal(String email) {

        User user = userRepository
                .findByEmail(email)
                .orElse(null);

        if (user == null) {
            return null;
        }

        Goal goal = goalRepository
                .findByUser(user)
                .orElse(null);

        if (goal == null) {
            return null;
        }

        double totalExpenses = user.getExpenses()
        .stream()
        .mapToDouble(Expense::getAmount)
        .sum();

double currentSavings =
        user.getMonthlyIncome()
        - totalExpenses;

double progress =
        (currentSavings * 100)
        / goal.getTargetAmount();

return new GoalResponse(
        goal.getGoalName(),
        goal.getTargetAmount(),
        currentSavings,
        progress
);
    }
}