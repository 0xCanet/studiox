"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { TextWithOrangeDots } from "./TextWithOrangeDots";

export interface ContactMessages {
  title: string;
  subtitle: string;
  calendar: {
    title: string;
    subtitle: string;
    monthNames: string[];
    dayNames: string[];
    timeSlots: string[];
    selectDate: string;
    selectTime: string;
    confirmBtn: string;
    successTitle: string;
    successMessage: string;
  };
  form: {
    nameLabel: string;
    namePlaceholder: string;
    emailLabel: string;
    emailPlaceholder: string;
    messageLabel: string;
    messagePlaceholder: string;
    submitBtn: string;
  };
  divider: string;
}

interface ContactSectionProps {
  messages: ContactMessages;
}

export function ContactSection({ messages }: ContactSectionProps) {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [bookingConfirmed, setBookingConfirmed] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  // Generate calendar days
  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDay = firstDay.getDay();

    const days: (Date | null)[] = [];
    
    // Add empty slots for days before the first day of the month
    for (let i = 0; i < startingDay; i++) {
      days.push(null);
    }
    
    // Add all days of the month
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(new Date(year, month, i));
    }
    
    return days;
  };

  const isDateSelectable = (date: Date | null) => {
    if (!date) return false;
    const dayOfWeek = date.getDay();
    // Only weekdays (Mon-Fri) and not past dates
    return dayOfWeek !== 0 && dayOfWeek !== 6 && date >= today;
  };

  const formatMonth = (date: Date) => {
    return `${messages.calendar.monthNames[date.getMonth()]} ${date.getFullYear()}`;
  };

  const prevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
    setSelectedDate(null);
    setSelectedTime(null);
  };

  const nextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));
    setSelectedDate(null);
    setSelectedTime(null);
  };

  const handleDateClick = (date: Date | null) => {
    if (date && isDateSelectable(date)) {
      setSelectedDate(date);
      setSelectedTime(null);
    }
  };

  const handleTimeClick = (time: string) => {
    setSelectedTime(time);
  };

  const handleConfirmBooking = () => {
    if (selectedDate && selectedTime) {
      setBookingConfirmed(true);
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log("Form submitted:", formData);
  };

  const days = getDaysInMonth(currentMonth);

  const isToday = (date: Date | null) => {
    if (!date) return false;
    return date.toDateString() === today.toDateString();
  };

  const isSelected = (date: Date | null) => {
    if (!date || !selectedDate) return false;
    return date.toDateString() === selectedDate.toDateString();
  };

  return (
    <section id="contact" className="bg-white py-24 md:py-32 px-5 md:px-8">
      <div className="max-w-[1200px] mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16 md:mb-20"
        >
          <h3 className="section-title text-[#0E0E0E] mb-4">{messages.title}</h3>
          <p className="text-[#0E0E0E]/60 max-w-2xl mx-auto">
            <TextWithOrangeDots>{messages.subtitle}</TextWithOrangeDots>
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Calendar Booking - Left */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7 }}
            className="bg-[#F0EEE9] rounded-2xl p-6 md:p-8"
          >
            {!bookingConfirmed ? (
              <>
                <div className="mb-6">
                  <h4 className="font-heading font-semibold text-xl text-[#0E0E0E] mb-2">
                    {messages.calendar.title}
                  </h4>
                  <p className="text-[#0E0E0E]/60 text-sm">
                    <TextWithOrangeDots>{messages.calendar.subtitle}</TextWithOrangeDots>
                  </p>
                </div>

                {/* Calendar */}
                <div className="bg-white rounded-xl p-4 md:p-5 mb-6">
                  {/* Month Navigation */}
                  <div className="flex items-center justify-between mb-4">
                    <button
                      onClick={prevMonth}
                      className="p-2 hover:bg-[#F0EEE9] rounded-lg transition-colors"
                      aria-label="Previous month"
                    >
                      <svg className="w-5 h-5 text-[#0E0E0E]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                      </svg>
                    </button>
                    <span className="font-heading font-semibold text-[#0E0E0E]">
                      {formatMonth(currentMonth)}
                    </span>
                    <button
                      onClick={nextMonth}
                      className="p-2 hover:bg-[#F0EEE9] rounded-lg transition-colors"
                      aria-label="Next month"
                    >
                      <svg className="w-5 h-5 text-[#0E0E0E]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                  </div>

                  {/* Day Names */}
                  <div className="grid grid-cols-7 gap-1 mb-2">
                    {messages.calendar.dayNames.map((day) => (
                      <div
                        key={day}
                        className="text-center text-xs font-body text-[#0E0E0E]/40 py-2"
                      >
                        {day}
                      </div>
                    ))}
                  </div>

                  {/* Calendar Grid */}
                  <div className="grid grid-cols-7 gap-1">
                    {days.map((date, index) => (
                      <button
                        key={index}
                        onClick={() => handleDateClick(date)}
                        disabled={!isDateSelectable(date)}
                        className={`calendar-day ${isToday(date) ? "today" : ""} ${isSelected(date) ? "selected" : ""}`}
                      >
                        {date?.getDate()}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Time Slots */}
                {selectedDate && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <p className="text-sm text-[#0E0E0E]/60 mb-3 font-body">
                      {messages.calendar.selectTime}
                    </p>
                    <div className="grid grid-cols-3 gap-2 mb-6">
                      {messages.calendar.timeSlots.map((time) => (
                        <button
                          key={time}
                          onClick={() => handleTimeClick(time)}
                          className={`time-slot ${selectedTime === time ? "selected" : ""}`}
                        >
                          {time}
                        </button>
                      ))}
                    </div>

                    {selectedTime && (
                      <motion.button
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        onClick={handleConfirmBooking}
                        className="btn btn-contact w-full"
                      >
                        {messages.calendar.confirmBtn}
                      </motion.button>
                    )}
                  </motion.div>
                )}
              </>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-8"
              >
                <div className="w-16 h-16 rounded-full bg-[#FF7A30]/10 flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-[#FF7A30]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h4 className="font-heading font-semibold text-xl text-[#0E0E0E] mb-2">
                  {messages.calendar.successTitle}
                </h4>
                <p className="text-[#0E0E0E]/60 text-sm">
                  <TextWithOrangeDots>{messages.calendar.successMessage}</TextWithOrangeDots>
                </p>
                <p className="text-[#FF7A30] font-heading font-semibold mt-4">
                  {selectedDate?.toLocaleDateString()} • {selectedTime}
                </p>
              </motion.div>
            )}
          </motion.div>

          {/* Contact Form - Right */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7 }}
          >
            <div className="mb-6">
              <span className="text-[#0E0E0E]/40 text-sm font-body">
                {messages.divider}
              </span>
            </div>

            <form onSubmit={handleFormSubmit} className="space-y-6">
              <div>
                <label className="form-label">{messages.form.nameLabel}</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder={messages.form.namePlaceholder}
                  className="form-input"
                  required
                />
              </div>

              <div>
                <label className="form-label">{messages.form.emailLabel}</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder={messages.form.emailPlaceholder}
                  className="form-input"
                  required
                />
              </div>

              <div>
                <label className="form-label">{messages.form.messageLabel}</label>
                <textarea
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder={messages.form.messagePlaceholder}
                  rows={5}
                  className="form-input resize-none"
                  required
                />
              </div>

              <button type="submit" className="btn btn-primary w-full md:w-auto">
                {messages.form.submitBtn}
                <svg
                  className="ml-2 w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M14 5l7 7m0 0l-7 7m7-7H3"
                  />
                </svg>
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
