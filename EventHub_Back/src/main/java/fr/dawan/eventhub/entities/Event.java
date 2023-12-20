package fr.dawan.eventhub.entities;

import java.time.LocalDateTime;
import java.util.Arrays;

import com.fasterxml.jackson.annotation.JsonIgnore;

import fr.dawan.eventhub.Enum.TypeEvent;
import fr.dawan.eventhub.security.entities.AppUser;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Lob;
import jakarta.persistence.ManyToOne;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Data
@ToString
public class Event {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	@Enumerated(EnumType.STRING)
	private TypeEvent type;
	
	private String titre;
	private String description;
	private String resume;
	private LocalDateTime date_event;
	private String lieu;
	private Double prix;
	private String filename;
	@Lob
	@Column(name="img", columnDefinition="blob")
	private byte[] img;
	
	@ManyToOne
	private AppUser user;
	
//	public Event(TypeEvent type, String titre, String description, String resume, LocalDateTime date_event, String lieu,
//			Double prix, byte[] img, AppUser user) {
//		super();
//		this.type = type;
//		this.titre = titre;
//		this.description = description;
//		this.resume = resume;
//		this.date_event = date_event;
//		this.lieu = lieu;
//		this.prix = prix;
//		this.img = img;
//		this.user = user;
//	}

}
