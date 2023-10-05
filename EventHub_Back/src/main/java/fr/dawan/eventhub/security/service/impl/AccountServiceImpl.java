package fr.dawan.eventhub.security.service.impl;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

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
    public AppUser addNewUser(String username, String lastname, String password, String email, String confirmPassword, String pseudo) {
	AppUser appUser=appUserRepository.findByUnername(username);
	if(appUser!=null) throw new RuntimeException("Cette utilisateur existe déjà");
	if(!password.equals(confirmPassword)) throw new RuntimeException("Passwords not match");
	appUser=AppUser.builder()
		.username(username)
		.lastname(lastname)
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
	AppUser appUser=appUserRepository.findByUnername(username);
	AppRole appRole=appRoleRepository.findById(role).get();
	appUser.getRoles().add(appRole);
    }

    @Override
    public void removeRoleFromUser(String username, String role) {
	AppUser appUser=appUserRepository.findByUnername(username);
	AppRole appRole=appRoleRepository.findById(role).get();
	appUser.getRoles().remove(appRole);
    }

    @Override
    public AppUser loadUserByUsername(String username) {
	return appUserRepository.findByUnername(username);
    }


}
