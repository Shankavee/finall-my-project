import { Component } from '@angular/core';
import { StudentsService } from '../services/students.service';

@Component({
  selector: 'app-certificates1',
  standalone: false,
  
  templateUrl: './certificates1.component.html',
  styleUrl: './certificates1.component.css'
})
export class Certificates1Component {
  studentId: number = 0;
  student = {
    name: '',
    course: '',
    completionDate: ''
  };

  constructor(private studentsService: StudentsService) {}

  fetchStudentDetails() {
    if (this.studentId) {
      this.studentsService.getStudentById(this.studentId).subscribe(
        (data) => {
          if (data) {
            this.student.name = data.name;
            this.student.course = data.class; // Assuming class is the course
            this.student.completionDate = data.completionDate;
          } else {
            alert('Student not found');
          }
        },
        (error) => {
          console.error('Error fetching student data', error);
          alert('There was an error fetching the student details. Please try again later.');
        }
      );
    } else {
      alert('Please enter a valid student ID');
    }
  }

}
