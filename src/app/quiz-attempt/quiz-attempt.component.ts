import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';  // ✅ Import Router
import { QuizService } from '../services/quiz.service';

@Component({
  selector: 'app-quiz-attempt',
  standalone: false,
  templateUrl: './quiz-attempt.component.html',
  styleUrls: ['./quiz-attempt.component.css']
})
export class QuizAttemptComponent implements OnInit {
  quizAttempts: any[] = [];

  constructor(private quizService: QuizService) {}

  ngOnInit(): void {
    this.fetchQuizAttempts();
  }

  fetchQuizAttempts(): void {
    this.quizService.getQuizAttempts().subscribe(
      (data) => {
        this.quizAttempts = data;
      },
      (error) => {
        console.error('Error fetching quiz attempts:', error);
      }
    );
  }
}