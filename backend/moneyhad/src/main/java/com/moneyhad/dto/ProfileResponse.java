package com.moneyhad.dto;

public class ProfileResponse {

    private String name;
    private String email;
    private double monthlyIncome;
    private String financialGoal;
    private String riskAppetite;

    public ProfileResponse(
            String name,
            String email,
            double monthlyIncome,
            String financialGoal,
            String riskAppetite) {

        this.name = name;
        this.email = email;
        this.monthlyIncome = monthlyIncome;
        this.financialGoal = financialGoal;
        this.riskAppetite = riskAppetite;
    }

    public String getName() {
        return name;
    }

    public String getEmail() {
        return email;
    }

    public double getMonthlyIncome() {
        return monthlyIncome;
    }

    public String getFinancialGoal() {
        return financialGoal;
    }

    public String getRiskAppetite() {
        return riskAppetite;
    }

}