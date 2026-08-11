// Rispecchia i DTO di it.ioeluncinetto.psrv.cart.dto (backend P-SRV).

export interface CartLine {
  sku: string;
  name: string;
  imageUrl: string;
  unitPriceCents: number;
  quantity: number;
  subtotalCents: number;
  maxSelectableQty: number;
  stillPurchasable: boolean;
}

export interface Cart {
  cartId: string;
  itemCount: number;
  lines: CartLine[];
  goodsTotalCents: number;
  shippingCents: number;
  grandTotalCents: number;
  currency: string;
  empty: boolean;
  expiresAt: string;
}

export interface CreateCartResponse {
  cartId: string;
  expiresAt: string;
}
