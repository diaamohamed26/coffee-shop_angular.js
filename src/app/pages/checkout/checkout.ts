
import { Component, computed, inject, signal } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { CartService } from '../../services/cart';

interface CheckoutForm {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  apartment: string;
  city: string;
  notes: string;
}

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [CurrencyPipe, FormsModule, RouterLink],
  templateUrl: './checkout.html',
  styleUrl: './checkout.scss',
})
export class Checkout {
  readonly cartService = inject(CartService);

  readonly cartItems = this.cartService.cartItems;
  readonly subtotal = this.cartService.cartTotal;

  // Demo shipping policy. Change this when delivery pricing is defined.
  readonly shipping = 0;

  readonly total = computed(() => this.subtotal() + this.shipping);

  readonly paymentMethod = signal<'cash' | 'card'>('cash');
  readonly orderSubmitted = signal(false);
  readonly orderNumber = signal('');

  form: CheckoutForm = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    apartment: '',
    city: 'Cairo',
    notes: '',
  };

  submitOrder(): void {
    if (this.cartItems().length === 0) {
      return;
    }

    // This is a frontend demonstration, not a real order API.
    this.orderNumber.set(
      `NR-${Date.now().toString().slice(-8)}`
    );

    this.orderSubmitted.set(true);
    this.cartService.clearCart();
  }

  startNewOrder(): void {
    this.form = {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      address: '',
      apartment: '',
      city: 'Cairo',
      notes: '',
    };

    this.paymentMethod.set('cash');
    this.orderSubmitted.set(false);
    this.orderNumber.set('');
  }
}
