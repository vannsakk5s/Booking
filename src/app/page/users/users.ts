// src/app/pages/users/users.component.ts
import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UserService, User } from '../../services/user.service';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './users.html',
})
export class Users implements OnInit {
  // UI State Signals
  users = signal<User[]>([]);
  totalCount = signal(0);
  isLoading = signal(false);
  
  // Detail Modal Signals
  selectedUser = signal<User | null>(null);
  showModal = signal(false);

  // Filter Signals
  searchQuery = signal('');

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.fetchUsers();
  }

  fetchUsers() {
    this.isLoading.set(true);
    this.userService.getUsers(this.searchQuery()).subscribe({
      next: (res) => {
        this.users.set(res.items);
        this.totalCount.set(res.total);
        this.isLoading.set(false);
      },
      error: () => this.isLoading.set(false)
    });
  }

  viewUserDetails(userId: number) {
    this.userService.getUserById(userId).subscribe({
      next: (user) => {
        this.selectedUser.set(user);
        this.showModal.set(true);
      }
    });
  }

  toggleStatus(user: User, event: Event) {
    event.stopPropagation(); // Prevent opening modal when clicking the button
    const newStatus = user.status === 'active' ? 'suspended' : 'active';
    
    this.userService.updateStatus(user.id, newStatus).subscribe({
      next: () => {
        // Local signal update for instant UI feedback
        this.users.update(list => 
          list.map(u => u.id === user.id ? { ...u, status: newStatus as any } : u)
        );
      }
    });
  }

  closeModal() {
    this.showModal.set(false);
    this.selectedUser.set(null);
  }
}