// src/app/page/dashboard/dashboard.component.ts
import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardService } from '../../services/dashboard.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.html',
})
export class Dashboard implements OnInit {
  // Use a signal to store the API response
  dashboardData = signal<any>(null);
  isLoading = signal(true);

  constructor(private dashboardService: DashboardService) {}

  ngOnInit() {
    this.loadDashboard();
  }

  loadDashboard() {
    this.isLoading.set(true);
    this.dashboardService.getOverview().subscribe({
      next: (res) => {
        this.dashboardData.set(res);
        this.isLoading.set(false);
      },
      error: (err) => {
        console.error('Error loading dashboard', err);
        this.isLoading.set(false);
      }
    });
  }
}