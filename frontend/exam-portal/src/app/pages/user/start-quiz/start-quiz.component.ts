import { LocationStrategy } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuestionService } from '../../../services/question.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-start-quiz',
  templateUrl: './start-quiz.component.html',
  styleUrls: ['./start-quiz.component.css']
})
export class StartQuizComponent implements OnInit{

  qid:any;
  questions:any;
  isSubmit:any;

  marksGot:any=0;
  correctAnswers:any=0;
  attempted:any=0;

  timer:any;

  constructor(private locationSt:LocationStrategy, private route:ActivatedRoute,private questionService:QuestionService){}

  ngOnInit(): void {
    this.preventBackButton();
    this.qid=this.route.snapshot.params['qid'];
    console.log(this.qid);
    this.loadQuestions();
  }

  loadQuestions(){
    this.questionService.getQuestionsOfQuizForTest(this.qid).subscribe(
      (data:any)=>{
        this.questions=data;

        this.timer=this.questions.length * 2 * 60;

        this.questions.forEach((q:any)=>{
          q['givenAnswer'] = '';
        });

        this.startTimer();
      },
      (error)=>{
        console.log(error);  
        Swal.fire('Error','Error in loading questions of quiz','error') 
      }
    )
  }

  preventBackButton(){
    history.pushState(null, location.href);
    this.locationSt.onPopState(()=>{
      history.pushState(null, location.href);
    })
  }

  submitQuiz(){
    Swal.fire({
      title: "Do you want to submit the quiz?",
      //showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: "Submit",
      //denyButtonText: `Don't save`,
      icon:'info'
    }).then((e)=>{
      if(e.isConfirmed){
        this.evalQuiz();
      }
    });
  }

  startTimer(){
    let t = window.setInterval(()=>{
      //code
      if(this.timer<=0)
        {
          this.evalQuiz();
          clearInterval(t);
        }else{
          this.timer--;
        }
    },1000);
  }

  getFormattedTime(){
    let minute = Math.floor(this.timer/60)
    let seconds=this.timer-minute*60
    return `${minute} min : ${seconds} sec`;
  }

  evalQuiz(){
    //calculation

    //call to server to check questions
    this.questionService.evalQuiz(this.questions).subscribe(
      (data:any)=>{
        console.log(data); 
        this.marksGot = Number(data.marksGot).toFixed(2);
        this.correctAnswers=data.correctAnswers;
        this.attempted=data.attempted; 
        this.isSubmit=true;
      },
      (error)=>{
        console.log(error);
        
      }
    )

    // this.isSubmit=true;

    // this.questions.forEach((q:any)=>{
    //   if(q.givenAnswer==q.answer)
    //     {
    //       this.correctAnswers++;
    //      let marksSingle= this.questions[0].quiz.maxMarks/this.questions.length;
    //      this.marksGot += marksSingle;
    //     }
    //     if(q.givenAnswer.trim()!='')
    //       {
    //         this.attempted++;
    //       }
    // });

    // console.log('Correct Answers :' +this.correctAnswers);
    // console.log('Marks Got :' +this.marksGot);
    // console.log(this.questions);
  }

  printPage(){
    window.print();
  }

}
