import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Student1Service } from "../services/student1.service";
import { Student } from "../models/student.model";

@Component({
  selector: "app-student-detail",
  standalone: false,
  templateUrl: "./student-detail.component.html",
  styleUrls: ["./student-detail.component.css"],
})
export class StudentDetailComponent implements OnInit {
  student!: Student;

  constructor(
    private route: ActivatedRoute,
    private student1Service: Student1Service
  ) {}

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get("id"));
    this.student1Service.getStudentById(id).subscribe((data) => {
      this.student = data;
    });
  }
}
