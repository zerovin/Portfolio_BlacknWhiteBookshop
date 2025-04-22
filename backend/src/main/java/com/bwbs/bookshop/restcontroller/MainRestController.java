package com.bwbs.bookshop.restcontroller;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import java.util.*;

@RestController
@CrossOrigin(origins = "*")
public class MainRestController {
	@GetMapping("/api/hello")
    public String hello() {
        return "안녕하세요. 현재 시간은 "+new Date()+"입니다. \n";
    }
}
