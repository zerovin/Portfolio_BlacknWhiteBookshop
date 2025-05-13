package com.bwbs.bookshop.dto;

import java.util.Date;

import com.bwbs.bookshop.entity.BookEntity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class BookDTO {
	private int no;
	private String title, writer, publisher, thumb, category, detail_img, link;
	private String intro;
    private String contents;
    private Date pub_date;
	private int price, sales;
    
    public static BookDTO fromEntity(BookEntity entity) {
    	return new BookDTO(
    		entity.getNo(),
    		entity.getTitle(),
    		entity.getWriter(),
    		entity.getPublisher(),
    		entity.getThumb(),
    		entity.getCategory(),
    		entity.getDetail_img(),
    		entity.getLink(),
    		entity.getIntro(),
    		entity.getContents(),
    		entity.getPubDate(),
    		entity.getPrice(),
    		entity.getSales()
    	);
    }
}
