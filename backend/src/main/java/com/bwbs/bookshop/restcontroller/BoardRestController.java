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

import com.bwbs.bookshop.dto.BoardDetailDTO;
import com.bwbs.bookshop.dto.BoardListDTO;
import com.bwbs.bookshop.dto.BoardPageDTO;
import com.bwbs.bookshop.entity.BoardEntity;
import com.bwbs.bookshop.repository.BoardRepository;
import com.bwbs.bookshop.service.BoardService;

import jakarta.servlet.http.HttpSession;

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
	private BoardRepository bRepository;
	@Autowired
	private BoardService bService;
	
	@GetMapping("/board/list/{page}")
	public ResponseEntity<BoardPageDTO> boardList(@PathVariable int page,
			           					@RequestParam(name="category", required = false) String category){
		try {
			int block=5;
			
			List<BoardListDTO> list=bService.getBoardList(page, category);
	        long total=bService.getTotalCount(category);

	        int totalPage=(int)Math.ceil(total/10.0);
	        int startPage=((page-1)/block*block)+1;
			int endPage=startPage+block-1;
			if(endPage>totalPage) endPage=totalPage;
			
			BoardPageDTO dto = new BoardPageDTO();
		    dto.setList(list);
		    dto.setCurPage(page);
		    dto.setTotalPage(totalPage);
		    dto.setStartPage(startPage);
		    dto.setEndPage(endPage);
		    
		    return ResponseEntity.ok(dto);
		}catch(Exception ex) {
			ex.printStackTrace();
			return new ResponseEntity<>(null,HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
	@GetMapping("/board/detail/{no}")
	public ResponseEntity<BoardDetailDTO> boardDetail(@PathVariable("no") int no){
		try {
			BoardDetailDTO dto=bService.getBoardDetail(no, true);
			return ResponseEntity.ok(dto);
		}catch(Exception ex) {
			ex.printStackTrace();
			return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
		}
	}
	@PutMapping("/board/update/{no}")
	public ResponseEntity<?> updateBoard(@PathVariable int no, @RequestBody BoardEntity updatedData){
		Optional<BoardEntity> optional=bRepository.findById(no);
		if(optional.isEmpty()) {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
		BoardEntity entity=optional.get();
		int originalHit=entity.getHit();
		entity.setTitle(updatedData.getTitle());
		entity.setContent(updatedData.getContent());
		entity.setCategory(updatedData.getCategory());
		entity.setHit(originalHit);
		bRepository.save(entity);
		return new ResponseEntity<>(HttpStatus.OK);
	}
	@PostMapping("/board/insert")
	public ResponseEntity<?> insertBoard(@RequestParam("title") String title, @RequestParam("content") String content,
										 @RequestParam("category") String category, 
										 @RequestParam(value="file", required=false) MultipartFile file,
										 HttpSession session){
		try {	
			String userId=(String) session.getAttribute("bwbs_userId");
			if(userId==null) {
				return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
			}
			
			BoardEntity entity=new BoardEntity();
			entity.setTitle(title);
			entity.setContent(content);
			entity.setCategory(category);
			entity.setRegdate(new Date());
			entity.setHit(0);
			entity.setUserId(userId);
			
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
			bRepository.save(entity);
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
			Optional<BoardEntity> optional=bRepository.findById(no);
			if(optional.isEmpty()) {
				return new ResponseEntity<>(HttpStatus.NOT_FOUND);
			}
			BoardEntity entity=optional.get();
			if (entity.getFilepath() != null && !entity.getFilepath().isEmpty()) {
	            String uploadDir = System.getProperty("user.dir") + "/uploads";
	            File file = new File(uploadDir, new File(entity.getFilepath()).getName());
	            if (file.exists()) file.delete();
	        }
			bRepository.delete(entity);
			return new ResponseEntity<>(HttpStatus.OK);
		}catch(Exception ex) {
			ex.printStackTrace();
			return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
}
