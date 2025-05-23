package com.bwbs.bookshop.restcontroller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.bwbs.bookshop.dto.PickupDTO;
import com.bwbs.bookshop.service.PickupService;

@RestController
@CrossOrigin(origins="*")
public class PickupRestController {
	@Autowired
	private PickupService pService;
	
	@PostMapping("/pickup/insert")
	public ResponseEntity<String> insert(@RequestBody PickupDTO dto){
		pService.savePickup(dto);
		return ResponseEntity.ok("OK");
	}
}
