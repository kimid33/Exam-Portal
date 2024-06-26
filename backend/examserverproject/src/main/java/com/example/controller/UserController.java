package com.example.controller;

import java.security.Principal;
import java.util.HashSet;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.model.Role;
import com.example.model.User;
import com.example.model.UserRole;
import com.example.service.UserService;

@RestController
@RequestMapping("/user")
@CrossOrigin("*")
public class UserController {
	
	@Autowired
	private UserService userService;
	@PostMapping("/")
	public User createUser(@RequestBody User user) throws Exception
	{
		 user.setProfile("default.png");
		 Set<UserRole> roles=new HashSet<>();
		 Role role=new Role();
		 role.setRoleId(47L);
		 role.setRoleName("NORMAL");
		 
		 UserRole userRole=new UserRole();
		 userRole.setUser(user);
		 userRole.setRole(role);
		 
		 roles.add(userRole);
		return this.userService.createUser(user, roles);
		
	}
	@GetMapping("/{username}")
	public User getUser(@PathVariable("username") String username) {
		return this.userService.getUser(username);
	}
	
	//delete the user by id
	@DeleteMapping("/{userId}")
	public void deleteUser(@PathVariable("userId") Long userId)
	{
		this.userService.deleteUser(userId);
	}
	
	//update user
	@PutMapping("/data/{userId}")
	public User updateUser(@PathVariable("userId") Long userId) {
		User u=userService.updateUser(userId);
		return u;
	}
	
	//return the details of current user
	@GetMapping("/current-user")
	public User currentUser(Principal principal)
	{
		//System.out.println(principal.getName());
	   return userService.getUser(principal.getName());
	}
	
//	@ExceptionHandler(UserFoundException.class)
//	public ResponseEntity<?> exceptionHandler(UserFoundException ex){
//		return  ResponseEntity
//	            .status(HttpStatus.BAD_REQUEST)
//	            .body("User already exists");
//		
//	}
}
