package com.bwbs.bookshop.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.bwbs.bookshop.dao.CartDAO;
import com.bwbs.bookshop.dao.OrderDAO;
import com.bwbs.bookshop.entity.OrderEntity;

import jakarta.transaction.Transactional;

@Service
public class OrderService {
	@Autowired
	private OrderDAO oDAO;
	@Autowired
	private CartDAO cDAO;
	
	@Transactional
	public void saveAllAndDeleteCart(List<OrderEntity> orders, List<Integer> cnoList) {
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
		oDAO.saveAll(orders);
		if(cnoList != null && !cnoList.isEmpty()) {
			cDAO.deleteByCnoIn(cnoList);
		}
	}
}
