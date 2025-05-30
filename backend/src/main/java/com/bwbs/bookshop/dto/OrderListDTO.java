package com.bwbs.bookshop.dto;

import java.time.LocalDateTime;
import java.util.Date;

import lombok.Data;

@Data
public class OrderListDTO {
	private int orderNo;
	private String orderNoText;
	private LocalDateTime orderDate;
	private String title;
	private int quantity;
	private int total;
	private String method;
	private String userid;
}
