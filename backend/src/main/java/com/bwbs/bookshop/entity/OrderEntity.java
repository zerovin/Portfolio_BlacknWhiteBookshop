package com.bwbs.bookshop.entity;

import java.time.LocalDateTime;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.Builder;
import lombok.Data;

@Entity
@Builder
@Data
public class OrderEntity {
	@Id
	private int ono;
	private int bno, quantity, price, total;
	private String userid, title, thumb, receiver, phone, addr;
	private LocalDateTime orderDate;
}
