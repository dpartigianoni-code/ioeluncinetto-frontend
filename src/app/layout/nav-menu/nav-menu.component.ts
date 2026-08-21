import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

import { CategoryRef } from '../../core/models/catalog.model';
import { CATEGORIES } from '../../shared/constants/categories';

/** Menu di navigazione per categoria, presente sotto l'header su ogni pagina. */
@Component({
  selector: 'app-nav-menu',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './nav-menu.component.html',
  styleUrl: './nav-menu.component.scss',
})
export class NavMenuComponent {
  readonly categories: CategoryRef[] = CATEGORIES;
}
