package com.bwbs.bookshop.entity;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Date;
import java.util.List;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "pickup")
@Data
public class PickupEntity {
	@Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "pickup_seq_gen")
    @SequenceGenerator(name = "pickup_seq_gen", sequenceName = "pickup_seq", allocationSize = 1)
    private int no;
	@Column(name = "USERID")
	private String userId;
	private String ptime, wrap, name, phone;
	private LocalDateTime regdate;
    private LocalDate pdate;
	
	@OneToMany(mappedBy = "pickup", cascade = CascadeType.ALL, orphanRemoval = true)
	private List<PbookEntity> pbooks;
}
