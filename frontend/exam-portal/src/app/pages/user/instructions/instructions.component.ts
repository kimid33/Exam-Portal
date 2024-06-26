import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { QuizService } from '../../../services/quiz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-instructions',
  templateUrl: './instructions.component.html',
  styleUrls: ['./instructions.component.css']
})
export class InstructionsComponent implements OnInit{
  qid:any;
  quiz:any;

  constructor(private route:ActivatedRoute,private quizService:QuizService,private router:Router){}

  ngOnInit(): void {
    this.qid=this.route.snapshot.params['qid'];  //ye route module ke url wali id hai jo waha diye hai ye yha ke variable wali nahi hai
    this.quizService.getQuiz(this.qid).subscribe(
      (data)=>{  //success callback function
        //console.log(data); 
        this.quiz=data;
      },
      (error)=>{
        console.log(error);
        alert('error in loading quiz data')
      }
    )
  }

  startQuiz(){
    Swal.fire({
      title: "Do you want to start the quiz?",
      //showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: "Start",
      //denyButtonText: `Don't save`,
      icon:'info'
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        //Swal.fire("Saved!", "", "success");
        this.router.navigate(['/start/'+this.qid]);
      } else if (result.isDenied) {
        Swal.fire("Changes are not saved", "", "info");
      }
    });
  }

}
