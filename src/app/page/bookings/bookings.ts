// src/app/pages/bookings/bookings.component.ts
import { Component, OnInit, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookingService, Booking } from '../../services/booking.service';

@Component({
  selector: 'app-bookings',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './bookings.html',
})
export class Bookings implements OnInit {
  bookings = signal<Booking[]>([]);
  isLoading = signal(false);
  filterStatus = signal<string>('');

  // Stats computed from signals
  totalRevenue = computed(() => 
    this.bookings().reduce((sum, b) => sum + Number(b.total_amount), 0)
  );
  
  pendingCount = computed(() => 
    this.bookings().filter(b => b.status === 'pending').length
  );

  constructor(private bookingService: BookingService) {}

  ngOnInit() {
    this.loadBookings();
  }

  loadBookings(status: string = '') {
    this.filterStatus.set(status);
    this.isLoading.set(true);
    this.bookingService.getBookings(status).subscribe({
      next: (data) => {
        this.bookings.set(data);
        this.isLoading.set(false);
      },
      error: () => this.isLoading.set(false)
    });
  }

  updateStatus(id: number, action: 'confirm' | 'cancel' | 'complete') {
    const request = action === 'confirm' 
      ? this.bookingService.confirmBooking(id)
      : action === 'cancel' 
        ? this.bookingService.cancelBooking(id) 
        : this.bookingService.completeBooking(id);

    request.subscribe({
      next: () => {
        const newStatus = action === 'confirm' ? 'confirmed' : action === 'cancel' ? 'canceled' : 'completed';
        this.bookings.update(list => 
          list.map(b => b.id === id ? { ...b, status: newStatus as any } : b)
        );
      }
    });
  }
}