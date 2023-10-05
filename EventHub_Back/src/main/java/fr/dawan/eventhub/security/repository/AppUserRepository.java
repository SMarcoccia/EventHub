package fr.dawan.eventhub.security.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import fr.dawan.eventhub.security.entities.AppUser;

public interface AppUserRepository extends JpaRepository<AppUser, Long> {
    AppUser findByUnername(String username);
}
