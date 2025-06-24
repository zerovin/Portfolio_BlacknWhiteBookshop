package com.bwbs.bookshop.service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Objects;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.bwbs.bookshop.dao.CartDAO;
import com.bwbs.bookshop.dto.PickupDTO;
import com.bwbs.bookshop.entity.PbookEntity;
import com.bwbs.bookshop.entity.PickupEntity;
import com.bwbs.bookshop.repository.PickupRepository;

@Service
public class PickupService {
	@Autowired
	private PickupRepository pRepository;
	@Autowired
	private CartDAO cCao;
	
	@Transactional
    public void savePickup(PickupDTO dto) {
        PickupEntity pickup = new PickupEntity();
        pickup.setUserId(dto.getUserId());
        pickup.setName(dto.getName());
        pickup.setPhone(dto.getPhone());
        pickup.setPdate(dto.getPdate());
        pickup.setPtime(dto.getPtime());
        pickup.setWrap(dto.getWrap());
        pickup.setRegdate(LocalDateTime.now());

        List<PbookEntity> itemList = dto.getItems().stream().map(i -> {
            PbookEntity book = new PbookEntity();
            book.setBno(i.getBno());
            book.setQuantity(i.getQuantity());
            book.setPrice(i.getPrice());
            book.setPickup(pickup);
            return book;
        }).toList();

        pickup.setPbooks(itemList);

        pRepository.save(pickup); 
        
        if(dto.getCnoList() != null && !dto.getCnoList().isEmpty()) {
        	List<Integer> cleanList = dto.getCnoList().stream()
        	        .filter(Objects::nonNull)
        	        .toList();

        	    if (!cleanList.isEmpty()) {
        	    	cCao.deleteAllById(cleanList);
        	    }
        }
    }
}
