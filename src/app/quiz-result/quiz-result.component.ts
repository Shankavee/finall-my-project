import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuizService } from '../services/quiz.service';

@Component({
  selector: 'app-quiz-result',
  standalone: false,
  templateUrl: './quiz-result.component.html',
  styleUrls: ['./quiz-result.component.css']
})
export class QuizResultComponent implements OnInit {
  quizAttemptId: number | null = null; // ID entered by the user
  quizResult: any = null; // Stores the fetched quiz result

  constructor(private quizService: QuizService) {}

  ngOnInit(): void {}

  // Fetch quiz result by ID
  fetchQuizResultById(): void {
    if (this.quizAttemptId) {
      this.quizService.getQuizAttemptById(this.quizAttemptId).subscribe(
        (data) => {
          this.quizResult = data;
        },
        (error) => {
          console.error('Error fetching quiz result:', error);
          alert('Quiz result not found. Please check the ID and try again.');
          this.quizResult = null; // Clear the result if there's an error
        }
      );
    } else {
      alert('Please enter a valid ID.');
    }
  }
}