"use client";

import { useState, useMemo, useCallback } from "react";
import { motion } from "framer-motion";
import { TextWithOrangeDots } from "./TextWithOrangeDots";
import type { ContactMessages } from "./ContactSection";

interface ContactFormContentProps {
  messages: ContactMessages;
  language?: "en" | "fr";
  isModal?: boolean;
}

export function ContactFormContent({ messages, language = "en", isModal = false }: ContactFormContentProps) {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [bookingConfirmed, setBookingConfirmed] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    type: "success" | "error" | null;
    message: string;
  }>({ type: null, message: "" });

  const today = useMemo(() => {
    const date = new Date();
    date.setHours(0, 0, 0, 0);
    return date;
  }, []);

  const getDaysInMonth = useCallback((date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDay = firstDay.getDay();

    const days: (Date | null)[] = [];
    
    for (let i = 0; i < startingDay; i++) {
      days.push(null);
    }
    
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(new Date(year, month, i));
    }
    
    return days;
  }, []);

  const isDateSelectable = useCallback((date: Date | null) => {
    if (!date) return false;
    const dayOfWeek = date.getDay();
    return dayOfWeek !== 0 && dayOfWeek !== 6 && date >= today;
  }, [today]);

  const formatMonth = useCallback((date: Date) => {
    const monthName = messages.calendar.monthNames[date.getMonth()];
    const year = date.getFullYear();
    return monthName + " " + year;
  }, [messages.calendar.monthNames]);

  const prevMonth = useCallback(() => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
    setSelectedDate(null);
    setSelectedTime(null);
  }, [currentMonth]);

  const nextMonth = useCallback(() => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));
    setSelectedDate(null);
    setSelectedTime(null);
  }, [currentMonth]);

  const handleDateClick = useCallback((date: Date | null) => {
    if (date && isDateSelectable(date)) {
      setSelectedDate(date);
      setSelectedTime(null);
    }
  }, [isDateSelectable]);

  const handleTimeClick = useCallback((time: string) => {
    setSelectedTime(time);
  }, []);

  const isBooking = selectedDate && selectedTime;

  const handleFormSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    
    const isBookingSubmit = selectedDate && selectedTime;
    
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setSubmitStatus({
        type: "error",
        message: messages.form.errorRequiredFields,
      });
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email.trim())) {
      setSubmitStatus({
        type: "error",
        message: messages.form.errorInvalidEmail,
      });
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus({ type: null, message: "" });

    try {
      const payload: any = {
        name: formData.name.trim(),
        email: formData.email.trim(),
        message: formData.message.trim(),
      };

      if (formData.phone.trim()) {
        payload.phone = formData.phone.trim();
      }

      if (isBookingSubmit && selectedDate && selectedTime) {
        payload.date = selectedDate.toISOString();
        payload.time = selectedTime;
      }
      
      payload.language = language;

      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (response.ok) {
        if (isBookingSubmit) {
          setBookingConfirmed(true);
          setSubmitStatus({
            type: "success",
            message: messages.form.successBookingMessage || data.message || "Votre rendez-vous a été confirmé.",
          });
        } else {
          setSubmitStatus({
            type: "success",
            message: messages.form.successMessage || data.message || "Votre message a été envoyé avec succès.",
          });
        }
        setFormData({
          name: "",
          email: "",
          phone: "",
          message: "",
        });
        setSelectedDate(null);
        setSelectedTime(null);
      } else {
        setSubmitStatus({
          type: "error",
          message: data.error || messages.form.errorGeneric,
        });
      }
    } catch (error) {
      console.error("Erreur lors de l'envoi du formulaire:", error);
      setSubmitStatus({
        type: "error",
        message: messages.form.errorSubmitFailed,
      });
    } finally {
      setIsSubmitting(false);
    }
  }, [formData, selectedDate, selectedTime, messages.form, language]);

  const days = useMemo(() => getDaysInMonth(currentMonth), [currentMonth, getDaysInMonth]);

  const isToday = useCallback((date: Date | null) => {
    if (!date) return false;
    return date.toDateString() === today.toDateString();
  }, [today]);

  const isSelected = useCallback((date: Date | null) => {
    if (!date || !selectedDate) return false;
    return date.toDateString() === selectedDate.toDateString();
  }, [selectedDate]);

  const titleWithoutDot = messages.title.endsWith('.') ? messages.title.slice(0, -1) : messages.title;
  const subtitleWithoutDot = messages.subtitle.endsWith('.') ? messages.subtitle.slice(0, -1) : messages.subtitle;

  return (
    <div className="max-w-[1200px] mx-auto">
      {!isModal && (
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "0px" }}
          transition={{ duration: 0.7 }}
          className="text-center mb-12 md:mb-16"
        >
          <h1 className="section-title text-text mb-4">
            {titleWithoutDot}
            <span className="text-accent">.</span>
          </h1>
          <h2 className="text-text max-w-2xl mx-auto font-heading font-normal text-lg md:text-xl leading-relaxed">
            <TextWithOrangeDots>{subtitleWithoutDot}</TextWithOrangeDots>
            <span className="text-accent">.</span>
          </h2>
        </motion.div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
        {/* Calendar Booking - Left */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={isModal ? { opacity: 1, x: 0 } : undefined}
          whileInView={!isModal ? { opacity: 1, x: 0 } : undefined}
          viewport={!isModal ? { once: true, margin: "0px" } : undefined}
          transition={{ duration: 0.7 }}
          className="bg-surface rounded-2xl p-6 md:p-8"
        >
          {!bookingConfirmed ? (
            <>
              <div className="mb-6">
                <h4 className="font-heading font-semibold text-xl text-text mb-2">
                  {messages.calendar.title}
                </h4>
                <p className="text-muted text-sm">
                  <TextWithOrangeDots>{messages.calendar.subtitle}</TextWithOrangeDots>
                </p>
              </div>

              {/* Calendar */}
              <div className="bg-surface rounded-xl p-4 md:p-5 mb-6">
                {/* Month Navigation */}
                <div className="flex items-center justify-between mb-4">
                  <button
                    onClick={prevMonth}
                    className="p-2 hover:bg-surface rounded-lg transition-colors"
                    aria-label={messages.calendar.prevMonth}
                  >
                    <svg className="w-5 h-5 text-text" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>
                  <span className="font-heading font-semibold text-text">
                    {formatMonth(currentMonth)}
                  </span>
                  <button
                    onClick={nextMonth}
                    className="p-2 hover:bg-surface rounded-lg transition-colors"
                    aria-label={messages.calendar.nextMonth}
                  >
                    <svg className="w-5 h-5 text-text" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>

                {/* Day Names */}
                <div className="grid grid-cols-7 gap-1 mb-2">
                  {messages.calendar.dayNames.map((day) => (
                    <div
                      key={day}
                      className="text-center text-xs font-body text-subtle py-2"
                    >
                      {day}
                    </div>
                  ))}
                </div>

                {/* Calendar Grid */}
                <div className="grid grid-cols-7 gap-1">
                  {days.map((date, index) => {
                    const dayClasses = "calendar-day" +
                      (isToday(date) ? " today" : "") +
                      (isSelected(date) ? " selected" : "");
                    return (
                      <button
                        key={index}
                        onClick={() => handleDateClick(date)}
                        disabled={!isDateSelectable(date)}
                        className={dayClasses}
                      >
                        {date ? String(date.getDate()) : null}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Time Slots */}
              {selectedDate && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <p className="text-sm text-muted mb-3 font-body">
                    {messages.calendar.selectTime}
                  </p>
                  <div className="grid grid-cols-3 gap-2 mb-6">
                    {messages.calendar.timeSlots.map((time) => {
                      const slotClasses = "time-slot" + (selectedTime === time ? " selected" : "");
                      return (
                        <button
                          key={time}
                          onClick={() => handleTimeClick(time)}
                          className={slotClasses}
                        >
                          {time}
                        </button>
                      );
                    })}
                  </div>

                  {selectedTime && (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) && (
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="mt-3 text-xs text-muted text-center"
                    >
                      {messages.calendar.fillFormMessage || "Veuillez remplir tous les champs du formulaire à droite pour confirmer le rendez-vous."}
                    </motion.p>
                  )}
                  
                  {submitStatus.type === "error" && !bookingConfirmed && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg"
                    >
                      <p className="text-sm text-red-600">{submitStatus.message}</p>
                    </motion.div>
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
              <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h4 className="font-heading font-semibold text-xl text-text mb-2">
                {messages.calendar.successTitle}
              </h4>
              <p className="text-muted text-sm">
                <TextWithOrangeDots>{messages.calendar.successMessage}</TextWithOrangeDots>
              </p>
              <p className="text-accent font-heading font-semibold mt-4">
                {selectedDate?.toLocaleDateString()} <span className="text-accent">•</span> {selectedTime}
              </p>
            </motion.div>
          )}
        </motion.div>

        {/* Contact Form - Right */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={isModal ? { opacity: 1, x: 0 } : undefined}
          whileInView={!isModal ? { opacity: 1, x: 0 } : undefined}
          viewport={!isModal ? { once: true, margin: "0px" } : undefined}
          transition={{ duration: 0.7 }}
        >
          <div className="mb-6">
            <span className="text-subtle text-sm font-body">
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
              <label className="form-label">{messages.form.phoneLabel} <span className="text-[#0E0E0E]/40 text-sm font-normal">(optionnel)</span></label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                placeholder={messages.form.phonePlaceholder}
                className="form-input"
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

            <button 
              type="submit" 
              disabled={isSubmitting || !formData.name.trim() || !formData.email.trim() || !formData.message.trim()}
              className={
                "btn w-full md:w-auto disabled:opacity-50 disabled:cursor-not-allowed " +
                (formData.name.trim() && formData.email.trim() && formData.message.trim() && !isSubmitting
                  ? "btn-contact"
                  : "btn-primary")
              }
            >
              {isSubmitting 
                ? messages.form.submitting
                : isBooking 
                  ? messages.form.submitBookingBtn || messages.calendar.confirmBtn
                  : messages.form.submitBtn
              }
              {!isSubmitting && (
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
              )}
            </button>
            
            {submitStatus.type && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className={
                  "p-4 rounded-lg " +
                  (submitStatus.type === "success"
                    ? "bg-green-50 border border-green-200"
                    : "bg-red-50 border border-red-200")
                }
              >
                <p
                  className={
                    "text-sm " +
                    (submitStatus.type === "success" ? "text-green-600" : "text-red-600")
                  }
                >
                  {submitStatus.message}
                </p>
              </motion.div>
            )}
          </form>
        </motion.div>
      </div>
    </div>
  );
}
