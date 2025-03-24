import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FeedbackService {
  private apiUrl = 'http://localhost:3000/api/feedbacks';

  constructor(private http: HttpClient) {}

  // Fetch all feedback entries
  getFeedbacks(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  // Fetch feedback details by ID
  getFeedbackDetails(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`);
  }
}