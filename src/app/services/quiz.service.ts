import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class QuizService {
  private apiUrl = 'http://localhost:3000/api';

  constructor(private http: HttpClient) {}

  createQuiz(quizData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/createQuiz`, quizData);
  }


  submitQuizAttempt(attempt: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/submitQuiz`, attempt);
  }

  getQuizResult(quizId: number, userName: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/quizResult/${quizId}?user=${userName}`);
  }

  getQuizzes(): Observable<any> {
    return this.http.get(`${this.apiUrl}/quizzes`);
  }

  getQuizById(quizId: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/quiz/${quizId}`);
  }

  getQuizAttempts(): Observable<any> {
    return this.http.get(`${this.apiUrl}/quizAttempts`);
  }

  getQuizAttemptById(attemptId: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/quizAttempts/${attemptId}`);
  }
}
