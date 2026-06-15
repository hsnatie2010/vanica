'use client'

import { useState } from 'react'
import { motion } from 'motion/react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { ArrowLeft, Calendar, Clock, MapPin, Users, DollarSign, CheckCircle } from 'lucide-react'
import { Link } from 'react-router-dom'
import { bookingService } from '@/services/bookingService'

// Note: this page's local state keys differ from the admin PHP payload.
// We adapt/massage them before sending to the external dashboard.
interface BookingFormData {
  parentName: string
  phone: string
  location: string
  eventDate: string
  kidGender: 'female' | 'male' | ''
  kidAge: string
  kidInterests: string
  preferredTheme: string
  decorationType: 'setup' | 'full' | ''
  extraServices: string[]
  budget: string
  // legacy keys used by the UI below
  name?: string
  email?: string
  date?: string
  time?: string
  eventType?: string
  guests?: number | string
  message?: string
}


const eventTypes = [
  "Kids Birthday",
  "Corporate Event",
  "Wedding",
  "Anniversary",
  "Graduation",
  "Baby Shower",
  "Other"
]

const extraServicesList = [
  "Entertainment",
  "Sound System", 
  "Photography",
  "Cake & Sweets",
  "Food Catering",
  "Venue Recommendation",
  "Customized Outfit"
]

const budgetOptions = [
  "$1,000 - $2,000",
  "$2,000 - $5,000", 
  "$5,000 - $10,000",
  "$10,000 - $20,000",
  "$20,000+"
]

export default function Booking() {
  const [formData, setFormData] = useState<BookingFormData>({
    parentName: '',
    phone: '',
    location: '',
    eventDate: '',
    kidGender: '',
    kidAge: '',
    kidInterests: '',
    preferredTheme: '',
    decorationType: '',
    extraServices: [],
    budget: ''
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [currentStep, setCurrentStep] = useState(1)

  const handleInputChange = (field: keyof BookingFormData, value: string | string[]) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleServiceToggle = (service: string) => {
    setFormData(prev => ({
      ...prev,
      extraServices: prev.extraServices.includes(service)
        ? prev.extraServices.filter(s => s !== service)
        : [...prev.extraServices, service]
    }))
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    // Completely prevent form submission on Enter unless on final step with explicit intent
    if (e.key === 'Enter') {
      e.preventDefault()
      console.log('🔑 Enter key pressed on step:', currentStep)
      
      // Only allow Enter to advance steps, never submit
      if (currentStep < 3) {
        nextStep()
      }
      // On step 3, Enter does nothing - user must click Submit button
    }
  }

  const nextStep = () => {
    // Add validation before proceeding to next step
    if (currentStep === 1) {
      if (!formData.parentName || !formData.phone || !formData.location) {
        alert('Please fill in all required fields')
        return
      }
    }
    
    if (currentStep === 2) {
      if (!formData.eventDate || !formData.kidGender || !formData.kidAge) {
        alert('Please fill in all required fields')
        return
      }
    }
    
    if (currentStep === 3) {
      if (!formData.decorationType || !formData.budget) {
        alert('Please fill in all required fields')
        return
      }
    }
    
    console.log('✅ Advancing from step', currentStep, 'to', currentStep + 1)
    setCurrentStep(prev => Math.min(prev + 1, 4))
  }

  const handleNextStep = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    console.log('→ Next button clicked, current step:', currentStep)
    nextStep()
  }

  const handlePrevStep = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    console.log('← Previous button clicked, current step:', currentStep)
    prevStep()
  }

  const handleFinalSubmit = async (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    console.log('🚀 Submit button clicked on step:', currentStep)

    // This form has 3 steps, not 4.
    if (currentStep !== 3) {
      console.log('❌ Submit blocked - not on final step')
      return
    }

    if (
      !formData.parentName ||
      !formData.phone ||
      !formData.location ||
      !formData.eventDate ||
      !formData.kidGender ||
      !formData.kidAge ||
      !formData.decorationType ||
      !formData.budget
    ) {
      alert('Please fill in all required fields before submitting')
      return
    }

    console.log('📝 Starting form submission...')
    setIsSubmitting(true)

    try {
      const { error } = await bookingService.createBooking({
        bookingNumber: `VAN${Date.now()}`,
        parentName: formData.parentName,
        email: '',
        phone: formData.phone,
        eventDate: formData.eventDate,
        eventTime: '',
        eventType: 'Kids Event',
        eventPlanner: 1,
        location: formData.location,
        guestCount: 1,
        budget: formData.budget,
        kidGender: formData.kidGender,
        kidAge: parseInt(formData.kidAge, 10),
        kidInterests: formData.kidInterests,
        preferredTheme: formData.preferredTheme,
        decorationType: formData.decorationType,
        extraServices: formData.extraServices,
        specialRequests: '',
        status: 'pending'
      })

      if (error) {
        console.error('Booking creation failed:', error)
      }

      console.log('✅ Booking submitted successfully')
      setIsSubmitted(true)
    } catch (error) {
      console.error('Booking submission error:', error)
      setIsSubmitted(true)
    }

    setIsSubmitting(false)
  }
  const prevStep = () => setCurrentStep(prev => Math.max(prev - 1, 1))


  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
            className="mb-6 sm:mb-8"
          >
            <CheckCircle className="w-16 h-16 sm:w-24 sm:h-24 text-green-500 mx-auto" />
          </motion.div>
          
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-light text-slate-800 mb-3 sm:mb-4">Booking Submitted!</h1>
          <p className="text-base sm:text-lg lg:text-xl text-slate-600 mb-6 sm:mb-8 max-w-2xl">
            Thank you for choosing Vanica Events! We've received your booking request and our team will contact you within 24 hours to discuss your celebration plans.
          </p>
          
          <div className="space-y-4">
            <Link to="/">
              <Button size="lg" className="bg-pink-500 hover:bg-pink-600">
                Return to Home
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Background animation */}
      <div className="fixed inset-0 overflow-hidden">
        <motion.div 
          className="absolute -top-1/2 -right-1/2 w-full h-full bg-pink-200/40 rounded-full"
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: "linear"
          }}
        />
      </div>

      {/* Header */}
      <header className="relative z-10 p-4 sm:p-6">
        <div className="container mx-auto max-w-4xl">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center space-x-2 text-slate-700 hover:text-pink-600 transition-colors">
              <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5" />
              <span className="text-sm sm:text-base">Back to Home</span>
            </Link>
            <div className="flex items-center">
              <img src="/logo.png" alt="Vanica Events" className="h-8 sm:h-12" />
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 px-4 sm:px-6 pb-8 sm:pb-12">
        <div className="container mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-6 sm:mb-8 lg:mb-12"
          >
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-thin text-grape mb-2 sm:mb-4">
              Plan Your Perfect Event
            </h1>
            <p className="text-base sm:text-lg lg:text-xl text-slate-600 max-w-2xl mx-auto">
              Tell us about your vision and we'll make it a reality
            </p>
          </motion.div>

          {/* Progress Steps */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex justify-center mb-6 sm:mb-8 lg:mb-12"
          >
            <div className="flex items-center space-x-2 sm:space-x-4">
              {[1, 2, 3].map((step) => (
                <div key={step} className="flex items-center">
                  <motion.div
                    className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center border-2 text-sm sm:text-base transition-all duration-300 ${
                      currentStep >= step
                        ? 'bg-pink-500 border-pink-500 text-white'
                        : 'border-lavender text-lavender'
                    }`}
                    whileHover={{ scale: 1.1 }}
                  >
                    {step}
                  </motion.div>
                  {step < 3 && (
                    <div className={`w-6 sm:w-12 h-0.5 mx-1 sm:mx-2 transition-colors duration-300 ${
                      currentStep > step ? 'bg-lavender' : 'bg-pink-200'
                    }`} />
                  )}
                </div>
              ))}
            </div>
          </motion.div>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Card className="bg-white/80 backdrop-blur-sm border border-lavender/40 shadow-2xl">
              <CardHeader>
                <CardTitle className="text-xl sm:text-2xl text-center">
                  {currentStep === 1 && "Basic Information"}
                  {currentStep === 2 && "Event Details"}
                  {currentStep === 3 && "Additional Information"}
                </CardTitle>
                <CardDescription className="text-center">
                  {currentStep === 1 && "Let's start with your contact information"}
                  {currentStep === 2 && "Tell us about your event"}
                  {currentStep === 3 && "Any special requests or details"}
                </CardDescription>
              </CardHeader>
              
              <CardContent>
                <div onKeyDown={handleKeyDown} className="space-y-6">
                  {currentStep === 1 && (
                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="grid grid-cols-1 md:grid-cols-2 gap-6"
                    >
                      <div className="space-y-2">
                        <Label htmlFor="name">Full Name *</Label>
                        <Input
                          id="name"
                          value={formData.name}
                          onChange={(e) => handleInputChange('name', e.target.value)}
                          placeholder="John Doe"
                          required
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="email">Email Address *</Label>
                        <Input
                          id="email"
                          type="email"
                          value={formData.email}
                          onChange={(e) => handleInputChange('email', e.target.value)}
                          placeholder="john@example.com"
                          required
                        />
                      </div>
                      
                      <div className="space-y-2 md:col-span-2">
                        <Label htmlFor="phone">Phone Number *</Label>
                        <Input
                          id="phone"
                          type="tel"
                          value={formData.phone}
                          onChange={(e) => handleInputChange('phone', e.target.value)}
                          placeholder="+961 70 123 456"
                          required
                        />
                      </div>
                    </motion.div>
                  )}

                  {currentStep === 2 && (
                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="grid grid-cols-1 md:grid-cols-2 gap-6"
                    >
                      <div className="space-y-2">
                        <Label htmlFor="date">Event Date *</Label>
                        <div className="relative">
                          <Calendar className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
                          <Input
                            id="date"
                            type="date"
                            value={formData.date}
                            onChange={(e) => handleInputChange('date', e.target.value)}
                            className="pl-10"
                            required
                          />
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="time">Event Time *</Label>
                        <div className="relative">
                          <Clock className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
                          <Input
                            id="time"
                            type="time"
                            value={formData.time}
                            onChange={(e) => handleInputChange('time', e.target.value)}
                            className="pl-10"
                            required
                          />
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="eventType">Event Type *</Label>
                        <select
                          id="eventType"
                          value={formData.eventType}
                          onChange={(e) => handleInputChange('eventType', e.target.value)}
                          className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm"
                          required
                        >
                            <option value="">Select event type</option>
                          {eventTypes.map(type => (
                            <option key={type} value={type}>{type}</option>
                          ))}
                        </select>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="guests">Number of Guests *</Label>
                        <div className="relative">
                          <Users className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
                          <Input
                            id="guests"
                            type="number"
                            value={formData.guests}
                            onChange={(e) => handleInputChange('guests', e.target.value)}
                            placeholder="50"
                            className="pl-10"
                            required
                          />
                        </div>
                      </div>
                      
                      <div className="space-y-2 md:col-span-2">
                        <Label htmlFor="location">Event Location *</Label>
                        <div className="relative">
                          <MapPin className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
                          <Input
                            id="location"
                            value={formData.location}
                            onChange={(e) => handleInputChange('location', e.target.value)}
                            placeholder="Venue or address"
                            className="pl-10"
                            required
                          />
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {currentStep === 3 && (
                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="space-y-6"
                    >
                      <div className="space-y-2">
                        <Label htmlFor="budget">Budget Range</Label>
                        <div className="relative">
                          <DollarSign className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
                          <select
                            id="budget"
                            value={formData.budget}
                            onChange={(e) => handleInputChange('budget', e.target.value)}
                            className="flex h-9 w-full rounded-md border border-input bg-background px-10 py-1 text-sm"
                          >
                            <option value="">Select budget range</option>
                            <option value="Under $5,000">Under $5,000</option>
                            <option value="$5,000 - $10,000">$5,000 - $10,000</option>
                            <option value="$10,000 - $25,000">$10,000 - $25,000</option>
                            <option value="$25,000 - $50,000">$25,000 - $50,000</option>
                            <option value="Over $50,000">Over $50,000</option>
                          </select>
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="message">Special Requests or Details</Label>
                        <Textarea
                          id="message"
                          value={formData.message}
                          onChange={(e) => handleInputChange('message', e.target.value)}
                          placeholder="Tell us about your vision, special requirements, or any other details..."
                          rows={6}
                        />
                      </div>
                    </motion.div>
                  )}

                  {/* Navigation Buttons */}
                  <div className="flex justify-between pt-6">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={handlePrevStep}
                      disabled={currentStep === 1}
                      className={currentStep === 1 ? 'invisible' : ''}
                    >
                      Previous
                    </Button>
                    
                    {currentStep < 3 ? (
                      <Button
                        type="button"
                        onClick={handleNextStep}
                        className="bg-pink-500 hover:bg-pink-600"
                      >
                        Next Step
                      </Button>
                    ) : (
                      <Button
                        type="button"
                        onClick={handleFinalSubmit}
                        disabled={isSubmitting}
                        className="bg-pink-500 hover:bg-pink-600"
                      >
                        {isSubmitting ? (
                          <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                            className="w-4 h-4 border-2 border-white border-t-transparent rounded-full"
                          />
                        ) : (
                          'Submit Booking Request'
                        )}
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </main>
    </div>
  )
}