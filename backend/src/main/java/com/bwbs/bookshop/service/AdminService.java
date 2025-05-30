package com.bwbs.bookshop.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.bwbs.bookshop.dao.BookDAO;
import com.bwbs.bookshop.dao.OrderDAO;
import com.bwbs.bookshop.dto.OrderListDTO;
import com.bwbs.bookshop.entity.BookEntity;
import com.bwbs.bookshop.entity.OrderEntity;
import com.bwbs.bookshop.entity.PbookEntity;
import com.bwbs.bookshop.entity.PickupEntity;
import com.bwbs.bookshop.repository.PickupRepository;

@Service
public class AdminService {
	@Autowired
	private OrderDAO oDAO;
	@Autowired
	private PickupRepository pRepository;
	@Autowired
	private BookDAO bDAO;
	
	public List<OrderListDTO> adminOrder(){
		List<OrderListDTO> result=new ArrayList<>();
		
		List<OrderEntity> dList=oDAO.findAll();
		for(OrderEntity o:dList) {
			OrderListDTO dto=new OrderListDTO();
			dto.setOrderNo(o.getOno());
			dto.setOrderNoText("D-"+o.getOno());
			dto.setOrderDate(o.getOrderDate());
			dto.setTitle(o.getTitle());
			dto.setQuantity(o.getQuantity());
			dto.setTotal(o.getTotal());
			dto.setMethod("배송");
			dto.setUserid(o.getUserid());
			result.add(dto);
		}
		
		List<PickupEntity> pList=pRepository.findAll();
		for(PickupEntity p:pList) {
			for(PbookEntity b:p.getPbooks()) {
				OrderListDTO dto=new OrderListDTO();
				dto.setOrderNo(p.getNo());
				dto.setOrderNoText("P-"+p.getNo());
				dto.setOrderDate(p.getRegdate());
				BookEntity book=bDAO.findByNo(b.getBno());
				dto.setTitle(book.getTitle());;
				dto.setQuantity(b.getQuantity());
				dto.setTotal(b.getQuantity()*b.getPrice());
				dto.setMethod("픽업");
				dto.setUserid(p.getUserId());
				result.add(dto);
			}
		}
		
		result.sort((a,b)->b.getOrderDate().compareTo(a.getOrderDate()));
		return result;
	}
}
