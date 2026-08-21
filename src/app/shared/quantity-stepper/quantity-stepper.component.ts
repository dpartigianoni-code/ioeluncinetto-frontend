import { Component, EventEmitter, Input, Output } from '@angular/core';

/**
 * Controllo +/- riutilizzato nella pagina prodotto (quantità da aggiungere)
 * e nel carrello (quantità per riga). Componente "controllato": non decide da
 * solo se una modifica è valida, si limita a proporre il nuovo valore
 * (clampato tra min e max) al genitore tramite valueChange; il genitore
 * resta l'unica fonte di verità (stato locale o risposta del backend).
 */
@Component({
  selector: 'app-quantity-stepper',
  standalone: true,
  templateUrl: './quantity-stepper.component.html',
  styleUrl: './quantity-stepper.component.scss',
})
export class QuantityStepperComponent {
  @Input({ required: true }) value!: number;
  @Input() min = 1;
  @Input() max = 10;
  @Input() disabled = false;
  @Input() label = 'Quantità';
  @Input() idSuffix = '';

  @Output() readonly valueChange = new EventEmitter<number>();

  get inputId(): string {
    return `qta-${this.idSuffix || 'default'}`;
  }

  decrement(): void {
    this.propose(this.value - 1);
  }

  increment(): void {
    this.propose(this.value + 1);
  }

  onInput(raw: string): void {
    const n = Number(raw);
    if (Number.isInteger(n)) {
      this.propose(n);
    }
  }

  private propose(n: number): void {
    const clamped = Math.min(this.max, Math.max(this.min, n));
    this.valueChange.emit(clamped);
  }
}
