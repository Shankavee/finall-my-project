import { Component } from '@angular/core';

@Component({
  selector: 'app-instructor-dashboard',
  standalone: false,
  
  templateUrl: './instructor-dashboard.component.html',
  styleUrl: './instructor-dashboard.component.css'
})
export class InstructorDashboardComponent {
  courses = [
    { title: 'Course 1', progress: 60 },
    { title: 'Course 2', progress: 80 },
    { title: 'Course 3', progress: 50 },
  ];

  assignments = [
    { title: 'Assignment 1', dueDate: '2025-02-20' },
    { title: 'Quiz 1', dueDate: '2025-02-22' },
  ];

  createCourse() {
    console.log('Create Course clicked');
  }

  editCourse(course: any) {
    console.log('Edit Course clicked for:', course.title);
  }

  deleteCourse(course: any) {
    console.log('Delete Course clicked for:', course.title);
  }

  uploadContent() {
    console.log('Upload Content clicked');
  }

  createAssignment() {
    console.log('Create Assignment clicked');
  }

  gradeAssignment(assignment: any) {
    console.log('Grade Assignment clicked for:', assignment.title);
  }

  viewStudentProgress() {
    console.log('View Student Progress clicked');
  }

  startLiveSession() {
    console.log('Start Live Class clicked');
  }

  sendAnnouncement() {
    console.log('Send Announcement clicked');
  }

  viewGrades() {
    console.log('View Grades clicked');
  }

  generateReports() {
    console.log('Generate Reports clicked');
  }
}