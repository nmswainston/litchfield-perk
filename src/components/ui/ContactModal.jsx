import { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { X } from "lucide-react";
import { Button } from "./index";

export default function ContactModal({ isOpen, onClose }) {
  const location = useLocation();
  const [formData, setFormData] = useState({
    name: "",
    businessName: "",
    email: "",
    phone: "",
    message: "",
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const modalRef = useRef(null);
  const previousActiveElement = useRef(null);

  // Check for success parameter in URL
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    if (params.get("success") === "1") {
      setSubmitSuccess(true);
      setFormData({ name: "", businessName: "", email: "", phone: "", message: "" });
      // Clean up URL
      window.history.replaceState({}, "", location.pathname);
      // Auto-close after 3 seconds
      setTimeout(() => {
        onClose();
        setSubmitSuccess(false);
      }, 3000);
    }
  }, [location.search, location.pathname, onClose]);

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [isOpen, onClose]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;

    previousActiveElement.current = document.activeElement;

    const getFocusableElements = () => {
      if (!modalRef.current) return [];
      const focusableSelectors = [
        'a[href]',
        'button:not([disabled])',
        'textarea:not([disabled])',
        'input:not([disabled])',
        'select:not([disabled])',
        '[tabindex]:not([tabindex="-1"])'
      ].join(', ');
      return Array.from(modalRef.current.querySelectorAll(focusableSelectors));
    };

    const focusableElements = getFocusableElements();
    if (focusableElements.length > 0) {
      focusableElements[0].focus();
    }

    const handleTab = (e) => {
      if (e.key !== 'Tab') return;
      
      const focusableElements = getFocusableElements();
      if (focusableElements.length === 0) return;

      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];

      if (e.shiftKey) {
        if (document.activeElement === firstElement) {
          e.preventDefault();
          lastElement.focus();
        }
      } else {
        if (document.activeElement === lastElement) {
          e.preventDefault();
          firstElement.focus();
        }
      }
    };

    document.addEventListener('keydown', handleTab);

    return () => {
      document.removeEventListener('keydown', handleTab);
      if (previousActiveElement.current && typeof previousActiveElement.current.focus === 'function') {
        previousActiveElement.current.focus();
      }
    };
  }, [isOpen]);

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.businessName.trim()) newErrors.businessName = "Business name is required";
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }
    if (!formData.message.trim()) newErrors.message = "Message is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleSubmit = (e) => {
    // Validate before allowing form submission
    if (!validate()) {
      e.preventDefault();
      return;
    }

    // Form will submit normally via HTML POST to Netlify Forms
    // Netlify will redirect to the action URL with ?success=1 on success
    setIsSubmitting(true);
  };

  if (!isOpen) return null;

  return (
    <>
      <div
        className="fixed inset-0 bg-black/60 z-[100] animate-in fade-in duration-200"
        style={{
          // Safari compatibility: Add -webkit- prefix for backdrop-filter
          backdropFilter: 'blur(4px)',
          WebkitBackdropFilter: 'blur(4px)'
        }}
        onClick={onClose}
        aria-hidden="true"
      />
      <div
        className="fixed inset-0 z-[101] flex items-center justify-center p-4"
        role="dialog"
        aria-modal="true"
        aria-labelledby="contact-modal-title"
      >
        <div
          ref={modalRef}
          className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[90svh] overflow-y-auto animate-in zoom-in-95 duration-200"
          onClick={(e) => e.stopPropagation()}
        >
          <div
            aria-live="polite"
            aria-atomic="true"
            className="sr-only"
          >
            {submitSuccess && "Thank you for your interest! We'll be in touch soon."}
          </div>
          {/* Safari compatibility: position sticky works in flex containers in Safari 13+ */}
          <div className="sticky top-0 bg-white border-b border-brand-border px-6 py-4 flex items-center justify-between z-10">
            <h2 id="contact-modal-title" className="text-2xl font-bold text-brand-text">
              Contact Our Wholesale Team
            </h2>
            <button
              type="button"
              onClick={onClose}
              className="p-2 hover:bg-brand-background-light rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-brand-primary focus:ring-offset-2"
              aria-label="Close modal"
            >
              <X className="h-5 w-5 text-brand-text" />
            </button>          </div>
          {submitSuccess && (
            <div className="mx-6 mt-4 p-4 bg-brand-background-light border border-brand-primary rounded-lg">
              <p className="text-brand-text font-semibold text-center">
                Thank you for your interest! We'll be in touch soon.
              </p>
            </div>
          )}

          {/* Form */}
          <form 
            name="wholesale-contact"
            method="POST"
            action="/wholesale?success=1"
            data-netlify="true"
            data-netlify-honeypot="bot-field"
            onSubmit={handleSubmit} 
            className="p-6 space-y-6"
          >
            {/* Hidden field for Netlify Forms */}
            <input type="hidden" name="form-name" value="wholesale-contact" />
            {/* Honeypot field - visually hidden but present in DOM */}
            <p className="hidden">
              <label>
                Don't fill this out if you're human: <input name="bot-field" />
              </label>
            </p>
            {/* Name */}
            <div>
              <label htmlFor="name" className="block text-sm font-semibold text-brand-text mb-2">
                Name <span className="text-[var(--color-accent-tomato)]">*</span>
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-transparent ${
                  errors.name ? "error" : "border-brand-border"
                }`}
                aria-invalid={errors.name ? "true" : "false"}
                aria-describedby={errors.name ? "name-error" : undefined}
              />
              {errors.name && (
                <p id="name-error" className="mt-1 text-sm text-[var(--color-accent-tomato)]" role="alert">
                  {errors.name}
                </p>
              )}
            </div>
            <div>
              <label htmlFor="businessName" className="block text-sm font-semibold text-brand-text mb-2">
                Business Name <span className="text-[var(--color-accent-tomato)]">*</span>
              </label>
              <input
                type="text"
                id="businessName"
                name="businessName"
                value={formData.businessName}
                onChange={handleChange}
                className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-transparent ${
                  errors.businessName ? "error" : "border-brand-border"
                }`}
                aria-invalid={errors.businessName ? "true" : "false"}
                aria-describedby={errors.businessName ? "businessName-error" : undefined}
              />
              {errors.businessName && (
                <p id="businessName-error" className="mt-1 text-sm text-[var(--color-accent-tomato)]" role="alert">
                  {errors.businessName}
                </p>
              )}
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-semibold text-brand-text mb-2">
                Email <span className="text-[var(--color-accent-tomato)]">*</span>
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-transparent ${
                  errors.email ? "error" : "border-brand-border"
                }`}
                aria-invalid={errors.email ? "true" : "false"}
                aria-describedby={errors.email ? "email-error" : undefined}
              />
              {errors.email && (
                <p id="email-error" className="mt-1 text-sm text-[var(--color-accent-tomato)]" role="alert">
                  {errors.email}
                </p>
              )}
            </div>
            <div>
              <label htmlFor="phone" className="block text-sm font-semibold text-brand-text mb-2">
                Phone <span className="text-brand-text-muted text-xs font-normal">(optional)</span>
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-brand-border rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-transparent"
              />
            </div>

            {/* Message */}
            <div>
              <label htmlFor="message" className="block text-sm font-semibold text-brand-text mb-2">
                Message <span className="text-[var(--color-accent-tomato)]">*</span>
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows={5}
                className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-transparent resize-none ${
                  errors.message ? "error" : "border-brand-border"
                }`}
                aria-invalid={errors.message ? "true" : "false"}
                aria-describedby={errors.message ? "message-error" : undefined}
              />
              {errors.message && (
                <p id="message-error" className="mt-1 text-sm text-[var(--color-accent-tomato)]" role="alert">
                  {errors.message}
                </p>
              )}
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-3 pt-4">
              <Button
                type="submit"
                variant="filled"
                disabled={isSubmitting}
                className="flex-1"
              >
                {isSubmitting ? "Sending..." : "Send Message"}
              </Button>
              <Button
                type="button"
                variant="secondary"
                onClick={onClose}
                className="flex-1"
              >
                Cancel
              </Button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

