
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './footer.html',
  styleUrl: './footer.scss'
})
export class Footer {
  email = '';
  subscribed = false;
  currentYear = new Date().getFullYear();

  subscribe(event: Event): void {
    event.preventDefault();

    if (!this.email.trim()) return;

    this.subscribed = true;
    this.email = '';
  }
}
