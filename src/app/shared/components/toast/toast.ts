import { Component, inject } from '@angular/core';
import { ToastService } from '../../../services/toast.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-toast',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="fixed bottom-5 right-5 z-[100] flex flex-col gap-2">
      @for (t of toastService.toasts(); track t.id) {
        <div [ngClass]="{
          'bg-emerald-600': t.type === 'success',
          'bg-red-600': t.type === 'error',
          'bg-blue-600': t.type === 'info'
        }" class="text-white px-6 py-3 rounded-xl shadow-lg flex items-center gap-3 animate-in slide-in-from-right duration-300">
          <span>{{ t.message }}</span>
          <button (click)="toastService.remove(t.id)" class="opacity-70 hover:opacity-100">&times;</button>
        </div>
      }
    </div>
  `
})
export class Toast {
  toastService = inject(ToastService);
}