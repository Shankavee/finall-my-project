import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MaterialService {
  private apiUrl = 'http://localhost:3000/api/materials';

  constructor(private http: HttpClient) { }

  getMaterials(): Observable<any> {
    return this.http.get(this.apiUrl);
  }
}