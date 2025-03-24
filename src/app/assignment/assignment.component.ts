import { Component, OnInit } from '@angular/core';
import { AssignmentService } from '../services/assignment.service';

@Component({
  selector: 'app-assignment',
  standalone: false,
  templateUrl: './assignment.component.html',
  styleUrls: ['./assignment.component.css'],
})
export class AssignmentComponent implements OnInit {
  assignments: any[] = [];
  newAssignment: any = { title: '', description: '', due_date: '', resources: '', course_id: null };
  selectedAssignment: any = null;

  constructor(private assignmentService: AssignmentService) {}

  ngOnInit() {
    this.loadAssignments();
  }

  loadAssignments() {
    this.assignmentService.getAssignments().subscribe((data) => {
      this.assignments = data;
    });
  }

  createAssignment() {
    this.assignmentService.createAssignment(this.newAssignment).subscribe(() => {
      this.loadAssignments();
      this.newAssignment = { title: '', description: '', due_date: '', resources: '', course_id: null };
    });
  }

  populateAssignmentForm(assignment: any) {
    this.selectedAssignment = { ...assignment };
  }

  updateAssignment() {
    this.assignmentService.updateAssignment(this.selectedAssignment.id, this.selectedAssignment).subscribe(() => {
      this.loadAssignments();
      this.selectedAssignment = null;
    });
  }

  cancelEdit() {
    this.selectedAssignment = null;
  }

  confirmDeleteAssignment(id: number) {
    if (confirm('Are you sure you want to delete this assignment?')) {
      this.assignmentService.deleteAssignment(id).subscribe(() => {
        this.loadAssignments();
      });
    }
  }
}
