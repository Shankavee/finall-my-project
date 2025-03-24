import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LessonService {
  private apiUrl = 'http://localhost:5000/courses';

  constructor(private http: HttpClient) {}

  getLessons(courseId: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${courseId}/lessons`);
  }

  updateProgress(studentId: number, lessonId: number, completion: number): Observable<any> {
    return this.http.post(`http://localhost:5000/progress`, { studentId, lessonId, completionPercentage: completion });
  }
}
