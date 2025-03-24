import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MonetizationService {
  private apiUrl = 'http://localhost:3000'; // Replace with your backend URL

  constructor(private http: HttpClient) {}

  getRevenueSharing(): Observable<any> {
    return this.http.get(`${this.apiUrl}/revenue-sharing`);
  }

  getPromotionalCodes(): Observable<any> {
    return this.http.get(`${this.apiUrl}/promotional-codes`);
  }

  addPromotionalCode(code: string, discount: number): Observable<any> {
    return this.http.post(`${this.apiUrl}/promotional-codes`, { code, discount });
  }

  getPaymentDashboard(userId: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/payment-dashboard?userId=${userId}`);
  }
}
