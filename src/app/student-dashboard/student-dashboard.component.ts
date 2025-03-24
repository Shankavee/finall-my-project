import { Component } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';

@Component({
  selector: 'app-student-dashboard',
  standalone: false,
  templateUrl: './student-dashboard.component.html',
  styleUrls: ['./student-dashboard.component.css'],
})
export class StudentDashboardComponent {
  courses = [
    { title: 'Angular Basics', progress: 75, enrolled: true },
    { title: 'Node.js Fundamentals', progress: 50, enrolled: false },
    { title: 'Data Structures', progress: 100, enrolled: true },
  ];

  assignments = [
    { title: 'Assignment 1', dueDate: 'Feb 20, 2025', status: 'Pending' },
    { title: 'Project Report', dueDate: 'Feb 25, 2025', status: 'Completed' },
  ];

  liveClass = { title: 'Advanced Angular', date: 'Feb 15, 2025', time: '6:00 PM' };

  certifications = [
    { title: 'Angular Certification', status: 'Completed' },
    { title: 'Node.js Developer', status: 'In Progress' },
  ];

  enroll(course: any) {
    course.enrolled = !course.enrolled;
  }
}
