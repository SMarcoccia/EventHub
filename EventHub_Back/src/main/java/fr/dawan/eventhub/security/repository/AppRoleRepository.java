package fr.dawan.eventhub.security.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import fr.dawan.eventhub.security.entities.AppRole;

public interface AppRoleRepository extends JpaRepository<AppRole, String> {

}
