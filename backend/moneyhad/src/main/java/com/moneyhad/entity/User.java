package com.moneyhad.entity;

import jakarta.persistence.*;
import lombok.*;
import java.util.List;
import com.fasterxml.jackson.annotation.JsonIgnore;
@Entity
@Table(name = "users")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    @Column(unique = true)
    private String email;

    private String password;

    

    private Double monthlyIncome;

    private String riskAppetite;

    private String financialGoal;

    private boolean verified;

    private String otp;
    @JsonIgnore
    @OneToMany(mappedBy = "user")
    private List<Expense> expenses;
}