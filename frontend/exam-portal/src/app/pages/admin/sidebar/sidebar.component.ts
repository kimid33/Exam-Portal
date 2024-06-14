import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../../services/login.service';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit{

constructor(public loginService:LoginService,private router:Router){}

ngOnInit(): void {
  
}  

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
