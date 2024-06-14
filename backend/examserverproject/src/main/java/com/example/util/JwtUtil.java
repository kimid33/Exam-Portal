package com.example.util;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.concurrent.TimeUnit;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
@Component
public class JwtUtil {
	@Value("${app.secret}")
	private String secret;
	
	public String  getUsername(String token) {		
		return getClaims(token).getSubject();
	}	
	public  String genrateToken(String subject)
	{
		Map<String , Object> claims=new HashMap<>();
		return genrateToken(claims, subject);
	}	
	private Claims getClaims(String token) {
		
		return Jwts.parser().setSigningKey(secret.getBytes())
				.parseClaimsJws(token).getBody();
	}		
	private String genrateToken(Map<String, Object> claims,String subjects){	
		return Jwts.builder()
			.setClaims(claims)
			.setSubject(subjects)
			.setIssuer("Kimi")
			.setIssuedAt(new Date(System.currentTimeMillis()))
            .setExpiration(new Date(System.currentTimeMillis()+TimeUnit.MINUTES.toMillis(1000000)))
            .signWith(SignatureAlgorithm.HS256, secret.getBytes())
            .compact();
	}	
}