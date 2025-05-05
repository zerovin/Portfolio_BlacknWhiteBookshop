package com.bwbs.bookshop.restcontroller;

import java.util.*;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.bwbs.bookshop.entity.MemberEntity;
import com.bwbs.bookshop.repository.MemberRepository;

import jakarta.servlet.http.HttpSession;

@RestController
@RequestMapping("/member")
@CrossOrigin(origins = "*")
public class MemberRestController {
	@Autowired
	private final MemberRepository memberRepository;
    private final PasswordEncoder passwordEncoder;
	
    public MemberRestController(MemberRepository memberRepository, PasswordEncoder passwordEncoder) {
        this.memberRepository = memberRepository;
        this.passwordEncoder = passwordEncoder;
    }
    
	@PostMapping("/join")
	public String joinMember(@RequestBody MemberEntity member) {
		boolean exists = memberRepository.findByUserId(member.getUserId()).isPresent();
	    if (exists) {
	        return "이미 존재하는 아이디입니다.";
	    }
	    
		member.setUserPwd(passwordEncoder.encode(member.getUserPwd()));
		member.setEnabled(1);              
	    member.setAuthority("ROLE_USER");    
	    member.setRegdate(new Date());
		
		try {
			memberRepository.save(member);
			return "Success";
		}catch(Exception ex) {
			ex.printStackTrace();
			return "Fail";
		}
	}
	
	@GetMapping("/checkId")
    public String checkId(@RequestParam("userId") String userId) {
		System.out.println("Checking ID: " + userId);
        boolean exists = memberRepository.findByUserId(userId).isPresent();
        
        if (exists) {
            return "exist"; 
        } else {
            return "ok"; 
        }
    }
	
	@PostMapping("/login/{id}/{pw}")
	public ResponseEntity<Map> memberLogin(@PathVariable("id") String userId, @PathVariable("pw") String userPw, HttpSession session){
		Map<String, Object> result=new HashMap<>();
		try {
			boolean exists = memberRepository.findByUserId(userId).isPresent();
			if(!exists) {
				result.put("msg", "NOID");
			}else {
				MemberEntity vo=memberRepository.findById(userId).get();
				if(passwordEncoder.matches(userPw, vo.getUserPwd())) {
					result.put("msg", "LOGIN");
//					result.put("userId", vo.getUserId());
//					result.put("userName", vo.getUserName());
//					result.put("userAuth", vo.getAuthority());
					vo.setLastlogin(new Date());
					
					session.setAttribute("bwbs_userId", vo.getUserId());
					session.setAttribute("bwbs_userName", vo.getUserName());
					session.setAttribute("bwbs_userAuth", vo.getAuthority());
				}else {
					result.put("msg", "NOPW"); 
				}
			}
		}catch(Exception ex) {
			return new ResponseEntity<Map>(null, HttpStatus.INTERNAL_SERVER_ERROR);
		}
		return new ResponseEntity<>(result, HttpStatus.OK);
	}
	
	@PostMapping("/isLogin")
	public ResponseEntity<Map<String, Object>> isLogin(HttpSession session){
		String userId=(String)session.getAttribute("bwbs_userId");
		String userName=(String)session.getAttribute("bwbs_userName");
		String userAuth=(String)session.getAttribute("bwbs_userAuth");
		
		Map<String, Object> result=new HashMap<>();
		if(userId!=null) {
			result.put("loginOk", true);
			result.put("userId", userId);
			result.put("userName", userName);
			result.put("userAuth", userAuth);
		}else {
			result.put("loginOk", false);
		}
		return ResponseEntity.ok(result);
	}
	
	@GetMapping("/logout")
	public ResponseEntity<Map<String, Object>> logout(HttpSession session){
		session.invalidate();
		Map<String, Object> result=new HashMap<>();
		result.put("logout", true);
		return ResponseEntity.ok(result);
	}
}
