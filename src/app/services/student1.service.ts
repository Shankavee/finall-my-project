import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Student } from "../models/student.model";

@Injectable({
  providedIn: "root",
})
export class Student1Service {
  private apiUrl = "http://localhost:3000/students";

  constructor(private http: HttpClient) {}

  getStudents(): Observable<Student[]> {
    return this.http.get<Student[]>(this.apiUrl);
  }

  getStudentById(id: number): Observable<Student> {
    return this.http.get<Student>(`${this.apiUrl}/${id}`);
  }

  updateStudent(id: number, data: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, data);
  }

  deleteStudent(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
