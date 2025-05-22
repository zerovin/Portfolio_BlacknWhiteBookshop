package com.bwbs.bookshop.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.bwbs.bookshop.dao.OrderDAO;
import com.bwbs.bookshop.entity.OrderEntity;

@Service
public class OrderService {
	@Autowired
	private OrderDAO oDAO;
	
	public void saveAll(List<OrderEntity> orderList) {
		/*
		List<OrderEntity> list=orderList.stream()
				.map(vo -> OrderEntity.builder()
					.userid(vo.getUserid())
					.bno(vo.getBno())
					.title(vo.getTitle())
					.thumb(vo.getThumb())
					.quantity(vo.getQuantity())
					.price(vo.getPrice())
					.total(vo.getTotal())
					.receiver(vo.getReceiver())
					.phone(vo.getPhone())
					.addr(vo.getAddr())
					.orderDate(vo.getOrderDate())
					.build()
				)
				.toList();
		*/
		oDAO.saveAll(orderList);
		//장바구니 목록에서 주문한 cno들 삭제
	}
}
