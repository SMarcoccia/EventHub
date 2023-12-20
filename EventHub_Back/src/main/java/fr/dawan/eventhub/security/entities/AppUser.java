package fr.dawan.eventhub.security.entities;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;

import fr.dawan.eventhub.entities.Event;
import jakarta.persistence.CascadeType;
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
import lombok.ToString;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Data
@ToString
@Builder
public class AppUser {
	
	@Id
	private String username;
	@Column(nullable=false)
	private String password;
	@Column(unique=true, nullable=false)
	private String email;
	@Column(unique=true, nullable=false)
	private String pseudo;
	@Column(unique=true, nullable=false)
	private String firstname;
	
	@ManyToMany(fetch=FetchType.EAGER)
	private List<AppRole> roles;
	
//	@OneToMany(mappedBy="user", cascade = CascadeType.ALL, fetch=FetchType.EAGER)
//	@JsonIgnore
//	private List<Event> event;
}
