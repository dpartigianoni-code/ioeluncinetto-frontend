import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

import { CartService } from '../../core/services/cart.service';

/** Intestazione fissa dell'app: marchio e accesso al carrello, presente su ogni pagina. */
@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  private readonly cartService = inject(CartService);

  readonly itemCount = this.cartService.itemCount;
}
