import { Component } from '@angular/core';
import { StudentsService } from '../services/students.service';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-certificate',
  standalone: false,
  templateUrl: './certificates.component.html',
  styleUrls: ['./certificates.component.css']
})
export class CertificatesComponent {
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

  printCertificate() {
    window.print();
  }

  downloadCertificate() {
    const certificateElement = document.getElementById('certificate');
    if (certificateElement) {
      html2canvas(certificateElement).then(canvas => {
        const link = document.createElement('a');
        link.href = canvas.toDataURL('image/png');
        link.download = 'certificate.png';
        link.click();
      });
    }
  }
}