import { Component, OnInit } from '@angular/core';
import { RecommendationService } from '../services/recommendation.service';

@Component({
  selector: 'app-recommendations',
  standalone: false,
  templateUrl: './recommendations.component.html',
  styleUrls: ['./recommendations.component.css'],
})
export class RecommendationsComponent implements OnInit {
  recommendedCourses: any[] = [];
  studentId = 1; // Assume logged-in student ID

  constructor(private recommendationService: RecommendationService) {}

  ngOnInit() {
    this.recommendationService.getRecommendations(this.studentId).subscribe(
      (data) => {
        this.recommendedCourses = data;
      },
      (error) => console.error(error)
    );
  }
}
