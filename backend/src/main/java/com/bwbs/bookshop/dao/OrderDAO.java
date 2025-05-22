package com.bwbs.bookshop.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.bwbs.bookshop.entity.OrderEntity;

@Repository
public interface OrderDAO extends JpaRepository<OrderEntity, Integer>{
	
}
