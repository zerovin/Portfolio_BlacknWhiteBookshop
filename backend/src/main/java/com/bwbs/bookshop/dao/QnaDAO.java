package com.bwbs.bookshop.dao;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.bwbs.bookshop.entity.BoardEntity;
import com.bwbs.bookshop.entity.QnaEntity;

@Repository
public interface QnaDAO extends JpaRepository<QnaEntity, Integer>{
	public List<QnaEntity> findAllByOrderByQnoDesc(Pageable pageable);
	public List<QnaEntity> findByCateOrderByQnoDesc(String cate, Pageable pageable);
	public Page<QnaEntity> findByWriterOrderByQnoDesc(String userId, Pageable pageable);
	public List<QnaEntity> findTop5ByWriterOrderByQnoDesc(String writer);
	
	public int countByCate(String cate);	
	public QnaEntity findByQno(int qno);
}
