import { CommonModule, NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LogoComponent } from 'src/app/components/logo/logo.component';

@Component({
  selector: 'app-testimonials',
  templateUrl: './testimonials.component.html',
  styleUrls: ['./testimonials.component.css'],
  standalone: true,
  imports: [CommonModule, RouterLink, LogoComponent],
})
export class TestimonialsComponent {
  testimonials = [
    {
      stars: 5,
      title: 'Amazing Experience',
      name: 'Ahmed Sayed',
      comment:
        'This was an amazing experience! The team was professional, and the service exceeded my expectations. I’ll definitely be coming back!',
      Img: '/assets/kiritooo.webp',
      date: '2/7/2024',
    },
    {
      stars: 5,
      title: 'Really Impressed',
      name: 'Hager Sayed',
      comment:
        'Quality products at affordable prices. I was impressed with how quickly my order arrived. Highly recommended!',
      Img: '/assets/H-girl2.webp',
      date: '1/7/2022',
    },
    {
      stars: 4,
      name: 'Anfal Badr',
      title: 'Thank You',
      comment:
        'The support staff were helpful but took a little while to respond. However, the issue was resolved, and I’m happy with the outcome.',
      Img: '/assets/Hgirl1.webp',
      date: '7/10/2023',
    },
    {
      stars: 5,
      name: 'Linda Atef',
      title: 'Great Quality And Service',
      comment:
        '"I have been a customer for over a year, and I’ve never been disappointed. The consistency in quality and service is remarkable!',
      Img: '/assets/girl1.webp',
      date: '5/12/2021',
    },
    {
      stars: 5,
      name: 'Leza Atef',
      title: 'Great Experience',
      comment:
        'Great experience overall! The website is easy to navigate, and I found exactly what I was looking for. Will recommend to friends.',
      Img: '/assets/girl3.webp',
      date: '3/5/2022',
    },
    {
      stars: 4,
      name: 'Fady Hany',
      title: 'Good Service',
      comment:
        'Good service, but the product I received wasn’t exactly as described. Still, the return process was smooth, and the team handled it well.',
      Img: '/assets/boy1.webp',
      date: '7/12/2023',
    },
  ];
}
