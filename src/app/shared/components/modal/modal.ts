import { Component, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [CommonModule],
  template: `
    @if (isOpen()) {
      <div class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
        <div class="bg-white rounded-3xl shadow-2xl w-full max-w-3xl flex flex-col max-h-[90vh] overflow-hidden animate-in fade-in zoom-in duration-200">
          
          <div class="px-8 py-5 border-b border-slate-100 flex justify-between items-center bg-white">
            <div>
              <h3 class="text-xl font-bold text-slate-800 tracking-tight">{{ title() }}</h3>
              <p class="text-xs text-slate-400 font-medium">Please fill in all the required details below.</p>
            </div>
            <button (click)="onClose()" class="text-slate-400 hover:text-slate-600 transition-all p-2 hover:bg-slate-50 rounded-xl">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div class="p-8 overflow-y-auto custom-scrollbar">
            <ng-content></ng-content>
          </div>
          
        </div>
      </div>
    }
  `,
  styles: [`
    /* Optional: Custom scrollbar for a cleaner look */
    .custom-scrollbar::-webkit-scrollbar {
      width: 6px;
    }
    .custom-scrollbar::-webkit-scrollbar-track {
      background: transparent;
    }
    .custom-scrollbar::-webkit-scrollbar-thumb {
      background: #e2e8f0;
      border-radius: 10px;
    }
    .custom-scrollbar::-webkit-scrollbar-thumb:hover {
      background: #cbd5e1;
    }
  `]
})
export class Modal {
  isOpen = input.required<boolean>();
  title = input<string>('Manage Trip');
  close = output<void>();

  onClose() {
    this.close.emit();
  }
}