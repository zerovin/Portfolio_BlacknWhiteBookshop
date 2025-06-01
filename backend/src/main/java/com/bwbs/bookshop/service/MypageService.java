package com.bwbs.bookshop.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.bwbs.bookshop.dao.BookDAO;
import com.bwbs.bookshop.dao.OrderDAO;
import com.bwbs.bookshop.dao.QnaDAO;
import com.bwbs.bookshop.dto.BoardListDTO;
import com.bwbs.bookshop.dto.OrderListDTO;
import com.bwbs.bookshop.entity.BoardEntity;
import com.bwbs.bookshop.entity.BookEntity;
import com.bwbs.bookshop.entity.OrderEntity;
import com.bwbs.bookshop.entity.PbookEntity;
import com.bwbs.bookshop.entity.PickupEntity;
import com.bwbs.bookshop.entity.QnaEntity;
import com.bwbs.bookshop.repository.BoardRepository;
import com.bwbs.bookshop.repository.PickupRepository;

@Service
public class MypageService {
	@Autowired
	private OrderDAO oDao;
	@Autowired
	private PickupRepository pRepository;
	@Autowired
	private BookDAO bDAO;
	@Autowired
    private BoardRepository bRepository;
	@Autowired
	private QnaDAO qDAO;
	
	public List<OrderListDTO> myorders(String userId){
		List<OrderListDTO> result = new ArrayList<>();
		
		List<OrderEntity> dList = oDao.findByUserid(userId);
		for(OrderEntity o : dList) {
			OrderListDTO odto = new OrderListDTO();
			odto.setOrderNo(o.getOno());
			odto.setOrderNoText("D-" + o.getOno());
			odto.setOrderDate(o.getOrderDate());
			odto.setTitle(o.getTitle());
			odto.setQuantity(o.getQuantity());
			odto.setTotal(o.getTotal());
			odto.setMethod("배송");
			result.add(odto);
		}
		 
		List<PickupEntity> pList = pRepository.findByUserId(userId);
		for(PickupEntity p : pList) {
			for(PbookEntity b : p.getPbooks()) {
				OrderListDTO odto = new OrderListDTO();
				odto.setOrderNo(p.getNo());
				odto.setOrderNoText("P-" + p.getNo());
				odto.setOrderDate(p.getRegdate());
				BookEntity book = bDAO.findByNo(b.getBno());
				odto.setTitle(book != null ? book.getTitle() : "알 수 없음");
				odto.setQuantity(b.getQuantity());
				odto.setTotal(b.getQuantity() * b.getPrice());
				odto.setMethod("픽업");
				result.add(odto);
			}
		}
		result.sort((a, b) -> b.getOrderDate().compareTo(a.getOrderDate()));
		
		return result;
	}
	public List<BoardListDTO> getMyPosts(String userId) {
        List<BoardEntity> list = bRepository.findTop5ByUserIdOrderByNoDesc(userId);
        return list.stream()
                   .map(BoardListDTO::new)
                   .toList();
    }

    public List<QnaEntity> getMyQna(String writer) {
        return qDAO.findTop5ByWriterOrderByQnoDesc(writer);
    }
}
