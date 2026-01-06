// src/app/pages/support-tickets/support-tickets.component.ts
import { Component, OnInit, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TicketService, Ticket } from '../../services/ticket.service';

@Component({
  selector: 'app-support-tickets',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './support-tickets.html',
})
export class SupportTickets implements OnInit {
  tickets = signal<Ticket[]>([]);
  isLoading = signal(false);
  selectedStatus = signal<string>('');

  // Computed Stats
  openTickets = computed(() => this.tickets().filter(t => t.status === 'open').length);
  inProgressTickets = computed(() => this.tickets().filter(t => t.status === 'in_progress').length);

  constructor(private ticketService: TicketService) {}

  ngOnInit() {
    this.fetchTickets();
  }

  fetchTickets(status: string = '') {
    this.selectedStatus.set(status);
    this.isLoading.set(true);
    this.ticketService.getTickets(status).subscribe({
      next: (data) => {
        this.tickets.set(data);
        this.isLoading.set(false);
      },
      error: () => this.isLoading.set(false)
    });
  }

  claimTicket(id: number) {
    this.ticketService.assignToMe(id).subscribe((updatedTicket) => {
      this.tickets.update(list => list.map(t => t.id === id ? updatedTicket : t));
    });
  }

  changeStatus(id: number, status: string) {
    this.ticketService.updateStatus(id, status).subscribe((updatedTicket) => {
      this.tickets.update(list => list.map(t => t.id === id ? updatedTicket : t));
    });
  }
}