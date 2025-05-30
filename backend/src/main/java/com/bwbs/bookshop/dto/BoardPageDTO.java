package com.bwbs.bookshop.dto;

import java.util.List;

import lombok.Data;
@Data
public class BoardPageDTO {
	private List<BoardListDTO> list;
	private int curPage;
	private int totalPage;
	private int startPage;
	private int endPage;
	private int totalCount;
}
