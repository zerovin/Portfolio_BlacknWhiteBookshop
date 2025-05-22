package com.bwbs.bookshop.restcontroller;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.bwbs.bookshop.dao.CartDAO;
import com.bwbs.bookshop.dto.CartBookDTO;
import com.bwbs.bookshop.dto.CartRequestDTO;
import com.bwbs.bookshop.entity.CartEntity;
import com.bwbs.bookshop.entity.OrderEntity;
import com.bwbs.bookshop.service.*;

import jakarta.servlet.http.HttpSession;

@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
@RestController
public class CartRestController {
	@Autowired
	private CartDAO cDAO;
	@Autowired
	private CartService cService;
	@Autowired
	private OrderService oService;
	
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
		String userId=(String)session.getAttribute("bwbs_userId");
		if(userId==null) {
			return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("로그인이 필요합니다");
		}
		List<CartBookDTO> cartList=cDAO.findCartWithBookByUserid(userId);
		return ResponseEntity.ok(cartList);
	}
	
	@PutMapping("/cart/update")
	public ResponseEntity<?> updateQuntity(@RequestBody Map<String, Object> request){
		int cno=Integer.parseInt(request.get("cno").toString());
		int quantity=Integer.parseInt(request.get("quantity").toString());
		cService.updateQuantity(cno, quantity);
		return ResponseEntity.ok().build();
	}
	
	@DeleteMapping("/cart/delete/{cno}")
	public ResponseEntity<?> deleteItem(@PathVariable int cno){
		cService.deleteCart(cno);
		return ResponseEntity.ok().build();
	}
	
	@PostMapping("/cart/order")
	public void saveOrders(@RequestBody List<OrderEntity> orders, HttpSession session){
		String userid=(String)session.getAttribute("bwbs_userId");
		LocalDateTime today=LocalDateTime.now();
		List<OrderEntity> updateOrders=orders.stream()
			.map(order -> {
				order.setUserid(userid);
				order.setOrderDate(today);
				return order;
			})
			.toList();
		oService.saveAll(updateOrders);
		//장바구니 목록에서 주문한 cno들 삭제
	}
}
