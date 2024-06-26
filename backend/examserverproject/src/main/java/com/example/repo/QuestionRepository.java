package com.example.repo;

import java.util.Set;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.model.exam.Question;
import com.example.model.exam.Quiz;

public interface QuestionRepository extends JpaRepository<Question, Long> {

	Set<Question> findByQuiz(Quiz quiz);

}
