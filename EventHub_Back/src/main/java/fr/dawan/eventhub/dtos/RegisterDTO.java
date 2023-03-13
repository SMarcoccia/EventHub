package fr.dawan.eventhub.dtos;

public class RegisterDTO {
	private String pseudo;
	private String name;
	private String lastname;
	private String email;
	private String password;
	
	public String getPseudo() {
		return pseudo;
	}
	public void setPseudo(String pseudo) {
		this.pseudo = pseudo;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getLastname() {
		return lastname;
	}
	public void setLastname(String lastname) {
		this.lastname = lastname;
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}
	
	public RegisterDTO(String pseudo, String name, String lastname, String email, String password) {
		super();
		this.pseudo = pseudo;
		this.name = name;
		this.lastname = lastname;
		this.email = email;
		this.password = password;
	}
	
	public RegisterDTO() {
		super();
	}
	
	

}
