package security;

import org.springframework.security.crypto.password.PasswordEncoder;

public class SecurityConfig {
    
    private PasswordEncoder passwordEncoder;
    
    public SecurityConfig(PasswordEncoder passwordEncoder) {
	super();
	this.passwordEncoder = passwordEncoder;
    }
}
