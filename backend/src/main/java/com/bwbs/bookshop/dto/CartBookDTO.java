package com.bwbs.bookshop.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
public class CartBookDTO {
	private int cno, bno, quantity, price;
	private String title, thumb;
	
	public CartBookDTO(int cno, int bno, String title, String thumb, int price, int quantity) {
		this.cno=cno;
		this.bno=bno;
		this.title=title;
		this.thumb=thumb;
		this.price=price;
		this.quantity=quantity;
	}
}
