package com.bwbs.bookshop.service;

import java.sql.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.bwbs.bookshop.dao.CartDAO;
import com.bwbs.bookshop.entity.CartEntity;

@Service
public class CartService {
	@Autowired
	private CartDAO cDAO;
	
	public void addItem(String userId, int bookNo, int quantity) {
		CartEntity targetBook=cDAO.findByUseridAndBno(userId, bookNo);
		if(targetBook != null) {
			targetBook.setQuantity(targetBook.getQuantity()+quantity);
			cDAO.save(targetBook);
		}else {
			CartEntity newBook=new CartEntity();
			newBook.setBno(bookNo);
			newBook.setUserid(userId);
			newBook.setQuantity(quantity);			
			cDAO.save(newBook);
		}
		
	}
	
	public List<CartEntity> getCartList(String userId){
		return cDAO.findByUserid(userId);
	}
	
	public void updateQuantity(int cno, int quantity) {
		CartEntity cart=cDAO.findById(cno).orElseThrow(()->new RuntimeException("Cart not found"));
		cart.setQuantity(quantity);
		cDAO.save(cart);
	}
	
	public void deleteCart(int cno) {
		cDAO.deleteById(cno);
	}
}
