import { Component, OnInit } from '@angular/core';
import { LiveClassesService } from '../services/live-classes.service';

@Component({
  selector: 'app-live-classes',
  standalone: false,
  templateUrl: './live-classes.component.html',
  styleUrls: ['./live-classes.component.css']
})
export class LiveClassesComponent implements OnInit {
  classes: any[] = [];
  newClass: any = {};

  constructor(private liveclassesService: LiveClassesService) {}

  ngOnInit(): void {
    this.fetchClasses();
  }

  fetchClasses(): void {
    this.liveclassesService.getClasses().subscribe(
      (data) => {
        this.classes = data;
      },
      (error) => {
        console.error('Error fetching classes:', error);
      }
    );
  }

  addClass(): void {
    this.liveclassesService.addClass(this.newClass).subscribe(
      (data) => {
        this.classes.push(data);
        this.newClass = {}; // Reset the form
      },
      (error) => {
        console.error('Error adding class:', error);
      }
    );
  }

  // Open Zoom link in a new tab
  startLiveClass(): void {
    const zoomLink = 'https://zoom.us/'; // Replace with your actual Zoom link
    window.open(zoomLink, '_blank');
  }
}