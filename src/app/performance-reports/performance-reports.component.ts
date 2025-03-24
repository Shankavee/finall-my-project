import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-performance-reports',
  standalone: false,
  templateUrl: './performance-reports.component.html',
  styleUrls: ['./performance-reports.component.css']
})
export class PerformanceReportsComponent implements OnInit {
  performanceData: any;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.http.get('http://localhost:3000/api/performance-reports').subscribe(data => {
      this.performanceData = data;
    });
  }
}