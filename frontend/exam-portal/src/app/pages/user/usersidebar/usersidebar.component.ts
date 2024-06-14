import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../../services/category.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-usersidebar',
  templateUrl: './usersidebar.component.html',
  styleUrls: ['./usersidebar.component.css']
})
export class UsersidebarComponent implements OnInit{
  categories:any;
  constructor(private categoryService:CategoryService, private snack:MatSnackBar){}

  ngOnInit(): void {
    this.categoryService.categories().subscribe(
      (data:any)=>{
        this.categories=data;
      },
      (error)=>{
        this.snack.open("Error in loading categories from server",'',{
          duration:3000,
        })
      }
    )
  }

}
