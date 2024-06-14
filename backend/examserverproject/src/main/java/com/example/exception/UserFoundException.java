package com.example.exception;

public class UserFoundException extends Exception{

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	
	public UserFoundException() {      //alt+shift+s+c
		super("User with this UserName is already there in db !! try with another username");
	}

	public UserFoundException(String message) {
		super(message);
		// TODO Auto-generated constructor stub
	}
}
