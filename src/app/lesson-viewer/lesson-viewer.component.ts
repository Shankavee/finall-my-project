import { Component, OnInit } from '@angular/core';
import { LessonService } from '../services/lesson.service';

@Component({
  selector: 'app-lesson-viewer',
  standalone: false,
  templateUrl: './lesson-viewer.component.html',
  styleUrls: ['./lesson-viewer.component.css'],
})
export class LessonViewerComponent implements OnInit {
  lessons: any[] = [];
  courseId = 1; // Example Course ID
  studentId = 1; // Example Student ID

  constructor(private lessonService: LessonService) {}

  ngOnInit() {
    this.lessonService.getLessons(this.courseId).subscribe(
      (data) => {
        this.lessons = data;
      },
      (error) => console.error(error)
    );
  }

  markAsComplete(lessonId: number) {
    this.lessonService.updateProgress(this.studentId, lessonId, 100).subscribe(
      (res) => console.log('Progress updated'),
      (error) => console.error(error)
    );
  }
}
