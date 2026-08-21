import { CurrencyPipe } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, inject, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';

import { ProblemDetail } from '../../../core/models/problem-detail.model';
import { ProductDetail } from '../../../core/models/catalog.model';
import { AlertService } from '../../../core/services/alert.service';
import { CartService } from '../../../core/services/cart.service';
import { CatalogService } from '../../../core/services/catalog.service';
import { ProductArtComponent } from '../../../shared/product-art/product-art.component';
import { QuantityStepperComponent } from '../../../shared/quantity-stepper/quantity-stepper.component';

/**
 * EP03 (dettaglio) + comando di aggiunta al carrello (EP04). ProductDetail
 * non espone `availability` (solo `availableQty`/`purchasable`): la
 * disponibilità qui è mostrata come testo nella scheda tecnica, non come
 * StockBadgeComponent (pensato per ProductSummary, usato in catalogo/carrello).
 */
@Component({
  selector: 'app-product-page',
  standalone: true,
  imports: [RouterLink, CurrencyPipe, ProductArtComponent, QuantityStepperComponent],
  templateUrl: './product-page.component.html',
  styleUrl: './product-page.component.scss',
})
export class ProductPageComponent implements OnInit {
  private readonly catalogService = inject(CatalogService);
  private readonly cartService = inject(CartService);
  private readonly alertService = inject(AlertService);
  private readonly route = inject(ActivatedRoute);

  readonly product = signal<ProductDetail | null>(null);
  readonly loading = signal(true);
  readonly notFound = signal(false);
  readonly adding = signal(false);

  quantity = 1;

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const sku = params.get('sku');
      if (sku) {
        this.load(sku);
      }
    });
  }

  maxQty(): number {
    const p = this.product();
    return p ? Math.max(1, Math.min(10, p.availableQty)) : 1;
  }

  onQuantityChange(value: number): void {
    this.quantity = value;
  }

  addToCart(): void {
    const p = this.product();
    if (!p) {
      return;
    }
    this.adding.set(true);
    this.cartService.addItem(p.sku, this.quantity).subscribe({
      next: () => {
        this.adding.set(false);
        this.alertService.show(`${p.name} aggiunto al carrello`, 'info');
      },
      error: (err: HttpErrorResponse) => {
        this.adding.set(false);
        const problem = err.error as ProblemDetail | undefined;
        this.alertService.show(problem?.detail ?? 'Il carrello non è stato modificato.', 'bad');
      },
    });
  }

  private load(sku: string): void {
    this.loading.set(true);
    this.notFound.set(false);
    this.quantity = 1;
    this.catalogService.getBySku(sku).subscribe({
      next: (p) => {
        this.product.set(p);
        this.loading.set(false);
      },
      error: (err: HttpErrorResponse) => {
        this.loading.set(false);
        this.product.set(null);
        this.notFound.set(err.status === 404);
      },
    });
  }
}
