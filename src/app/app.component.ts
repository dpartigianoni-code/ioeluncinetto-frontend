import { Component, OnInit, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { CartService } from './core/services/cart.service';
import { FooterComponent } from './layout/footer/footer.component';
import { HeaderComponent } from './layout/header/header.component';
import { NavMenuComponent } from './layout/nav-menu/nav-menu.component';
import { ToastContainerComponent } from './layout/toast-container/toast-container.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, NavMenuComponent, FooterComponent, ToastContainerComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  private readonly cartService = inject(CartService);

  ngOnInit(): void {
    this.cartService.loadIfPresent().subscribe();
  }
}
