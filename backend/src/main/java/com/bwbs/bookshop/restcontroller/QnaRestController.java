package com.bwbs.bookshop.restcontroller;

import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
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
	
	@PostMapping("/qna/detail")
	public ResponseEntity<QnaEntity> qnaDetail(@RequestBody Map<String, Object> godetail){
		int qno=(int)godetail.get("qno");
		String pw=(String)godetail.get("pw");
		String userAuth=(String)godetail.get("userAuth");
		QnaEntity qna=qService.qnaDetail(qno, pw, userAuth);
		return ResponseEntity.ok(qna);
	}
	
	@PostMapping("/qna/{qno}/answer")
	public ResponseEntity<?> qnaAnswer(@PathVariable int qno, @RequestBody QnaEntity answer){
		try {
			qService.qnaAnswer(qno, answer.getA_content());
			return ResponseEntity.ok("답변이 등록되었습니다.");
		}catch(Exception ex) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body("게시글을 찾을 수 없습니다.");
		}
	}
	
	@PostMapping("/qna/updatedata/{qno}")
	public ResponseEntity<?> qnaUpdateData(@PathVariable int qno){
		try {
			QnaEntity qna=qService.qnaUpdateData(qno);
			return ResponseEntity.ok(qna);
		}catch(Exception ex) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body("게시글을 찾을 수 없습니다.");
		}
	}
	
	@PutMapping("/qna/update/{qno}")
	public ResponseEntity<QnaEntity> qnaUpdate(@PathVariable int qno, @RequestBody QnaEntity updatedb){
		qService.qnaUpdate(qno, updatedb);
		return ResponseEntity.ok().build();
	}
	
	@DeleteMapping("/qna/delete/{qno}")
	public ResponseEntity<?> qnaDelete(@PathVariable int qno){
		qService.qnaDelete(qno);
		return ResponseEntity.ok().build();
	}
}
