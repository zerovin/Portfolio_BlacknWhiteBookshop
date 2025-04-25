package com.bwbs.bookshop.entity;

import java.util.Date;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.Data;

@Entity
@Data
public class MemberEntity {
	@Id
	private String userId;
	private String userPwd,userName,post,addr1,addr2,email,phone;
	private int enabled;
	private Date regdate,modifydate,lastlogin;
	private String msg,authority;
}
