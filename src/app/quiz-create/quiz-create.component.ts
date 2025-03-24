import { Component } from '@angular/core';
import { QuizService } from '../services/quiz.service';

@Component({
  selector: 'app-quiz-create',
  standalone: false,
  templateUrl: './quiz-create.component.html',
  styleUrls: ['./quiz-create.component.css']
})
export class QuizCreateComponent {
  quizTitle: string = '';
  questions: any[] = [];
  newQuestion: string = '';

  constructor(private quizService: QuizService) {}

  addQuestion() {
    if (this.newQuestion.trim()) {
      this.questions.push({ text: this.newQuestion, options: [], correctAnswer: '' });
      this.newQuestion = '';
    } else {
      alert('Please enter a valid question');
    }
  }

  saveQuiz() {
    if (!this.quizTitle.trim() || this.questions.length === 0) {
      alert('Please enter a quiz title and at least one question.');
      return;
    }

    const quizData = { title: this.quizTitle, questions: this.questions };
    this.quizService.createQuiz(quizData).subscribe({
      next: () => alert('Quiz Created!'),
      error: (err) => console.error('Error saving quiz:', err)
    });
  }
}
