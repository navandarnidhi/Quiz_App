package com.vivek.QuizApplication.controller;

import com.vivek.QuizApplication.entity.PdfEntity;
import com.vivek.QuizApplication.entity.Question;
import com.vivek.QuizApplication.service.PdfService;
import com.vivek.QuizApplication.util.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("pdf")
public class PdfController {

    @Autowired
    private PdfService pdfService;

    @Autowired
    private JwtUtil jwtUtil;

    @GetMapping("/getAllPdfs")
    public List<PdfEntity> getAllPdfs() {
        return pdfService.getAllPdfs();
    }

    @PostMapping("/uploadPdf")
    public String uploadPdf(@RequestBody PdfEntity pdfEntity) {
        return pdfService.uploadPdf(pdfEntity);
    }

    @GetMapping("getPdf/{name}")
    public ResponseEntity<?> getPdfByName(@RequestHeader("Authorization") String jwt, @PathVariable String name){
        if(jwt != null && jwt.startsWith("Bearer ")){
            String jwtToken = jwt.substring(7);
            if(jwtUtil.validateToken(jwtToken)){
                PdfEntity pdf = pdfService.getPdfByName(name);
                return ResponseEntity.ok(pdf);
            }
            else{
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid Token");
            }
        }
        else{
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Authorization Header is missing or malformed!");
        }
    }


}
