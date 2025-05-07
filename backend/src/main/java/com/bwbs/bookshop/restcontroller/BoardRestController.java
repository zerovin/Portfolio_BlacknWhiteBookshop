package com.bwbs.bookshop.restcontroller;

import java.io.File;
import java.util.*;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.bwbs.bookshop.entity.BoardEntity;
import com.bwbs.bookshop.repository.BoardRepository;

import org.springframework.core.io.InputStreamResource;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;

import java.io.IOException;
import java.net.URLEncoder;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.io.File;
import java.io.FileInputStream;
import java.io.InputStream;
import java.io.IOException;
import java.net.URLEncoder;

import org.springframework.core.io.InputStreamResource;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;

@RestController
@CrossOrigin(origins="*")
public class BoardRestController {
	@Autowired
	private BoardRepository boardRepository;
	
	@GetMapping("/board/list/{page}")
	public ResponseEntity<Map> boardList(@PathVariable("page") int page,
			           					@RequestParam(name="category", required = false) String category){
		Map map=new HashMap();
		try {
			int rowSize=10;
			int block=5;
			int start=(page-1)*rowSize;
			
			List<BoardEntity> list;
	        long total;

	        if (category == null || category.isEmpty()) {
	            list = boardRepository.boardListData(start);
	            total = boardRepository.count();
	        } else {
	            list = boardRepository.findByCategory(category, start);
	            total = boardRepository.countByCategory(category);
	        }
	        
	        int totalpage=(int)Math.ceil(total/10.0);
	        int startpage=((page-1)/block*block)+1;
			int endpage=startpage+block-1;
			if(endpage>totalpage) endpage=totalpage;
			
			map.put("list", list);
			map.put("curpage", page);
			map.put("totalpage", totalpage);
			map.put("startpage", startpage);
			map.put("endpage", endpage);
		}catch(Exception ex) {
			ex.printStackTrace();
			return new ResponseEntity<>(null,HttpStatus.INTERNAL_SERVER_ERROR);
		}
		return new ResponseEntity<>(map,HttpStatus.OK);
	}
	@GetMapping("/board/detail/{no}")
	public ResponseEntity<BoardEntity> boardDetail(@PathVariable("no") int no){
		Optional<BoardEntity> optional=boardRepository.findById(no);
		if(optional.isEmpty()) {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
		BoardEntity entity=optional.get();
		entity.setHit(entity.getHit()+1);
		boardRepository.save(entity);
		
		return new ResponseEntity<>(entity, HttpStatus.OK);
	}
	@PutMapping("/board/update/{no}")
	public ResponseEntity<?> updateBoard(@PathVariable int no, @RequestBody BoardEntity updatedData){
		Optional<BoardEntity> optional=boardRepository.findById(no);
		if(optional.isEmpty()) {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
		BoardEntity entity=optional.get();
		int originalHit=entity.getHit();
		entity.setTitle(updatedData.getTitle());
		entity.setContent(updatedData.getContent());
		entity.setCategory(updatedData.getCategory());
		entity.setHit(originalHit);
		boardRepository.save(entity);
		return new ResponseEntity<>(HttpStatus.OK);
	}
	@PostMapping("/board/insert")
	public ResponseEntity<?> insertBoard(@RequestParam("title") String title, @RequestParam("content") String content,
										 @RequestParam("category") String category, 
										 @RequestParam(value="file", required=false) MultipartFile file){
		try {
			BoardEntity entity=new BoardEntity();
			entity.setTitle(title);
			entity.setContent(content);
			entity.setCategory(category);
			entity.setRegdate(new Date());
			entity.setHit(0);
			
			entity.setUserId("juhee");
			
			String uploadDir=System.getProperty("user.dir")+"/uploads";
			File folder=new File(uploadDir);
			if(!folder.exists()) folder.mkdirs();
			if(file!=null && !file.isEmpty()) {
				String uuid=UUID.randomUUID().toString();
				String filename=uuid+"_"+file.getOriginalFilename();
				File saveFile=new File(folder, filename);
				file.transferTo(saveFile);
				
				entity.setFilename(file.getOriginalFilename());
				entity.setFilepath("/uploads/"+filename);
				entity.setFilesize(file.getSize());
			}
			boardRepository.save(entity);
			return new ResponseEntity<>(HttpStatus.CREATED);
		}catch(Exception ex) {
			ex.printStackTrace();
			return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
	@GetMapping("/board/download")
	public ResponseEntity<Resource> downloadFile(@RequestParam String filename) throws IOException {
	    String uploadDir = System.getProperty("user.dir") + "/uploads";
	    File file = new File(uploadDir, filename);

	    if (!file.exists()) {
	        return ResponseEntity.notFound().build();
	    }

	    InputStreamResource resource = new InputStreamResource(new FileInputStream(file));
	    String encodedName = URLEncoder.encode(filename, "UTF-8").replaceAll("\\+", "%20");

	    return ResponseEntity.ok()
	            .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + encodedName + "\"")
	            .contentLength(file.length())
	            .contentType(MediaType.APPLICATION_OCTET_STREAM)
	            .body(resource);
	}
	@DeleteMapping("/board/delete/{no}")
	public ResponseEntity<?> deleteBoard(@PathVariable("no") int no){
		try {
			Optional<BoardEntity> optional=boardRepository.findById(no);
			if(optional.isEmpty()) {
				return new ResponseEntity<>(HttpStatus.NOT_FOUND);
			}
			BoardEntity entity=optional.get();
			if (entity.getFilepath() != null && !entity.getFilepath().isEmpty()) {
	            String uploadDir = System.getProperty("user.dir") + "/uploads";
	            File file = new File(uploadDir, new File(entity.getFilepath()).getName());
	            if (file.exists()) file.delete();
	        }
			boardRepository.delete(entity);
			return new ResponseEntity<>(HttpStatus.OK);
		}catch(Exception ex) {
			ex.printStackTrace();
			return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
}
