package fr.dawan.eventhub.security.entities;

import java.util.List;

import fr.dawan.eventhub.entities.Event;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.OneToMany;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AppUser {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long userId;
	@Column(unique=true)
	private String username;
	@Column(nullable=false)
	private String password;
	@Column(unique=true, nullable=false)
	private String email;
	private String pseudo;
	private String lastname;
	
	@ManyToMany(fetch=FetchType.EAGER)
	private List<AppRole> roles;
	
	@OneToMany(mappedBy="user", fetch=FetchType.EAGER)
	private List<Event> event;
	
	


}
