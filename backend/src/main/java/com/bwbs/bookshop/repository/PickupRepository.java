package com.bwbs.bookshop.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.bwbs.bookshop.entity.PickupEntity;

public interface PickupRepository extends JpaRepository<PickupEntity, Integer>{
	List<PickupEntity> findByUserId(String userId);
}
