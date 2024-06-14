import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import baseUrl from './helper';
import { Observable } from 'rxjs/internal/Observable';
import { Subject } from 'rxjs/internal/Subject';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  public loginStatusSubject = new Subject<boolean>();

  constructor(private http:HttpClient) { }

  //generate token
  public generateToken(loginData:any):Observable<any>{
    return this.http.post<any>(`${baseUrl}/auth/login/generate-token`,loginData)
  }

  //login user: set token in localstorage
  public loginUser(token:any){
    localStorage.setItem('token',token);
    //alert(token);
    //this.loginStatusSubject.next(true)
    return true;
  }


  //isLogin:user is logged in or not
  public isLoggedIn(){
  let tokenStr = localStorage.getItem('token');
  if(tokenStr ==undefined || tokenStr =='' || tokenStr ==null){
    return false;
  }else{
    return true;
  }
 }

 //logout: remove token from localStorage
 public logout(){
  localStorage.removeItem('token');
  localStorage.removeItem('user');
  return true;
 }

 //current user:which is loggedIn
public getCurrentUser(){
  return this.http.get(`${baseUrl}/user/current-user`);
}

 //get token
 public getToken(){
  return localStorage.getItem('token');
 }

 //set userDetail
 public setUser(user:any){
  localStorage.setItem('user',JSON.stringify(user));
 }

 //getUser
 public getUser(){
  let userStr=localStorage.getItem("user");
  if(userStr!=null)
    {
      return JSON.parse(userStr);
    }else{
      this.logout();
      return null;
    }
 }

 //get user role
//  public getUserRole(){
//   let user=this.getUser();
//   alert(user+"unnnnnn")
//   alert(user.authorities[0].authority)
//   return user.authorities[0].authority;
//  }


public getUserRole() {
  let user = this.getUser();
  if (user && user.userRoles && user.userRoles.length > 0) {
    return user.userRoles[0].role.roleName;
  } else {
    return null; // Handle the case when user or roles are undefined
  }
}


 public clearLocalStorage(){
  localStorage.clear();
}
}
