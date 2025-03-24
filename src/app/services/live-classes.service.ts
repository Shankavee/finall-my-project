import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LiveClassesService {
  private baseUrl = 'http://localhost:3000/api';

  constructor(private http: HttpClient) {}

  getClasses(): Observable<any> {
    return this.http.get(`${this.baseUrl}/classes`);
  }

  addClass(newClass: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/classes`, newClass);
  }
}