import { Component, inject } from '@angular/core';

import { AlertService } from '../../core/services/alert.service';

/** Riscontri temporanei (RNF05: annunciati, percepibili anche senza vederli). */
@Component({
  selector: 'app-toast-container',
  standalone: true,
  templateUrl: './toast-container.component.html',
  styleUrl: './toast-container.component.scss',
})
export class ToastContainerComponent {
  private readonly alertService = inject(AlertService);

  readonly alerts = this.alertService.messages;

  dismiss(id: number): void {
    this.alertService.dismiss(id);
  }
}
