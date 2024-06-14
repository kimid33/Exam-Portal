package com.example;

import java.util.HashSet;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.security.crypto.password.PasswordEncoder;

import com.example.model.Role;
import com.example.model.User;
import com.example.model.UserRole;
import com.example.service.UserService;

@SpringBootApplication
public class ExamserverprojectApplication implements CommandLineRunner {
	@Autowired
	private UserService userService;
	
	@Autowired
	private PasswordEncoder passwordEncoder;

	public static void main(String[] args) {
		SpringApplication.run(ExamserverprojectApplication.class, args);
	}

	@Override
	public void run(String... args) throws Exception {
		// TODO Auto-generated method stub
		System.out.println("starting code");
		
//		User user=new User();
//		user.setFirstName("kimi");
//		user.setLastName("dwivedi");
//		user.setUsername("kimi3368");
//		user.setPassword(passwordEncoder.encode("1234"));
//		user.setPhone("8857643747");
//		user.setEmail("kimi@gmail.com");
//		user.setProfile("default.png");
//		
//		Role role1=new Role();
//		role1.setRoleId(45L);
//		role1.setRoleName("ADMIN"); 
//	
//		Set<UserRole> userRoleSet=new HashSet<>();
//		UserRole userRole=new UserRole();
//		userRole.setRole(role1);
//		userRole.setUser(user);
//		userRoleSet.add(userRole);
//		
//		User user1=this.userService.createUser(user, userRoleSet);
//		System.out.println(user1.getUsername());
	}

}
 