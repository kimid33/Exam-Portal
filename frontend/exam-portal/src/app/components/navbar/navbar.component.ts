import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../services/login.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit{

  isLoggedIn = false;
  user:any=null;
  constructor(public loginService:LoginService){}

  ngOnInit(): void {
    this.isLoggedIn = this.loginService.isLoggedIn();
    this.user = this.loginService.getUser();
    this.loginService.loginStatusSubject.asObservable().subscribe(data=>{
      this.isLoggedIn = this.loginService.isLoggedIn();
    this.user = this.loginService.getUser();
    });
  }

  // public logout(){
  //   this.loginService.logout();
  //   window.location.reload();
  // }
  logout(): void {
    Swal.fire({
      title: 'Logout',
      text: 'Are you sure you want to logout?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Logout',
      cancelButtonText: 'Cancel',
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
    }).then((result) => {
      if (result.isConfirmed) {
        this.loginService.logout();
      window.location.reload();
      }
    });
  }
}
