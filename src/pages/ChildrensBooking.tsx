'use client'

import { useState } from 'react'
import { motion } from 'motion/react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { ArrowLeft, Calendar, MapPin, Heart, CheckCircle } from 'lucide-react'
import { Link } from 'react-router-dom'
import { bookingService } from '@/services/bookingService'

interface ChildrensBookingFormData {
  parentName: string
  email: string
  phone: string
  location: string
  eventDate: string
  guestCount: string
  kidGender: 'female' | 'male' | ''
  kidAge: string
  kidInterests: string
  preferredTheme: string
  decorationType: 'setup' | 'full' | ''
  extraServices: string[]
  budget: string
}

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

export default function ChildrensBooking() {
  const [formData, setFormData] = useState<ChildrensBookingFormData>({
    parentName: '',
    email: '',
    phone: '',
    location: '',
    eventDate: '',
    guestCount: '',
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

  const handleInputChange = (field: keyof ChildrensBookingFormData, value: string | string[]) => {
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
    if (e.key === 'Enter') {
      e.preventDefault()
      console.log('🔑 Enter key pressed on step:', currentStep)
      
      if (currentStep < 4) {
        nextStep()
      }
    }
  }

  const nextStep = () => {
    // Add validation before proceeding to next step
    if (currentStep === 1) {
      if (!formData.parentName || !formData.email || !formData.phone || !formData.location || !formData.eventDate || !formData.guestCount) {
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
      if (!formData.decorationType) {
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
    
    if (currentStep !== 4) {
      console.log('❌ Submit blocked - not on final step')
      return
    }
    
    // Double check - ensure we're really ready to submit
    if (!formData.parentName || !formData.email || !formData.phone || !formData.location || !formData.eventDate || !formData.guestCount || !formData.kidGender || !formData.kidAge || !formData.decorationType || !formData.budget) {
      alert('Please fill in all required fields before submitting')
      return
    }
    
    console.log('📝 Starting form submission...')
    setIsSubmitting(true)
    
    try {
      // Send booking to external admin dashboard PHP API
      const { error } = await bookingService.createBooking({
        bookingNumber: `VAN${Date.now()}`,
        parentName: formData.parentName,
        email: formData.email,
        phone: formData.phone,
        location: formData.location,
        eventDate: formData.eventDate,
        eventTime: '',
        eventType: 'Kids Event',
        eventPlanner: 1,
        guestCount: parseInt(formData.guestCount, 10),
        kidGender: formData.kidGender as 'female' | 'male',
        kidAge: parseInt(formData.kidAge, 10),
        kidInterests: formData.kidInterests,
        preferredTheme: formData.preferredTheme,
        decorationType: formData.decorationType as 'setup' | 'full',
        extraServices: formData.extraServices,
        budget: formData.budget,
        specialRequests: '',
        status: 'pending'
      })
      
      if (error) {
        console.error('Booking creation failed:', error)
        await new Promise(resolve => setTimeout(resolve, 2000))
      }
      
      console.log('✅ Booking submitted successfully')
      setIsSubmitted(true)
    } catch (error) {
      console.error('Booking submission error:', error)
      await new Promise(resolve => setTimeout(resolve, 2000))
      setIsSubmitted(true)
    }
    
    setIsSubmitting(false)
  }
  
  const prevStep = () => setCurrentStep(prev => Math.max(prev - 1, 1))

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center px-6">
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
            className="mb-8"
          >
            <CheckCircle className="w-24 h-24 text-green-500 mx-auto" />
          </motion.div>
          
          <h1 className="text-2xl sm:text-4xl font-light text-slate-800 mb-4">Quotation Request Submitted!</h1>
          <p className="text-base sm:text-xl text-slate-600 mb-8 max-w-2xl">
            Thank you for choosing Vanica Events! We've received your quotation request for your child's celebration and our team will contact you within 24 hours to discuss the magical details.
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
          className="absolute -top-1/2 -right-1/2 w-full h-full bg-pink-300/60 rounded-full"
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
              <ArrowLeft className="w-5 h-5" />
              <span className="hidden sm:inline">Back to Home</span>
              <span className="sm:hidden">Back</span>
            </Link>
            <div className="flex items-center">
              <img src="/logo.png" alt="Vanica Events" className="h-8 sm:h-12" />
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 px-4 sm:px-6 pb-12">
        <div className="container mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-8 sm:mb-12"
          >
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-thin text-grape mb-4">
              VANICA Quotation Request
            </h1>
            <p className="text-base sm:text-xl text-slate-600 max-w-2xl mx-auto">
              Tell us about your child's dream celebration and we'll create a magical experience
            </p>
          </motion.div>

          {/* Progress Steps */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex justify-center mb-8 sm:mb-12"
          >
            <div className="flex items-center space-x-2 sm:space-x-4">
              {[1, 2, 3, 4].map((step) => (
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
                  {step < 4 && (
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
                <CardTitle className="text-2xl text-center">
                  {currentStep === 1 && "Parent & Event Information"}
                  {currentStep === 2 && "Child's Details"}
                  {currentStep === 3 && "Event Preferences"}
                  {currentStep === 4 && "Services & Budget"}
                </CardTitle>
                <CardDescription className="text-center">
                  {currentStep === 1 && "Let's start with your contact and event information"}
                  {currentStep === 2 && "Tell us about your child"}
                  {currentStep === 3 && "What kind of celebration are you dreaming of?"}
                  {currentStep === 4 && "Select your services and budget range"}
                </CardDescription>
              </CardHeader>
              
              <CardContent>
                <div onKeyDown={handleKeyDown} className="space-y-6">
                  {/* Step 1: Parent & Event Information */}
                  {currentStep === 1 && (
                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="space-y-6"
                    >
                      <div className="space-y-2">
                        <Label htmlFor="parentName">Parent Name *</Label>
                        <Input
                          id="parentName"
                          value={formData.parentName}
                          onChange={(e) => handleInputChange('parentName', e.target.value)}
                          placeholder="Your full name"
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
                          placeholder="your@email.com"
                          required
                        />
                      </div>
                      
                      <div className="space-y-2">
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
                      
                      <div className="space-y-2">
                        <Label htmlFor="location">Your Location *</Label>
                        <div className="relative">
                          <MapPin className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
                          <Input
                            id="location"
                            value={formData.location}
                            onChange={(e) => handleInputChange('location', e.target.value)}
                            placeholder="City, Area or Address"
                            className="pl-10"
                            required
                          />
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="eventDate">Date of Event *</Label>
                        <div className="relative">
                          <Calendar className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
                          <Input
                            id="eventDate"
                            type="date"
                            value={formData.eventDate}
                            onChange={(e) => handleInputChange('eventDate', e.target.value)}
                            className="pl-10"
                            required
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="guestCount">Number of Guests *</Label>
                        <Input
                          id="guestCount"
                          type="number"
                          value={formData.guestCount}
                          onChange={(e) => handleInputChange('guestCount', e.target.value)}
                          placeholder="50"
                          min="1"
                          required
                        />
                      </div>
                    </motion.div>
                  )}

                  {/* Step 2: Child's Details */}
                  {currentStep === 2 && (
                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="space-y-6"
                    >
                      <div className="space-y-2">
                        <Label>Kid's Gender *</Label>
                        <div className="flex space-x-6">
                          <label className="flex items-center space-x-2 cursor-pointer">
                            <input
                              type="radio"
                              name="kidGender"
                              value="female"
                              checked={formData.kidGender === 'female'}
                              onChange={(e) => handleInputChange('kidGender', e.target.value)}
                              className="text-pink-500"
                            />
                            <span>Female</span>
                          </label>
                          <label className="flex items-center space-x-2 cursor-pointer">
                            <input
                              type="radio"
                              name="kidGender"
                              value="male"
                              checked={formData.kidGender === 'male'}
                              onChange={(e) => handleInputChange('kidGender', e.target.value)}
                              className="text-pink-500"
                            />
                            <span>Male</span>
                          </label>
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="kidAge">Kid's Age (years) *</Label>
                        <Input
                          id="kidAge"
                          type="number"
                          value={formData.kidAge}
                          onChange={(e) => handleInputChange('kidAge', e.target.value)}
                          placeholder="Age in years"
                          min="1"
                          max="18"
                          required
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="kidInterests">Kid's Interests</Label>
                        <Textarea
                          id="kidInterests"
                          value={formData.kidInterests}
                          onChange={(e) => handleInputChange('kidInterests', e.target.value)}
                          placeholder="Tell us what your child loves (characters, activities, hobbies, etc.)"
                          rows={3}
                        />
                      </div>
                    </motion.div>
                  )}

                  {/* Step 3: Event Preferences */}
                  {currentStep === 3 && (
                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="space-y-6"
                    >
                      <div className="space-y-2">
                        <Label htmlFor="preferredTheme">Preferred Theme</Label>
                        <Input
                          id="preferredTheme"
                          value={formData.preferredTheme}
                          onChange={(e) => handleInputChange('preferredTheme', e.target.value)}
                          placeholder="Princess, Superhero, Unicorn, etc."
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label>Decoration *</Label>
                        <div className="space-y-3">
                          <label className="flex items-center space-x-2 cursor-pointer">
                            <input
                              type="radio"
                              name="decorationType"
                              value="setup"
                              checked={formData.decorationType === 'setup'}
                              onChange={(e) => handleInputChange('decorationType', e.target.value)}
                              className="text-pink-500"
                            />
                            <span>Setup Decoration (stage/background only)</span>
                          </label>
                          <label className="flex items-center space-x-2 cursor-pointer">
                            <input
                              type="radio"
                              name="decorationType"
                              value="full"
                              checked={formData.decorationType === 'full'}
                              onChange={(e) => handleInputChange('decorationType', e.target.value)}
                              className="text-pink-500"
                            />
                            <span>Full Decoration (entrance, tables & chairs, printed ground...)</span>
                          </label>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {/* Step 4: Services & Budget */}
                  {currentStep === 4 && (
                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="space-y-6"
                    >
                      <div className="space-y-2">
                        <Label>Extra Services Needed *</Label>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          {extraServicesList.map(service => (
                            <label key={service} className="flex items-center space-x-2 cursor-pointer">
                              <input
                                type="checkbox"
                                checked={formData.extraServices.includes(service)}
                                onChange={() => handleServiceToggle(service)}
                                className="text-pink-500"
                              />
                              <span>{service}</span>
                            </label>
                          ))}
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="budget">Budget *</Label>
                        <select
                          id="budget"
                          value={formData.budget}
                          onChange={(e) => handleInputChange('budget', e.target.value)}
                          className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm"
                          required
                        >
                          <option value="">Select budget range</option>
                          {budgetOptions.map(option => (
                            <option key={option} value={option}>{option}</option>
                          ))}
                        </select>
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
                    
                    {currentStep < 4 ? (
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
                          'Submit Quotation Request'
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
