package com.bwbs.bookshop.repository;

import org.springframework.stereotype.Repository;
import com.bwbs.bookshop.entity.BoardEntity;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

@Repository
public interface BoardRepository extends JpaRepository<BoardEntity, Integer>{
	@Query(value="SELECT * FROM board "
		    +"ORDER BY no DESC "
		    +"OFFSET :start ROWS FETCH NEXT 10 ROWS ONLY",nativeQuery = true)
	public List<BoardEntity> boardListData(@Param("start") int start);
	
	@Query(value="SELECT * FROM board WHERE category=:category ORDER BY no DESC OFFSET :start ROWS FETCH NEXT 10 ROWS ONLY", nativeQuery = true)
	public List<BoardEntity> findByCategory(@Param("category") String category, @Param("start") int start);

	public long countByCategory(String category);
	
	public BoardEntity findByNo(int no);
}

