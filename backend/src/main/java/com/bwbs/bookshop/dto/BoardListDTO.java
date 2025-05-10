package com.bwbs.bookshop.dto;

import java.util.Date;

import lombok.Data;

@Data
public class BoardListDTO {
	private int no;
	private String category;
	private String title;
	private String userName;
	private Date regdate;
	private int hit;
	
	public BoardListDTO(int no, String category, String title, String userName, Date regdate, int hit) {
		this.no=no;
		this.category=category;
		this.title=title;
		this.userName=userName;
		this.regdate=regdate;
		this.hit=hit;
	}
}
