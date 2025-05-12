package com.bwbs.bookshop.service;
import java.util.*;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.bwbs.bookshop.dao.*;
import com.bwbs.bookshop.dto.BookDTO;
import com.bwbs.bookshop.entity.*;

@Service
public class BookService {
	@Autowired
	private BookDAO bDao;
	
	public List<BookDTO> bookListAll(int start){
		List<BookEntity> bEntity=bDao.bookListAll(start);
		return bEntity.stream().map(BookDTO::fromEntity).collect(Collectors.toList());
	}
	
	public List<BookDTO> bookListData(String cate, int start){
		List<BookEntity> bEntity=bDao.bookListCate(cate, start);
		return bEntity.stream().map(BookDTO::fromEntity).collect(Collectors.toList());
	}
	
	public int count() {
		return (int)bDao.count();
	}
	
	public int countByCate(String cate) {
		return bDao.countByCategory(cate);
	}
	
	public BookDTO bookDetailData(int no) {
		BookEntity detail=bDao.findByNo(no);
		return BookDTO.fromEntity(detail);
	}
	
	public List<String> categoryList(){
		return bDao.categoryList();
	}
}
