package com.bwbs.bookshop.entity;

import java.util.Date;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.SequenceGenerator;
import jakarta.persistence.Table;
import lombok.Data;

@Entity
@Table(name = "board")
@Data
public class BoardEntity {
	@Id
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "board_seq_gen")
	@SequenceGenerator(name = "board_seq_gen", sequenceName = "board_seq", allocationSize = 1)
	private int no;
	@Column(name="USERID")
	private String userId;
	private String category, title, content, filename, filepath;
	private Date regdate;
	private int hit;
	private Long filesize;
	
	@ManyToOne
	@JoinColumn(name = "USERID", referencedColumnName = "USERID", insertable = false, updatable = false)
	private MemberEntity member;
}
