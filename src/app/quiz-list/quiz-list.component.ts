import { Component, OnInit } from '@angular/core';
import { QuizService } from '../services/quiz.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-quiz-list',
  standalone: false,
  templateUrl: './quiz-list.component.html',
  styleUrls: ['./quiz-list.component.css']
})
export class QuizListComponent implements OnInit {
  quizzes: any[] = [];

  constructor(
    private quizService: QuizService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.fetchQuizzes();
  }

  fetchQuizzes(): void {
    this.quizService.getQuizzes().subscribe(
      (data) => {
        this.quizzes = data;
      },
      (error) => {
        console.error('Error fetching quizzes:', error);
      }
    );
  }

  viewDetails(quizId: number): void {
    this.router.navigate(['/quiz-details', quizId]);
  }
}