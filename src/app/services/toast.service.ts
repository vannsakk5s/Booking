import { Injectable, signal } from '@angular/core';

export type ToastType = 'success' | 'error' | 'info';

@Injectable({ providedIn: 'root' })
export class ToastService {
  toasts = signal<{ message: string; type: ToastType; id: number }[]>([]);

  show(message: string, type: ToastType = 'success') {
    const id = Date.now();
    this.toasts.update(t => [...t, { message, type, id }]);
    setTimeout(() => this.remove(id), 3000); // Auto-close after 3s
  }

  remove(id: number) {
    this.toasts.update(t => t.filter(toast => toast.id !== id));
  }
}