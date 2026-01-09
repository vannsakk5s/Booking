// src/app/services/guide.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Guide {
  id: number;
  name: string;
  bio?: string;
  photo_url?: string;
  languages: string[]; // Stored as Json in Prisma
  rating: number;
  phone?: string;
  email?: string;
  status: 'active' | 'inactive';
}

@Injectable({ providedIn: 'root' })
export class GuideService {
  private apiUrl = 'http://localhost:4000/api/admin/guides';

  constructor(private http: HttpClient) {}

  getGuides(): Observable<Guide[]> {
    return this.http.get<Guide[]>(this.apiUrl);
  }

  getGuide(id: number): Observable<Guide> {
    return this.http.get<Guide>(`${this.apiUrl}/${id}`);
  }

  createGuide(guide: Partial<Guide>): Observable<Guide> {
    return this.http.post<Guide>(this.apiUrl, guide);
  }

  updateStatus(id: number, status: string): Observable<Guide> {
    return this.http.put<Guide>(`${this.apiUrl}/${id}/status`, { status });
  }

  deleteGuide(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}