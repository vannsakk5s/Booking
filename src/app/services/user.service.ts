// src/app/services/user.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface User {
  id: number;
  name: string;
  email: string;
  phone: string | null;
  role: 'admin' | 'support' | 'customer';
  status: 'active' | 'suspended' | 'banned';
  created_at: string;
  bookings?: any[]; // Populated in details view
}

export interface UserResponse {
  items: User[];
  total: number;
  page: number;
  pageSize: number;
}

@Injectable({ providedIn: 'root' })
export class UserService {
  private apiUrl = 'http://localhost:4000/api/admin/users';

  constructor(private http: HttpClient) {}

  getUsers(search: string = ''): Observable<UserResponse> {
    let params = new HttpParams();
    if (search) params = params.set('search', search);
    return this.http.get<UserResponse>(this.apiUrl, { params });
  }

  getUserById(id: number): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/${id}`);
  }

  updateStatus(id: number, status: string): Observable<any> {
    return this.http.patch(`${this.apiUrl}/${id}/status`, { status });
  }
}