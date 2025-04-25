import React, { useState, useRef } from 'react';
import { ChevronLeft, ChevronRight, ArrowRight, X, Mail, Phone, Globe } from 'lucide-react';

export default function ServicesSection() {
  const [activeCardIndex, setActiveCardIndex] = useState(7);
  const [showForm, setShowForm] = useState(false);
  const [selectedService, setSelectedService] = useState(7);
  const carouselRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startPos, setStartPos] = useState(0);
  
  // Service lines with their capabilities
  const serviceLines = [
    {
      name: "Language & Communication",
      capabilities: [
        { id: 0, title: "Language Services", icon: "💬", description: "Professional translation and localization services." },
        { id: 1, title: "Content Writing", icon: "✍️", description: "High-quality content creation for various purposes." },
        { id: 2, title: "Editing Services", icon: "📝", description: "Polishing and perfecting your written materials." }
      ]
    },
    {
      name: "Business Support",
      capabilities: [
        { id: 3, title: "Business Research", icon: "🔍", description: "Comprehensive research for business insights." },
        { id: 4, title: "Data Processing", icon: "📊", description: "Efficient processing of various data types." },
        { id: 5, title: "Virtual Assistance", icon: "👩‍💼", description: "Remote support for your business needs." }
      ]
    },
    {
      name: "Digital Solutions",
      capabilities: [
        { id: 6, title: "Web Development", icon: "💻", description: "Custom website creation and maintenance." },
        { id: 7, title: "App Development", icon: "📱", description: "Mobile application development for all platforms." },
        { id: 8, title: "Digital Marketing", icon: "📣", description: "Promoting your business in the digital landscape." }
      ]
    },
    {
      name: "Creative Media",
      capabilities: [
        { id: 9, title: "Graphic Design", icon: "🎨", description: "Visual content creation for various media." },
        { id: 10, title: "Video Production", icon: "🎥", description: "Professional video creation and editing." },
        { id: 11, title: "Animation", icon: "🎬", description: "Engaging animated content for your brand." }
      ]
    },
    {
      name: "Technical Support",
      capabilities: [
        { id: 12, title: "IT Services", icon: "🖥️", description: "Technical support and IT solutions." },
        { id: 13, title: "Data Analysis", icon: "📈", description: "Making sense of your data through analysis." },
        { id: 14, title: "Cloud Solutions", icon: "☁️", description: "Efficient cloud-based services and support." }
      ]
    }
  ];

  // Flatten capabilities for carousel
  const allCapabilities = serviceLines.flatMap(line => line.capabilities);
  
  // Handle click on service line
  const handleServiceLineClick = (lineName) => {
    const lineIndex = serviceLines.findIndex(line => line.name === lineName);
    const firstCapabilityIndex = serviceLines.slice(0, lineIndex).reduce((acc, line) => acc + line.capabilities.length, 0);
    setActiveCardIndex(firstCapabilityIndex);
  };
  
  // Next/Previous card functions
  const nextCard = () => {
    setActiveCardIndex(prev => (prev + 1) % allCapabilities.length);
  };
  
  const prevCard = () => {
    setActiveCardIndex(prev => (prev - 1 + allCapabilities.length) % allCapabilities.length);
  };
  
  // Handle drag start
  const handleDragStart = (e) => {
    setIsDragging(true);
    const clientX = e.type === 'touchstart' ? e.touches[0].clientX : e.clientX;
    setStartPos(clientX);
  };
  
  // Handle dragging
  const handleDragging = (e) => {
    if (!isDragging) return;
    const clientX = e.type === 'touchmove' ? e.touches[0].clientX : e.clientX;
    const diff = clientX - startPos;
    
    // If drag distance is significant, change card
    if (Math.abs(diff) > 100) {
      if (diff > 0) {
        prevCard();
      } else {
        nextCard();
      }
      setIsDragging(false);
    }
  };
  
  // Handle drag end
  const handleDragEnd = () => {
    setIsDragging(false);
  };

  // Get current service line based on active card
  const getCurrentServiceLine = () => {
    let count = 0;
    for (let i = 0; i < serviceLines.length; i++) {
      count += serviceLines[i].capabilities.length;
      if (activeCardIndex < count) return serviceLines[i].name;
    }
    return serviceLines[0].name;
  };

  // Determine indicator count and active indicator
  const getIndicatorInfo = () => {
    const totalIndicators = Math.min(6, allCapabilities.length);
    const indicatorStep = Math.ceil(allCapabilities.length / totalIndicators);
    const activeIndicator = Math.floor(activeCardIndex / indicatorStep);
    
    return { totalIndicators, activeIndicator };
  };
  
  const { totalIndicators, activeIndicator } = getIndicatorInfo();
  
  // Function to handle "Get in Touch" button click
  const handleGetInTouch = () => {
    setSelectedService(activeCardIndex);
    setShowForm(true);
  };

  return (
    <section className="py-16 bg-white relative">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-10">
          <h2 className="text-3xl font-bold text-gray-800">Our Services</h2>
          <button 
            onClick={handleGetInTouch}
            className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition-colors flex items-center"
          >
            Get in Touch <ArrowRight className="w-4 h-4 ml-2" />
          </button>
        </div>
        
        {/* Service Lines Navigation */}
        <div className="flex justify-between mb-8 overflow-x-auto">
          {serviceLines.map((line) => (
            <button
              key={line.name}
              onClick={() => handleServiceLineClick(line.name)}
              className={`px-4 py-2 whitespace-nowrap ${
                getCurrentServiceLine() === line.name
                  ? 'text-blue-600 font-bold border-b-2 border-blue-600'
                  : 'text-gray-600 hover:text-blue-500'
              }`}
            >
              {line.name}
            </button>
          ))}
        </div>
        
        {/* Carousel */}
        <div 
          className="relative overflow-hidden" 
          ref={carouselRef}
          onMouseDown={handleDragStart}
          onMouseMove={handleDragging}
          onMouseUp={handleDragEnd}
          onMouseLeave={handleDragEnd}
          onTouchStart={handleDragStart}
          onTouchMove={handleDragging}
          onTouchEnd={handleDragEnd}
        >
          <div className="flex items-center justify-center py-8">
            {/* Arrow Left */}
            <button 
              onClick={prevCard}
              className="absolute left-2 z-10 bg-white rounded-full p-2 shadow-md hover:bg-gray-100"
            >
              <ChevronLeft className="w-6 h-6 text-gray-700" />
            </button>
            
            {/* Cards */}
            <div className="flex justify-center items-center space-x-4 px-16">
              {/* Previous Card */}
              <div className="w-60 h-64 bg-gray-100 rounded-lg shadow-md opacity-60 transform scale-90 transition-all duration-300 flex flex-col p-6">
                <div className="text-4xl mb-4">
                  {allCapabilities[(activeCardIndex - 1 + allCapabilities.length) % allCapabilities.length].icon}
                </div>
                <h3 className="text-lg font-bold mb-2">
                  {allCapabilities[(activeCardIndex - 1 + allCapabilities.length) % allCapabilities.length].title}
                </h3>
                <p className="text-sm text-gray-600">
                  {allCapabilities[(activeCardIndex - 1 + allCapabilities.length) % allCapabilities.length].description}
                </p>
              </div>
              
              {/* Active Card */}
              <div className="w-64 h-72 bg-white rounded-lg shadow-lg z-10 transition-all duration-300 flex flex-col p-6">
                <div className="text-5xl mb-4">
                  {allCapabilities[activeCardIndex].icon}
                </div>
                <h3 className="text-xl font-bold mb-2">
                  {allCapabilities[activeCardIndex].title}
                </h3>
                <p className="text-gray-600 mb-4">
                  {allCapabilities[activeCardIndex].description}
                </p>
                <button 
                  onClick={handleGetInTouch}
                  className="mt-auto bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors flex items-center"
                >
                  Get Started <ArrowRight className="w-4 h-4 ml-2" />
                </button>
              </div>
              
              {/* Next Card */}
              <div className="w-60 h-64 bg-gray-100 rounded-lg shadow-md opacity-60 transform scale-90 transition-all duration-300 flex flex-col p-6">
                <div className="text-4xl mb-4">
                  {allCapabilities[(activeCardIndex + 1) % allCapabilities.length].icon}
                </div>
                <h3 className="text-lg font-bold mb-2">
                  {allCapabilities[(activeCardIndex + 1) % allCapabilities.length].title}
                </h3>
                <p className="text-sm text-gray-600">
                  {allCapabilities[(activeCardIndex + 1) % allCapabilities.length].description}
                </p>
              </div>
            </div>
            
            {/* Arrow Right */}
            <button 
              onClick={nextCard}
              className="absolute right-2 z-10 bg-white rounded-full p-2 shadow-md hover:bg-gray-100"
            >
              <ChevronRight className="w-6 h-6 text-gray-700" />
            </button>
          </div>
          
          {/* Indicators */}
          <div className="flex justify-center space-x-2 mt-4">
            {[...Array(totalIndicators)].map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  const indicatorStep = Math.ceil(allCapabilities.length / totalIndicators);
                  setActiveCardIndex(Math.min(index * indicatorStep, allCapabilities.length - 1));
                }}
                className={`w-3 h-3 rounded-full ${
                  index === activeIndicator ? 'bg-blue-600' : 'bg-gray-300'
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Contact Form Modal */}
      {showForm && (
        <ContactFormModal 
          onClose={() => setShowForm(false)} 
          selectedService={selectedService}
          serviceOptions={allCapabilities.map(cap => cap.title)}
        />
      )}
    </section>
  );
}

// Contact Form Modal Component
function ContactFormModal({ onClose, selectedService, serviceOptions }) {
    const [formData, setFormData] = useState({
      name: '',
      email: '',
      phone: '',
      countryCode: '+91',
      service: selectedService,
      message: ''
    });
    
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitSuccess, setSubmitSuccess] = useState(false);
    
    const countryCodes = [
      { code: '+1', flag: '🇺🇸' },
      { code: '+44', flag: '🇬🇧' },
      { code: '+91', flag: '🇮🇳' },
      { code: '+61', flag: '🇦🇺' },
      { code: '+86', flag: '🇨🇳' },
      { code: '+49', flag: '🇩🇪' },
      { code: '+33', flag: '🇫🇷' },
      { code: '+81', flag: '🇯🇵' },
    ];
  
    const validateForm = () => {
      const newErrors = {};
      if (!formData.name.trim()) newErrors.name = 'Name is required';
      if (!formData.email.trim()) newErrors.email = 'Email is required';
      else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = 'Email is invalid';
      if (!formData.phone.trim()) newErrors.phone = 'Phone number is required';
      else if (!/^\d{10}$/.test(formData.phone.replace(/\D/g, ''))) newErrors.phone = 'Phone number must be 10 digits';
      if (!formData.message.trim()) newErrors.message = 'Message is required';
      setErrors(newErrors);
      return Object.keys(newErrors).length === 0;
    };
  
    const handleSubmit = async (e) => {
      e.preventDefault();
  
      if (validateForm()) {
        setIsSubmitting(true);
  
        try {
          const payload = {
            name: formData.name,
            email: formData.email,
            country_code: formData.countryCode,
            phone_no: formData.phone,
            service: [serviceOptions[formData.service]],
            message: formData.message,
            promotion: false,
          };
          console.log('Payload:', payload);
          const response = await fetch('https://test.ezworks.ai/form-api', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload),
          });
  
          if (!response.ok) {
            throw new Error('Failed to submit form');
          }
  
          setSubmitSuccess(true);
          setTimeout(() => onClose(), 2000);
        } catch (error) {
          setErrors({ submit: 'Failed to submit form. Please try again.', error });
        } finally {
          setIsSubmitting(false);
        }
      }
    };
  
    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData((prev) => ({ ...prev, [name]: value }));
  
      if (errors[name]) {
        setErrors((prev) => ({ ...prev, [name]: undefined }));
      }
    };
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md max-h-90vh overflow-y-auto">
        {/* Modal Header */}
        <div className="bg-blue-600 text-white p-4 rounded-t-lg relative">
          <h3 className="text-xl font-bold">Get in Touch</h3>
          <p className="text-blue-100">We'll get back to you within 24 hours</p>
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 text-white hover:text-blue-200"
          >
            <X size={20} />
          </button>
        </div>
        
        {/* Modal Body */}
        <div className="p-6">
          {submitSuccess ? (
            <div className="text-center py-8">
              <div className="text-5xl mb-4">✅</div>
              <h4 className="text-xl font-bold mb-2">Thank You!</h4>
              <p className="text-gray-600">Your message has been submitted successfully.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              {/* Name Field */}
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                  Full Name *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 border rounded-md ${errors.name ? 'border-red-500' : 'border-gray-300'}`}
                  placeholder="Your full name"
                />
                {errors.name && <p className="text-red-500 text-xs italic mt-1">{errors.name}</p>}
              </div>
              
              {/* Email Field */}
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                  Email Address *
                </label>
                <div className="flex items-center border rounded-md overflow-hidden">
                  <span className="bg-gray-100 p-2 text-gray-500">
                    <Mail size={20} />
                  </span>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`w-full px-3 py-2 ${errors.email ? 'border-red-500' : 'border-transparent'}`}
                    placeholder="your.email@example.com"
                  />
                </div>
                {errors.email && <p className="text-red-500 text-xs italic mt-1">{errors.email}</p>}
              </div>
              
              {/* Phone Field */}
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="phone">
                  Phone Number *
                </label>
                <div className="flex">
                  <div className="relative">
                    <select
                      name="countryCode"
                      value={formData.countryCode}
                      onChange={handleChange}
                      className="appearance-none border border-r-0 rounded-l-md px-3 py-2 bg-white"
                    >
                      {countryCodes.map(country => (
                        <option key={country.code} value={country.code}>
                          {country.flag} {country.code}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="flex-grow">
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className={`w-full px-3 py-2 border rounded-r-md ${errors.phone ? 'border-red-500' : 'border-gray-300'}`}
                      placeholder="123-456-7890"
                    />
                  </div>
                </div>
                {errors.phone && <p className="text-red-500 text-xs italic mt-1">{errors.phone}</p>}
              </div>
              
              {/* Service Dropdown */}
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="service">
                  Service Interested In
                </label>
                <div className="relative">
                  <select
                    id="service"
                    name="service"
                    value={formData.service}
                    onChange={handleChange}
                    className="block appearance-none w-full bg-white border border-gray-300 hover:border-gray-400 px-4 py-2 pr-8 rounded-md"
                  >
                    {serviceOptions.map((service, index) => (
                      <option key={index} value={index}>
                        {service}
                      </option>
                    ))}
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                    <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                      <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
                    </svg>
                  </div>
                </div>
              </div>
              
              {/* Message Field */}
              <div className="mb-6">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="message">
                  Message *
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 border rounded-md ${errors.message ? 'border-red-500' : 'border-gray-300'} h-32`}
                  placeholder="Tell us about your requirements..."
                />
                {errors.message && <p className="text-red-500 text-xs italic mt-1">{errors.message}</p>}
              </div>
              
              {/* Submit Error */}
              {errors.submit && (
                <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md">
                  {errors.submit}
                </div>
              )}
              
              {/* Form Buttons */}
              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 ${isSubmitting ? 'opacity-75 cursor-not-allowed' : ''}`}
                >
                  {isSubmitting ? 'Submitting...' : 'Submit'}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}