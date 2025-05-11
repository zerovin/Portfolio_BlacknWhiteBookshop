package com.bwbs.bookshop.dao;
import java.util.*;
import java.util.stream.Collectors;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.bwbs.bookshop.dto.BookDTO;
import com.bwbs.bookshop.entity.*;
@Repository
public interface BookDAO extends JpaRepository<BookEntity, Integer>{
	@Query(value="SELECT no, title, writer, publisher, pub_date, price, sales, intro, contents, thumb, category, detail_img, link, num "
	        + "FROM (SELECT no, title, writer, publisher, pub_date, price, sales, intro, contents, thumb, category, detail_img, link, rownum as num "
	        + "FROM book ORDER BY no ASC) "
	        + "WHERE num > :start AND num <= :start + 20", nativeQuery=true)
	List<BookEntity> bookListEntity(@Param("start") int start);
	public BookEntity findByNo(int no);
}
