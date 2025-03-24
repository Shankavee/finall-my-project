import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Announcement {
  id?: number;
  title: string;
  message: string;
  created_at?: string;
}

@Injectable({
  providedIn: 'root'
})
export class CommunicationService {
  private apiUrl = 'http://localhost:5000/announcements'; // Replace with your backend API URL

  constructor(private http: HttpClient) {}

  getAnnouncements(): Observable<Announcement[]> {
    return this.http.get<Announcement[]>(this.apiUrl);
  }

  createAnnouncement(data: Announcement): Observable<{ message: string }> {
    return this.http.post<{ message: string }>(this.apiUrl, data);
  }
}
