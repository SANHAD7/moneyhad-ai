package com.moneyhad.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ExpenseRequest {

    

    private String category;

    private Double amount;

    private String description;
}