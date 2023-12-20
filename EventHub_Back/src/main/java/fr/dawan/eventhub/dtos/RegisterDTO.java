package fr.dawan.eventhub.dtos;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
public class RegisterDTO {
    private String username;
    private String firstname;
    private String pseudo;
    private String email;
    private String password;
}
