package com.moneyhad.service;

import com.moneyhad.dto.RegisterRequest;
import com.moneyhad.entity.User;
import com.moneyhad.repository.ExpenseRepository;
import com.moneyhad.repository.UserRepository;
import org.springframework.stereotype.Service;
import org.springframework.security.crypto.password.PasswordEncoder;
import com.moneyhad.dto.LoginRequest;
import com.moneyhad.dto.LoginResponse;
import com.moneyhad.dto.ProfileResponse;
import com.moneyhad.dto.DashboardResponse;
import com.moneyhad.entity.Expense;
import com.moneyhad.dto.BudgetResponse;
import java.util.List;


import com.moneyhad.service.JwtService;
import com.moneyhad.dto.SuggestionResponse;


@Service
public class UserService {

    private final UserRepository userRepository;
    private final EmailService emailService;
    private final PasswordEncoder passwordEncoder;
    private final ExpenseRepository expenseRepository;
    private final JwtService jwtService;

   

   public UserService(UserRepository userRepository,
                   EmailService emailService,
                   PasswordEncoder passwordEncoder,
                   ExpenseRepository expenseRepository,
                   JwtService jwtService) {

    this.userRepository = userRepository;
    this.emailService = emailService;
    this.passwordEncoder = passwordEncoder;
    this.expenseRepository = expenseRepository;
    this.jwtService = jwtService;
}


    public String registerUser(RegisterRequest request) {

    if (userRepository.existsByEmail(request.getEmail())) {
        return "Email already registered";
    }

    String otp = String.valueOf(
            (int)(Math.random() * 900000) + 100000
    );

    User user = new User();

    user.setName(request.getName());
    user.setEmail(request.getEmail());
    user.setPassword(
        passwordEncoder.encode(
                request.getPassword()
        )
);
    user.setMonthlyIncome(request.getMonthlyIncome());
    user.setRiskAppetite(request.getRiskAppetite());
    user.setFinancialGoal(request.getFinancialGoal());

    user.setOtp(otp);
    user.setVerified(false);

    userRepository.save(user);

    emailService.sendOtpEmail(
            user.getEmail(),
            otp
    );

    return "OTP Sent Successfully";
}
public String verifyOtp(String email, String otp) {

    User user = userRepository.findByEmail(email)
            .orElse(null);

    if (user == null) {
        return "User not found";
    }

    if (!user.getOtp().equals(otp)) {
        return "Invalid OTP";
    }

    user.setVerified(true);
    user.setOtp(null);

    userRepository.save(user);

    return "Account Verified Successfully";
}
public LoginResponse loginUser(LoginRequest request) {

    User user = userRepository
            .findByEmail(request.getEmail())
            .orElse(null);

    if (user == null) {
        return new LoginResponse(
                "User not found",
                null
        );
    }

    if (!user.isVerified()) {
        return new LoginResponse(
                "Please verify your email first",
                null
        );
    }

    boolean passwordMatches =
            passwordEncoder.matches(
                    request.getPassword(),
                    user.getPassword()
            );

    if (!passwordMatches) {
        return new LoginResponse(
                "Invalid Password",
                null
        );
    }

    String token = jwtService.generateToken(
            user.getEmail()
    );

    return new LoginResponse(
            "Login Successful",
            token
    );
}
public BudgetResponse getDashboard(String email) {

    User user = userRepository
            .findByEmail(email)
            .orElse(null);

    if (user == null) {

        return new BudgetResponse(
                0.0,
                0.0,
                0.0,
                "User not found"
        );
    }

    List<Expense> expenses =
            expenseRepository.findByUser(user);

    double totalSpent = expenses.stream()
            .filter(expense -> expense.getAmount() != null)
            .mapToDouble(Expense::getAmount)
            .sum();

    double remainingBalance =
            user.getMonthlyIncome() - totalSpent;

    String warning;

    if (totalSpent >= user.getMonthlyIncome() * 0.8) {

        warning =
                "Warning! Spending exceeded 80% of income";

    } else {

        warning = "Within budget";
    }

    return new BudgetResponse(
            user.getMonthlyIncome(),
            totalSpent,
            remainingBalance,
            warning
    );
}
public SuggestionResponse getSuggestion(
        String email) {

    User user = userRepository
            .findByEmail(email)
            .orElse(null);

    if (user == null) {

        return new SuggestionResponse(
                "User not found"
        );
    }

    List<Expense> expenses =
            expenseRepository.findByUser(user);

    double totalSpent = expenses.stream()
            .filter(expense -> expense.getAmount() != null)
            .mapToDouble(Expense::getAmount)
            .sum();

    double income = user.getMonthlyIncome();

    String suggestion;

    if (totalSpent > income * 0.8) {

        suggestion =
                "Warning! You have spent more than 80% of your income.";

    } else if (totalSpent > income * 0.5) {

        suggestion =
                "You are spending moderately. Consider increasing savings.";

    } else {

        suggestion =
                "Excellent! You are spending less than 50% of your income.";
    }

    return new SuggestionResponse(
            suggestion
    );
}
public ProfileResponse getProfile(String email) {

    User user = userRepository
            .findByEmail(email)
            .orElse(null);

    if (user == null) {

        return new ProfileResponse(
                "",
                "",
                0,
                "",
                ""
        );

    }

    return new ProfileResponse(
            user.getName(),
            user.getEmail(),
            user.getMonthlyIncome(),
            user.getFinancialGoal(),
            user.getRiskAppetite()
    );

}
    
}