package fr.dawan.eventhub.security.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import fr.dawan.eventhub.security.entities.AppUser;


public interface AppUserRepository extends JpaRepository<AppUser, Long> {
    
    
//    AppUser findByUserId(Long id);
    AppUser findByUsername(String username);
    	
    AppUser findByEmail(String email);
    
    AppUser findByPseudo(String pseudo);

    AppUser findByFirstname(String firstname);

}
