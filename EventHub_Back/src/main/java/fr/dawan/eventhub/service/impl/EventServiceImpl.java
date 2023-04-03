package fr.dawan.eventhub.service.impl;

import java.io.IOException;
import java.time.format.DateTimeFormatter;
import java.time.temporal.TemporalQuery;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.json.JsonMapper;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;

import fr.dawan.eventhub.Enum.TypeEvent;
import fr.dawan.eventhub.entities.Event;
import fr.dawan.eventhub.repositories.EventRepository;
import fr.dawan.eventhub.service.EventService;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.persistence.TypedQuery;
import jakarta.persistence.criteria.CriteriaBuilder;
import jakarta.persistence.criteria.CriteriaQuery;
import jakarta.persistence.criteria.Root;
import jakarta.transaction.Transactional;

@Service
@Transactional
public class EventServiceImpl implements EventService {
	
	@Autowired
	private EventRepository eventRepository;
	
	@PersistenceContext
	private EntityManager em;
	
	@Override
	public Event findById(Long id) {
		return eventRepository.findById(id).get();
	}
	
	@Override
	public List<Event> findAll() {
		return eventRepository.findAll();
	}

	@Override
	public Page<Event> findAllEventsByTypeAndDateDesc(Map<String, String> map, Pageable pageable){

		CriteriaBuilder cb =  em.getCriteriaBuilder();
		CriteriaQuery<Event> cq = cb.createQuery(Event.class);
		Root<Event> root = cq.from(Event.class);
		
		cq.select(root);
		
		if( ! map.get("type").isEmpty()) {		
			cq.where(cb.equal(root.get("type"), TypeEvent.valueOf(map.get("type"))));
		}
		
		cq.orderBy(cb.desc((root.get("date_event"))));
		TypedQuery<Event> tq = em.createQuery(cq);
		tq.setFirstResult(pageable.getPageNumber()*pageable.getPageSize());
		tq.setMaxResults(pageable.getPageSize());
		return new PageImpl<Event>(tq.getResultList(), pageable, tq.getResultList().size());
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
		return event;
	}
}
