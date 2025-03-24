import { Component, OnInit } from '@angular/core';
import { ClassService } from '../services/class.service';

@Component({
  selector: 'app-class-list',
  standalone: false,
  templateUrl: './class-list.component.html',
  styleUrls: ['./class-list.component.css']
})
export class ClassListComponent implements OnInit {
  classes: any[] = [];

  constructor(private classService: ClassService) {}

  ngOnInit(): void {
    this.classService.getClasses().subscribe((data) => {
      this.classes = data;
    });
  }
}
