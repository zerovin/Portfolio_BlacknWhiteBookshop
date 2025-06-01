package com.bwbs.bookshop.restcontroller;


import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.bwbs.bookshop.dao.QnaDAO;
import com.bwbs.bookshop.dto.BoardListDTO;
import com.bwbs.bookshop.dto.OrderListDTO;
import com.bwbs.bookshop.entity.QnaEntity;
import com.bwbs.bookshop.service.MypageService;

import jakarta.servlet.http.HttpSession;

@RestController
public class MyPageRestController {
	@Autowired
	private MypageService mService;
	@Autowired
	private QnaDAO qDao;
	
	@GetMapping("/mypage/orders")
	public ResponseEntity<List<OrderListDTO>> MyOrders(HttpSession session){
		String userId=(String) session.getAttribute("bwbs_userId");
		if(userId==null) {
			return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
		}
	    
		List<OrderListDTO> result = mService.myorders(userId);
		return ResponseEntity.ok(result);
	}
	@GetMapping("/mypage/qna")
	public ResponseEntity<Page<QnaEntity>> MyQna(HttpSession session, @RequestParam int page){
		String userId=(String)session.getAttribute("bwbs_userName");
		if(userId == null) {
			return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
		}
		Pageable pageable=PageRequest.of(page-1, 10, Sort.by("qno").descending());
		Page<QnaEntity> result=qDao.findByWriterOrderByQnoDesc(userId, pageable);
		return ResponseEntity.ok(result);
	}
	@GetMapping("/myhome/post")
    public ResponseEntity<List<BoardListDTO>> getMyPost(HttpSession session) {
        String userId = (String) session.getAttribute("bwbs_userId");
        if (userId == null) return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();

        List<BoardListDTO> result = mService.getMyPosts(userId);
        return ResponseEntity.ok(result);
    }
    @GetMapping("/myhome/qna")
    public ResponseEntity<List<QnaEntity>> getMyQna(HttpSession session) {
        String userName = (String) session.getAttribute("bwbs_userName");
        if (userName == null) return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();

        List<QnaEntity> result = mService.getMyQna(userName);
        return ResponseEntity.ok(result);
    }
}