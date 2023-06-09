package fr.dawan.eventhub.repositories;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.data.jpa.repository.JpaRepository;

import fr.dawan.eventhub.entities.Event;

public interface EventRepository extends JpaRepository<Event, Long> {
	@Query("FROM Event e WHERE e.user.id = :id")
	Page<Event> findAllEventByIdUser(@Param("id") Long id, Pageable pageable);
}
