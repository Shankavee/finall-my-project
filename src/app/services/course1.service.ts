import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Course } from '../models/course.model'; // Import the Course interface

@Injectable({
  providedIn: 'root',
})
export class Course1Service {
  private apiUrl = 'http://localhost:3000/courses'; // Node.js API endpoint

  constructor(private http: HttpClient) {}

  getCourses(): Observable<Course[]> {
    return this.http.get<Course[]>(this.apiUrl); // Fetch data from backend
  }
}
