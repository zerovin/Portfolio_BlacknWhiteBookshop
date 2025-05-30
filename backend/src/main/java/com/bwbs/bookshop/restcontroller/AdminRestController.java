package com.bwbs.bookshop.restcontroller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import com.bwbs.bookshop.dto.OrderListDTO;
import com.bwbs.bookshop.service.AdminService;

@RestController
@CrossOrigin(origins="*")
public class AdminRestController {
	@Autowired
	private AdminService aService;
	
	@GetMapping("/admin/order")
	public ResponseEntity<List<OrderListDTO>> adminOrder(){
		return ResponseEntity.ok(aService.adminOrder());
	}
}
