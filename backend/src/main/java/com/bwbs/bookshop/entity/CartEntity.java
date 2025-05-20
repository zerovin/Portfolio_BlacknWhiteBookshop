package com.bwbs.bookshop.entity;

import java.util.Date;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.SequenceGenerator;
import jakarta.persistence.Table;
import jakarta.persistence.Temporal;
import jakarta.persistence.TemporalType;
import lombok.Data;

/*
CNO      NOT NULL NUMBER       
BNO      NOT NULL NUMBER       
USERID   NOT NULL VARCHAR2(50) 
QUANTITY          NUMBER       
ADD_DATE          DATE 
 */
@Entity
@Table(name="cart")
@Data
public class CartEntity {
	@Id
	@GeneratedValue(strategy=GenerationType.SEQUENCE, generator="cart_seq_generator")
	@SequenceGenerator(name="cart_seq_generator", sequenceName = "cart_cno_seq", allocationSize = 1)
	private int cno;
	private int bno, quantity;
	private String userid;
	
	@Temporal(TemporalType.TIMESTAMP)
	private Date addDate=new Date();
}
