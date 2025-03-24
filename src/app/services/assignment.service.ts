import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AssignmentService {
  private apiUrl = 'http://localhost:3000/assignments';

  constructor(private http: HttpClient) {}

  getAssignments() {
    return this.http.get<any[]>(this.apiUrl);
  }

  createAssignment(assignment: any) {
    return this.http.post(this.apiUrl, assignment);
  }

  updateAssignment(id: number, assignment: any) {
    return this.http.put(`${this.apiUrl}/${id}`, assignment);
  }

  deleteAssignment(id: number) {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  submitAssignment(assignmentId: number, studentId: number, file: File): Observable<any> {
    const formData = new FormData();
    formData.append('assignment_id', assignmentId.toString());
    formData.append('student_id', studentId.toString());
    formData.append('submission_file', file);
    return this.http.post(`${this.apiUrl}/submit`, formData);
  }
}
