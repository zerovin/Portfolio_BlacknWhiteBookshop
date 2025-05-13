package com.bwbs.bookshop.entity;


import java.util.Date;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Lob;
import lombok.Data;

/*
NO         NOT NULL NUMBER         
TITLE      NOT NULL VARCHAR2(200)  
WRITER     NOT NULL VARCHAR2(1000) 
PUBLISHER  NOT NULL VARCHAR2(100)  
PUB_DATE            DATE           
PRICE               NUMBER         
SALES               NUMBER         
THUMB               VARCHAR2(2000) 
CATEGORY            VARCHAR2(100)  
INTRO               CLOB           
CONTENTS            CLOB           
DETAIL_IMG          VARCHAR2(2000) 
LINK                VARCHAR2(1000) 
 */
@Entity(name="book")
@Data
public class BookEntity {
	@Id
	private int no;
	private String title, writer, publisher, thumb, category, detail_img, link;
	@Lob
	@Column(name="intro")
	private String intro;
	@Lob
	@Column(name="contents")
	private String contents;
	private Date pubDate;
	private int price, sales;
}
