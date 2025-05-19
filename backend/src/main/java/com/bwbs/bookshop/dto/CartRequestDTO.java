package com.bwbs.bookshop.dto;

import lombok.Data;

@Data
public class CartRequestDTO {
	private int bookNo;
	private int quantity;
}
