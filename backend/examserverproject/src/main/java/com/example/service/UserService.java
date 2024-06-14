package com.example.service;

import java.util.Set;

import com.example.model.User;
import com.example.model.UserRole;

public interface UserService {
	
	//creating user
	public User createUser(User user, Set<UserRole> userRoles) throws Exception;
	
	//get user by userName
	public User getUser(String username);
	
	//delete user by id
	public void deleteUser(Long userId);
	
	//update user by id
	public User updateUser(Long userId);
}
