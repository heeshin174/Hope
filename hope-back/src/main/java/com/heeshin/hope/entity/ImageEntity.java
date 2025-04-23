package com.heeshin.hope.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Entity(name="image")
@Table(name="image")
public class ImageEntity {

    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    private Long sequence;
    private Long boardNumber;
    private String image;

    public ImageEntity(Long boardNumber, String image) {
        this.boardNumber = boardNumber;
        this.image = image;
    }
}
