import { Component, Input } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

/**
 * Nessuna fotografia prodotto è disponibile in questa fase: al posto di un
 * riquadro vuoto, ogni capo riceve un campione di tessitura generato via SVG
 * (stesso principio del prototipo di validazione), con una sagoma coerente
 * con la categoria e un colore derivato in modo deterministico dallo SKU, in
 * modo che lo stesso prodotto abbia sempre lo stesso "colore" ovunque compaia
 * (card, dettaglio, riga carrello).
 */

const PALETTE = [
  '#1F5B85',
  '#4A7EA3',
  '#B5843F',
  '#2C4C72',
  '#C79A7C',
  '#6E8C99',
  '#044E81',
  '#A9673F',
  '#2F6E5E',
  '#33547E',
  '#BFA05C',
  '#8A7357',
  '#56789B',
];

const SAGOME: Record<string, string> = {
  Abiti: `<path d="M-13 -30 l7 -5 h12 l7 5 -6 8 3 34 h-20 l3 -34z"/><path d="M-9 -33 a9 7 0 0 0 18 0"/>`,
  'Top e coprispalle': `<path d="M-14 -18 l7 -5 h14 l7 5 -7 7 2 18 h-18 l2 -18z"/><path d="M-8 -21 a8 6 0 0 0 16 0"/>`,
  Borse: `<rect x="-17" y="-8" width="34" height="26" rx="4"/><path d="M-8 -8 v-7 a8 8 0 0 1 16 0 v7"/>`,
  Accessori: `<path d="M-19 6 a19 8 0 0 0 38 0"/><path d="M-11 6 a11 15 0 0 1 22 0"/>`,
};
const SAGOMA_DEFAULT = SAGOME['Accessori'];

function hashString(value: string): number {
  let h = 0;
  for (let i = 0; i < value.length; i++) {
    h = (h * 31 + value.charCodeAt(i)) | 0;
  }
  return Math.abs(h);
}

function esc(value: string): string {
  return String(value).replace(
    /[&<>"']/g,
    (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c] as string,
  );
}

@Component({
  selector: 'app-product-art',
  standalone: true,
  template: `<div class="product-art" [class.product-art-tall]="tall" [innerHTML]="svg()"></div>`,
  styleUrl: './product-art.component.scss',
})
export class ProductArtComponent {
  @Input({ required: true }) sku!: string;
  @Input({ required: true }) name!: string;
  /** Assente per le righe carrello (CartLine non riporta la categoria): in tal caso si usa una sagoma neutra. */
  @Input() categoryName?: string;
  @Input() tall = false;

  constructor(private readonly domSanitizer: DomSanitizer) {}

  svg(): SafeHtml {
    return this.domSanitizer.bypassSecurityTrustHtml(this.buildSvg());
  }

  private buildSvg(): string {
    const seed = hashString(this.sku || this.name || 'io-e-luncinetto');
    const colore = PALETTE[seed % PALETTE.length];
    const h = this.tall ? 150 : 120;
    const passo = 12;
    const colonna = 11;
    let punti = '';
    for (let y = 10; y < h; y += passo) {
      const sfalso = ((y / passo) | 0) % 2 ? colonna / 2 : 0;
      for (let x = -6 + sfalso; x < 126; x += colonna) {
        punti += `<path d="M${x} ${y} l${colonna / 2} ${passo * 0.55} l${colonna / 2} -${passo * 0.55}"/>`;
        punti += `<path d="M${x + colonna / 2} ${y + passo * 0.55} v${passo * 0.3}"/>`;
      }
    }
    const sagoma = (this.categoryName && SAGOME[this.categoryName]) || SAGOMA_DEFAULT;
    const scala = this.tall ? 1.35 : 1;
    const label = `Campione di lavorazione: ${esc(this.name)}`;
    return `<svg viewBox="0 0 120 ${h}" preserveAspectRatio="xMidYMid slice" role="img" aria-label="${label}">
      <rect width="120" height="${h}" fill="${colore}"/>
      <g fill="none" stroke="rgba(255,255,255,.30)" stroke-width="1.1" stroke-linecap="round">${punti}</g>
      <g fill="none" stroke="rgba(4,32,54,.36)" stroke-width="1.6" stroke-linejoin="round" stroke-linecap="round"
         transform="translate(60 ${h / 2}) scale(${scala})">${sagoma}</g>
    </svg>`;
  }
}
