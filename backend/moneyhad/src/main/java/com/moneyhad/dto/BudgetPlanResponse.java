package com.moneyhad.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class BudgetPlanResponse {

    private Double monthlyIncome;
    private Double needsBudget;
    private Double wantsBudget;
    private Double savingsTarget;
}