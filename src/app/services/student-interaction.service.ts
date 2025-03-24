import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class StudentInteractionService {
  private apiUrl = 'http://localhost:3000'; // Replace with your back-end URL

  constructor(private http: HttpClient) {}

  getForums(): Observable<any> {
    return this.http.get(`${this.apiUrl}/forums`);
  }

  createForumPost(post: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/forums`, post);
  }

  getAnnouncements(): Observable<any> {
    return this.http.get(`${this.apiUrl}/announcements`);
  }

  createAnnouncement(announcement: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/announcements`, announcement);
  }

  sendMessage(message: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/messages`, message);
  }
}
