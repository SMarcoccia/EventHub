package fr.dawan.eventhub.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import fr.dawan.eventhub.security.entities.AppUser;
import fr.dawan.eventhub.security.service.AccountService;
import lombok.NoArgsConstructor;


@RestController
@NoArgsConstructor
@RequestMapping("/api/users")
public class UserController {
	
    	@Autowired
	private AccountService accountService;
	
	private final String MT_AJV= MediaType.APPLICATION_JSON_VALUE;
	
	// Trouver tous les utilisateurs.	
	@GetMapping(produces=MT_AJV)
	@PreAuthorize("hasAuthority(SCOPE_ADMIN)")
	public List<AppUser> findAllUser(){
		return accountService.findAllUsers();
	}
	
	// Trouver tous les utilisateur qui on un rôle Admin.	
//	@CrossOrigin
//	@GetMapping(value="/admin", produces=MT_AJV)
//	public List<AppUser> findAllAdmin(){
//		return userService.findAllAdmin();
//	}
	
	// Trouver un utilisateur par son id.	
//	@GetMapping(value="/{id}", produces = MT_AJV)
//	public ResponseEntity<AppUser> findUserPerId(@PathVariable Long id) {
//		AppUser user=accountService.findUserById(id);
//		if(user != null)
//		{
//			return ResponseEntity.ok(user);
//		}
//		return ResponseEntity.notFound().build();	
//	}
	
	// Supprimer un utilisateur.	
	@DeleteMapping(value="/{id}")
	@PreAuthorize("hasAuthority(SCOPE_USER)")
	public ResponseEntity<String> deleteUser(@PathVariable Long id) {
		try {
			accountService.deleteUser(id);
		} catch (Exception e) {
			return ResponseEntity.notFound().build();
		}
		return ResponseEntity.ok("L'utilisateur à déjà été supprimé.");
	}
	
	// Mettre à jour les données de l'utilisateur.	
	@PutMapping(value="/{id}", produces=MT_AJV, consumes =MT_AJV)
	@PreAuthorize("hasAuthority(SCOPE_USER)")
	public AppUser updateUser(@PathVariable Long id, @RequestBody AppUser user) {
		return accountService.updateUser(user);
	}
	
	// Créer un utilisateur.	
	@PostMapping(produces=MT_AJV, consumes=MT_AJV)
	@PreAuthorize("hasAuthority(SCOPE_USER)")
	public AppUser createUser(@RequestBody AppUser user) {
		return accountService.createUser(user);
	}
}
