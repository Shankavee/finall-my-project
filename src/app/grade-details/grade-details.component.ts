import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GradeService } from '../services/grade.service';

@Component({
  selector: 'app-grade-details',
  standalone: false,
  templateUrl: './grade-details.component.html',
  styleUrls: ['./grade-details.component.css']
})
export class GradeDetailsComponent implements OnInit {
  grade: any;

  constructor(
    private route: ActivatedRoute,
    private gradeService: GradeService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = +this.route.snapshot.paramMap.get('id')!;
    this.gradeService.getGradeDetails(id).subscribe(
      (data) => {
        this.grade = data;
      },
      (error) => {
        console.error('Error fetching grade details:', error);
      }
    );
  }

  // Update a grade
  updateGrade(): void {
    this.gradeService.updateGrade(this.grade.id, this.grade).subscribe(
      () => {
        alert('Grade updated successfully!');
        this.router.navigate(['/grades']);
      },
      (error) => {
        console.error('Error updating grade:', error);
      }
    );
  }
}