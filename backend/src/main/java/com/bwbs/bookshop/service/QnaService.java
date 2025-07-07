package com.bwbs.bookshop.service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.stereotype.Service;

import com.bwbs.bookshop.dao.QnaDAO;
import com.bwbs.bookshop.dto.BoardListDTO;
import com.bwbs.bookshop.entity.BoardEntity;
import com.bwbs.bookshop.entity.QnaEntity;

import jakarta.persistence.EntityNotFoundException;

@Service
public class QnaService {
	@Autowired
	private QnaDAO qDAO;
	
	public void save(QnaEntity entity) {
		qDAO.save(entity);
	}
	
	public List<QnaEntity> qnaList(int page, String cate){
		Pageable pageable=PageRequest.of(page-1, 10, Sort.by("qno").descending());
		List<QnaEntity> list;
		
		if(cate==null || cate.isEmpty()) {
			list=qDAO.findAllByOrderByQnoDesc(pageable);
		}else {
			list=qDAO.findByCateOrderByQnoDesc(cate, pageable);
		}
		
		return list;
	}
	public int total(String cate) {
		if(cate==null || cate.isEmpty()) {
			return (int)qDAO.count();
		}else {
			return qDAO.countByCate(cate);
		}
	}
	
	public QnaEntity qnaDetail(int qno, String pw, String userAuth) {
		QnaEntity qna=qDAO.findById(qno).orElseThrow();
		if("y".equalsIgnoreCase(String.valueOf(qna.getIssecret()))&&(userAuth==null||!userAuth.equalsIgnoreCase("ROLE_ADMIN"))&&!qna.getPw().equals(pw)) {
			throw new AccessDeniedException("비밀번호를 확인해주세요.");
		} 
		return qna;
	}
	
	public void qnaAnswer(int qno, String answer) {
		QnaEntity qna=qDAO.findById(qno).orElseThrow(()->new EntityNotFoundException("QnA not fount"));
		qna.setA_content(answer);
		qna.setA_date(LocalDateTime.now());
		qDAO.save(qna);
	}
	
	public QnaEntity qnaUpdateData(int qno) {
		QnaEntity qna=qDAO.findByQno(qno);
		return qna;
	}
	
	public QnaEntity qnaUpdate(int qno, QnaEntity updatedb) {
		QnaEntity qna=qDAO.findById(qno).orElseThrow();
		qna.setTitle(updatedb.getTitle());
		qna.setContent(updatedb.getContent());
		qna.setCate(updatedb.getCate());
		qna.setIssecret(updatedb.getIssecret());
		if("y".equalsIgnoreCase(updatedb.getIssecret())) {
			qna.setPw(updatedb.getPw());			
		}else {
			qna.setPw(null);
		}
		return qDAO.save(qna);
	}
	
	public void qnaDelete(int qno) {
		QnaEntity qna=qDAO.findByQno(qno);
		qDAO.delete(qna);
	}
}
