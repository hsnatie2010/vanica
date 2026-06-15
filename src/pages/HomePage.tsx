'use client'

import { motion, useScroll, useTransform, useMotionValue, useSpring } from 'motion/react'
import { useEffect, useRef, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Calendar, Clock, MapPin, Users, Star, ChevronDown, Menu, X } from 'lucide-react'
import { Link } from 'react-router-dom'

const heroContent = {
  name: "Welcome To Vanica!",
  tagline: "Where Celebrations Meet Perfection",
  description: "Step into a world where children’s celebrations are transformed into extraordinary experiences. At Vanica, we craft moments filled with elegance, imagination, and joy designed to leave a lasting impression on families who seek nothing but the finest.",
  features: ["Wedding Planning", "Corporate Events", "Birthday Celebrations", "Anniversary Parties"],
  benefits: [
    "Bespoke Children's Events",
    "Creative Theme Development", 
    "Premium Entertainment Packages",
    "Stress-Free Family Experience"
  ]
}

const services = [
  {
    icon: "🎂",
    title: "Birthday Celebrations",
    description: "Magical birthday parties that create unforgettable memories for your little ones"
  },
  {
    icon: "🎨",
    title: "Themed Parties",
    description: "Creative themed celebrations bringing your child's favorite characters to life"
  },
  {
    icon: "🎪",
    title: "Interactive Entertainment", 
    description: "Engaging activities and entertainment that captivate children of all ages"
  },
  {
    icon: "🎁",
    title: "Special Occasions",
    description: "Bespoke celebrations for graduations, achievements, and milestone moments"
  }
]

export default function HomePage() {
  const containerRef = useRef<HTMLDivElement>(null)
  const heroRef = useRef<HTMLDivElement>(null)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  })

  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"])
  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])
  
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  
  const springConfig = { damping: 25, stiffness: 300 }
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], ["25deg", "-25deg"]), springConfig)
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], ["-25deg", "25deg"]), springConfig)

  function handleMouseMove(event: React.MouseEvent<HTMLDivElement>) {
    const rect = event.currentTarget.getBoundingClientRect()
    const width = rect.width
    const height = rect.height
    const mouseXVal = (event.clientX - rect.left - width / 2) / width
    const mouseYVal = (event.clientY - rect.top - height / 2) / height
    mouseX.set(mouseXVal)
    mouseY.set(mouseYVal)
  }

  return (
    <div ref={containerRef} className="min-h-screen bg-white overflow-hidden">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-sm border-b border-lavender/40">
        <div className="container mx-auto px-4 sm:px-6 py-4">
          <div className="flex items-center justify-between">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center"
            >
              <img src="/logo.png" alt="Vanica Events" className="h-10 sm:h-14" />
            </motion.div>

            {/* Desktop nav */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="hidden md:flex items-center space-x-8"
            >
              <a href="#home" className="text-slate-700 hover:text-pink-600 transition-colors">Home</a>
              <a href="#services" className="text-slate-700 hover:text-pink-600 transition-colors">Services</a>
              <a href="#about" className="text-slate-700 hover:text-pink-600 transition-colors">About</a>
              <a href="#contact" className="text-slate-700 hover:text-pink-600 transition-colors">Contact</a>
              <Link to="/booking">
                <Button className="bg-pink-500 hover:bg-pink-600">
                  Book Event
                </Button>
              </Link>
            </motion.div>

            {/* Mobile hamburger */}
            <button
              className="md:hidden p-2 rounded-lg text-slate-700 hover:bg-pink-50"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile drawer */}
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="md:hidden bg-white/95 backdrop-blur-sm border-b border-lavender/40 px-4 pb-4"
          >
            <div className="flex flex-col space-y-3">
              <a href="#home" onClick={() => setMobileMenuOpen(false)} className="text-slate-700 hover:text-pink-600 py-2">Home</a>
              <a href="#services" onClick={() => setMobileMenuOpen(false)} className="text-slate-700 hover:text-pink-600 py-2">Services</a>
              <a href="#about" onClick={() => setMobileMenuOpen(false)} className="text-slate-700 hover:text-pink-600 py-2">About</a>
              <a href="#contact" onClick={() => setMobileMenuOpen(false)} className="text-slate-700 hover:text-pink-600 py-2">Contact</a>
              <Link to="/booking" onClick={() => setMobileMenuOpen(false)}>
                <Button className="w-full bg-pink-500 hover:bg-pink-600">Book Event</Button>
              </Link>
            </div>
          </motion.div>
        )}
      </nav>

      {/* Advanced animated background */}
      <div className="fixed inset-0 overflow-hidden">
        <motion.div 
          className="absolute -top-1/2 -right-1/2 w-full h-full bg-pink-400/40 rounded-full"
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
        <motion.div 
          className="absolute -bottom-1/2 -left-1/2 w-full h-full bg-pink-300/40 rounded-full"
          animate={{
            scale: [1.2, 1, 1.2],
            rotate: [360, 180, 0],
          }}
          transition={{
            duration: 35,
            repeat: Infinity,
            ease: "linear"
          }}
        />
        
        {/* Floating particles */}
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={i}
            className={`absolute w-1 h-1 ${['bg-pink-400/80','bg-lavender/80','bg-mint/80','bg-skyblue/80'][i % 4]} rounded-full`}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -100, 0],
              opacity: [0, 1, 0],
              scale: [0, 1, 0],
            }}
            transition={{
              duration: Math.random() * 3 + 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      {/* Hero Section */}
      <motion.section 
        ref={heroRef}
        id="home"
        className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 pt-20"
        style={{ y: heroY, opacity: heroOpacity }}
      >
        <div className="container mx-auto max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Text Content */}
            <motion.div
              initial={{ opacity: 0, x: -100 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 0.3 }}
              className="space-y-10 z-10"
            >
              <motion.h1 
                className="text-3xl sm:text-4xl lg:text-5xl font-thin text-grape mb-6"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.7 }}
              >
                {heroContent.name}
              </motion.h1>

              <motion.h2
                className="text-2xl sm:text-3xl lg:text-4xl font-heading text-pink-600 font-light tracking-wide"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.9 }}
              >
                {heroContent.tagline}
              </motion.h2>
              
              <motion.p 
                className="text-base sm:text-xl text-slate-600 leading-relaxed max-w-xl"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1.1 }}
              >
                {heroContent.description}
              </motion.p>
              
              <motion.div 
                className="flex flex-col sm:flex-row gap-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1.3 }}
              >
                <Link to="/booking">
                  <motion.div
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Button size="lg" className="px-12 py-4 bg-pink-500 text-white rounded-full hover:bg-pink-600 transition-all duration-300 shadow-2xl hover:shadow-pink-500/25">
                      Plan Your Event
                    </Button>
                  </motion.div>
                </Link>
                
                <motion.div
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button variant="outline" size="lg" className="px-12 py-4 bg-white/60 backdrop-blur-sm text-slate-700 rounded-full border border-lavender/50 hover:bg-lavender/10 transition-all duration-300 shadow-lg">
                    View Portfolio
                  </Button>
                </motion.div>
              </motion.div>
            </motion.div>

            {/* 3D Event Display */}
            <motion.div
              className="relative flex justify-center items-center"
              onMouseMove={handleMouseMove}
              style={{ perspective: 2000 }}
            >
              <motion.div
                className="relative"
                style={{
                  rotateX,
                  rotateY,
                  transformStyle: "preserve-3d",
                }}
                initial={{ opacity: 0, scale: 0.5, rotateY: -45 }}
                animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                transition={{ duration: 1.5, delay: 0.5 }}
              >
                {/* Main event showcase */}
                <motion.div
                  className="relative w-64 h-64 sm:w-80 sm:h-80 lg:w-[500px] lg:h-[500px] rounded-full bg-pink-200/30 backdrop-blur-sm border border-pink-300/50 flex items-center justify-center overflow-hidden"
                  whileHover={{ scale: 1.1 }}
                  transition={{ type: "spring", stiffness: 200, damping: 20 }}
                >
                  <motion.img
                    src="https://ik.imagekit.io/dhdl0czzc/event2.jpeg?updatedAt=1756707405175"
                    alt="Vanica Events Showcase"
                    className="w-full h-full object-cover rounded-full"
                    initial={{ scale: 1.2, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 1.2, delay: 0.8 }}
                    whileHover={{ scale: 1.05 }}
                  />
                  
                  {/* Floating elements */}
                  {[...Array(6)].map((_, i) => (
                    <motion.div
                      key={i}
                      className={`absolute w-8 h-8 ${['bg-pink-400','bg-lavender','bg-mint','bg-skyblue','bg-pink-300','bg-cream'][i]} rounded-full opacity-90 flex items-center justify-center text-xl`}
                      style={{
                        left: "50%",
                        top: "50%",
                        transformOrigin: `${120 + i * 15}px 0px`,
                      }}
                      animate={{
                        rotate: [0, 360],
                      }}
                      transition={{
                        duration: 8 + i * 2,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                    >
                      {["💐", "🎂", "🎈", "✨",][i]}
                    </motion.div>
                  ))}
                </motion.div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Services Section */}
      <section id="services" className="relative py-16 sm:py-24 lg:py-32 px-4 sm:px-6 bg-white/50 backdrop-blur-sm">
        <div className="container mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12 sm:mb-20"
          >
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-thin text-grape mb-6">
              Our Children's Services
            </h2>
            <p className="text-base sm:text-xl text-slate-600 max-w-3xl mx-auto">
              We specialize in creating magical experiences that bring joy to children and peace of mind to parents
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -10 }}
              >
                <Card className="h-full bg-white/80 backdrop-blur-sm border border-lavender/40 hover:border-pink-300/50 hover:shadow-xl hover:shadow-lavender/10 transition-all duration-300">
                  <CardHeader className="text-center">
                    <div className="text-6xl mb-4">{service.icon}</div>
                    <CardTitle className="text-xl text-pink-600">{service.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-slate-600 text-center">
                      {service.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="relative py-16 sm:py-24 lg:py-32 px-4 sm:px-6">
        <div className="container mx-auto max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-thin text-grape mb-8">
                About Vanica Events
              </h2>
              <p className="text-lg text-slate-600 leading-relaxed mb-6">
                Vanica is a premier authority in children's event planning and coordination, serving discerning families across Lebanon and the Gulf.
              </p>
              <p className="text-lg text-slate-600 leading-relaxed mb-6">
                Since its inception, Vanica has earned a reputation for unparalleled excellence, refined creativity, and meticulous execution. Our team of dedicated experts and passionate professionals is committed to crafting bespoke celebrations that delight children and leave lasting impressions on families.
              </p>

              <p className="text-lg text-slate-600 leading-relaxed mb-8">
                Trusted by elite families who seek sophistication, originality, and flawless experiences, Vanica remains the preferred choice for those who desire truly exceptional celebrations.
              </p>
              <div className="grid grid-cols-2 gap-6">
                {heroContent.benefits.map((benefit, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="flex items-center space-x-3"
                  >
                    <div className={`w-2 h-2 ${['bg-pink-500','bg-lavender','bg-mint'][index % 3]} rounded-full`}></div>
                    <span className="text-slate-700">{benefit}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="bg-pink-100/40 rounded-3xl p-8 backdrop-blur-sm border border-lavender/40">
                <div className="grid grid-cols-2 gap-6 text-center">
                  <div>
                    <div className="text-4xl font-bold font-heading text-pink-600">300+</div>
                    <div className="text-slate-600">Happy Children</div>
                  </div>
                  <div>
                    <div className="text-4xl font-bold font-heading text-pink-600">8+</div>
                    <div className="text-slate-600">Years Experience</div>
                  </div>
                  <div>
                    <div className="text-4xl font-bold font-heading text-pink-600">100%</div>
                    <div className="text-slate-600">Family Satisfaction</div>
                  </div>
                  <div>
                    <div className="text-4xl font-bold font-heading text-pink-600">A to Z</div>
                    <div className="text-slate-600">Support</div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="relative py-16 sm:py-24 lg:py-32 px-4 sm:px-6 bg-white/50 backdrop-blur-sm">
        <div className="container mx-auto max-w-4xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-thin text-grape mb-8">
              Ready to Plan Your Event?
            </h2>
            <p className="text-base sm:text-xl text-slate-600 mb-12">
              Contact us today and let's create something extraordinary together
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              <div className="flex flex-col items-center">
                <MapPin className="w-8 h-8 text-pink-500 mb-4" />
                <h3 className="font-semibold text-pink-600 mb-2">Location</h3>
                <p className="text-slate-600">Lebanon, Beirut, Hamra / Gulf</p>
              </div>
              <div className="flex flex-col items-center">
                <Clock className="w-8 h-8 text-lavender mb-4" />
                <h3 className="font-semibold text-pink-600 mb-2">Hours</h3>
                <p className="text-slate-600">10 AM - 8 PM</p>
              </div>
              <div className="flex flex-col items-center">
                <Users className="w-8 h-8 text-mint mb-4" />
                <h3 className="font-semibold text-pink-600 mb-2">Contact</h3>
                <p className="text-slate-600">+961 03068914</p>
              </div>
            </div>

            <Link to="/booking">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button size="lg" className="px-8 sm:px-12 py-4 bg-pink-500 text-white rounded-full hover:bg-pink-600 transition-all duration-300 shadow-2xl">
                  Start Planning Now
                </Button>
              </motion.div>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative py-10 px-4 sm:px-6 bg-slate-900 text-white">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center">
            <div className="flex justify-center mb-4">
              <img src="/logo.png" alt="Vanica Events" className="h-12 sm:h-16" />
            </div>
            <p className="text-slate-400 mb-8">Creating unforgettable moments, one event at a time</p>
            
            <div className="flex flex-wrap justify-center gap-4 sm:gap-8 mb-8">
              <a href="#home" className="text-slate-400 hover:text-white transition-colors">Home</a>
              <a href="#services" className="text-slate-400 hover:text-white transition-colors">Services</a>
              <a href="#about" className="text-slate-400 hover:text-white transition-colors">About</a>
              <a href="#contact" className="text-slate-400 hover:text-white transition-colors">Contact</a>
            </div>
            
            <div className="border-t border-slate-800 pt-8">
              <p className="text-slate-500">© 2024 Vanica Events. All rights reserved.</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
