import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StudentsService {
  private apiUrl = 'http://localhost:3000/students'; // Ensure this matches your server's URL

  constructor(private http: HttpClient) {}

  getStudentById(studentId: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${studentId}`);
  }
}