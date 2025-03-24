import { Component, OnInit } from '@angular/core';
import { MaterialService } from '../services/material.service';

@Component({
  selector: 'app-study-materials',
  standalone: false,
  templateUrl: './study-materials.component.html',
  styleUrls: ['./study-materials.component.css']
})
export class StudyMaterialsComponent implements OnInit {
  materials: any[] = [];

  constructor(private materialService: MaterialService) { }

  ngOnInit(): void {
    this.materialService.getMaterials().subscribe(
      (data: any) => {
        this.materials = data;
      },
      (error) => {
        console.error('Error fetching study materials:', error);
      }
    );
  }
}