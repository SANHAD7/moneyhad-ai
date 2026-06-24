package com.moneyhad.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class BudgetResponse {

    private Double monthlyIncome;

    private Double totalSpent;

    private Double remainingBalance;

    private String warning;
}