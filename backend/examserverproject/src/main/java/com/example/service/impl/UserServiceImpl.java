package com.example.service.impl;

import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.example.exception.UserFoundException;
import com.example.model.User;
import com.example.model.UserRole;
import com.example.repo.RoleRepository;
import com.example.repo.UserRepository;
import com.example.service.UserService;

@Service
public class UserServiceImpl implements UserService,UserDetailsService{
	
	@Autowired
	private UserRepository userRepo;
	
	@Autowired
	private RoleRepository roleRepo;
	
	@Autowired
	private BCryptPasswordEncoder passwordEncoder;
	
	//creating user
	@Override
	public User createUser(User user, Set<UserRole> userRoles) throws Exception {
		   String encPwd=passwordEncoder.encode(user.getPassword());
		   user.setPassword(encPwd);
//		   Optional<User> local = this.urepo.findByuserName(user.getUserName());
		   
		   Optional<User> findByuserName = userRepo.findByUsername(user.getUsername());
		  
		   if(findByuserName.isEmpty())
		   {
			   
				for(UserRole ur : userRoles)
				{
					roleRepo.save(ur.getRole());
				}			
			     //User create
				user.getUserRoles().addAll(userRoles);
				user=this.userRepo.save(user);	
		   }
//			if(local.isPresent())
//			{
//				System.out.println("User is already there !!");
//				throw new Exception("user already present !!");
//			}
			else 
			{		
				
				   throw new UserFoundException("user already exist");		
			}		
			return user;
		}

	//getting user by username
	public User getUser(String username) {
		
		return this.userRepo.findByUsername(username).get();
	}

	@Override
	public void deleteUser(Long userId) {
		this.userRepo.deleteById(userId);
		
	}

	@Override
	public User updateUser(Long userId) {
		return userRepo.findById(userId).get();
	}

	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		Optional<User> optional=userRepo.findByUsername(username);
		if(optional.isEmpty())
		{
			throw new UsernameNotFoundException(username +"NOT EXIST");
		}
		User user=optional.get();
		List<GrantedAuthority> authorities= user.getUserRoles()
				.stream()
				.map(role->new SimpleGrantedAuthority(role.getRole().getRoleName()))
				.collect(Collectors.toList());
		//System.err.println(username);
		return  new org.springframework.security.core.userdetails.User(username,user.getPassword(),authorities);
	}
	
}