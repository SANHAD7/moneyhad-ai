package com.moneyhad.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class GoalResponse {

    private String goalName;

    private Double targetAmount;

    private Double currentSavings;

    private Double progress;

}