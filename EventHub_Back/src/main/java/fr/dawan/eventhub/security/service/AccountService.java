package fr.dawan.eventhub.security.service;

import fr.dawan.eventhub.security.entities.AppRole;
import fr.dawan.eventhub.security.entities.AppUser;

public interface AccountService {

   AppUser addNewUser(String username, String lastname, String password, String email, String confirmPassword, String pseudo);
   AppRole addNewRole(String role);
   void addRoleToUser(String username, String role);
   void removeRoleFromUser(String username, String role);
   AppUser loadUserByUsername(String username);
    
}
