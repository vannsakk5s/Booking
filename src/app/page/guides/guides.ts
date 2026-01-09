// src/app/pages/guides/guides.component.ts
import { Component, computed, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { GuideService, Guide } from '../../services/guide.service';

@Component({
  selector: 'app-guides',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './guides.html',
})
export class Guides implements OnInit {
  guides = signal<Guide[]>([]);
  isLoading = signal(false);
  
  // Modal state
  showModal = signal(false);
  selectedGuide = signal<Guide | null>(null);

  constructor(private guideService: GuideService) {}
showCreateModal = signal(false);
isSubmitting = signal(false);

// Initial form state
newGuide = signal({
  name: '',
  email: '',
  phone: '',
  bio: '',
  languages: [] as string[]
});

openCreateModal() {
  this.newGuide.set({ name: '', email: '', phone: '', bio: '', languages: [] });
  this.showCreateModal.set(true);
}

submitGuide() {
  if (!this.newGuide().name || !this.newGuide().email) return;
  
  this.isSubmitting.set(true);
  this.guideService.createGuide(this.newGuide()).subscribe({
    next: (guide) => {
      // Update the list locally so the UI updates instantly
      this.guides.update(prev => [guide, ...prev]);
      this.showCreateModal.set(false);
      this.isSubmitting.set(false);
    },
    error: (err) => {
      console.error(err);
      this.isSubmitting.set(false);
    }
  });
}

// Helper to toggle languages in the form
toggleLanguage(lang: string) {
  const current = this.newGuide().languages;
  const updated = current.includes(lang) 
    ? current.filter(l => l !== lang) 
    : [...current, lang];
  
  this.newGuide.update(val => ({ ...val, languages: updated }));
}
  ngOnInit() {
    this.loadGuides();
  }
activeGuidesCount = computed(() => 
    this.guides().filter(g => g.status === 'active').length
  );
  loadGuides() {
    this.isLoading.set(true);
    this.guideService.getGuides().subscribe({
      next: (data) => {
        this.guides.set(data);
        this.isLoading.set(false);
      },
      error: () => this.isLoading.set(false)
    });
  }

  viewDetail(id: number) {
    this.guideService.getGuide(id).subscribe(guide => {
      this.selectedGuide.set(guide);
      this.showModal.set(true);
    });
  }

  toggleStatus(guide: Guide, event: Event) {
    event.stopPropagation();
    const newStatus = guide.status === 'active' ? 'inactive' : 'active';
    this.guideService.updateStatus(guide.id, newStatus).subscribe(() => {
      this.guides.update(list => 
        list.map(g => g.id === guide.id ? { ...g, status: newStatus as any } : g)
      );
    });
  }

  closeModal() {
    this.showModal.set(false);
    this.selectedGuide.set(null);
  }
}