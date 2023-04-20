package fr.dawan.eventhub.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import fr.dawan.eventhub.entities.Event;
import fr.dawan.eventhub.entities.User;
import fr.dawan.eventhub.service.UserService;

@RestController
@RequestMapping("/api/users")
public class UserController {
	
	@Autowired
	private UserService userService;
	private final String MT_AJV= MediaType.APPLICATION_JSON_VALUE;
	
	// Trouver tous les utilisateurs.	
	@CrossOrigin
	@GetMapping(produces=MT_AJV)
	public List<User> findAll(){
		return userService.findAll();
	}
	
	// Trouver tous les utilisateur qui on un rôle Admin.	
	@CrossOrigin
	@GetMapping(value="/admin", produces=MT_AJV)
	public List<User> findAllAdmin(){
		return userService.findAllAdmin();
	}
	
	// Trouver un utilisateur par son id.	
	@CrossOrigin
	@GetMapping(value="/{id}", produces = MT_AJV)
	public ResponseEntity<User> findUserPerId(@PathVariable Long id) {
		User user=userService.findById(id);
		if(user != null)
		{
			return ResponseEntity.ok(user);
		}
		return ResponseEntity.notFound().build();	
	}
	
	// Supprimer un utilisateur.	
	@CrossOrigin
	@DeleteMapping(value="/{id}")
	public ResponseEntity<String> deleteUser(@PathVariable Long id) {
		try {
			userService.deleteUser(id);
		} catch (Exception e) {
			return ResponseEntity.notFound().build();
		}
		return ResponseEntity.ok("L'utilisateur à déjà été supprimé.");
	}
	
	// Mettre à jour les données de l'utilisateur.	
	@CrossOrigin
	@PutMapping(value="/{id}", produces=MT_AJV, consumes =MT_AJV)
	public User updateUser(@PathVariable Long id, @RequestBody User user) {
		return userService.updateUser(user);
	}
	
	// Créer un utilisateur.	
	@CrossOrigin
	@PostMapping(produces=MT_AJV, consumes=MT_AJV)
	public User createUser(@RequestBody User user) {
		return userService.createUser(user);
	}
}
