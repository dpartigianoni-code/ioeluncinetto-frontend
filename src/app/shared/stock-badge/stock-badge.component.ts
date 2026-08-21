import { Component, Input } from '@angular/core';

import { AvailabilityStatus } from '../../core/models/catalog.model';

/** Badge di disponibilità riusato in card prodotto, dettaglio e riga carrello. */
@Component({
  selector: 'app-stock-badge',
  standalone: true,
  template: `
    @switch (availability) {
      @case ('ESAURITO') {
        <span class="badge rounded-pill text-bg-secondary bg-opacity-10 text-secondary-emphasis border border-secondary-subtle"
          >Esaurito</span
        >
      }
      @case ('ULTIMI_PEZZI') {
        <span class="badge rounded-pill bg-warning-subtle text-warning-emphasis border border-warning-subtle"
          >Ultimi {{ availableQty }}</span
        >
      }
      @default {
        <span class="badge rounded-pill bg-success-subtle text-success-emphasis border border-success-subtle"
          >Disponibile</span
        >
      }
    }
  `,
})
export class StockBadgeComponent {
  @Input({ required: true }) availability!: AvailabilityStatus;
  @Input() availableQty = 0;
}
