import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { QuizService } from '../../../services/quiz.service';
import { CategoryService } from '../../../services/category.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-quiz',
  templateUrl: './update-quiz.component.html',
  styleUrls: ['./update-quiz.component.css']
})
export class UpdateQuizComponent implements OnInit{

  constructor(private route:ActivatedRoute,private quizService:QuizService,private categoryService:CategoryService , private snack:MatSnackBar,private router:Router){}

  qid=0;
  quiz:any;
  categories:any;

  ngOnInit(): void {
    this.qid=this.route.snapshot.params['qid'];
    //alert(this.qid)
    this.quizService.getQuiz(this.qid).subscribe(
      (data:any)=>{
        this.quiz=data;
        console.log(this.quiz);
      },
      (error)=>{
        console.log(error);
      });

      this.categoryService.categories().subscribe(
        (data:any)=>{
          this.categories=data;
        },
        (error)=>{
          alert("error in loading category ")
        });
  }

  //update submit form
  public updateData(){
    //validations

    this.quizService.updateQuiz(this.quiz).subscribe(
      (data)=>{
        Swal.fire('Success !!','quiz updated','success').then((e)=>{
          this.router.navigate(['/admin/quizzes'])
        });
      },
      (error)=>{
        Swal.fire('Error','Error in updating quiz','error');
        console.log(error);
      }
    )
  }

}
