
import { Component, input, inject } from '@angular/core';
import { CartService } from '../../services/cart';
import type { CartProduct } from '../../services/cart';

@Component({
  selector: 'app-product-card',
  standalone: true,
  templateUrl: './product-card.html',
  styleUrl: './product-card.scss',
})
export class ProductCard {
  readonly product = input.required<CartProduct>();

  readonly cartService = inject(CartService);

  addToCart(): void {
    this.cartService.addToCart(this.product());
  }

  get quantity(): number {
    return this.cartService.getProductQuantity(this.product().id);
  }
}
