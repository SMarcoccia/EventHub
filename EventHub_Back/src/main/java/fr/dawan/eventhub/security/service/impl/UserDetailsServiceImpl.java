package fr.dawan.eventhub.security.service.impl;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import fr.dawan.eventhub.security.entities.AppUser;
import fr.dawan.eventhub.security.service.AccountService;
import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;


@Service
@Transactional
@AllArgsConstructor
public class UserDetailsServiceImpl implements UserDetailsService {

    private AccountService accountService;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
	AppUser appUser=accountService.loadUserByUsername(username);
	if(appUser==null) {
	    throw new UsernameNotFoundException(String.format("L'utilisateur %s n'a pas été trouvé", username));
	}
	List<SimpleGrantedAuthority> authorities=appUser.getRoles().stream()
		.map(r->new SimpleGrantedAuthority(r.getRole())).collect(Collectors.toList());
	UserDetails userDetails=User
		.withUsername(appUser.getUsername())
		.password(appUser.getPassword())
		.authorities(authorities).build();
	return userDetails;
    }
}
