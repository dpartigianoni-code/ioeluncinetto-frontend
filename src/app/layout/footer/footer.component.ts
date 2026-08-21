import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

/** Piè di pagina, presente su ogni pagina dell'app. */
@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss',
})
export class FooterComponent {
  readonly year = new Date().getFullYear();
}
