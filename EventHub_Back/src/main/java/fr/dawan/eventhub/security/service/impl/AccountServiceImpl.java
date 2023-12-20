package fr.dawan.eventhub.security.service.impl;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.TreeMap;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import fr.dawan.eventhub.dtos.RegisterDTO;
import fr.dawan.eventhub.security.entities.AppRole;
import fr.dawan.eventhub.security.entities.AppUser;
import fr.dawan.eventhub.security.repository.AppRoleRepository;
import fr.dawan.eventhub.security.repository.AppUserRepository;
import fr.dawan.eventhub.security.service.AccountService;
import lombok.AllArgsConstructor;

@Service
@Transactional
@AllArgsConstructor
public class AccountServiceImpl implements AccountService{
    
    private AppUserRepository appUserRepository;
    private AppRoleRepository appRoleRepository;
    private PasswordEncoder passwordEncoder;
    
    @Override
    public AppUser addNewUser(RegisterDTO registerDTO) {
	AppUser appUser=AppUser.builder()
		.username(registerDTO.getUsername())
		.firstname(registerDTO.getFirstname())
		.password(passwordEncoder.encode(registerDTO.getPassword()))
		.email(registerDTO.getEmail())
		.pseudo(registerDTO.getPseudo())
		.build();
	AppUser savedAppUser=appUserRepository.save(appUser);
	return savedAppUser;
    }
    
    @Override
    public AppUser addNewUser(String username, String firstname, String password, String email, String pseudo) {
	AppUser appUser=appUserRepository.findByUsername(username);
	if(appUser!=null) throw new RuntimeException("Cette utilisateur existe déjà");
	appUser=AppUser.builder()
		.username(username)
		.firstname(firstname)
		.password(passwordEncoder.encode(password))
		.email(email)
		.pseudo(pseudo)
		.build();
	AppUser savedAppUser=appUserRepository.save(appUser);
	return savedAppUser;
    }

    @Override
    public AppRole addNewRole(String role) {
	AppRole appRole=appRoleRepository.findById(role).orElse(null);
	if(appRole!=null) throw new RuntimeException("Ce rôle existe déjà.");
	appRole=AppRole.builder()
		.role(role)
		.build();
	return appRoleRepository.save(appRole);
    }

    @Override
    public void addRoleToUser(String username, String role) {
	List<AppRole> ListAppRole=new ArrayList<AppRole>();
	
	AppUser appUser=appUserRepository.findByUsername(username);
	AppRole appRole=appRoleRepository.findById(role).get();
	if(appUser.getRoles() == null)
	{
	    ListAppRole.add(appRole);
	    appUser.setRoles(ListAppRole);
	}else {
	appUser.getRoles().add(appRole); 
	    
	}
    }

    @Override
    public void removeRoleFromUser(String username, String role) {
	AppUser appUser=appUserRepository.findByUsername(username);
	AppRole appRole=appRoleRepository.findById(role).get();
	appUser.getRoles().remove(appRole);
    }
    
    @Override
    public AppUser loadUserByUsername(String username) {
	return appUserRepository.findByUsername(username);
    }

    @Override
    public AppUser findUserByEmail(String email) {
        return appUserRepository.findByEmail(email);
    }

    @Override
    public AppUser findUserByPseudo(String pseudo) {
        return appUserRepository.findByPseudo(pseudo);
    }
    
    
//    @Override
//    public AppUser findUserById(Long id) {
//	AppUser user=appUserRepository.findById(id).get();
//	
//        return null; 
//    }

    @Override
    public List<AppUser> findAllUsers() {
        return appUserRepository.findAll();
    }

    @Override
    public void deleteUser(Long id) {
        appUserRepository.deleteById(id);
    }

    @Override
    public AppUser createUser(AppUser user) {
        return appUserRepository.save(user);
    }

    @Override
    public AppUser updateUser(AppUser user) {
        return appUserRepository.save(user);
    }
}
