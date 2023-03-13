package fr.dawan.eventhub.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import fr.dawan.eventhub.Enum.Role;
import fr.dawan.eventhub.entities.User;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
	
	/**
	 * SELECT FROM user WHERE 
	 */
	
	@Query("FROM User u WHERE u.role=:role")
	List<User> findAllByRole(Role role);
	
	
	@Query("From User u WHERE u.email= :email")
	User findByEmail(@Param("email")String email);
	
	@Query("From User u WHERE u.pseudo= :pseudo")
	User findByPseudo(@Param("pseudo") String pseudo);

}
