package com.bwbs.bookshop.entity;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "pbook")
@Data
public class PbookEntity {
	@Id
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "pbook_seq_gen")
    @SequenceGenerator(name = "pbook_seq_gen", sequenceName = "pbook_seq", allocationSize = 1)
    private int no;
	private int bno, quantity, price;
	
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "pno")
	private PickupEntity pickup;
}
