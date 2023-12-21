package fr.dawan.eventhub.security.config;

import java.security.interfaces.RSAPrivateKey;
import java.security.interfaces.RSAPublicKey;

import org.springframework.boot.context.properties.ConfigurationProperties;

@ConfigurationProperties(prefix="rsa")
public record RSAKeysConfig(RSAPublicKey publicKey, RSAPrivateKey privateKey) {
    static void key(String publicc, String privatee) {
	System.out.println("publicc : "+publicc);
	System.out.println("privatee : "+privatee);
    }

}
