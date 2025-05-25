package com.bwbs.bookshop.entity;

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
	@Temporal(TemporalType.DATE)
    private Date pdate;
	
	@OneToMany(mappedBy = "pickup", cascade = CascadeType.ALL, orphanRemoval = true)
	private List<PbookEntity> pbooks;
}
