package com.nani.hyundai;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;

@Controller
public class TestController {
	
	@GetMapping("/test")
	public String test() {
		return "test";
	}
	
	@GetMapping("/license")
	public String license() {
		return "license";
	}
	
	@PostMapping("/base")
	public String base() {
		return "base";
	}
}
