import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LearningService {
  private API_URL = 'http://localhost:5000';

  constructor(private http: HttpClient) {}

  getContent(courseId: number) {
    return this.http.get(`${this.API_URL}/content/${courseId}`);
  }
}
