import { Routes } from '@angular/router';
import { Layout } from './layout/layout/layout';
import { Login } from './page/login/login';

export const routes: Routes = [
  { path: 'login', component: Login },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
    {
        path: '', 
        redirectTo: 'dashboard', 
        pathMatch: 'full'
    },
    {
        path: '',
        component: Layout,
        canActivate: [],
        children: [
            {
              path: 'dashboard',
              loadComponent: () => import('./page/dashboard/dashboard').then(c => c.Dashboard)
            },
            {
              path: 'manage-trips',
              loadComponent: () => import('./page/manage-trips/manage-trips').then(c => c.ManageTrips)
            },
            {
              path: 'bookings',
              loadComponent: () => import('./page/bookings/bookings').then(c => c.Bookings)
            },
            {
              path: 'users',
              loadComponent: () => import('./page/users/users').then(c => c.Users)
            },
            {
              path: 'guides',
              loadComponent: () => import('./page/guides/guides').then(c => c.Guides)
            },
            {
              path: 'support-tickets',
              loadComponent: () => import('./page/support-tickets/support-tickets').then(c => c.SupportTickets) 
            },
            {
              path: 'reports',
              loadComponent: () => import('./page/reports/reports').then(c => c.Reports)
            },
            {
              path: 'settings',
              loadComponent: () => import('./page/settings/settings').then(c => c.Settings)
            }
        ]
    },
    // {
    //     path: 'login',
    //     loadComponent: () => import('./components/login-page/login-page').then(c => c.LoginPage)
    // },
    {
        path: '**',
        redirectTo: 'dashboard'
    }
];