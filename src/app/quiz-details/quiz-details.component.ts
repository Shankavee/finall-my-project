import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuizService } from '../services/quiz.service';

@Component({
  selector: 'app-quiz-details',
  standalone: false,
  templateUrl: './quiz-details.component.html',
  styleUrls: ['./quiz-details.component.css']
})
export class QuizDetailsComponent implements OnInit {
  quiz: any;

  constructor(
    private route: ActivatedRoute,
    private quizService: QuizService
  ) {}

  ngOnInit(): void {
    const quizId = this.route.snapshot.paramMap.get('id');
    if (quizId) {
      this.fetchQuizDetails(+quizId);
    }
  }

  fetchQuizDetails(quizId: number): void {
    this.quizService.getQuizById(quizId).subscribe(
      (data) => {
        this.quiz = data;
      },
      (error) => {
        console.error('Error fetching quiz details:', error);
      }
    );
  }
}