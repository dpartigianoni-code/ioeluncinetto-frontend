import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable, computed, inject, signal } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';

import { environment } from '../../../environments/environment';
import { Cart, CreateCartResponse } from '../models/cart.model';
import { SessionService } from './session.service';

/**
 * CartStore + CartService del capitolo 11.2 del Solution Design, uniti in un
 * solo servizio: stato reattivo del carrello alimentato dalla risposta completa
 * restituita da ogni operazione EP04-EP07.
 */
@Injectable({ providedIn: 'root' })
export class CartService {
  private readonly http = inject(HttpClient);
  private readonly session = inject(SessionService);
  private readonly baseUrl = `${environment.apiBaseUrl}/api/v1/carts`;

  private readonly cartSignal = signal<Cart | null>(null);
  readonly cart = this.cartSignal.asReadonly();
  readonly itemCount = computed(() => this.cartSignal()?.itemCount ?? 0);

  /** Da chiamare all'avvio dell'app: se esiste già un cartId in sessione, lo ricarica. */
  loadIfPresent(): Observable<Cart | null> {
    const cartId = this.session.getCartId();
    if (!cartId) {
      this.cartSignal.set(null);
      return of(null);
    }
    return this.http.get<Cart>(`${this.baseUrl}/${cartId}`).pipe(
      tap((cart) => this.cartSignal.set(cart)),
      catchError((err: HttpErrorResponse) => {
        if (err.status === 404 || err.status === 410) {
          this.session.clearCartId();
          this.cartSignal.set(null);
          return of(null);
        }
        return throwError(() => err);
      }),
    );
  }

  /** Il carrello è creato alla prima aggiunta, mai al caricamento del catalogo (Solution Design 5). */
  addItem(sku: string, quantity: number): Observable<Cart> {
    return this.ensureCartId().pipe(
      switchMap((cartId) =>
        this.http.post<Cart>(`${this.baseUrl}/${cartId}/items`, { sku, quantity }),
      ),
      tap((cart) => this.cartSignal.set(cart)),
    );
  }

  updateQuantity(sku: string, quantity: number): Observable<Cart> {
    const cartId = this.requireCartId();
    return this.http
      .put<Cart>(`${this.baseUrl}/${cartId}/items/${encodeURIComponent(sku)}`, { quantity })
      .pipe(tap((cart) => this.cartSignal.set(cart)));
  }

  removeItem(sku: string): Observable<Cart> {
    const cartId = this.requireCartId();
    return this.http
      .delete<Cart>(`${this.baseUrl}/${cartId}/items/${encodeURIComponent(sku)}`)
      .pipe(tap((cart) => this.cartSignal.set(cart)));
  }

  private ensureCartId(): Observable<string> {
    const existing = this.session.getCartId();
    if (existing) {
      return of(existing);
    }
    return this.http.post<CreateCartResponse>(this.baseUrl, {}).pipe(
      tap((res) => this.session.setCartId(res.cartId)),
      map((res) => res.cartId),
    );
  }

  private requireCartId(): string {
    const cartId = this.session.getCartId();
    if (!cartId) {
      throw new Error('Nessun carrello attivo in questa sessione.');
    }
    return cartId;
  }
}
