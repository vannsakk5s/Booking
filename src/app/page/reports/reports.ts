import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule } from '@angular/forms';
import { NgClass, NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-reports',
  imports: [NgClass, NgFor, NgIf, FormsModule],
  templateUrl: './reports.html',
  styleUrls: ['./reports.css']
})
export class Reports implements OnInit {
  filterForm: FormGroup;
  activeTab: 'overview' | 'revenue' | 'destinations' | 'guides' | 'cancellations' = 'overview';

  // Add these methods to your ReportsComponent class

// Helper method for Math.floor
floor(value: number): number {
  return Math.floor(value);
}

// Helper method for Math.ceil
ceil(value: number): number {
  return Math.ceil(value);
}

// Helper method for Math.round
round(value: number): number {
  return Math.round(value);
}

// Get current date for footer
getCurrentDate(): string {
  return new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
}
  
  // Date range options
  dateRanges = [
    { label: 'Last 7 days', value: '7d' },
    { label: 'Last 30 days', value: '30d' },
    { label: 'Last 90 days', value: '90d' },
    { label: 'This month', value: 'month' },
    { label: 'This year', value: 'year' },
    { label: 'Custom', value: 'custom' }
  ];
  
  // Revenue by trip type
  revenueByType = [
    { 
      type: 'VIP', 
      revenue: 125000, 
      bookings: 45, 
      avgPrice: 2778, 
      color: 'bg-purple-500',
      textColor: 'text-purple-700',
      bgColor: 'bg-purple-50'
    },
    { 
      type: 'Semi-Private', 
      revenue: 89000, 
      bookings: 112, 
      avgPrice: 795, 
      color: 'bg-green-500',
      textColor: 'text-green-700',
      bgColor: 'bg-green-50'
    },
    { 
      type: 'Public', 
      revenue: 156000, 
      bookings: 312, 
      avgPrice: 500, 
      color: 'bg-blue-500',
      textColor: 'text-blue-700',
      bgColor: 'bg-blue-50'
    }
  ];
  
  // Popular destinations
  popularDestinations = [
    { name: 'Siem Reap - Angkor Wat', bookings: 156, revenue: 124800, growth: 12, rating: 4.8 },
    { name: 'Phnom Penh City Tour', bookings: 124, revenue: 99200, growth: 8, rating: 4.6 },
    { name: 'Sihanoukville Beach', bookings: 98, revenue: 78400, growth: 15, rating: 4.5 },
    { name: 'Mondulkiri Eco Tour', bookings: 76, revenue: 60800, growth: 22, rating: 4.9 },
    { name: 'Kampot Pepper Farm', bookings: 65, revenue: 52000, growth: -5, rating: 4.4 },
    { name: 'Kratie Dolphin Tour', bookings: 58, revenue: 46400, growth: 18, rating: 4.7 },
    { name: 'Battambang Bamboo Train', bookings: 45, revenue: 36000, growth: 10, rating: 4.3 },
    { name: 'Kep Crab Market', bookings: 42, revenue: 33600, growth: 25, rating: 4.6 }
  ];
  
  // Guide performance
  guidePerformance = [
    { 
      name: 'Sokha Chen', 
      totalTrips: 45, 
      totalRevenue: 85000, 
      rating: 4.9, 
      completionRate: 98,
      languages: ['English', 'Khmer', 'Chinese'],
      reviews: 128
    },
    { 
      name: 'Bopha Kim', 
      totalTrips: 38, 
      totalRevenue: 72000, 
      rating: 4.8, 
      completionRate: 96,
      languages: ['English', 'Khmer', 'French'],
      reviews: 94
    },
    { 
      name: 'Dara Lim', 
      totalTrips: 32, 
      totalRevenue: 61000, 
      rating: 4.7, 
      completionRate: 95,
      languages: ['English', 'Khmer'],
      reviews: 76
    },
    { 
      name: 'Srey Nich', 
      totalTrips: 28, 
      totalRevenue: 52000, 
      rating: 4.6, 
      completionRate: 94,
      languages: ['English', 'Khmer', 'Japanese'],
      reviews: 65
    },
    { 
      name: 'Rithy Mao', 
      totalTrips: 25, 
      totalRevenue: 48000, 
      rating: 4.5, 
      completionRate: 92,
      languages: ['English', 'Khmer'],
      reviews: 58
    }
  ];
  
  // Cancellation reasons
  cancellationReasons = [
    { reason: 'Change of plans', count: 45, percentage: 32, trend: 'up' },
    { reason: 'Found better price', count: 28, percentage: 20, trend: 'down' },
    { reason: 'Travel restrictions', count: 25, percentage: 18, trend: 'stable' },
    { reason: 'Schedule conflict', count: 18, percentage: 13, trend: 'stable' },
    { reason: 'Weather concerns', count: 12, percentage: 9, trend: 'up' },
    { reason: 'Health issues', count: 8, percentage: 6, trend: 'stable' },
    { reason: 'Other reasons', count: 4, percentage: 2, trend: 'down' }
  ];
  
  // Monthly data for charts
  monthlyData = [
    { month: 'Jan', revenue: 42000, bookings: 68, cancellations: 8 },
    { month: 'Feb', revenue: 52000, bookings: 74, cancellations: 6 },
    { month: 'Mar', revenue: 61000, bookings: 82, cancellations: 7 },
    { month: 'Apr', revenue: 58000, bookings: 78, cancellations: 9 },
    { month: 'May', revenue: 72000, bookings: 94, cancellations: 5 },
    { month: 'Jun', revenue: 85000, bookings: 108, cancellations: 7 },
    { month: 'Jul', revenue: 92000, bookings: 118, cancellations: 8 },
    { month: 'Aug', revenue: 88000, bookings: 112, cancellations: 10 },
    { month: 'Sep', revenue: 76000, bookings: 98, cancellations: 6 },
    { month: 'Oct', revenue: 81000, bookings: 104, cancellations: 7 },
    { month: 'Nov', revenue: 94000, bookings: 122, cancellations: 8 },
    { month: 'Dec', revenue: 105000, bookings: 136, cancellations: 9 }
  ];
  
  // Selected filter values
  selectedDateRange = '30d';
  showCustomDate = false;
  
  constructor(private fb: FormBuilder) {
    this.filterForm = this.fb.group({
      dateRange: ['30d'],
      startDate: [''],
      endDate: [''],
      tripType: ['all'],
      destination: ['all'],
      guide: ['all']
    });
    
    // Listen for date range changes
    this.filterForm.get('dateRange')?.valueChanges.subscribe(value => {
      this.showCustomDate = value === 'custom';
    });
  }
  
  ngOnInit(): void {
    // Initialize any data here
  }
  
  // Calculate total revenue
  getTotalRevenue(): number {
    return this.revenueByType.reduce((sum, item) => sum + item.revenue, 0);
  }
  
  // Calculate total bookings
  getTotalBookings(): number {
    return this.revenueByType.reduce((sum, item) => sum + item.bookings, 0);
  }
  
  // Calculate average guide rating
  getAverageGuideRating(): number {
    const total = this.guidePerformance.reduce((sum, guide) => sum + guide.rating, 0);
    return total / this.guidePerformance.length;
  }
  
  // Calculate total cancellations
  getTotalCancellations(): number {
    return this.cancellationReasons.reduce((sum, reason) => sum + reason.count, 0);
  }
  
  // Calculate cancellation rate
  getCancellationRate(): number {
    const totalBookings = this.getTotalBookings();
    const cancellations = this.getTotalCancellations();
    return (cancellations / totalBookings) * 100;
  }
  
  // Get top 3 destinations
  getTopDestinations(): any[] {
    return [...this.popularDestinations]
      .sort((a, b) => b.bookings - a.bookings)
      .slice(0, 3);
  }
  
  // Get top performing guides
  getTopGuides(): any[] {
    return [...this.guidePerformance]
      .sort((a, b) => b.rating - a.rating)
      .slice(0, 3);
  }
  
  // Generate revenue chart data points
  getRevenueChartPoints(): number[] {
    return this.monthlyData.map(data => data.revenue);
  }
  
  // Generate bookings chart data points
  getBookingsChartPoints(): number[] {
    return this.monthlyData.map(data => data.bookings);
  }
  
  // Get percentage for progress bar
  getRevenuePercentage(type: string): number {
    const total = this.getTotalRevenue();
    const typeRevenue = this.revenueByType.find(t => t.type === type)?.revenue || 0;
    return (typeRevenue / total) * 100;
  }
  
  // Get color based on growth
  getGrowthColor(growth: number): string {
    if (growth > 15) return 'text-green-600';
    if (growth > 5) return 'text-green-500';
    if (growth > 0) return 'text-green-400';
    if (growth < -5) return 'text-red-600';
    if (growth < 0) return 'text-red-500';
    return 'text-gray-500';
  }
  
  // Get icon based on trend
  getTrendIcon(trend: string): string {
    switch(trend) {
      case 'up': return '↗';
      case 'down': return '↘';
      default: return '→';
    }
  }
  
  // Export to CSV function
  exportToCSV(): void {
    let csvContent = 'data:text/csv;charset=utf-8,';
    let headers = [];
    let data = [];
    
    switch(this.activeTab) {
      case 'revenue':
        headers = ['Trip Type', 'Revenue', 'Bookings', 'Average Price', 'Revenue Share'];
        data = this.revenueByType.map(item => [
          item.type,
          `$${item.revenue.toLocaleString()}`,
          item.bookings,
          `$${item.avgPrice}`,
          `${((item.revenue / this.getTotalRevenue()) * 100).toFixed(1)}%`
        ]);
        break;
        
      case 'destinations':
        headers = ['Destination', 'Bookings', 'Revenue', 'Growth %', 'Rating'];
        data = this.popularDestinations.map(item => [
          item.name,
          item.bookings,
          `$${item.revenue.toLocaleString()}`,
          `${item.growth}%`,
          `${item.rating}/5`
        ]);
        break;
        
      case 'guides':
        headers = ['Guide Name', 'Total Trips', 'Total Revenue', 'Rating', 'Completion Rate', 'Languages', 'Reviews'];
        data = this.guidePerformance.map(item => [
          item.name,
          item.totalTrips,
          `$${item.totalRevenue.toLocaleString()}`,
          `${item.rating}/5`,
          `${item.completionRate}%`,
          item.languages.join(', '),
          item.reviews
        ]);
        break;
        
      case 'cancellations':
        headers = ['Cancellation Reason', 'Count', 'Percentage', 'Trend'];
        data = this.cancellationReasons.map(item => [
          item.reason,
          item.count,
          `${item.percentage}%`,
          item.trend.toUpperCase()
        ]);
        break;
        
      default: // overview
        headers = ['Metric', 'Value', 'Change'];
        data = [
          ['Total Revenue', `$${this.getTotalRevenue().toLocaleString()}`, '+12%'],
          ['Total Bookings', this.getTotalBookings().toString(), '+8%'],
          ['Avg. Guide Rating', this.getAverageGuideRating().toFixed(1), '+0.2'],
          ['Cancellation Rate', `${this.getCancellationRate().toFixed(1)}%`, '-1.2%'],
          ['Total Destinations', this.popularDestinations.length.toString(), '+2'],
          ['Active Guides', this.guidePerformance.length.toString(), '0']
        ];
        break;
    }
    
    // Add headers to CSV
    csvContent += headers.join(',') + '\n';
    
    // Add data rows to CSV
    data.forEach(row => {
      csvContent += row.map(cell => `"${cell}"`).join(',') + '\n';
    });
    
    // Create download link
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `travel_report_${this.activeTab}_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    // Show success message
    alert(`CSV file downloaded successfully!\n\nFile: travel_report_${this.activeTab}_${new Date().toISOString().split('T')[0]}.csv`);
  }
  
  // Demo PDF export (shows alert)
  exportToPDF(): void {
    alert('PDF Export Demo:\n\nIn a real application, this would generate a PDF report with all the current data and charts.\n\nFor now, please use the CSV export functionality.');
    
    // In a real app, you would implement PDF generation here
    // using libraries like jsPDF or pdfmake
  }
  
  // Apply filters
  applyFilters(): void {
    const filters = this.filterForm.value;
    console.log('Applying filters:', filters);
    
    // In a real app, you would make an API call with these filters
    // For demo, we'll just show an alert
    alert(`Filters applied:\n\nDate Range: ${filters.dateRange}\nTrip Type: ${filters.tripType}\nDestination: ${filters.destination}\nGuide: ${filters.guide}`);
  }
  
  // Reset filters
  resetFilters(): void {
    this.filterForm.reset({
      dateRange: '30d',
      startDate: '',
      endDate: '',
      tripType: 'all',
      destination: 'all',
      guide: 'all'
    });
    this.showCustomDate = false;
  }
  
  // Switch between tabs
  switchTab(tab: 'overview' | 'revenue' | 'destinations' | 'guides' | 'cancellations'): void {
    this.activeTab = tab;
  }
}