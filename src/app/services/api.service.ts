import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private API_URL = 'http://localhost:5000';

  constructor(private http: HttpClient) {}

  getSubmissions(): Observable<any> {
    return this.http.get(`${this.API_URL}/submissions`);
  }

  gradeSubmission(data: any): Observable<any> {
    return this.http.post(`${this.API_URL}/grade`, data);
  }
}
