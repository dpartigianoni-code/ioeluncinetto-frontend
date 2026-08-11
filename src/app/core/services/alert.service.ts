import { Injectable, signal } from '@angular/core';

export interface AlertMessage {
  id: number;
  text: string;
  kind: 'info' | 'bad';
}

/** Riscontri temporanei (RNF05: annunciati, percepibili anche senza vederli). */
@Injectable({ providedIn: 'root' })
export class AlertService {
  private nextId = 0;
  readonly messages = signal<AlertMessage[]>([]);

  show(text: string, kind: 'info' | 'bad' = 'info'): void {
    const id = ++this.nextId;
    this.messages.update((list) => [...list, { id, text, kind }]);
    setTimeout(() => this.dismiss(id), 4000);
  }

  dismiss(id: number): void {
    this.messages.update((list) => list.filter((m) => m.id !== id));
  }
}
