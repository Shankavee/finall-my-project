import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { io } from "socket.io-client";

@Injectable({
  providedIn: 'root'
})
export class ClassService {
  private apiUrl = 'http://localhost:5000';
  private socket = io(this.apiUrl);

  constructor(private http: HttpClient) {}

  getClasses(): Observable<any> {
    return this.http.get(`${this.apiUrl}/classes`);
  }

  createClass(classData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/classes`, classData);
  }

  getDiscussions(classId: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/discussions/${classId}`);
  }

  sendMessage(data: any) {
    this.socket.emit("sendMessage", data);
  }

  receiveMessages() {
    return new Observable((observer) => {
      this.socket.on("newMessage", (message) => {
        observer.next(message);
      });
    });
  }
}
