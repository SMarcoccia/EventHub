package fr.dawan.eventhub.security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.provisioning.InMemoryUserDetailsManager;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity
public class SecurityConfig {
    
    
    @Bean
    SecurityFilterChain securityFilterChain(HttpSecurity httpSecurity) throws Exception {
//	httpSecurity.formLogin().loginPage("/login").defaultSuccessUrl("/").permitAll();
	httpSecurity.formLogin();
	httpSecurity.authorizeHttpRequests().anyRequest().authenticated();
	return httpSecurity.build();
    }
    
    @Bean
    InMemoryUserDetailsManager inMemoryUserDetailsManager() {
	PasswordEncoder passwordEncoder=passwordEncoder();
	return new InMemoryUserDetailsManager(
		User.withUsername("salut").password(passwordEncoder.encode("1234")).authorities("USER").build()
	);
		
    }
    
    @Bean
    PasswordEncoder passwordEncoder() { return new BCryptPasswordEncoder(); }    
    
}
