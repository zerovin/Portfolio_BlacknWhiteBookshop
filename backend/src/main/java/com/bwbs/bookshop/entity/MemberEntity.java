package com.bwbs.bookshop.entity;

import java.util.Date;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.Data;

@Entity(name="member")
@Data
public class MemberEntity {
public MemberEntity() {}
	
	@Id
	@Column(name = "USERID")
	private String userId;
	@Column(name = "USERPWD")
	private String userPwd;
	@Column(name = "USERNAME")
	private String userName;
	private String post,addr1,addr2,email,phone;
	private Integer enabled;
	private Date regdate,modifydate,lastlogin;
	private String msg,authority;
}
