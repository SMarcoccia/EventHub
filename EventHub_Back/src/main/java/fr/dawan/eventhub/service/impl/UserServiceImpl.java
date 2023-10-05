package fr.dawan.eventhub.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import fr.dawan.eventhub.Enum.Role;
import fr.dawan.eventhub.repositories.UserRepository;
import fr.dawan.eventhub.security.entities.AppUser;
import fr.dawan.eventhub.service.UserService;


@Service
@Transactional
public class UserServiceImpl implements UserService{

	@Autowired
	private UserRepository userRepository;
	
	@Override
	public AppUser findById(Long id) {
		return userRepository.findById(id).get();
	}
	
	@Override
	public List<AppUser> findAllAdmin() {
		return userRepository.findAllByRole(Role.ADMIN);
	}

	@Override
	public List<AppUser> findAllUser() {
		return userRepository.findAllByRole(Role.USER);
	}

	@Override
	public List<AppUser> findAll() {
		return userRepository.findAll();
	}

	@Override
	public void deleteUser(Long id) {
		userRepository.deleteById(id);
	}

	@Override
	public AppUser createUser(AppUser user) {
		return userRepository.save(user);
	}

	@Override
	public AppUser updateUser(AppUser user) {
		return userRepository.save(user);
	}

	@Override
	public AppUser findByEmail(String email) {
		AppUser user = userRepository.findByEmail(email);
		if(user != null) {
			return user;
		}
		
		return null;
	}

	@Override
	public AppUser findByPseudo(String pseudo) {
		AppUser user = userRepository.findByPseudo(pseudo);
		if(user != null) {
			return user;
		}
		
		return null;
	}
}
