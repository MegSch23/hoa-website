import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-communications',
  imports: [CommonModule, FormsModule  ],
  templateUrl: './communications.component.html',
  styleUrl: './communications.component.css'
})
export class CommunicationsComponent {
  activeTab: 'texts' | 'newsletters' = 'texts';

  textMessages = [
    { title: 'Maintenance Notice', date: new Date('2025-07-05'), content: 'Reminder: Maintenance will occur next week.' },
    { title: 'Event Reminder', date: new Date('2025-07-01'), content: 'Community BBQ this Saturday at 5PM!' },
    { title: 'Water Shutoff', date: new Date('2025-06-25'), content: 'Water will be off tomorrow from 10AM to 2PM.' },
  ];

  newsletters = [
    { title: 'Spring Newsletter', date: new Date('2025-05-01'), file: 'assets/newsletters/spring.pdf' },
    { title: 'Summer Newsletter', date: new Date('2025-07-01'), file: 'assets/newsletters/summer.pdf' },
  ];

// Pagination & filters
  textFilter = '';
  newsletterFilter = '';

  textPage = 1;
  newsletterPage = 1;
  itemsPerPage = 2;

  get filteredTexts() {
    return this.textMessages.filter(msg =>
      msg.title.toLowerCase().includes(this.textFilter.toLowerCase()) ||
      msg.content.toLowerCase().includes(this.textFilter.toLowerCase())
    );
  }

  get paginatedTexts() {
    const start = (this.textPage - 1) * this.itemsPerPage;
    return this.filteredTexts.slice(start, start + this.itemsPerPage);
  }

  get totalTextPages() {
    return Math.ceil(this.filteredTexts.length / this.itemsPerPage);
  }

  get filteredNewsletters() {
    return this.newsletters.filter(news =>
      news.title.toLowerCase().includes(this.newsletterFilter.toLowerCase())
    );
  }

  get paginatedNewsletters() {
    const start = (this.newsletterPage - 1) * this.itemsPerPage;
    return this.filteredNewsletters.slice(start, start + this.itemsPerPage);
  }

  get totalNewsletterPages() {
    return Math.ceil(this.filteredNewsletters.length / this.itemsPerPage);
  }

  resetPagination() {
    this.textPage = 1;
    this.newsletterPage = 1;
  }

}
