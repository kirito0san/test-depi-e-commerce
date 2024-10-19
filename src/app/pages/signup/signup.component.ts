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
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule, RouterLink],
})
export class SignupComponent implements OnInit {
  signupForm!: FormGroup;
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private showMessage: MessageService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.signupForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      number: [
        '',
        [
          Validators.required,
          Validators.pattern('[0-9]+'),
          Validators.maxLength(14),
        ],
      ],
    });
  }
  async onSubmit() {
    const name = this.signupForm.get('name')?.value;
    const email = this.signupForm.get('email')?.value;
    const password = this.signupForm.get('password')?.value;
    const phone = this.signupForm.get('number')?.value;
    try {
      await this.authService.register(email, password, { name, phone });
      this.showMessage.showSuccess('Registration successful!');
      this.router.navigate(['/login']);
    } catch (error) {
      this.showMessage.showError('Your Email Is Already In Our Base');
    }
  }
}
