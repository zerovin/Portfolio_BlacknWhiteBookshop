package com.bwbs.bookshop.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.bwbs.bookshop.entity.MemberEntity;

public interface MemberRepository extends JpaRepository<MemberEntity, String>{
	Optional<MemberEntity> findByUserId(String userId);
	
}
