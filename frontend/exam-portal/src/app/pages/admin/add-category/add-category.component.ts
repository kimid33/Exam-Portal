import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../../services/category.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css']
})
export class AddCategoryComponent implements OnInit{
  category={
    title:'',
    description:'',
  };

  constructor(private categoryService:CategoryService,
              private snack:MatSnackBar){}

  ngOnInit(): void {
    
  }

  formSubmit(){
    if(this.category.title.trim()== '' || this.category.title==null)
      {
        this.snack.open("Title Required !!",'',{
          duration:3000,
        })
        return;
      }

      //all done
      this.categoryService.addCategory(this.category).subscribe(
        (data:any)=>{
          this.category.title='';
          this.category.description='';
          Swal.fire('success !!','Category is added successfully','success');
        },
        (error)=>{
          console.log(error);
          Swal.fire('Error !!','Server Error','error');
        }
      );
  }

}
