package fr.dawan.eventhub.service;

import java.util.List;

import fr.dawan.eventhub.security.entities.AppUser;

public interface UserService {
	
	AppUser findById(Long id);
	AppUser findByEmail(String email);
	AppUser findByPseudo(String pseudo);
	List<AppUser> findAllAdmin();
	List<AppUser> findAllUser();
	List<AppUser> findAll();
	void deleteUser(Long id);
	AppUser createUser(AppUser user);
	AppUser updateUser(AppUser user);
	

}
