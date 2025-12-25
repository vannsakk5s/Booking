import { Component, OnInit } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';
import { NgClass } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-layout',
  imports: [ RouterOutlet, RouterLink, NgClass ],
  templateUrl: './layout.html',
  styleUrl: './layout.css'
})
export class Layout implements OnInit {

  isCollapsed = false;

  // Route-based flags
  isDashboard = false;
  isManageTrips = false;
  isBookings = false;
  isUsers = false;
  isGuides = false;
  isSupportTickets = false;
  isReports = false;
  isSettings = false;

  // Optional admin pages
  isAdminPage = false;

  constructor(private router: Router) {}

  ngOnInit() {
    this.router.events.subscribe(() => {
      this.checkCurrentRoute();
    });
    this.checkCurrentRoute();
  }

  private checkCurrentRoute() {
    const url = this.router.url;

    this.isDashboard = url === '/dashboard';
    this.isManageTrips = url === '/manage-trips';
    this.isBookings = url === '/bookings';
    this.isUsers = url === '/users';
    this.isGuides = url === '/guides';
    this.isSupportTickets = url === '/support-tickets';
    this.isReports = url === '/reports';
    this.isSettings = url === '/settings';

    // Admin-only routes example (customize as needed)
    this.isAdminPage = [
      '/users',
      '/reports',
      '/settings'
    ].some(path => url.startsWith(path));
  }
}
