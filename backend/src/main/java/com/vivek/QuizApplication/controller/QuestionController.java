package com.vivek.QuizApplication.controller;

import com.vivek.QuizApplication.entity.Question;
import com.vivek.QuizApplication.service.QuestionService;
import com.vivek.QuizApplication.util.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("question")
public class QuestionController {

    @Autowired
    private QuestionService questionService;

    @Autowired
    private JwtUtil jwtUtil;

    @GetMapping("/getAllQuestions")
    public ResponseEntity<?> getAllQuestions(@RequestHeader("Authorization") String jwt){

        if(jwt != null && jwt.startsWith("Bearer ")){
            String token = jwt.substring(7);
            if(jwtUtil.validateToken(token)){
                List<Question> questions = questionService.getAllQuestions();
                return ResponseEntity.ok(questions);
            }
            else{
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid Token");
            }
        }
        else{
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Authorization Header is missing or malformed!");
        }

    }

    //fetch this url for quiz application
    @GetMapping("category/{category}")
    public ResponseEntity<?> getQuestionsByCategory(@RequestHeader("Authorization") String jwt, @PathVariable String category){

        if(jwt != null && jwt.startsWith("Bearer ")){
            String token = jwt.substring(7);
            if(jwtUtil.validateToken(token)){
                List<Question> questions = questionService.getQuestionsByCategory(category);
                return ResponseEntity.ok(questions);
            }
            else{
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid Token");
            }
        }
        else{
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Authorization Header is missing or malformed!");
        }
    }

    @PostMapping("/addQuestion")
    public String addQuestions(@RequestBody Question question){
        return questionService.addQuestions(question);
    }

    @DeleteMapping("/delete/{id}")
    public String deleteQuestionById(@PathVariable Integer id){
        return questionService.deleteQuestionById(id);
    }

    @PutMapping("/update")
    public String updateQuestionById(@RequestParam Integer id, @RequestBody Question question){
       return questionService.updateQuestionById(id,question);
    }

}
