import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ContentService {
  private baseUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  uploadContent(formData: FormData) {
    return this.http.post(`${this.baseUrl}/upload`, formData);
  }

  getUploadedContent(courseId: number) {
    return this.http.get(`${this.baseUrl}/uploads?course_id=${courseId}`);
  }

  deleteContent(id: number) {
    return this.http.delete(`${this.baseUrl}/delete/${id}`);
  }
}
