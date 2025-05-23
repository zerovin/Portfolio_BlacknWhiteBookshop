package com.bwbs.bookshop.dao;

import org.apache.ibatis.annotations.Param;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.bwbs.bookshop.dto.CartBookDTO;
import com.bwbs.bookshop.entity.CartEntity;
import java.util.*;

@Repository
public interface CartDAO extends JpaRepository<CartEntity, Integer>{
	CartEntity findByUseridAndBno(String userId, int bookNo);	

	List<CartEntity> findByUserid(String userId);
	
	@Query("SELECT new com.bwbs.bookshop.dto.CartBookDTO(c.cno, c.bno, b.title, b.thumb, b.price, c.quantity) "
			+ "FROM CartEntity c JOIN BookEntity b ON c.bno=b.no "
			+ "WHERE c.userid=:userId")
	List<CartBookDTO> findCartWithBookByUserid(@Param("userId") String userId);
	
	void deleteByCnoIn(List<Integer> cnoList);
}
