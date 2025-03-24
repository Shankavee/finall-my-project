import { Component, OnInit } from '@angular/core';
import { FeedbackService } from '../services/feedback.service';

@Component({
  selector: 'app-feedback',
  standalone: false,
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.css']
})
export class FeedbackComponent implements OnInit {
  feedbacks: any[] = []; // Array to store feedback entries

  constructor(private feedbackService: FeedbackService) {}

  ngOnInit(): void {
    this.fetchFeedbacks(); // Fetch feedback data on component initialization
  }

  // Fetch all feedback entries from the backend
  fetchFeedbacks(): void {
    this.feedbackService.getFeedbacks().subscribe({
      next: (data: any[]) => {
        this.feedbacks = data;
      },
      error: (error: any) => {
        console.error('Error fetching feedbacks:', error);
      }
    });
  }
}