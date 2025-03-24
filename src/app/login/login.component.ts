import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginData = {
    email: '',
    password: '',
    role: '',
  };

  constructor(private http: HttpClient, private router: Router) {}

  login() {
    this.http.post('http://localhost:3000/api/login', this.loginData).subscribe(
      (response: any) => {
        alert(response.message);
        if (response.success) {
          localStorage.setItem('token', response.token);

          // Redirect based on role
          if (response.role === 'student') {
            this.router.navigate(['/student-dashboard']);
          } else if (response.role === 'instructor') {
            this.router.navigate(['/instructor-dashboard']);
          }
        }
      },
      (error) => {
        alert(error.error.message);
      }
    );
  }
}