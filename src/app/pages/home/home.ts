
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ProductCard } from '../../components/product-card/product-card';
import type { CartProduct } from '../../services/cart';

interface HomeCategory {
  name: string;
  description: string;
  image: string;
  link: string;
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, ProductCard],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {
  readonly categories: HomeCategory[] = [
    {
      name: 'Hot Coffee',
      description: 'Warm up with every sip',
      image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=700',
      link: '/menu',
    },
    {
      name: 'Iced Coffee',
      description: 'Cool moments, great coffee',
      image: 'https://images.unsplash.com/photo-1517701604599-bb29b565090c?w=700',
      link: '/menu',
    },
    {
      name: 'Fresh Pastries',
      description: 'Made fresh every day',
      image: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=700',
      link: '/menu',
    },
  ];

  readonly featuredProducts: CartProduct[] = [
    {
      id: 1,
      name: 'Classic Cappuccino',
      description: 'Rich espresso topped with silky steamed milk and foam.',
      price: 95,
      category: 'Espresso',
      image: 'https://images.unsplash.com/photo-1572442388796-11668a67e53d?w=800',
      badge: 'Bestseller',
      rating: 4.9,
    },
    {
      id: 3,
      name: 'Iced Spanish Latte',
      description: 'A refreshing blend of espresso, milk and sweet cream.',
      price: 130,
      category: 'Cold Coffee',
      image: 'https://images.unsplash.com/photo-1517701604599-bb29b565090c?w=800',
      badge: 'Customer Favorite',
      rating: 4.9,
    },
    {
      id: 5,
      name: 'Iced Mocha',
      description: 'Chocolate, espresso and chilled milk over ice.',
      price: 125,
      category: 'Cold Coffee',
      image: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=800',
      badge: 'New',
      rating: 4.8,
    },
    {
      id: 7,
      name: 'Butter Croissant',
      description: 'Freshly baked, golden and beautifully flaky.',
      price: 75,
      category: 'Pastries',
      image: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=800',
      rating: 4.7,
    },
  ];

  readonly features = [
    {
      icon: '✳',
      title: 'Premium Beans',
      description: 'Carefully selected coffee beans for an exceptional taste.',
    },
    {
      icon: '♨',
      title: 'Expertly Crafted',
      description: 'Every cup is prepared with passion and attention to detail.',
    },
    {
      icon: '♡',
      title: 'Made With Love',
      description: 'A little extra care goes into everything we serve.',
    },
  ];

  readonly testimonials = [
    {
      quote: 'The coffee is absolutely beautiful. Every detail feels thoughtfully crafted.',
      name: 'Sarah M.',
      role: 'Coffee Lover',
    },
    {
      quote: 'My favorite place to slow down, enjoy a great latte, and relax.',
      name: 'Omar A.',
      role: 'Regular Customer',
    },
    {
      quote: 'Amazing coffee, lovely atmosphere, and pastries worth coming back for.',
      name: 'Mariam K.',
      role: 'Happy Customer',
    },
  ];
}
