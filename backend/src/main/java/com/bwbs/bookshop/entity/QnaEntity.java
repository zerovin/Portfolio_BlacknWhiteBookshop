package com.bwbs.bookshop.entity;

import java.time.LocalDateTime;
import java.util.Date;

import org.hibernate.annotations.UpdateTimestamp;

import com.fasterxml.jackson.annotation.JsonFormat;

import jakarta.persistence.Column;
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
	
	@JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd", timezone = "Asia/Seoul")
	private Date regdate;
	@UpdateTimestamp
	@Column(name = "a_date")
	@JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd", timezone = "Asia/Seoul")
	private LocalDateTime a_date;
}
