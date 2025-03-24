import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-profile-management',
  standalone: false,
  templateUrl: './profile-management.component.html',
  styleUrls: ['./profile-management.component.css']
})
export class ProfileManagementComponent implements OnInit {
  profile: any = null;
  reviews: any[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.loadProfile();
    this.loadReviews();
  }

  loadProfile(): void {
    this.http.get('/api/profile').subscribe((data: any) => {
      this.profile = data;
    });
  }

  loadReviews(): void {
    this.http.get('/api/reviews').subscribe((data: any) => {
      this.reviews = data;
    });
  }
}
