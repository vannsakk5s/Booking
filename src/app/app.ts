import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AdminSidebar } from './page/admin-sidebar/admin-sidebar';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CommonModule, AdminSidebar],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('frontend');
}
