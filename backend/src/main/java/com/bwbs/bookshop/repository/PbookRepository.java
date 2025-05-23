package com.bwbs.bookshop.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.bwbs.bookshop.entity.PbookEntity;

public interface PbookRepository extends JpaRepository<PbookEntity, Integer>{

}
