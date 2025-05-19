package com.bwbs.bookshop.service;

import java.sql.Date;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.bwbs.bookshop.dao.CartDAO;
import com.bwbs.bookshop.entity.CartEntity;

@Service
public class CartService {
	@Autowired
	private CartDAO cDAO;
	
	public void addItem(String userId, int bookNo, int quantity) {
		CartEntity cart=new CartEntity();
		cart.setBno(bookNo);
		cart.setUserid(userId);
		cart.setQuantity(quantity);
		
		cDAO.save(cart);
	}
}
