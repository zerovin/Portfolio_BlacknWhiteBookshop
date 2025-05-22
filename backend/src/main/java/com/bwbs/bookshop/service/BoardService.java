package com.bwbs.bookshop.service;

import java.util.ArrayList;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import com.bwbs.bookshop.dto.BoardDetailDTO;
import com.bwbs.bookshop.dto.BoardListDTO;
import com.bwbs.bookshop.entity.BoardEntity;
import com.bwbs.bookshop.repository.BoardRepository;

@Service
public class BoardService {
	@Autowired
	private BoardRepository bRepository;
	
	public List<BoardListDTO> getBoardList(int page, String category){
		Pageable pageable=PageRequest.of(page-1, 10, Sort.by("no").descending());
		List<BoardEntity> entityList;
		
		if(category==null || category.isEmpty()) {
			entityList=bRepository.findAllByOrderByNoDesc(pageable);
		}else {
			entityList=bRepository.findByCategoryOrderByNoDesc(category, pageable);
		}
		
		List<BoardListDTO> result=new ArrayList<>();
		for(BoardEntity b:entityList) {
			BoardListDTO dto=new BoardListDTO(b.getNo(), b.getCategory(), b.getTitle(), b.getMember().getUserName(), b.getRegdate(), b.getHit(), b.getFilename());
			result.add(dto);
		}
		return result;
	}
	public long getTotalCount(String category) {
		if(category==null || category.isEmpty()) {
			return bRepository.count();
		}else {
			return bRepository.countByCategory(category);
		}
	}
	public BoardDetailDTO getBoardDetail(int no, boolean increaseHit) {
		Optional<BoardEntity> optional=bRepository.findById(no);
		if(optional.isPresent()) {
			BoardEntity entity=optional.get();
			
			if(increaseHit) {
				entity.setHit(entity.getHit() + 1);
		        bRepository.save(entity);
			}
	        
			return new BoardDetailDTO(entity);
		}else {
			throw new NoSuchElementException("해당 게시글이 존재하지 않습니다");
		}
	}
	public Page<BoardEntity> getUserBoardList(String userId, Pageable pageable){
		return bRepository.findByUserIdOrderByNoDesc(userId, pageable);
	}
}
