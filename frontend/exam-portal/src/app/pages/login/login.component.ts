import { Component, OnInit } from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';
import { LoginService } from '../../services/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{

  loginData={
    username:'',
    password:'',
  };

  constructor(private snack:MatSnackBar,private login:LoginService, private router:Router){}

  ngOnInit(): void {
    
  }

  formSubmit(){
    console.log('login button clicked');
    //this.login.clearLocalStorage();
    

    if(
      this.loginData.username.trim()=='' || this.loginData.username==null){
        this.snack.open('Username is required !! ','',{
          duration:3000,
        });
        return;
      }

      if(
        this.loginData.password.trim()=='' || this.loginData.password==null){
          this.snack.open('password is required !! ','',{
            duration:3000,
          });
          return;
        }

        //request server to generate token
        this.login.generateToken(this.loginData).subscribe(
          (data:any)=>{
            console.log('success');
            console.log(data);

            //login
             this.login.loginUser(data.token);
             this.login.getCurrentUser().subscribe((user:any)=>{
              console.log(user);
              
              this.login.setUser(user);
              console.log(user);
              //redirect ...ADMIN: admin-dashboard
              //redirect ...NORMAL: normal-dashboard
              if(this.login.getUserRole()=='ADMIN'){
                //admin dashboard
                //window.location.href='/admin';
                //alert(this.login.getUserRole());
                
                this.router.navigate(['/admin']);
                this.login.loginStatusSubject.next(true)
              }else if(this.login.getUserRole()=='NORMAL'){
                //normal user dashboard
                //window.location.href='/user-dashboard';
                this.router.navigate(['/user-dashboard/0'])
                this.login.loginStatusSubject.next(true)
              }else{
                this.login.logout();
              }
              })
          },
          (error)=>{
            console.log('Error !');
            console.log(error);
            this.snack.open('Invalid Details !! Try again','',{
              duration:3000,
            });
          }
        )
  }
}
