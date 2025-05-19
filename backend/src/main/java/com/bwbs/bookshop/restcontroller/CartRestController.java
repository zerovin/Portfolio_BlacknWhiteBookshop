package com.bwbs.bookshop.restcontroller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.bwbs.bookshop.dao.CartDAO;
import com.bwbs.bookshop.dto.CartRequestDTO;
import com.bwbs.bookshop.entity.CartEntity;
import com.bwbs.bookshop.service.*;

import jakarta.servlet.http.HttpSession;

@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
@RestController
public class CartRestController {
	@Autowired
	private CartDAO cDAO;
	@Autowired
	private CartService cService;
	
	@PostMapping("/cart/add")
	public ResponseEntity<?> add_cart(@RequestBody CartRequestDTO cartR,  HttpSession session){
		String userId=(String)session.getAttribute("bwbs_userId");
		if(userId==null) {
			return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("로그인이 필요합니다");
		}
		cService.addItem(userId, cartR.getBookNo(), cartR.getQuantity());
		return ResponseEntity.ok().build();
	}
	
	@GetMapping("/cart/list")
	public ResponseEntity<?> cart_list(HttpSession session){
		System.out.println("aaaaaaaaaaaaaaaaa");
		String userId=(String)session.getAttribute("bwbs_userId");
//		if(userId==null) {
//			return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("로그인이 필요합니다");
//		}
		List<CartEntity> cartList=cDAO.findByUserid(userId);
		return ResponseEntity.ok(cartList);
	}
}
