import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuestionService } from '../../../services/question.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-quiz-questions',
  templateUrl: './view-quiz-questions.component.html',
  styleUrls: ['./view-quiz-questions.component.css']
})
export class ViewQuizQuestionsComponent implements OnInit{

  qid:any;
  title:any;
  questions:any = [];
  constructor(private route:ActivatedRoute,private questionService:QuestionService,private snack:MatSnackBar){}

  ngOnInit(): void {
    this.qid=this.route.snapshot.params['qid'];
    this.title=this.route.snapshot.params['title'];
    this.questionService.getQuestionsOfQuiz(this.qid).subscribe(
      (data:any)=>{
        console.log(data);
        this.questions=data;
      },
      (error)=>{
        console.log(error); 
   });   
  }

  //delete question
  deleteQuestion(quesId:any){
    Swal.fire({
      icon:'info',
      showCancelButton:true,
      confirmButtonText:'Delete',
      title:'Are you sure , want to delete this question?'
    }).then((result)=>{
      if(result.isConfirmed)
        {
          //confirm
          this.questionService.deleteQuestion(quesId).subscribe(
            (data)=>{
              this.snack.open('Question Deleteed ','',{
                duration:3000,
              });
              this.questions=this.questions.filter((q:any)=>q.quesId==this.qid)
            },
            (error)=>{
              this.snack.open('Error in deleting questions','',{
                duration:3000,
              });
              console.log(error);
            }
          );
        }
    });
  }
}

//ckeditor for angular(rich text editor)