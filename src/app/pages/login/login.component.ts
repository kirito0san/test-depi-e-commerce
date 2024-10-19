import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  Validators,
  FormsModule,
  FormGroup,
  FormBuilder,
  ReactiveFormsModule,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';
import { MessageService } from 'src/app/service/message.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule, RouterLink],
})
export class LoginComponent implements OnInit {
  signupForm!: FormGroup;
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private showMessage: MessageService,
    private authService: AuthService
  ) {}
  ngOnInit() {
    this.signupForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }
  async onSubmit() {
    const email = this.signupForm.get('email')?.value;
    const password = this.signupForm.get('password')?.value;
    try {
      await this.authService.login(email, password);
      this.showMessage.showSuccess('Welcome Back');
      this.router.navigate(['/']);
    } catch (error: any) {
      this.showMessage.showError('Login failed. Please try again.');
    }
  }
}
