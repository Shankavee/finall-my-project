import { Component, OnInit } from '@angular/core';
import { CourseService } from '../services/course.service'; // Corrected path

@Component({
  selector: 'app-course-management',
  standalone: false,
  templateUrl: './course-management.component.html',
  styleUrls: ['./course-management.component.css'],
})
export class CourseManagementComponent implements OnInit {
  courses: any[] = [];
  newCourse = { title: '', description: '' };
  editCourse: any = null;

  constructor(private courseService: CourseService) {}

  ngOnInit() {
    this.loadCourses();
  }

  loadCourses() {
    this.courseService.getCourses().subscribe((data: any) => {
      this.courses = data;
    });
  }

  addCourse() {
    this.courseService.createCourse(this.newCourse).subscribe(() => {
      this.loadCourses();
      this.newCourse = { title: '', description: '' };
    });
  }

  edit(course: any) {
    this.editCourse = { ...course };
  }

  updateCourse() {
    this.courseService.updateCourse(this.editCourse.id, this.editCourse).subscribe(() => {
      this.loadCourses();
      this.editCourse = null;
    });
  }

  deleteCourse(id: number) {
    this.courseService.deleteCourse(id).subscribe(() => {
      this.loadCourses();
    });
  }
}