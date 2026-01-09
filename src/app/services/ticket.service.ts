// src/app/services/ticket.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Ticket {
  id: number;
  subject: string;
  description: string;
  status: 'open' | 'in_progress' | 'resolved' | 'closed';
  priority: 'low' | 'medium' | 'high';
  user_id: number;
  assigned_to?: number;
  created_at: string;
  user?: { name: string; email: string };
  assignee?: { name: string };
}

@Injectable({ providedIn: 'root' })
export class TicketService {
  private apiUrl = 'http://localhost:4000/api/admin/tickets';

  constructor(private http: HttpClient) {}

  getTickets(status?: string): Observable<Ticket[]> {
    let params = new HttpParams();
    if (status) params = params.set('status', status);
    return this.http.get<Ticket[]>(this.apiUrl, { params });
  }

  getTicketDetail(id: number): Observable<Ticket> {
    return this.http.get<Ticket>(`${this.apiUrl}/${id}`);
  }

  assignToMe(id: number): Observable<Ticket> {
    return this.http.put<Ticket>(`${this.apiUrl}/${id}/assign`, {});
  }

  updateStatus(id: number, status: string): Observable<Ticket> {
    return this.http.put<Ticket>(`${this.apiUrl}/${id}/status`, { status });
  }
}