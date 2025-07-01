package com.vivek.QuizApplication.repo;

import com.vivek.QuizApplication.entity.PdfEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PdfRepo extends JpaRepository<PdfEntity,Integer> {
    PdfEntity findByName(String name);
}
