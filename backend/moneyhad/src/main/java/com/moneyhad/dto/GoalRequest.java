package com.moneyhad.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class GoalRequest {

    private String goalName;

    private Double targetAmount;

}