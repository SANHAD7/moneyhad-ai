package com.moneyhad.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
@AllArgsConstructor
public class ExpenseResponse {

    private Long id;

    private String category;

    private Double amount;

    private String description;

    private LocalDate date;

}