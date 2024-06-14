package com.example.filter;
import java.io.IOException;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import com.example.util.JwtUtil;


@Component
public class SecurityFilter extends OncePerRequestFilter{

	@Autowired
	private JwtUtil jwtUtils;
	@Autowired
	private UserDetailsService userDetailsService;
	
	@Override
	protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
			throws ServletException, IOException {
		String token=request.getParameter("Authorization");
		if(token!=null)
		{
			String username=jwtUtils.getUsername(token);
			if(username!=null && SecurityContextHolder.getContext().getAuthentication()==null) {
				
				UserDetails user=userDetailsService.loadUserByUsername(username);
				UsernamePasswordAuthenticationToken  AuthenticationToken =new UsernamePasswordAuthenticationToken(username,user.getPassword(),user.getAuthorities());
				AuthenticationToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
				SecurityContextHolder.getContext().setAuthentication(AuthenticationToken);
			}
		
		}
		filterChain.doFilter(request, response);
		}
	
		
}