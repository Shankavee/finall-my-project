import { Component, OnInit } from '@angular/core';
import { ProgressService } from '../services/progress.service';

@Component({
  selector: 'app-progress',
  standalone: false,
  templateUrl: './progress.component.html',
  styleUrls: ['./progress.component.css']
})
export class ProgressComponent implements OnInit {
  progressData: any[] = [];

  constructor(private progressService: ProgressService) {}

  ngOnInit(): void {
    this.fetchProgress();
  }

  fetchProgress(): void {
    this.progressService.getProgress().subscribe(
      (data) => {
        this.progressData = data;
      },
      (error) => {
        console.error('Error fetching progress data:', error);
      }
    );
  }
}