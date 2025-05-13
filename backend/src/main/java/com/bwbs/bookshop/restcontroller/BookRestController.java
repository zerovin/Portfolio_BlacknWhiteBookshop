package com.bwbs.bookshop.restcontroller;
import java.net.URLDecoder;
import java.nio.charset.StandardCharsets;
import java.sql.Clob;
import java.sql.SQLException;
import java.util.*;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.bwbs.bookshop.dao.*;
import com.bwbs.bookshop.dto.BookDTO;
import com.bwbs.bookshop.entity.*;
import com.bwbs.bookshop.service.*;

@RestController
@CrossOrigin(origins="*")
public class BookRestController {
	@Autowired
	private BookDAO bDao;
	@Autowired
	private BookService bService;
    
	@GetMapping("/book/list/{cate}/{page}")
	public ResponseEntity<Map<String, Object>> book_list(@PathVariable("cate") String cate, @PathVariable("page") int page, @RequestParam(name="sort") String sort){
		String category="";
		List<BookDTO> bList=new ArrayList<>();
		int count=0;
		Map<String, Object> map=new HashMap<>();
		
		try {
			int rowSize=20;
			int start=(rowSize*page)-rowSize;
			
		
			if(cate.equals("all")) {
				if(sort.equals("")) {
					bList=bService.bookListAll(start);
				}else {
					bList=bService.bookListAllSort(start, sort);
				}
				count=bService.count();					
			}else {
				String firstDecoded=new String(Base64.getDecoder().decode(cate), StandardCharsets.UTF_8);
				category=URLDecoder.decode(firstDecoded, StandardCharsets.UTF_8);
				if(sort.equals("")) {
					bList=bService.bookListData(category, start);					
				}else {
					bList=bService.bookListDataSort(category, start, sort);
				}
				int countByCate=bService.countByCate(category);
				count=(int)countByCate;				
			}
			
			int totalpage=(int)(Math.ceil(count/(double)rowSize));
			
			final int BLOCK=10;
			int startpage=((page-1)/BLOCK*BLOCK)+1;
			int endpage=((page-1)/BLOCK*BLOCK)+BLOCK;
			if(endpage>totalpage) {
				endpage=totalpage;
			}
						
			map.put("book_list", bList);
			map.put("curpage",page);
			map.put("startpage", startpage);
			map.put("endpage", endpage);
			map.put("totalpage", totalpage);
			
		}catch(Exception ex) {
			return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
		}
		return new ResponseEntity<>(map, HttpStatus.OK);
	}
	
	@GetMapping("/book/detail/{no}")
	public ResponseEntity<BookDTO> book_detail(@PathVariable("no") int no){
		BookDTO vo=new BookDTO();
		try {
			vo=bService.bookDetailData(no);
		}catch(Exception ex) {
			return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
		}
		return new ResponseEntity<>(vo, HttpStatus.OK);
	}
}
