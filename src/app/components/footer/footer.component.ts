import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css'],
  standalone: true,
  imports: [FormsModule, RouterLink],
})
export class FooterComponent {
  constructor(private showMessage: ToastrService) {}
  currentYear: number = new Date().getFullYear();
  email: string = '';
  sendEmail() {
    if (this.email) {
      window.location.href = ` mailto:${this.email}?subject=Subscribe&body=Hello, ${this.email}! `;
    } else {
      this.showMessage.error('Inter Your Email');
    }
  }
}
