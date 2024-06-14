import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuizService } from '../../../services/quiz.service';

@Component({
  selector: 'app-load-quiz',
  templateUrl: './load-quiz.component.html',
  styleUrls: ['./load-quiz.component.css']
})
export class LoadQuizComponent implements OnInit{
  cid:any;
  quizzes:any;
  constructor(private route:ActivatedRoute,private quizService:QuizService){}

  ngOnInit(): void {
    this.route.params.subscribe((params)=>{
      this.cid=params['cid'];
      if(this.cid==0)
        {
          console.log("Load all the quiz");
          this.quizService.getActiveQuizzes().subscribe(
            (data:any)=>{
              this.quizzes=data;
              console.log(this.quizzes);   
            },
            (error)=>{
              console.log(error);
              alert('error in loading all quizzes')
            }
          )
        }else{
          console.log("Load specific quiz");   
            this.quizService.getActiveQuizzesOfCategory(this.cid).subscribe(
              (data:any)=>{
                this.quizzes=data;
                console.log(this.quizzes);       
              },
              (error)=>{
                alert('error in loading quiz data');
              }
            )
        }
    });
  }
}
