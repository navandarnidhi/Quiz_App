package com.vivek.QuizApplication.service;

import com.vivek.QuizApplication.entity.Question;
import com.vivek.QuizApplication.repo.QuestionRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class QuestionService {

    @Autowired
    QuestionRepo questionRepo;

    public List<Question> getAllQuestions(){
        return questionRepo.findAll();
    }

    public List<Question> getQuestionsByCategory(String category){
        return questionRepo.findByCategory(category);
    }

    public String addQuestions(Question question){

        questionRepo.save(question);
        return "question add successfully...";
    }

    public String deleteQuestionById(Integer id) {
        questionRepo.deleteById(id);
        return "question deleted...";
    }

    public String updateQuestionById(Integer id, Question question) {
        Optional<Question> questionbyId = questionRepo.findById(id);
        if(questionbyId.isPresent()){
            Question quesObj = questionbyId.get();
            quesObj.setCategory(question.getCategory());
            quesObj.setQuestionText(question.getQuestionText());
            quesObj.setOption1(question.getOption1());
            quesObj.setOption2(question.getOption2());
            quesObj.setOption3(question.getOption3());
            quesObj.setOption4(question.getOption4());
            quesObj.setRightAns(question.getRightAns());
            questionRepo.save(quesObj);
            return "question update successfull";
        }
        else {
            return "question not present in DB";
        }
    }

}
