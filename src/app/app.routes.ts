import { Routes } from '@angular/router';

/**
 * Rotte implementate in questa consegna (Solution Design, capitolo 11.1):
 * catalogo, dettaglio prodotto, carrello. /checkout, /checkout/pagamento e
 * /ordine/conferma arriveranno con EP08/EP09.
 */
export const routes: Routes = [
  { path: '', redirectTo: 'catalogo', pathMatch: 'full' },
  {
    path: 'catalogo',
    loadComponent: () =>
      import('./features/catalog/catalog-page/catalog-page.component').then(
        (m) => m.CatalogPageComponent,
      ),
  },
  {
    path: 'prodotto/:sku',
    loadComponent: () =>
      import('./features/product/product-page/product-page.component').then(
        (m) => m.ProductPageComponent,
      ),
  },
  {
    path: 'carrello',
    loadComponent: () =>
      import('./features/cart/cart-page/cart-page.component').then((m) => m.CartPageComponent),
  },
  { path: '**', redirectTo: 'catalogo' },
];
