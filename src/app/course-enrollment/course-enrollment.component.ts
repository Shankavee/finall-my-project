import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { StudentService } from '../services/student.service';

@Component({
  selector: 'app-course-enrollment',
  standalone: false,
  templateUrl: './course-enrollment.component.html',
  styleUrls: ['./course-enrollment.component.css']
})
export class CourseEnrollmentComponent implements OnInit {
  enrollments: any;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.fetchEnrollments();
  }

  // Fetch all enrollments
  fetchEnrollments() {
    this.http.get('http://localhost:3000/api/enrollments').subscribe(
      (data) => {
        this.enrollments = data;
      },
      (error) => {
        console.error('Error fetching enrollments:', error);
      }
    );
  }

  // Update enrollment status
  updateStatus(id: number, status: string) {
    this.http.put(`http://localhost:3000/api/enrollments/${id}`, { status }).subscribe(
      () => {
        alert(`Enrollment ${status} successfully!`);
        this.fetchEnrollments(); // Refresh the list after updating
      },
      (error) => {
        console.error('Error updating enrollment status:', error);
        alert('Failed to update enrollment status. Please try again.');
      }
    );
  }
}