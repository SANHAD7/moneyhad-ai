package com.moneyhad.repository;

import com.moneyhad.entity.Expense;
import com.moneyhad.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ExpenseRepository
        extends JpaRepository<Expense, Long> {

    List<Expense> findByUser(User user);
}