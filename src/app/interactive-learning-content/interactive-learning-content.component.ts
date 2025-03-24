import { Component, OnInit } from '@angular/core';
import { LearningContentService } from '../services/learning-content.service';

@Component({
  selector: 'app-interactive-learning-content',
  standalone: false,
  templateUrl: './interactive-learning-content.component.html',
  styleUrls: ['./interactive-learning-content.component.css'],
})
export class InteractiveLearningContentComponent implements OnInit {
  learningContent: any[] = [];

  constructor(private learningContentService: LearningContentService) {}

  ngOnInit(): void {
    this.fetchLearningContent();
  }

  fetchLearningContent(): void {
    this.learningContentService.getLearningContent().subscribe(
      (data) => {
        this.learningContent = data;
      },
      (error) => {
        console.error('Error fetching learning content:', error);
      }
    );
  }
}