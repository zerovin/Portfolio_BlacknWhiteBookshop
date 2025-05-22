package com.bwbs.bookshop.dto;

import java.util.Date;

import com.bwbs.bookshop.entity.BoardEntity;

import lombok.Data;

@Data
public class BoardListDTO {
	private int no;
	private String category;
	private String title;
	private String userName;
	private Date regdate;
	private int hit;
	private String filename;
	
	public BoardListDTO(int no, String category, String title, String userName, Date regdate, int hit, String filename) {
		this.no=no;
		this.category=category;
		this.title=title;
		this.userName=userName;
		this.regdate=regdate;
		this.hit=hit;
		this.filename=filename;
	}
	public BoardListDTO(BoardEntity entity) {
		this.no=entity.getNo();
		this.category=entity.getCategory();
		this.title=entity.getTitle();
		this.userName=entity.getMember().getUserName();
		this.regdate=entity.getRegdate();
		this.hit=entity.getHit();
		this.filename=entity.getFilename();
	}
}
