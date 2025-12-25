import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Trip {
  id: number;
  title: string;
  description: string;
  type: 'vip' | 'standard';
  destination: string;
  start_date: string;
  end_date: string;
  price: string | number;
  capacity: number;
  status: 'active' | 'draft' | 'inactive';
  itinerary: {
    day1?: string;
    day2?: string;
  };
  images: string[];
}
@Injectable({
  providedIn: 'root'
})
export class TripService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:4000/api/admin/trips';

  /**
   * 1. Get All Trips with Pagination/Filters
   */
  getAllTrips(filters: any): Observable<{ items: Trip[], total: number }> {
    let params = new HttpParams();
    Object.keys(filters).forEach(key => {
      if (filters[key]) params = params.append(key, filters[key]);
    });
    return this.http.get<{ items: Trip[], total: number }>(this.apiUrl, { params });
  }

  /**
   * 2. Create Trip (Matches your Postman logic)
   * We wrap the JSON object in a "data" field to allow File upload simultaneously
   */
  createTrip(tripData: any, imageFile?: File): Observable<any> {
    const formData = new FormData();

    // This preserves the Number types (capacity: 6) and Nested Objects (itinerary)
    // exactly like your Postman request body.
    formData.append('data', JSON.stringify(tripData));

    // Append the file if selected
    if (imageFile) {
      formData.append('image', imageFile);
    }

    return this.http.post(this.apiUrl, formData);
  }

  /**
   * 3. Update Trip
   */
  updateTrip(id: number, tripData: any, imageFile?: File): Observable<any> {
    const formData = new FormData();
    
    formData.append('data', JSON.stringify(tripData));

    if (imageFile) {
      formData.append('image', imageFile);
    }

    return this.http.put(`${this.apiUrl}/${id}`, formData);
  }
// Inside TripService class
updateTripStatus(id: number, status: string): Observable<any> {
  return this.http.patch(`${this.apiUrl}/${id}/status`, { status });
}
  /**
   * 4. Delete Trip
   */
  deleteTrip(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  /**
   * 5. Duplicate Trip
   */
  duplicateTrip(id: number, dates: { start_date: string, end_date: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/${id}/duplicate`, dates);
  }
}