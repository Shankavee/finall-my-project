import { Component, OnInit } from '@angular/core';
import { AssignmentService } from '../services/assignment.service';

@Component({
  selector: 'app-assignment-submission',
  standalone: false,
  templateUrl: './assignment-submission.component.html',
  styleUrls: ['./assignment-submission.component.css'],
})
export class AssignmentSubmissionComponent implements OnInit {
  assignments: any[] = [];
  selectedFile: File | null = null;

  constructor(private assignmentService: AssignmentService) {}

  ngOnInit(): void {
    this.fetchAssignments();
  }

  fetchAssignments(): void {
    this.assignmentService.getAssignments().subscribe(
      (data) => {
        this.assignments = data;
      },
      (error) => {
        console.error('Error fetching assignments:', error);
      }
    );
  }

  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0];
  }

  onSubmit(assignmentId: number): void {
    if (!this.selectedFile) {
      alert('Please select a file to upload.');
      return;
    }

    const studentId = 1; // Replace with actual student ID (e.g., from authentication)
    this.assignmentService.submitAssignment(assignmentId, studentId, this.selectedFile).subscribe(
      (response) => {
        alert('Assignment submitted successfully!');
      },
      (error) => {
        console.error('Error submitting assignment:', error);
      }
    );
  }
}