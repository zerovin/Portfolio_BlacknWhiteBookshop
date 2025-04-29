package com.bwbs.bookshop.entity;

import java.util.Date;

public interface BookVO {
	public int getNo();
	public String getThumb();
	public String getTitle();
	public String getWrite();
	public String getPublisher();
	public Date getPub_date();
	public int getPrice();
	public int getSales();
	public int getIntro();
}
