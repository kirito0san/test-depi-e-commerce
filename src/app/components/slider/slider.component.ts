import { Component, ViewChild } from '@angular/core';
import { NgbCarousel, NgbCarouselModule } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthServiceService } from 'src/app/service/auth-service.service';
@Component({
  selector: 'app-slider',
  standalone: true,
  imports: [NgbCarouselModule, CommonModule],
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.css'],
})
export class SliderComponent {
  @ViewChild('carousel') carousel!: NgbCarousel;
  constructor(private router: Router, private authServes: AuthServiceService) {}

  images = [
    {
      src: '../../../assets/electronics.webp',
      alt: `electronics`,
      title: `electronics`,
      place: `electronics`,
    },
    {
      src: '../../../assets/wemen.webp',
      alt: `women's clothing`,
      title: `women's clothing`,
      place: `women's clothing`,
    },
    {
      src: '../../../assets/only-men.webp',
      alt: `men's clothing`,
      title: `men's clothing`,
      place: `men's clothing`,
    },
    {
      src: '../../../assets/all.webp',
      alt: 'all',
      title: 'All category',
      place: `all`,
    },
    {
      src: '../../../assets/electronics.webp',
      alt: `electronics`,
      title: `electronics`,
      place: `electronics`,
    },
    {
      src: '../../../assets/wemen.webp',
      alt: `women's clothing`,
      title: `women's clothing`,
      place: `women's clothing`,
    },
    {
      src: '../../../assets/only-men.webp',
      alt: `men's clothing`,
      title: `men's clothing`,
      place: `men's clothing`,
    },
    {
      src: '../../../assets/all.webp',
      alt: 'all',
      title: 'All category',
      place: `all`,
    },
    {
      src: '../../../assets/electronics.webp',
      alt: `electronics`,
      title: `electronics`,
      place: `electronics`,
    },
    {
      src: '../../../assets/wemen.webp',
      alt: `women's clothing`,
      title: `women's clothing`,
      place: `women's clothing`,
    },
    {
      src: '../../../assets/only-men.webp',
      alt: `men's clothing`,
      title: `men's clothing`,
      place: `men's clothing`,
    },
    {
      src: '../../../assets/all.webp',
      alt: 'all',
      title: 'All category',
      place: `all`,
    },
  ];

  imageChunks: any[][] = [];

  ngOnInit() {
    this.updateImageChunks();
  window.addEventListener('resize', this.updateImageChunks.bind(this));
  }
  onClick(i: string) {
    this.authServes.category = i;
    this.router.navigate([`/products`]);
  }
  chunkArray(array: any[], size: number) {
    const chunked = [];
    for (let i = 0; i < array.length; i += size) {
      chunked.push(array.slice(i, i + size));
    }
    return chunked;
  }

  next() {
    this.carousel.next();
  }

  prev() {
    this.carousel.prev();
  }


  updateImageChunks() {
    const screenWidth = window.innerWidth;
    let chunkSize = 3;

    if (screenWidth <= 768) {
      chunkSize = 2;
    }

    if (screenWidth <= 576) {
      chunkSize = 1;
    }
    this.imageChunks = this.chunkArray(this.images, chunkSize);
  }
}
