package fr.dawan.eventhub.dtos;

import java.io.Serializable;
import java.util.List;

import fr.dawan.eventhub.security.entities.AppRole;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
@Builder
public class LoginResponseDTO implements Serializable {

    private static final long serialVersionUID = 5522712488663726631L;
    private Long userId;
    private String username;
    private String password;
    private String email;
    private String pseudo;
    private String lastname;
    private String token;
    private List<AppRole> roles;
}
