package com.bwbs.bookshop.dto;

import java.time.LocalDate;
import java.util.*;

import lombok.Data;

@Data
public class PickupDTO {
	private String userId;
	private String ptime;
	private String wrap;
	private LocalDate pdate;
	private String name;
	private String phone;
	private List<PbookDTO> items;
	private List<Integer> cnoList;
}
