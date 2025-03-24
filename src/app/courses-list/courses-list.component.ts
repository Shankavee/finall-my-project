import { Component, OnInit } from '@angular/core';
import { Course1Service } from '../services/course1.service';
import { Course } from '../models/course.model'; // Import the Course interface

@Component({
  selector: 'app-courses-list',
  standalone: false,
  templateUrl: './courses-list.component.html',
  styleUrls: ['./courses-list.component.css']
})
export class CoursesListComponent implements OnInit {
  courses: any[] = [];
  newCourse = { title: '', description: '' };

  constructor(private course1Service: Course1Service) {}

  ngOnInit() {
    this.loadCourses();
  }

  loadCourses() {
    this.course1Service.getCourses().subscribe((data: any) => {
      this.courses = data;
    });
  }
}
