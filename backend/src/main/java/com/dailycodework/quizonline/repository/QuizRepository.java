package com.dailycodework.quizonline.repository;

import com.dailycodework.quizonline.model.Quiz;
import org.springframework.data.jpa.repository.JpaRepository;

public interface QuizRepository extends JpaRepository<Quiz, Long> {
}
