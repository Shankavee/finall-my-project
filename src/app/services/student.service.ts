import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  private apiUrl = 'http://localhost:5000';

  constructor(private http: HttpClient) {}

  getStudents(): Observable<any> {
    return this.http.get(`${this.apiUrl}/students`);
  }

  addStudent(student: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/students`, student);
  }

  getAttendance(studentId: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/attendance/${studentId}`);
  }

  getProgress(studentId: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/progress/${studentId}`);
  }

  getEngagement(studentId: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/engagement/${studentId}`);
  }

  // Fetch all enrollments
  getEnrollments(): Observable<any> {
    return this.http.get(`${this.apiUrl}/enrollments`);
  }

  // Update enrollment status
  updateEnrollmentStatus(id: number, status: string): Observable<any> {
    return this.http.put(`${this.apiUrl}/enrollments/${id}`, { status });
  }
}
