package com.bwbs.bookshop.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.bwbs.bookshop.entity.CartEntity;
import java.util.*;

@Repository
public interface CartDAO extends JpaRepository<CartEntity, Integer>{
	List<CartEntity> findByUserid(String userId);
}
