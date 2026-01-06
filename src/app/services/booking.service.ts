// src/app/services/booking.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Booking {
  id: number;
  trip_id: number;
  user_id: number;
  status: 'pending' | 'confirmed' | 'canceled' | 'completed';
  total_amount: number;
  payment_status: string;
  created_at: string;
  user?: { name: string; email: string };
  trip?: { title: string };
}

@Injectable({ providedIn: 'root' })
export class BookingService {
  private apiUrl = 'http://localhost:4000/api/admin/bookings';

  constructor(private http: HttpClient) {}

  getBookings(status?: string): Observable<Booking[]> {
    let params = new HttpParams();
    if (status) params = params.set('status', status);
    return this.http.get<Booking[]>(this.apiUrl, { params });
  }

  getBookingDetail(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  confirmBooking(id: number) {
    return this.http.put(`${this.apiUrl}/${id}/confirm`, {});
  }

  cancelBooking(id: number, reason: string = 'Administrative cancellation') {
    return this.http.put(`${this.apiUrl}/${id}/cancel`, { reason });
  }

  completeBooking(id: number) {
    return this.http.put(`${this.apiUrl}/${id}/complete`, {});
  }
}