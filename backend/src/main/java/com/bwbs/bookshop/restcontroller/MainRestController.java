package com.bwbs.bookshop.restcontroller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import java.util.*;

import com.bwbs.bookshop.entity.BookEntity;
import com.bwbs.bookshop.service.*;

@RestController
@CrossOrigin(origins = "*")
public class MainRestController {
	@Autowired
	private BookService bService;
	
	@GetMapping("/main/menu")
	public List<String> main_menu() {
		return bService.categoryList();
	}
	
	@GetMapping("/main/best")
	public List<BookEntity> main_best(){
		return bService.mainBest();
	}
	
	@GetMapping("/main/new")
	public List<BookEntity> main_new(){
		return bService.mainNew();
	}
}
