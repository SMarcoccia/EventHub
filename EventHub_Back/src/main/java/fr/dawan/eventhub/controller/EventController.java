package fr.dawan.eventhub.controller;

import java.io.IOException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import fr.dawan.eventhub.Enum.TypeEvent;
import fr.dawan.eventhub.entities.Event;
import fr.dawan.eventhub.service.EventService;

@CrossOrigin
@RestController
@RequestMapping("/api/events")
public class EventController {
	
	@Autowired
	private EventService eventService;


	@GetMapping(produces=MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<Page<Event>> findAlleventsByDateDesc(
			@PathVariable TypeEvent type,
			@PageableDefault(sort="date_event", direction=Sort.Direction.DESC) Pageable pageable){
		Page<Event> events = eventService.findAlleventsByDateDesc(type, pageable);
		if(events != null) {
			return ResponseEntity.ok(events);
		}
		
		return ResponseEntity.notFound().build();
	}
	
	// Trouver un événement par son id.
	@GetMapping(value="/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<Event> findEventPerId(@PathVariable Long id) {
		Event event=eventService.findById(id);
		if(event != null)
		{
			return ResponseEntity.ok(event);
		}
		return ResponseEntity.notFound().build();	
	}
	
	// Trouver tous les événements d'un utilisateur.
	@GetMapping(value="/events-by-user/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<Page<Event>> findAllEventsByIdUser(
			@PathVariable Long id, 
			@PageableDefault(size = 20, sort = "date_event", direction = Sort.Direction.DESC) Pageable pageable){
		Page<Event> events=eventService.findAllEventsByIdUser(id, pageable);
		if(events != null) {
			return ResponseEntity.ok(events);
		}
		return ResponseEntity.notFound().build();
	}
	
	// Supprimer un événement
	@DeleteMapping(value="/{id}")
	public ResponseEntity<String> deleteEvent(@PathVariable Long id){
		try {
			eventService.deleteEvent(id);
		} catch (Exception e) {
			return ResponseEntity.notFound().build();
		}
		return ResponseEntity.ok("L'evenement à déjà été supprimé");
	}
	
	// Création, édition d'un événemnet.
	@PostMapping(consumes ={MediaType.MULTIPART_FORM_DATA_VALUE}, produces={MediaType.APPLICATION_JSON_VALUE})
	public ResponseEntity<Event> createUpdateEvent(
			@RequestPart(value="file", required=false) MultipartFile file,
			@RequestPart("event") String event) throws IOException{
		return ResponseEntity.ok(eventService.createUpdateEvent(event, file));
	}
}

