import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit{
  constructor(private userService:UserService, private snack:MatSnackBar){}

  public user={
    username:'',
    password:'',
    firstName:'',
    lastName:'',
    email:'',
    phone:'',
  };

  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }
  
  formSubmit(){
    console.log(this.user);
    if(this.user.username =='' || this.user.username == null)
      {
        // alert("user is required");
        this.snack.open('username is required !!' ,'ok',{
          duration:3000,
          verticalPosition:'top',
          horizontalPosition:'right',
        });
        return;
      }

      //addUser: userservice
      this.userService.addUser(this.user).subscribe(
        (data:any)=>{
          //success
          console.log(data);
          //alert('success');
          Swal.fire('Successfully done !!','user id is ' +data.id,'success')
        },
        (error)=>{
          //error
          console.log(error)
          //alert("something went wrong")
          this.snack.open('something went wrong !!','ok',{
            duration:3000,
          })
        }
      );
  }
}
