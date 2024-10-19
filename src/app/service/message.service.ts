import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class MessageService {
  constructor(private toster: ToastrService) {}
  showSuccess(message: string) {
    this.toster.success(message, 'Success');
  }
  showError(message: string) {
    this.toster.error(message, 'Error');
  }
  showWarning(message: string) {
    this.toster.warning(message, 'warning');
  }
  showInfo(message: string) {
    this.toster.info(message, 'Info');
  }
}
