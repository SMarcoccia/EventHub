package fr.dawan.eventhub.service.impl;

import java.io.IOException;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.json.JsonMapper;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;

import fr.dawan.eventhub.entities.Event;
import fr.dawan.eventhub.repositories.EventRepository;
import fr.dawan.eventhub.service.EventService;
import jakarta.transaction.Transactional;

@Service
@Transactional
public class EventServiceImpl implements EventService {
	
	@Autowired
	private EventRepository eventRepository;
	
	@Override
	public Event findById(Long id) {
		return eventRepository.findById(id).get();
	}
	
	@Override
	public Page<Event> findAll(Pageable pageable) {
		return eventRepository.findAll(pageable);
	}

	@Override
	public void deleteEvent(Long id) {
		eventRepository.deleteById(id);
	}

	@Override
	public Event createUpdateEvent(String JsonEvent, MultipartFile file) throws IOException {
		System.out.println("dans createupdate ");
		Event eventTmp = this.JsonStringToObject(JsonEvent);
		System.out.println(eventTmp);
		if(file != null) {
			eventTmp.setImg(file.getBytes());
			System.out.println("Dans createupdateevent if");
		}
		return eventRepository.save(eventTmp);
	}

	@Override 
	public Page<Event> findAllEventsByIdUser(Long id, Pageable pageable){
		return eventRepository.findAllEventByIdUser(id, pageable);
	}
	
	private Event JsonStringToObject(String JsonEvent) {
		Event event = new Event();
		ObjectMapper objMap=JsonMapper.builder().addModule(new JavaTimeModule()).build();
		try {
			event=objMap.readValue(JsonEvent, Event.class);
		} catch (JsonProcessingException e) {
			e.printStackTrace();
		}
		System.out.println("Dans jsonstringtojson : "+event);
		return event;
	}
}
