import { db } from '@/lib/firebase'
import {
  collection,
  addDoc,
  getDocs,
  updateDoc,
  doc,
  query,
  orderBy,
  serverTimestamp,
  Timestamp
} from 'firebase/firestore'
import type { Booking, DashboardStats } from '@/types'

export interface BookingData {
  bookingNumber: string
  parentName: string
  email: string
  phone: string
  eventDate: string
  eventTime: string
  eventType: string
  eventPlanner: number
  location: string
  guestCount: number
  budget: string
  kidGender: string
  kidAge: number
  kidInterests: string
  preferredTheme: string
  decorationType: string
  extraServices: string[]
  specialRequests: string
  status: string
  createdAt?: any
}

// Helper: convert Firestore doc to Booking type
function docToBooking(docSnap: any): Booking {
  const data = docSnap.data()
  const created: Timestamp | undefined = data.createdAt
  const updated: Timestamp | undefined = data.updatedAt
  return {
    id: docSnap.id,
    bookingNumber: data.bookingNumber ?? '',
    parentName: data.parentName ?? '',
    email: data.email ?? '',
    phone: data.phone ?? '',
    location: data.location ?? '',
    eventDate: data.eventDate ?? '',
    eventTime: data.eventTime ?? '',
    eventType: data.eventType ?? '',
    eventPlanner: data.eventPlanner ?? 0,
    guestCount: data.guestCount ?? 0,
    budget: data.budget ?? '',
    kidGender: data.kidGender ?? 'male',
    kidAge: data.kidAge ?? 0,
    kidInterests: data.kidInterests ?? '',
    preferredTheme: data.preferredTheme ?? '',
    decorationType: data.decorationType ?? 'setup',
    extraServices: data.extraServices ?? [],
    specialRequests: data.specialRequests ?? '',
    status: data.status ?? 'pending',
    appliedDate: created?.toDate?.()?.toISOString() ?? new Date().toISOString(),
    updatedDate: updated?.toDate?.()?.toISOString(),
    remark: data.remark ?? ''
  }
}

export const bookingService = {
  // Create a new booking
  async createBooking(bookingData: BookingData) {
    try {
      const docRef = await addDoc(collection(db, 'bookings'), {
        ...bookingData,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      })
      console.log('✅ Booking saved to Firestore with ID:', docRef.id)
      return { id: docRef.id, error: null }
    } catch (error) {
      console.error('Error saving booking:', error)
      return { id: null, error }
    }
  },

  // Get all bookings (most recent first)
  async getAllBookings(): Promise<{ bookings: Booking[]; error: string | null }> {
    if (!db) {
      console.warn('⚠️ Firestore not configured — returning empty bookings')
      return { bookings: [], error: null }
    }
    try {
      const q = query(collection(db, 'bookings'), orderBy('createdAt', 'desc'))
      const snapshot = await getDocs(q)
      const bookings = snapshot.docs.map(docToBooking)
      return { bookings, error: null }
    } catch (error: any) {
      console.error('Error fetching bookings:', error)
      return { bookings: [], error: error.message }
    }
  },

  // Get dashboard stats
  async getBookingStats(): Promise<{ stats: DashboardStats; error: string | null }> {
    if (!db) {
      return {
        stats: { totalBookings: 0, newBookings: 0, approvedBookings: 0, cancelledBookings: 0 },
        error: null
      }
    }
    try {
      const snapshot = await getDocs(collection(db, 'bookings'))
      let newBookings = 0
      let approvedBookings = 0
      let cancelledBookings = 0

      snapshot.forEach((docSnap) => {
        const status = docSnap.data().status
        if (status === 'pending') newBookings++
        else if (status === 'approved') approvedBookings++
        else if (status === 'cancelled') cancelledBookings++
      })

      return {
        stats: {
          totalBookings: snapshot.size,
          newBookings,
          approvedBookings,
          cancelledBookings
        },
        error: null
      }
    } catch (error: any) {
      console.error('Error fetching stats:', error)
      return {
        stats: { totalBookings: 0, newBookings: 0, approvedBookings: 0, cancelledBookings: 0 },
        error: error.message
      }
    }
  },

  // Update booking status (approve / cancel)
  async updateBookingStatus(
    bookingId: string,
    status: 'approved' | 'cancelled'
  ): Promise<{ error: string | null }> {
    if (!db) {
      return { error: 'Firestore not configured' }
    }
    try {
      const ref = doc(db, 'bookings', bookingId)
      await updateDoc(ref, { status, updatedAt: serverTimestamp() })
      console.log(`✅ Booking ${bookingId} → ${status}`)
      return { error: null }
    } catch (error: any) {
      console.error('Error updating booking status:', error)
      return { error: error.message }
    }
  },

  // Placeholder kept for backward compatibility
  async getBookings() {
    return this.getAllBookings()
  }
}
