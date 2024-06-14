import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../../services/category.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import Swal from 'sweetalert2';
import { QuizService } from '../../../services/quiz.service';

@Component({
  selector: 'app-add-quiz',
  templateUrl: './add-quiz.component.html',
  styleUrls: ['./add-quiz.component.css']
})
export class AddQuizComponent implements OnInit{

  categories:any=[];

    quizData:any={
      title:'',
      description:'',
      maxMarks:'',
      numberOfQuestions:'',
      active:true,
      category:{
        cid:'',
      },
    };

  constructor(private categoryService:CategoryService, private snack:MatSnackBar, private quizService:QuizService){}
  ngOnInit(): void {
    this.categoryService.categories().subscribe(
      (data:any)=>{
        //categories load
        this.categories=data;
        console.log(this.categories);
      },
      (error)=>{
        //console.log(error);
        Swal.fire('Error!!','error in loading data from server','error')
      }
    );
  }

  //add quiz function
  addQuiz(){
    //console.log(this.quizData);
    if(this.quizData.title.trim()=='' || this.quizData.title==null)
      {
        this.snack.open("Title Required !!",'',{
          duration:3000,
        });
        return;
      }
      //validation...


      //call server
      this.quizService.addQuiz(this.quizData).subscribe(
        (data)=>{
          Swal.fire('Success','quiz is added','success')
          this.quizData={
            title:'',
            description:'',
            maxMarks:'',
            numberOfQuestions:'',
            active:true,
            category:{
              cid:'',
            },
          };
        },
        (error)=>{
          Swal.fire('Error!! ','Error while eddinng quiz');
          console.log(error);
        }
      );
  }
}
