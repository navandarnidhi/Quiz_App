package com.vivek.QuizApplication.service;

import com.vivek.QuizApplication.entity.PdfEntity;
import com.vivek.QuizApplication.repo.PdfRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PdfService {

    @Autowired
    PdfRepo pdfRepo;


    public List<PdfEntity> getAllPdfs() {
        return pdfRepo.findAll();
    }

    public String uploadPdf(PdfEntity pdfEntity) {
        pdfRepo.save(pdfEntity);
        return "pdf add successful...";
    }

    public PdfEntity getPdfByName(String name) {
        return pdfRepo.findByName(name);
    }
}
