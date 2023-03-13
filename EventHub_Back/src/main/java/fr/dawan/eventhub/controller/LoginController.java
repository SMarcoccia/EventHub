package fr.dawan.eventhub.controller;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import fr.dawan.eventhub.Enum.Role;
import fr.dawan.eventhub.dtos.LoginDTO;
import fr.dawan.eventhub.entities.User;
import fr.dawan.eventhub.service.UserService;


@CrossOrigin
@RestController
@RequestMapping("/api")
public class LoginController {
	
	@Autowired
	private UserService userService;
	
	
	@PostMapping("/register")
	public ResponseEntity<?> register(@RequestBody User user){
		
		User u = userService.findByEmail(user.getEmail());
		Map<String, Object> response = new HashMap<>();
		
		if(u!=null) {
			
			if(userService.findByPseudo(user.getPseudo())!=null){
				response.put("succes", false);
				response.put("message", "L'email et le pseudo sont deja utiliser !");
				return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(response);
				
				
			}		
			response.put("succes", false);
			response.put("message", "L'email est deja utiliser !");
			return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(response);
			
		}
		
		if(userService.findByPseudo(user.getPseudo())!=null) {
			response.put("succes", false);
			response.put("message", "Pseudo deja utiliser !");
			return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(response);
			
		}
		
		
		
		user.setRole(Role.USER);
		
		userService.createUser(user);
		
		response.put("succes", true);
		response.put("message", "Utilisateur enregistrer !");
		
		
		return ResponseEntity.ok(response);
		
	}
	
	
	@PostMapping("/login")
	public ResponseEntity<?> login(@RequestBody LoginDTO loginDTO){
		User user = userService.findByEmail(loginDTO.getEmail());
		
		Map<String, Object> response = new HashMap<>();

		
		if(user == null) {
			response.put("succes", false);
			response.put("message", "Email incorrect.");
			return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(response);
		}
		
		if(!user.getPassword().equals(loginDTO.getPassword())) {
			response.put("succes", false);
			response.put("message", "Mot de passe incorrect.");
			return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(response);
		}
		
		response.put("succes", true);
		response.put("message", "Authentification reussite !");		
		response.put("user",user);
		
		
		
		return ResponseEntity.ok(response);
		
	}
	
	
	
	

}

