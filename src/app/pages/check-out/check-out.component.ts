import {
  Component,
  DoCheck,
  ElementRef,
  HostListener,
  ViewChild,
} from '@angular/core';
import { AuthServiceService } from 'src/app/service/auth-service.service';

@Component({
  selector: 'app-check-out',
  templateUrl: './check-out.component.html',
  styleUrls: ['./check-out.component.css'],
})
export class CheckOutComponent implements DoCheck {
  isBuyMessage: boolean = false;
  constructor(private userData: AuthServiceService) {}
  @ViewChild('endMessage') endMessage!: ElementRef;
  @HostListener('document:click', ['$event'])
  onClickOutside(event: MouseEvent) {
    if (this.endMessage?.nativeElement.contains(event.target)) {
      this.isBuyMessage = false;
      this.userData.isBuy = this.isBuyMessage;
    }
  }
  ngDoCheck(): void {
    if (this.userData.isBuy) {
      this.isBuyMessage = true;
    }
  }
  close() {
    this.isBuyMessage = false;
    this.userData.isBuy = this.isBuyMessage;
  }
}
