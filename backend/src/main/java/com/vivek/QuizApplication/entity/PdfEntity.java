package com.vivek.QuizApplication.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "pdf_entity")
public class PdfEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    private String name; // Name of the PDF
    private String link; // Public Google Drive link

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getLink() {
        return link;
    }

    public void setLink(String link) {
        this.link = link;
    }
}
