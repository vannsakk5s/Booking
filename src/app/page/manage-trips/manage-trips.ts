import { Component, signal, ViewChild, ElementRef, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { TripService,Trip } from '../../services/trip.service'; // Adjust path
import { CommonModule } from '@angular/common';
import { Modal } from "../../shared/components/modal/modal";

@Component({
  selector: 'app-manage-trips',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, Modal],
  templateUrl: './manage-trips.html'
})
export class ManageTrips implements OnInit {
  @ViewChild('day1Input') day1Input!: ElementRef;
  @ViewChild('day2Input') day2Input!: ElementRef;

  // Signals
  trips = signal<Trip[]>([]);
  totalItems = signal(0);
  isLoading = signal(false);
  isSubmitting = signal(false);
  
  // Modal States
  isModalOpen = signal(false);
  isViewModalOpen = signal(false);
  editingTripId = signal<number | null>(null);
  selectedTripForView = signal<Trip | null>(null);

  // Status/Filter States
  selectedStatus = signal<string>('all');
  statusOptions = ['all', 'active', 'draft', 'inactive'];

  // Form & Images
  tripForm: FormGroup;
  selectedFile: File | undefined = undefined;
  imagePreview = signal<string | null>(null);

  constructor(private fb: FormBuilder, private tripService: TripService) {
    this.tripForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      destination: ['', Validators.required],
      type: ['vip', Validators.required],
      start_date: ['', Validators.required],
      end_date: ['', Validators.required],
      price: [0, [Validators.required, Validators.min(0)]],
      capacity: [1, [Validators.required, Validators.min(1)]],
      status: ['active', Validators.required]
    });
  }

  ngOnInit() {
    this.loadTrips();
  }

  loadTrips() {
    this.isLoading.set(true);
    const status = this.selectedStatus() === 'all' ? undefined : this.selectedStatus();
    
    this.tripService.getAllTrips({ status }).subscribe({
      next: (res: any) => {
        this.trips.set(res.items);
        this.totalItems.set(res.total);
        this.isLoading.set(false);
      }
    });
  }

  filterByStatus(status: string) {
    this.selectedStatus.set(status);
    this.loadTrips();
  }

  // --- View Logic ---
  openViewModal(trip: Trip) {
    this.selectedTripForView.set(trip);
    this.isViewModalOpen.set(true);
  }

  // --- Create/Edit Logic ---
  openCreateModal() {
    this.editingTripId.set(null);
    this.selectedFile = undefined;
    this.tripForm.reset({ status: 'active', type: 'vip' });
    this.imagePreview.set(null);
    this.isModalOpen.set(true);
  }

  openEditModal(trip: Trip) {
    this.editingTripId.set(trip.id);
    this.selectedFile = undefined;
    this.isModalOpen.set(true);
    this.isViewModalOpen.set(false); // Close view if open
    
    if (trip.images?.length) {
      this.imagePreview.set(`http://localhost:4000/${trip.images[0]}`);
    }

    this.tripForm.patchValue({
      ...trip,
      start_date: trip.start_date.split('T')[0],
      end_date: trip.end_date.split('T')[0]
    });

    setTimeout(() => {
      if (this.day1Input?.nativeElement) {
        this.day1Input.nativeElement.value = trip.itinerary?.day1 || '';
      }
      if (this.day2Input?.nativeElement) {
        this.day2Input.nativeElement.value = trip.itinerary?.day2 || '';
      }
    });
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;
      const reader = new FileReader();
      reader.onload = () => this.imagePreview.set(reader.result as string);
      reader.readAsDataURL(file);
    }
  }

  updateStatus(id: number, status: string) {
    this.tripService.updateTripStatus(id, status).subscribe(() => {
      this.loadTrips();
      if (this.selectedTripForView()?.id === id) {
        this.selectedTripForView.update(t => t ? ({ ...t, status } as any) : null);
      }
    });
  }

  onSubmit() {
    if (this.tripForm.invalid) return;
    this.isSubmitting.set(true);

    // Prepare payload with proper types
    const data = {
      ...this.tripForm.value,
      price: Number(this.tripForm.value.price),
      capacity: Number(this.tripForm.value.capacity),
      itinerary: {
        day1: this.day1Input?.nativeElement?.value || '',
        day2: this.day2Input?.nativeElement?.value || ''
      }
    };

    const request = this.editingTripId()
      ? this.tripService.updateTrip(this.editingTripId()!, data, this.selectedFile)
      : this.tripService.createTrip(data, this.selectedFile);

    request.subscribe({
      next: () => {
        this.isModalOpen.set(false);
        this.loadTrips();
        this.isSubmitting.set(false);
      },
      error: () => this.isSubmitting.set(false)
    });
  }

  getStatusClass(status: string) {
    const base = 'px-3 py-1 rounded-full text-[10px] font-bold uppercase ';
    if (status === 'active') return base + 'bg-emerald-100 text-emerald-700';
    if (status === 'draft') return base + 'bg-amber-100 text-amber-700';
    return base + 'bg-rose-100 text-rose-700';
  }
}