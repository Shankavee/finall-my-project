import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LearningContentService {
  private apiUrl = 'http://localhost:3000/api/learning-content';

  constructor(private http: HttpClient) {}

  getLearningContent(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  addLearningContent(content: any): Observable<any> {
    return this.http.post(this.apiUrl, content);
  }
}