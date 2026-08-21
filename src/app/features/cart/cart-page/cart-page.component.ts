import { CurrencyPipe } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';

import { ProblemDetail } from '../../../core/models/problem-detail.model';
import { AlertService } from '../../../core/services/alert.service';
import { CartService } from '../../../core/services/cart.service';
import { ProductArtComponent } from '../../../shared/product-art/product-art.component';
import { QuantityStepperComponent } from '../../../shared/quantity-stepper/quantity-stepper.component';

/** EP05 (visualizzare), EP06 (modificare quantità), EP07 (rimuovere). */
@Component({
  selector: 'app-cart-page',
  standalone: true,
  imports: [RouterLink, CurrencyPipe, ProductArtComponent, QuantityStepperComponent],
  templateUrl: './cart-page.component.html',
  styleUrl: './cart-page.component.scss',
})
export class CartPageComponent implements OnInit {
  private readonly cartService = inject(CartService);
  private readonly alertService = inject(AlertService);

  readonly cart = this.cartService.cart;
  readonly loading = signal(true);

  ngOnInit(): void {
    this.loading.set(true);
    this.cartService.loadIfPresent().subscribe({
      next: () => this.loading.set(false),
      error: () => this.loading.set(false),
    });
  }

  onQuantityChange(sku: string, quantity: number): void {
    this.updateQuantity(sku, quantity);
  }

  remove(sku: string, name: string): void {
    this.cartService.removeItem(sku).subscribe({
      next: () => this.alertService.show(`${name} rimosso dal carrello`),
      error: (err: HttpErrorResponse) => this.showError(err, 'Impossibile rimuovere il prodotto.'),
    });
  }

  private updateQuantity(sku: string, quantity: number): void {
    this.cartService.updateQuantity(sku, quantity).subscribe({
      error: (err: HttpErrorResponse) => this.showError(err, 'Quantità non valida.'),
    });
  }

  private showError(err: HttpErrorResponse, fallback: string): void {
    const problem = err.error as ProblemDetail | undefined;
    this.alertService.show(problem?.detail ?? fallback, 'bad');
  }
}
