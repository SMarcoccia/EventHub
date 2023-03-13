package fr.dawan.eventhub.entities;

import java.time.LocalDateTime;
import java.util.Arrays;

import fr.dawan.eventhub.Enum.TypeEvent;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Lob;
import jakarta.persistence.ManyToOne;

@Entity
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
	@Lob
	private byte[] img;
	
	@ManyToOne
	private User user;
	
	
	
	public Event() {
		super();
		
	}
	
	public Event(TypeEvent type, String titre, String description, String resume, LocalDateTime date_event, String lieu,
			Double prix, byte[] img, User user) {
		super();
		this.type = type;
		this.titre = titre;
		this.description = description;
		this.resume = resume;
		this.date_event = date_event;
		this.lieu = lieu;
		this.prix = prix;
		this.img = img;
		this.user = user;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public TypeEvent getType() {
		return type;
	}

	public void setType(TypeEvent type) {
		this.type = type;
	}

	public String getTitre() {
		return titre;
	}

	public void setTitre(String titre) {
		this.titre = titre;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public String getResume() {
		return resume;
	}

	public void setResume(String resume) {
		this.resume = resume;
	}

	public LocalDateTime getDate_event() {
		return date_event;
	}

	public void setDate_event(LocalDateTime date_event) {
		this.date_event = date_event;
	}

	public String getLieu() {
		return lieu;
	}

	public void setLieu(String lieu) {
		this.lieu = lieu;
	}

	public Double getPrix() {
		return prix;
	}

	public void setPrix(Double prix) {
		this.prix = prix;
	}

	public byte[] getImg() {
		return img;
	}

	public void setImg(byte[] img) {
		this.img = img;
	}

	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}

	@Override
	public String toString() {
		return "Event [id=" + id + ", type=" + type + ", titre=" + titre + ", description=" + description + ", resume="
				+ resume + ", date_event=" + date_event + ", lieu=" + lieu + ", prix=" + prix + ", img="
				+ Arrays.toString(img) + ", user=" + user.toString() + "]";
	}
}
