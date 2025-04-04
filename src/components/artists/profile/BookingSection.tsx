'use client';
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CalendarIcon, MapPinIcon, ClockIcon, CurrencyDollarIcon, CheckCircleIcon } from '@heroicons/react/24/outline';
import { Configuration } from '@/types/artist';

interface BookingSectionProps {
  configurations: Configuration[];
  artistName: string;
}

type BookingStep = 'package' | 'date' | 'venue' | 'summary';

interface BookingFormData {
  packageType: string;
  date: string;
  time: string;
  venueName: string;
  venueAddress: string;
  guestCount: number;
  specialRequests: string;
}

interface FormErrors {
  packageType?: string;
  date?: string;
  time?: string;
  venueName?: string;
  venueAddress?: string;
  guestCount?: string;
}

export default function BookingSection({ configurations, artistName }: BookingSectionProps) {
  const [currentStep, setCurrentStep] = useState<BookingStep>('package');
  const [formData, setFormData] = useState<BookingFormData>({
    packageType: '',
    date: '',
    time: '',
    venueName: '',
    venueAddress: '',
    guestCount: 0,
    specialRequests: '',
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const selectedPackage = configurations.find(config => config.type === formData.packageType);

  const validateStep = (step: BookingStep): boolean => {
    const newErrors: FormErrors = {};

    switch (step) {
      case 'package':
        if (!formData.packageType) {
          newErrors.packageType = 'Please select a package';
        }
        break;
      case 'date':
        if (!formData.date) {
          newErrors.date = 'Please select a date';
        } else {
          const selectedDate = new Date(formData.date);
          const today = new Date();
          if (selectedDate < today) {
            newErrors.date = 'Please select a future date';
          }
        }
        if (!formData.time) {
          newErrors.time = 'Please select a time';
        }
        break;
      case 'venue':
        if (!formData.venueName.trim()) {
          newErrors.venueName = 'Please enter a venue name';
        }
        if (!formData.venueAddress.trim()) {
          newErrors.venueAddress = 'Please enter a venue address';
        }
        if (!formData.guestCount || formData.guestCount < 1) {
          newErrors.guestCount = 'Please enter a valid guest count';
        }
        break;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const nextStep = () => {
    if (validateStep(currentStep)) {
      const steps: BookingStep[] = ['package', 'date', 'venue', 'summary'];
      const currentIndex = steps.indexOf(currentStep);
      if (currentIndex < steps.length - 1) {
        setCurrentStep(steps[currentIndex + 1]);
      }
    }
  };

  const prevStep = () => {
    const steps: BookingStep[] = ['package', 'date', 'venue', 'summary'];
    const currentIndex = steps.indexOf(currentStep);
    if (currentIndex > 0) {
      setCurrentStep(steps[currentIndex - 1]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateStep('venue')) return;

    setIsSubmitting(true);
    try {
      // TODO: Replace with actual API call
      const response = await fetch('/api/bookings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to submit booking');
      }

      // Redirect to confirmation page
      window.location.href = `/bookings/confirmation/${formData.packageType}`;
    } catch (error) {
      console.error('Booking submission failed:', error);
      setErrors(prev => ({
        ...prev,
        submit: 'Failed to submit booking. Please try again.',
      }));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl font-bold text-primary mb-2">Book {artistName}</h2>
          <p className="text-gray-600 mb-8">Complete the form below to request a booking</p>

          {/* Progress Steps */}
          <div className="flex justify-between mb-12">
            {['Package', 'Date & Time', 'Venue Details', 'Summary'].map((step, index) => (
              <div key={step} className="flex items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  index <= ['package', 'date', 'venue', 'summary'].indexOf(currentStep)
                    ? 'bg-primary text-white'
                    : 'bg-gray-200 text-gray-600'
                }`}>
                  {index + 1}
                </div>
                <span className="ml-2 text-sm font-medium">{step}</span>
                {index < 3 && (
                  <div className="w-24 h-1 mx-4 bg-gray-200">
                    <div className={`h-full bg-primary transition-all duration-300 ${
                      index < ['package', 'date', 'venue', 'summary'].indexOf(currentStep)
                        ? 'w-full'
                        : 'w-0'
                    }`} />
                  </div>
                )}
              </div>
            ))}
          </div>

          <form onSubmit={handleSubmit} className="max-w-2xl mx-auto">
            <AnimatePresence mode="wait">
              {currentStep === 'package' && (
                <motion.div
                  key="package"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6"
                >
                  <div className="grid gap-6">
                    {configurations.map((config) => (
                      <div
                        key={config.type}
                        className={`p-6 rounded-xl border-2 cursor-pointer transition-all ${
                          formData.packageType === config.type
                            ? 'border-primary bg-primary/5'
                            : 'border-gray-200 hover:border-primary/50'
                        }`}
                        onClick={() => setFormData(prev => ({ ...prev, packageType: config.type }))}
                      >
                        <h3 className="text-xl font-semibold text-primary">{config.type}</h3>
                        <p className="text-gray-600 mt-2">{config.description}</p>
                        <div className="mt-4 flex items-center justify-between">
                          <span className="text-lg font-medium">
                            ${config.minPrice} - ${config.maxPrice}
                          </span>
                          <span className="text-sm text-gray-500">{config.duration}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                  {errors.packageType && (
                    <p className="text-red-500 text-sm mt-2">{errors.packageType}</p>
                  )}
                </motion.div>
              )}

              {currentStep === 'date' && (
                <motion.div
                  key="date"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6"
                >
                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Date
                      </label>
                      <input
                        type="date"
                        name="date"
                        value={formData.date}
                        onChange={handleInputChange}
                        className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary ${
                          errors.date ? 'border-red-500' : 'border-gray-300'
                        }`}
                        min={new Date().toISOString().split('T')[0]}
                      />
                      {errors.date && (
                        <p className="text-red-500 text-sm mt-1">{errors.date}</p>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Time
                      </label>
                      <input
                        type="time"
                        name="time"
                        value={formData.time}
                        onChange={handleInputChange}
                        className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary ${
                          errors.time ? 'border-red-500' : 'border-gray-300'
                        }`}
                      />
                      {errors.time && (
                        <p className="text-red-500 text-sm mt-1">{errors.time}</p>
                      )}
                    </div>
                  </div>
                </motion.div>
              )}

              {currentStep === 'venue' && (
                <motion.div
                  key="venue"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6"
                >
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Venue Name
                      </label>
                      <input
                        type="text"
                        name="venueName"
                        value={formData.venueName}
                        onChange={handleInputChange}
                        className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary ${
                          errors.venueName ? 'border-red-500' : 'border-gray-300'
                        }`}
                        placeholder="Enter venue name"
                      />
                      {errors.venueName && (
                        <p className="text-red-500 text-sm mt-1">{errors.venueName}</p>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Venue Address
                      </label>
                      <textarea
                        name="venueAddress"
                        value={formData.venueAddress}
                        onChange={handleInputChange}
                        className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary ${
                          errors.venueAddress ? 'border-red-500' : 'border-gray-300'
                        }`}
                        placeholder="Enter venue address"
                        rows={3}
                      />
                      {errors.venueAddress && (
                        <p className="text-red-500 text-sm mt-1">{errors.venueAddress}</p>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Expected Guest Count
                      </label>
                      <input
                        type="number"
                        name="guestCount"
                        value={formData.guestCount}
                        onChange={handleInputChange}
                        className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary ${
                          errors.guestCount ? 'border-red-500' : 'border-gray-300'
                        }`}
                        min="1"
                      />
                      {errors.guestCount && (
                        <p className="text-red-500 text-sm mt-1">{errors.guestCount}</p>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Special Requests
                      </label>
                      <textarea
                        name="specialRequests"
                        value={formData.specialRequests}
                        onChange={handleInputChange}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                        placeholder="Any special requirements or requests?"
                        rows={3}
                      />
                    </div>
                  </div>
                </motion.div>
              )}

              {currentStep === 'summary' && (
                <motion.div
                  key="summary"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6"
                >
                  <div className="bg-gray-50 p-6 rounded-xl">
                    <h3 className="text-xl font-semibold text-primary mb-4">Booking Summary</h3>
                    <div className="space-y-4">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Package</span>
                        <span className="font-medium">{formData.packageType}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Date & Time</span>
                        <span className="font-medium">{formData.date} at {formData.time}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Venue</span>
                        <span className="font-medium">{formData.venueName}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Guest Count</span>
                        <span className="font-medium">{formData.guestCount}</span>
                      </div>
                      {selectedPackage && (
                        <div className="pt-4 border-t border-gray-200">
                          <div className="flex justify-between text-lg font-semibold">
                            <span>Estimated Price</span>
                            <span className="text-primary">
                              ${selectedPackage.minPrice} - ${selectedPackage.maxPrice}
                            </span>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                  {errors.submit && (
                    <p className="text-red-500 text-sm mt-2">{errors.submit}</p>
                  )}
                </motion.div>
              )}
            </AnimatePresence>

            <div className="mt-8 flex justify-between">
              {currentStep !== 'package' && (
                <button
                  type="button"
                  onClick={prevStep}
                  className="px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                >
                  Back
                </button>
              )}
              {currentStep !== 'summary' ? (
                <button
                  type="button"
                  onClick={nextStep}
                  className="ml-auto px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary-dark"
                >
                  Next
                </button>
              ) : (
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`ml-auto px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary-dark ${
                    isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
                >
                  {isSubmitting ? 'Submitting...' : 'Submit Booking'}
                </button>
              )}
            </div>
          </form>
        </motion.div>
      </div>
    </section>
  );
} 