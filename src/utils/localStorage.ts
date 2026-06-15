// localStorage utility for bookings

interface LocalStorageBooking {
  id: string;
  bookingNumber: string;
  parentName: string;
  email: string;
  phone: string;
  location: string;
  eventDate: string;
  eventTime?: string;
  eventType?: string;
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

const BOOKING_STORAGE_KEY = 'vanica_bookings'

export const localStorageBookings = {
  // Save a booking to localStorage
  saveBooking: (booking: Omit<LocalStorageBooking, 'id' | 'appliedDate' | 'status'>): string => {
    const bookings = localStorageBookings.getAllBookings()
    const id = 'local_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9)
    
    const newBooking: LocalStorageBooking = {
      id,
      bookingNumber: 'BK-' + Date.now(),
      ...booking,
      status: 'pending',
      appliedDate: new Date().toISOString()
    }
    
    bookings.push(newBooking)
    localStorage.setItem(BOOKING_STORAGE_KEY, JSON.stringify(bookings))
    return id
  },

  // Get all bookings from localStorage
  getAllBookings: (): LocalStorageBooking[] => {
    try {
      const stored = localStorage.getItem(BOOKING_STORAGE_KEY)
      return stored ? JSON.parse(stored) : []
    } catch (error) {
      console.error('Error parsing localStorage bookings:', error)
      return []
    }
  },

  // Get booking statistics from localStorage
  getStats: () => {
    const bookings = localStorageBookings.getAllBookings()
    
    return {
      totalBookings: bookings.length,
      newBookings: bookings.filter(b => b.status === 'pending').length,
      approvedBookings: bookings.filter(b => b.status === 'approved').length,
      cancelledBookings: bookings.filter(b => b.status === 'cancelled').length
    }
  }
}
