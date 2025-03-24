import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GradeService } from '../services/grade.service';

@Component({
  selector: 'app-grade-list',
  standalone: false,
  templateUrl: './grade-list.component.html',
  styleUrls: ['./grade-list.component.css']
})
export class GradeListComponent implements OnInit {
  grades: any[] = [];

  constructor(private gradeService: GradeService, private router: Router) {}

  ngOnInit(): void {
    this.loadGrades();
  }

  // Load all grades
  loadGrades(): void {
    this.gradeService.getGrades().subscribe(
      (data) => {
        this.grades = data;
      },
      (error) => {
        console.error('Error fetching grades:', error);
      }
    );
  }

  // View grade details
  viewDetails(id: number): void {
    this.router.navigate(['/grade-details', id]);
  }

  // Delete a grade
  deleteGrade(id: number): void {
    if (confirm('Are you sure you want to delete this grade?')) {
      this.gradeService.deleteGrade(id).subscribe(
        () => {
          this.grades = this.grades.filter((grade) => grade.id !== id);
        },
        (error) => {
          console.error('Error deleting grade:', error);
        }
      );
    }
  }
}