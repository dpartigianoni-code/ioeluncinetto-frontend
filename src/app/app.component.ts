import { Component, OnInit, inject } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';

import { AlertService } from './core/services/alert.service';
import { CartService } from './core/services/cart.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  private readonly cartService = inject(CartService);
  private readonly alertService = inject(AlertService);

  readonly itemCount = this.cartService.itemCount;
  readonly alerts = this.alertService.messages;

  ngOnInit(): void {
    this.cartService.loadIfPresent().subscribe();
  }

  dismiss(id: number): void {
    this.alertService.dismiss(id);
  }
}
