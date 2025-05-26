package com.bwbs.bookshop.restcontroller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.bwbs.bookshop.dto.OrderListDTO;
import com.bwbs.bookshop.service.MypageService;

import jakarta.servlet.http.HttpSession;

@RestController
public class MyPageRestController {
	@Autowired
	private MypageService mService;
	
	@GetMapping("mypage/orders")
	public ResponseEntity<List<OrderListDTO>> MyOrders(HttpSession session){
		String userId=(String) session.getAttribute("bwbs_userId");
		if(userId==null) {
			return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
		}
	    
		List<OrderListDTO> result = mService.myorders(userId);
		return ResponseEntity.ok(result);
	}
}