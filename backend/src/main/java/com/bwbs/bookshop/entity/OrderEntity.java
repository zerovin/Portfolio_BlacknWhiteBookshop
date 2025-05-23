package com.bwbs.bookshop.entity;

import java.time.LocalDateTime;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.SequenceGenerator;
import jakarta.persistence.Table;
import lombok.Builder;
import lombok.Data;

@Entity
@Builder
@Data
@Table(name="orders")
public class OrderEntity {
	@Id
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "order_ono_seq")
	@SequenceGenerator(name = "order_ono_seq", sequenceName = "order_ono_seq", allocationSize = 1)
	private int ono;
	private int bno, quantity, price, total;
	private String userid, title, thumb, receiver, phone, addr, msg;
	private LocalDateTime orderDate;
}
