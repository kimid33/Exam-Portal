package com.example.config;
import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityCustomizer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.bind.annotation.CrossOrigin;

import com.example.filter.SecurityFilter;

@Configuration
@EnableWebSecurity
@CrossOrigin("*")
public class MySecurityConfig {

	@Autowired
	private BCryptPasswordEncoder passwordEncoder;
	
	@Autowired
	private UserDetailsService userDetailsService;
	
	@Autowired
	private AuthenticationEntryPoint authanticationEntryPoint;
	
	@Autowired
	private SecurityFilter securityFilter;

    @Bean
    AuthenticationManager authenticationManager(
             AuthenticationConfiguration  authConfig
             ) throws Exception {
		return authConfig.getAuthenticationManager();
	}
	
	 @Bean
	    public WebSecurityCustomizer webSecurityCustomizer() {
	        return (web)


-> web.ignoring().requestMatchers("/v3/api-docs/**");
	    }
	
	@Bean
	public DaoAuthenticationProvider authenticationProvider () {
		DaoAuthenticationProvider   provider=new DaoAuthenticationProvider();
		provider.setPasswordEncoder(passwordEncoder);
		provider.setUserDetailsService(userDetailsService);
		return provider;
	}
	
	@Bean
	public SecurityFilterChain configurePaths(HttpSecurity http) throws Exception{
        http.csrf(csrf -> csrf.disable()).cors(cors -> cors.disable())
                .authorizeRequests(requests -> requests.requestMatchers("/user/","/auth/login/generate-token",
                		"/category/","/category/{categoryId}","/quiz/","/quiz/{qid}","/question/","/question/quiz/{qid}").permitAll()
                        //.antMatchers("/user/get/{username}").hasAuthority("ADMIN")
                        .anyRequest().authenticated()).exceptionHandling(handling -> handling
                .authenticationEntryPoint(authanticationEntryPoint))
                .sessionManagement(management -> management.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .addFilterBefore(securityFilter, UsernamePasswordAuthenticationFilter.class);
		return http.build();
	}
}