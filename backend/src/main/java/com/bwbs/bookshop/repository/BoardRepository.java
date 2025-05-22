package com.bwbs.bookshop.repository;

import org.springframework.stereotype.Repository;
import com.bwbs.bookshop.entity.BoardEntity;
import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

@Repository
public interface BoardRepository extends JpaRepository<BoardEntity, Integer>{
	List<BoardEntity> findAllByOrderByNoDesc(Pageable pageable);
	List<BoardEntity> findByCategoryOrderByNoDesc(String category, Pageable pageable);
	Page<BoardEntity> findByUserIdOrderByNoDesc(String userId, Pageable pageable);
	
	int countByCategory(String category);	
	public BoardEntity findByNo(int no);
}

