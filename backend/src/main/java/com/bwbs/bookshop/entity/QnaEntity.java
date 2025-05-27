package com.bwbs.bookshop.entity;

import java.util.Date;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.SequenceGenerator;
import jakarta.persistence.Table;
import lombok.Data;

@Entity
@Data
@Table(name="qna")
public class QnaEntity {
	@Id
	@GeneratedValue(strategy = GenerationType.SEQUENCE,generator = "qna_qno_seq")
	@SequenceGenerator(name="qna_qno_seq",sequenceName="qna_qno_seq",allocationSize = 1)
	private int qno;
	private String title, content, writer, pw, cate, issecret, a_content;
	private Date regdate, aDate;
}
