package fr.dawan.eventhub.controller;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import fr.dawan.eventhub.entities.Event;
import fr.dawan.eventhub.service.EventService;

@RestController
@RequestMapping("/api/events")
public class EventController {
	
	@Autowired
	private EventService eventService;

	// Trouver un événement par son id.
	@GetMapping(value="/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<Event> findEventPerId(@PathVariable Long id) {
	    	System.out.println("dans eventcontroller dans findeventperid");
		Event event=eventService.findById(id);
		if(event != null)
		{
			return ResponseEntity.ok(event);
		}
		return ResponseEntity.notFound().build();	
	}
	
	// Récupérer tous les événements ou ceux d'un utilisateur enregistré par type et par date descendante. 
	@GetMapping(value={"/list/{username}"}, produces=MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<?> findAllEventsByUsernameOrTypeDateDesc(
			@PathVariable String username,
			@RequestParam Map<String, String> map,
			@PageableDefault(size=20, sort="date_event", direction=Sort.Direction.DESC) Pageable pageable){
		Map<String, Object> response = new HashMap<>();
		System.out.println("EventController dans findalleventsbyusernameortypedatedesc");
		Page<Event> events=eventService.findAllEventsByUsernameAndTypeDateDesc(username, map, pageable);
		if(events != null) {
			response.put("success", true);
			response.put("message", "Données récupérées avec succès");
			response.put("events", events);
		}else {
			response.put("success", false);
			response.put("message", "Aucun éléments trouvés");
		}
		return ResponseEntity.ok(response);
	}
	
	// Supprimer un événement
	@DeleteMapping(value="/{id}")
//	@PreAuthorize("hasAuthority(SCOPE_USER)")
	public ResponseEntity<?> deleteEvent(
			@PathVariable Long id,
			@PageableDefault(size=20, sort="date_event", direction=Sort.Direction.DESC) Pageable pageable){
		// Récupération de l'utilisateur par l'événement id :
		String username=eventService.findById(id).getUser().getUsername();
		// Les paramètres utilisé pour renvoyer les événements : 		
		Map<String, String> map = new HashMap<>();
		map.put("page", "0");
		map.put("type", "");
		map.put("search", "");

		Map<String, Object> response = new HashMap<>();
		try {
			eventService.deleteEvent(id);
			response.put("success", true);
			response.put("events", eventService.findAllEventsByUsernameAndTypeDateDesc(username, map, pageable));
		} catch (Exception e) {
			response.put("success", false);
		}
		return ResponseEntity.ok(response);
	}
	
	// Création, édition d'un événemnet.
	@PostMapping(consumes ={MediaType.MULTIPART_FORM_DATA_VALUE}, produces={MediaType.APPLICATION_JSON_VALUE})
//	@PreAuthorize("hasAuthority(SCOPE_USER)")
	public ResponseEntity<Event> createUpdateEvent(
			@RequestPart(value="file", required=false) MultipartFile file,
			@RequestPart("event") String event) throws IOException{
	    	System.out.println("EventController dans createUpdateEvent >>>>>>>>>>>>>>>");
	    	System.out.println(event);
	    	System.out.println("EventController dans createUpdateEvent <<<<<<<<<<<<<<<");
		return ResponseEntity.ok(eventService.createUpdateEvent(event, file));
	}
}

