import { CommonModule } from '@angular/common';
import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { DataService } from 'src/app/service/data.service';
import { RouterModule } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { MessageService } from 'src/app/service/message.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  standalone: true,
  imports: [FormsModule, RouterLink, RouterModule, CommonModule],
})
export class HeaderComponent {
  showInput: boolean = false;
  searchTerm: string = ''; // Holds the user's search input
  filteredProducts: any[] = []; // Holds the search results
  isDropdownVisible: boolean = false;
  isDesktop = window.innerWidth >= 769;
  logIn: boolean = false;
  // Reference to the input and container elements
  @ViewChild('searchInput') searchInput!: ElementRef<HTMLInputElement>;
  @ViewChild('searchContainer') searchContainer!: ElementRef;

  constructor(
    private dataService: DataService,
    private route: Router,
    public afAuth: AngularFireAuth,
    private showMessage: MessageService
  ) {
    this.afAuth.authState.subscribe((user) => {
      this.logIn = !!user; // If user is not null, set isLoggedIn to true
    });
  }

  // Toggles the input field visibility and focuses the input when shown
  toggleSearch() {
    this.showInput = !this.showInput;
    if (this.showInput) {
      setTimeout(() => {
        this.searchInput.nativeElement.focus();
      }, 0);
    } else {
      if (this.searchTerm.trim()) {
        this.dataService.searchResult = this.searchTerm;
        this.route.navigate(['/products']);
        if (this.searchTerm) {
          this.searchTerm = '';
        }
      }
    }
  }

  // Listens for clicks outside the search container
  @HostListener('document:click', ['$event'])
  onClickOutside(event: MouseEvent) {
    if (
      this.showInput &&
      !this.searchContainer.nativeElement.contains(event.target)
    ) {
      this.showInput = false;
    }
  }

  //Drop down list
  dropDown() {
    this.isDropdownVisible = !this.isDropdownVisible;
  }

  hideDropdown() {
    this.isDropdownVisible = false;
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    this.isDesktop = window.innerWidth >= 769; // Adjust based on your breakpoint
    if (this.isDesktop) {
      this.isDropdownVisible = false; // Close the menu when switching to desktop
    }
  }
  async logOut() {
    try {
      await this.afAuth.signOut();
      this.route.navigate(['/login']);
      this.showMessage.showInfo('User Logged Out');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  }
}
