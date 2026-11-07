
import {
  Injectable,
  PLATFORM_ID,
  computed,
  inject,
  signal,
} from '@angular/core';

import { isPlatformBrowser } from '@angular/common';

export interface CartProduct {
  id: number;
  name: string;
  description: string;
  price: number;
  category: string;
  image: string;
  badge?: string;
  rating?: number;
}

export interface CartItem extends CartProduct {
  quantity: number;
}

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private readonly platformId = inject(PLATFORM_ID);
  private readonly storageKey = 'noire-coffee-cart';

  readonly cartItems = signal<CartItem[]>([]);

  readonly cartCount = computed(() =>
    this.cartItems().reduce(
      (total, item) => total + item.quantity,
      0
    )
  );

  readonly cartTotal = computed(() =>
    this.cartItems().reduce(
      (total, item) => total + item.price * item.quantity,
      0
    )
  );

  readonly isCartEmpty = computed(
    () => this.cartItems().length === 0
  );

  constructor() {
    this.loadCart();
  }

  // Add product to cart
  addToCart(product: CartProduct): void {
    if (!this.isValidProduct(product)) {
      console.error('Invalid product:', product);
      return;
    }

    this.cartItems.update(items => {
      const existingItem = items.find(
        item => item.id === product.id
      );

      if (existingItem) {
        return items.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      return [
        ...items,
        {
          ...product,
          quantity: 1,
        },
      ];
    });

    this.saveCart();
  }

  // Increase quantity
  increaseQuantity(id: number): void {
    const item = this.cartItems().find(
      product => product.id === id
    );

    if (item) {
      this.setItemQuantity(id, item.quantity + 1);
    }
  }

  // Decrease quantity
  decreaseQuantity(id: number): void {
    const item = this.cartItems().find(
      product => product.id === id
    );

    if (item) {
      this.setItemQuantity(id, item.quantity - 1);
    }
  }

  // Update quantity
  updateQuantity(id: number, amount: number): void {
    const item = this.cartItems().find(
      product => product.id === id
    );

    if (!item || !Number.isFinite(amount)) return;

    this.setItemQuantity(id, item.quantity + amount);
  }

  // Set exact quantity
  setItemQuantity(id: number, quantity: number): void {
    if (!Number.isFinite(quantity)) return;

    if (quantity <= 0) {
      this.removeFromCart(id);
      return;
    }

    this.cartItems.update(items =>
      items.map(item =>
        item.id === id
          ? { ...item, quantity: Math.floor(quantity) }
          : item
      )
    );

    this.saveCart();
  }

  // Remove product
  removeFromCart(id: number): void {
    this.cartItems.update(items =>
      items.filter(item => item.id !== id)
    );

    this.saveCart();
  }

  // Clear entire cart
  clearCart(): void {
    this.cartItems.set([]);
    this.saveCart();
  }

  // Check whether product is in cart
  isInCart(id: number): boolean {
    return this.cartItems().some(
      item => item.id === id
    );
  }

  // Get product quantity
  getProductQuantity(id: number): number {
    return (
      this.cartItems().find(item => item.id === id)?.quantity ?? 0
    );
  }

  // Validate product data
  private isValidProduct(product: CartProduct): boolean {
    return (
      !!product &&
      Number.isFinite(product.id) &&
      typeof product.name === 'string' &&
      product.name.trim().length > 0 &&
      typeof product.description === 'string' &&
      Number.isFinite(product.price) &&
      product.price >= 0 &&
      typeof product.category === 'string' &&
      typeof product.image === 'string'
    );
  }

  // Load cart from localStorage
  private loadCart(): void {
    if (!isPlatformBrowser(this.platformId)) return;

    try {
      const savedCart = localStorage.getItem(this.storageKey);

      if (!savedCart) return;

      const parsed: unknown = JSON.parse(savedCart);

      if (!Array.isArray(parsed)) return;

      const validItems: CartItem[] = parsed.filter(
        (item): item is CartItem =>
          item !== null &&
          typeof item === 'object' &&
          Number.isFinite(item.id) &&
          typeof item.name === 'string' &&
          item.name.trim().length > 0 &&
          typeof item.description === 'string' &&
          Number.isFinite(item.price) &&
          item.price >= 0 &&
          typeof item.category === 'string' &&
          typeof item.image === 'string' &&
          Number.isFinite(item.quantity) &&
          item.quantity > 0
      );

      this.cartItems.set(
        validItems.map(item => ({
          ...item,
          quantity: Math.floor(item.quantity),
        }))
      );
    } catch (error) {
      console.error('Unable to load cart:', error);
      this.cartItems.set([]);
    }
  }

  // Save cart to localStorage
  private saveCart(): void {
    if (!isPlatformBrowser(this.platformId)) return;

    try {
      localStorage.setItem(
        this.storageKey,
        JSON.stringify(this.cartItems())
      );
    } catch (error) {
      console.error('Unable to save cart:', error);
    }
  }
}
