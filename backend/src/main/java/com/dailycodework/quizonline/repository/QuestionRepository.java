package com.dailycodework.quizonline.repository;

import com.dailycodework.quizonline.model.Question;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.net.ContentHandler;
import java.util.List;

/**
 * @author Simpson Alfred
 */

public interface QuestionRepository  extends JpaRepository<Question, Long> {


    List<Question> findByQuiz_QuizId(Long quizId);
}
