package fr.dawan.eventhub.security.service;

import java.util.List;

import fr.dawan.eventhub.dtos.RegisterDTO;
import fr.dawan.eventhub.security.entities.AppRole;
import fr.dawan.eventhub.security.entities.AppUser;

public interface AccountService {

   AppUser addNewUser(String username, String lastname, String password, String email, String pseudo);
   AppUser addNewUser(RegisterDTO registerDTO);
   AppRole addNewRole(String role);
   void addRoleToUser(String username, String role);
   void removeRoleFromUser(String username, String role);
//   AppUser findUserById(Long id);
   AppUser loadUserByUsername(String username);
   AppUser findUserByPseudo(String pseudo);
   AppUser findUserByEmail(String email);
   List<AppUser> findAllUsers();
   void deleteUser(Long id);
   AppUser createUser(AppUser user);
   AppUser updateUser(AppUser user);
}
