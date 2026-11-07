
import { Component, computed, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ProductCard } from '../../components/product-card/product-card';
import type { CartProduct } from '../../services/cart';
import { CartService } from '../../services/cart';

interface MenuProduct extends CartProduct {
  rating: number;
}

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [RouterLink, ProductCard],
  templateUrl: './menu.html',
  styleUrl: './menu.scss',
})
export class Menu {
  readonly cartService = inject(CartService);

  readonly categories = [
    'All',
    'Espresso',
    'Cold Coffee',
    'Signature',
    'Pastries',
  ];

  readonly selectedCategory = signal('All');
  readonly searchQuery = signal('');

  readonly products: MenuProduct[] = [
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
      id: 2,
      name: 'Caramel Macchiato',
      description: 'Espresso, creamy milk and a delicate caramel finish.',
      price: 120,
      category: 'Signature',
      image: 'https://images.unsplash.com/photo-1485808191679-5f86510681a2?w=800',
      badge: 'Popular',
      rating: 4.8,
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
      id: 4,
      name: 'Americano',
      description: 'Bold espresso balanced with hot water.',
      price: 80,
      category: 'Espresso',
      image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=800',
      rating: 4.7,
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
      id: 6,
      name: 'Vanilla Flat White',
      description: 'Smooth double espresso with velvety vanilla milk.',
      price: 110,
      category: 'Signature',
      image: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=800',
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
    {
      id: 8,
      name: 'Chocolate Brownie',
      description: 'A rich chocolate brownie with a soft, fudgy center.',
      price: 85,
      category: 'Pastries',
      image: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=800',
      badge: 'Must Try',
      rating: 4.9,
    },
  ];

  readonly filteredProducts = computed(() => {
    const category = this.selectedCategory().toLowerCase();
    const query = this.searchQuery().trim().toLowerCase();

    return this.products.filter(product => {
      const matchesCategory =
        category === 'all' ||
        product.category.toLowerCase() === category;

      const matchesSearch =
        !query ||
        product.name.toLowerCase().includes(query) ||
        product.description.toLowerCase().includes(query) ||
        product.category.toLowerCase().includes(query);

      return matchesCategory && matchesSearch;
    });
  });

  selectCategory(category: string): void {
    this.selectedCategory.set(category);
  }

  onSearchChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.searchQuery.set(input.value);
  }

  clearSearch(): void {
    this.searchQuery.set('');
  }
}
