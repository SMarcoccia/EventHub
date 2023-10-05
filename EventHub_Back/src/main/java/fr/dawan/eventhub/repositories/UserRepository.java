package fr.dawan.eventhub.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import fr.dawan.eventhub.Enum.Role;
import fr.dawan.eventhub.security.entities.AppUser;

public interface UserRepository extends JpaRepository<AppUser, Long> {
	
	/**
	 * SELECT FROM user WHERE 
	 */
	
	@Query("FROM User u WHERE u.role=:role")
	List<AppUser> findAllByRole(Role role);
	
	
	@Query("From User u WHERE u.email= :email")
	AppUser findByEmail(@Param("email")String email);
	
	@Query("From User u WHERE u.pseudo= :pseudo")
	AppUser findByPseudo(@Param("pseudo") String pseudo);

}
