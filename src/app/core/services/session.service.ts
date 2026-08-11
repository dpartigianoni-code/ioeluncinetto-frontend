import { Injectable } from '@angular/core';

/**
 * Unico punto che conosce il meccanismo di persistenza di sessione (Solution
 * Design, capitolo 11.2). sessionStorage è legato alla scheda del browser e si
 * azzera alla chiusura: soddisfa RF04A senza cookie e senza sessione server.
 */
@Injectable({ providedIn: 'root' })
export class SessionService {
  private static readonly CART_KEY = 'fv.cartId';

  getCartId(): string | null {
    return sessionStorage.getItem(SessionService.CART_KEY);
  }

  setCartId(cartId: string): void {
    sessionStorage.setItem(SessionService.CART_KEY, cartId);
  }

  clearCartId(): void {
    sessionStorage.removeItem(SessionService.CART_KEY);
  }
}
