package fr.dawan.eventhub.service;

import java.io.IOException;
import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.multipart.MultipartFile;

import fr.dawan.eventhub.Enum.TypeEvent;

//import org.springframework.web.multipart.MultipartFile;

import fr.dawan.eventhub.entities.Event;

public interface EventService {
	
	List<Event> findAll();
	Event findById(Long id);

	Page<Event> findAllEventsByIdUser(Long id, Pageable pageable);
	Page<Event> findAlleventsByDateDesc(TypeEvent type, Pageable pageable);
	
	void deleteEvent(Long id);
	Event createUpdateEvent(String jsonEvent, MultipartFile file) throws IOException;

}
