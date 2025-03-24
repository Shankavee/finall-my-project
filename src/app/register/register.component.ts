import { Component } from '@angular/core';
import { Router } from '@angular/router'; // Import Router
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-register',
  standalone: false,
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  formData = {
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: '',
  };

  constructor(private authService: AuthService, private router: Router) {} // Inject Router

  signup() {
    if (this.formData.password !== this.formData.confirmPassword) {
      alert('Passwords do not match!');
      return;
    }

    this.authService.register(this.formData).subscribe(
      (response) => {
        console.log('Registration successful:', response);
        alert('Registration successful!');
        this.router.navigate(['/login']); // Navigate to the login page
      },
      (error) => {
        console.error('Error:', error);
        alert(`Registration failed: ${error.error.message || error.message}`);
      }
    );
  }
}
