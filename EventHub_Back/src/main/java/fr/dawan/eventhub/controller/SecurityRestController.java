package fr.dawan.eventhub.controller;

import org.springframework.http.MediaType;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class SecurityController {
    
	@GetMapping(value="/", produces = MediaType.APPLICATION_JSON_VALUE)
	public String redirect() {
	    return "http://localhost:8081/api/events/list/0?page=0&type=&search=";
	}

}
