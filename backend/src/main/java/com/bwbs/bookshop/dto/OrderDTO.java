package com.bwbs.bookshop.dto;

import java.util.List;

import com.bwbs.bookshop.entity.OrderEntity;

import lombok.Data;

@Data
public class OrderDTO {
	private List<OrderEntity> orders;
	private List<Integer> cnoList;
}
