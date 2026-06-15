// Booking Types
export interface Booking {
  id: string;
  bookingNumber: string;
  parentName: string;
  email: string;
  phone: string;
  location: string;
  eventDate: string;
  eventTime?: string;
  eventType?: string;
  eventPlanner?: number;
  guestCount: number;
  kidGender: 'female' | 'male';
  kidAge: number;

  kidInterests?: string;
  preferredTheme?: string;
  decorationType: 'setup' | 'full';
  extraServices: string[];
  budget: string | number;
  specialRequests?: string;
  status: 'pending' | 'approved' | 'cancelled';
  appliedDate: string;
  updatedDate?: string;
  remark?: string;
}

// User Types
export interface User {
  id: string;
  fullName: string;
  email: string;
  role: 'admin' | 'planner';
}

// Event Types
export interface EventType {
  id: string;
  name: string;
  description: string;
}

// API Response Types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

// Dashboard Stats
export interface DashboardStats {
  totalBookings: number;
  newBookings: number;
  approvedBookings: number;
  cancelledBookings: number;
}
