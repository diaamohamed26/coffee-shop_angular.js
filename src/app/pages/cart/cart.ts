import { Component, computed, inject } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { CartService } from '../../services/cart';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CurrencyPipe, RouterLink],
  templateUrl: './cart.html',
  styleUrl: './cart.scss',
})
export class Cart {
  readonly cartService = inject(CartService);

  readonly cartItems = this.cartService.cartItems;
  readonly cartCount = this.cartService.cartCount;
  readonly subtotal = this.cartService.cartTotal;

  // Free shipping for this frontend demo.
  readonly shipping = 0;

  readonly total = computed(
    () => this.subtotal() + this.shipping
  );

  increaseQuantity(id: number): void {
    this.cartService.updateQuantity(id, 1);
  }

  decreaseQuantity(id: number): void {
    this.cartService.updateQuantity(id, -1);
  }

  removeItem(id: number): void {
    this.cartService.removeFromCart(id);
  }

  clearCart(): void {
    this.cartService.clearCart();
  }
}