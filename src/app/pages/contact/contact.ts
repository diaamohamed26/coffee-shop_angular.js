import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './contact.html',
  styleUrl: './contact.scss',
})
export class Contact {
  name = '';
  email = '';
  subject = '';
  message = '';

  isSubmitting = signal(false);
  isSubmitted = signal(false);

  contactInfo = [
    {
      icon: '✉',
      label: 'EMAIL US',
      value: 'hello@noirecoffee.com',
      link: 'mailto:hello@noirecoffee.com',
    },
    {
      icon: '☎',
      label: 'CALL US',
      value: '+20 100 000 0000',
      link: 'tel:+201000000000',
    },
    {
      icon: '⌖',
      label: 'FIND US',
      value: 'Cairo, Egypt',
      link: 'https://www.google.com/maps/search/?api=1&query=Cairo%2C+Egypt',
    },
  ];

  openingHours = [
    { day: 'Monday – Friday', hours: '08:00 AM – 11:00 PM' },
    { day: 'Saturday', hours: '09:00 AM – 12:00 AM' },
    { day: 'Sunday', hours: '09:00 AM – 10:00 PM' },
  ];

  submitForm(): void {
    if (
      !this.name.trim() ||
      !this.email.trim() ||
      !this.subject.trim() ||
      !this.message.trim()
    ) {
      return;
    }

    this.isSubmitting.set(true);

    // Frontend demonstration only.
    // Connect this method to your backend/API to deliver real messages.
    setTimeout(() => {
      this.isSubmitting.set(false);
      this.isSubmitted.set(true);

      this.name = '';
      this.email = '';
      this.subject = '';
      this.message = '';
    }, 800);
  }

  resetForm(): void {
    this.isSubmitted.set(false);
  }
}