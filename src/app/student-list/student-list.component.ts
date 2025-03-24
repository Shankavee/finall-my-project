import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Student1Service } from "../services/student1.service";
import { Student } from "../models/student.model";

@Component({
  selector: "app-student-list",
  standalone: false,
  templateUrl: "./student-list.component.html",
  styleUrls: ["./student-list.component.css"],
})
export class StudentListComponent implements OnInit {
  students: Student[] = [];

  constructor(private student1Service: Student1Service, private router: Router) {}

  ngOnInit() {
    this.loadStudents();
  }

  loadStudents() {
    this.student1Service.getStudents().subscribe((data: Student[]) => {
      this.students = data;
    });
  }

  viewDetails(id: number) {
    this.router.navigate(["/student-detail", id]);
  }
}
