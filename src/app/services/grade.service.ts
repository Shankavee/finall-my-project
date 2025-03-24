import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GradeService {
  private apiUrl = 'http://localhost:3000/api/grades';

  constructor(private http: HttpClient) {}

  // GET all grades
  getGrades(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  // GET grade by ID
  getGradeDetails(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`);
  }

  // POST (Create) a new grade
  createGrade(grade: any): Observable<any> {
    return this.http.post(this.apiUrl, grade);
  }

  // PUT (Update) a grade by ID
  updateGrade(id: number, grade: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, grade);
  }

  // DELETE a grade by ID
  deleteGrade(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}