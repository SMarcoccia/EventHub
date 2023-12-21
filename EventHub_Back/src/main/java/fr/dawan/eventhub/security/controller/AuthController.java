package fr.dawan.eventhub.security.controller;

import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.jwt.JwtClaimsSet;
import org.springframework.security.oauth2.jwt.JwtEncoder;
import org.springframework.security.oauth2.jwt.JwtEncoderParameters;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import fr.dawan.eventhub.dtos.RegisterDTO;
import fr.dawan.eventhub.security.entities.AppUser;
import fr.dawan.eventhub.security.service.AccountService;
import lombok.Data;
import lombok.NoArgsConstructor;
import net.datafaker.App;

@RestController
@NoArgsConstructor
@Data
@RequestMapping("/auth")
public class AuthController {

    // C'est nous qui devont faire le travaille d'authentification à contrario de l'authentification basic.
    @Autowired
    private AuthenticationManager authenticationManager;
    @Autowired
    private JwtEncoder jwtEncoder;
    @Autowired
    private AccountService accountService;
    
    // Rigistration of user.
    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody RegisterDTO registerDTO){
	System.out.println("registerDTO : ");
	System.out.println(registerDTO);
	Map<String, Object> response = new HashMap<>();
	LinkedHashMap<String, String> messageError=new LinkedHashMap<>();
	
    	AppUser uPerUsername = accountService.loadUserByUsername(registerDTO.getUsername());
    	AppUser uPerPseudo = accountService.findUserByPseudo(registerDTO.getPseudo());
    	AppUser uPerEmail = accountService.findUserByEmail(registerDTO.getEmail());

    	if(uPerUsername != null) {
    	    messageError.put("username", registerDTO.getUsername());
    	}
    	if (uPerPseudo != null) {
    	    messageError.put("pseudo", registerDTO.getPseudo());
    	}
    	if (uPerEmail != null) {
    	    messageError.put("email", registerDTO.getEmail());
    	}

    	if(! messageError.isEmpty()) {
    	    response.put("success", false);
    	    response.put("message", messageError);
    	    System.out.println("messageError : "+messageError);
    	    return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(response);
    	}
    	accountService.addNewUser(registerDTO);
    	accountService.addRoleToUser(registerDTO.getUsername(), "USER");
    	
    	response.put("success", true);
    	response.put("message", "Vous êtes enregistré !");
    	return ResponseEntity.ok(response);
    }
     
    // Récupération des identifiants pour l'authentification.
    @PostMapping(value="/login", consumes ={MediaType.APPLICATION_JSON_VALUE}, produces={MediaType.APPLICATION_JSON_VALUE})
    public Map<String, String> login(@RequestBody AppUser appUser) throws Exception{
	System.out.println("appUser.getPassword() : "+ appUser.getPassword());
	// Ici on demande a authenticationManager d'authentifier l'utilisateur.
	Authentication authentication=authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(appUser.getUsername(), appUser.getPassword()));
        Instant instant=Instant.now();
        // Récupération des rôles :
        String scope=authentication.getAuthorities()
        	.stream().map(a->a.getAuthority())
        	.collect(Collectors.joining(" "));
        JwtClaimsSet jwtClaimsSet=JwtClaimsSet.builder()
        	.subject(authentication.getName() )
        	.issuedAt(instant)
        	.expiresAt(instant.plus(1, ChronoUnit.MINUTES))
        	.issuer("https://eventhub.dawan.fr")
        	.claim("scope", scope)
        	.build();
        JwtEncoderParameters jwtEncoderParameters=JwtEncoderParameters.from(jwtClaimsSet);
        String jwt=jwtEncoder.encode(jwtEncoderParameters).getTokenValue();
        return Map.of("access-token", jwt);
    }
    
    @GetMapping(value="/profile", produces = MediaType.APPLICATION_JSON_VALUE)
    public Authentication authentication(Authentication authentication) {
	return authentication;
    }
    
}
