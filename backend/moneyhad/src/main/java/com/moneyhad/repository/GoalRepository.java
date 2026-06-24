package com.moneyhad.repository;

import com.moneyhad.entity.Goal;
import com.moneyhad.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface GoalRepository
        extends JpaRepository<Goal, Long> {

    Optional<Goal> findByUser(User user);

}