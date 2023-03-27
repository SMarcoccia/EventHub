package fr.dawan.eventhub.service;

import java.io.IOException;
import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.multipart.MultipartFile;

//import org.springframework.web.multipart.MultipartFile;

import fr.dawan.eventhub.entities.Event;

public interface EventService {
	
	Page<Event> findAllEventsByIdUser(Long id, Pageable pageable);
	
	Event findById(Long id);
	Page<Event> findAll(Pageable pageable);
	void deleteEvent(Long id);
	Event createUpdateEvent(String JsonEvent, MultipartFile file) throws IOException;
}
