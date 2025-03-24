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
export class AnnouncementService {
  private apiUrl = 'http://localhost:3000/announcements';

  constructor(private http: HttpClient) {}

  getAnnouncements(): Observable<Announcement[]> {
    return this.http.get<Announcement[]>(this.apiUrl);
  }

  createAnnouncement(announcement: Announcement): Observable<Announcement> {
    return this.http.post<Announcement>(this.apiUrl, announcement);
  }
}
