package com.bwbs.bookshop.restcontroller;

import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.bwbs.bookshop.dto.BoardListDTO;
import com.bwbs.bookshop.dto.BoardPageDTO;
import com.bwbs.bookshop.entity.QnaEntity;
import com.bwbs.bookshop.service.QnaService;

import jakarta.servlet.http.HttpSession;

@RestController
@CrossOrigin(origins="*")
public class QnaRestController {
	@Autowired
	private QnaService qService;
	
	@GetMapping("/qna/list/{page}")
	public ResponseEntity<Map<String, Object>> qnaList(@PathVariable int page, @RequestParam(value = "category", required = false) String cate){
		try {
			Map<String, Object> map=new HashMap<String, Object>();
			int block=5;
			
			List<QnaEntity> list=qService.qnaList(page, cate);
			long total=qService.total(cate);
			
			int totalPage=(int)Math.ceil(total/10.0);
			int startPage=((page-1)/block*block)+1;
			int endPage=startPage+block-1;
			if(endPage>totalPage) endPage=totalPage;
			
			map.put("list", list);
			map.put("totalPage", totalPage);
			map.put("startPage", startPage);
			map.put("endPage", endPage);
			return ResponseEntity.ok(map);
		}catch(Exception ex) {
			ex.printStackTrace();
			return new ResponseEntity<>(null,HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
	
	@PostMapping("/qna/insert")
	public ResponseEntity<?> qnaInsert(@RequestBody QnaEntity entity, HttpSession session){
		String userName=(String)session.getAttribute("bwbs_userName");
		entity.setWriter(userName);
		entity.setRegdate(new Date());
		qService.save(entity);
		return ResponseEntity.ok().build();
	}
	
	@GetMapping("/qna/detail/{qno}")
	public ResponseEntity<QnaEntity> qnaDetail(@PathVariable int qno, @RequestParam(required=false) String pw){
		return ResponseEntity.ok(qService.qnaDetail(qno, pw));
	}
	
	@PostMapping("/qna/answer/{qno}")
	public ResponseEntity<?> qnaAnswer(@PathVariable int qno, @RequestBody QnaEntity answer){
		//qService.qnaQna(qno, answer);
		return ResponseEntity.ok().build();
	}
}
