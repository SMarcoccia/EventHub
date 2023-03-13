package fr.dawan.eventhub.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import fr.dawan.eventhub.Enum.Role;
import fr.dawan.eventhub.entities.User;
import fr.dawan.eventhub.repositories.UserRepository;
import fr.dawan.eventhub.service.UserService;



@Service
@Transactional
public class UserServiceImpl implements UserService{

	@Autowired
	private UserRepository userRepository;
	
	@Override
	public User findById(Long id) {
		return userRepository.findById(id).get();
	}
	
	@Override
	public List<User> findAllAdmin() {
		return userRepository.findAllByRole(Role.ADMIN);
	}

	@Override
	public List<User> findAllUser() {
		return userRepository.findAllByRole(Role.USER);
	}

	@Override
	public List<User> findAll() {
		return userRepository.findAll();
	}

	@Override
	public void deleteUser(Long id) {
		userRepository.deleteById(id);
	}

	@Override
	public User createUser(User user) {
		return userRepository.save(user);
	}

	@Override
	public User updateUser(User user) {
		return userRepository.save(user);
	}

	@Override
	public User findByEmail(String email) {
		User user = userRepository.findByEmail(email);
		if(user != null) {
			return user;
		}
		
		return null;
	}

	@Override
	public User findByPseudo(String pseudo) {
		User user = userRepository.findByPseudo(pseudo);
		if(user != null) {
			return user;
		}
		
		return null;
	}
	
}
