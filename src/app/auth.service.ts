import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:3000/api'; // Ensure your backend URL is correct

  constructor(private http: HttpClient) {}

  register(userData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, userData, {
      headers: { 'Content-Type': 'application/json' },
    });
  }

  login(data: { email: string; password: string; role: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, data);
  }

  requestReset(emailData: { email: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/request-reset`, emailData);
  }

  // **Fix: Added ValidPasswordToken() method**
  ValidPasswordToken(tokenData: { resettoken: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/validate-reset-token`, tokenData);
  }

  // **Fix: Added newPassword() method**
  newPassword(passwordData: { resettoken: string; newPassword: string; confirmPassword: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/reset-password`, passwordData);
  }
}
