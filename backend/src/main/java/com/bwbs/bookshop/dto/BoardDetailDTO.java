package com.bwbs.bookshop.dto;

import java.util.Date;

import com.bwbs.bookshop.entity.BoardEntity;

import lombok.Data;

@Data
public class BoardDetailDTO {
	private int no;
	private String category;
	private String title;
	private String content;
	private String userId;
	private String userName;
	private Date regdate;
	private int hit;
	private String filename;
	private String filepath;
	private Long filesize;
	
	public BoardDetailDTO(BoardEntity entity) {
		this.no=entity.getNo();
		this.category=entity.getCategory();
		this.title=entity.getTitle();
		this.content=entity.getContent();
		this.userId=entity.getUserId();
		this.userName=entity.getMember().getUserName();
		this.regdate=entity.getRegdate();
		this.hit=entity.getHit();
		this.filename=entity.getFilename();
		this.filepath=entity.getFilepath();
		this.filesize=entity.getFilesize();
	}
}
