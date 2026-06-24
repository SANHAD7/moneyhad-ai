package com.moneyhad.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class AnalyticsResponse {

    private String category;

    private Double totalAmount;
}