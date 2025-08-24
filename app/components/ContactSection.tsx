"use client";

import type React from "react";
import { useState } from "react";
import Image from "next/image";
import { Mail, Phone, MessageSquare } from "lucide-react";

type Props = {
  imageSrc?: string;            // e.g. "/contact/hero.jpg"
  email?: string;               // e.g. "info@pawhaven.com"
  phone?: string;               // e.g. "+1 (555) 123-4567"
};

export default function ContactSection({
  imageSrc = "/contact/hero.jpg",
  email = "info@pawhaven.com",
  phone = "+1 (555) 123-4567",
}: Props) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    service: "",
    message: "",
  });
  const [formStatus, setFormStatus] = useState<"idle" | "success" | "error">("idle");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate async submit
    setTimeout(() => {
      if (formData.name.trim() && formData.email.trim()) {
        setFormStatus("success");
        setFormData({ name: "", email: "", phone: "", service: "", message: "" });
      } else {
        setFormStatus("error");
      }
    }, 700);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => {
    setFormData((s) => ({ ...s, [e.target.name]: e.target.value }));
    setFormStatus("idle");
  };

  return (
    <section id="contact" className="py-16 sm:py-20 lg:py-24 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-2 lg:gap-14">
          {/* LEFT */}
          <div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight text-gray-900">
              Contact Us
            </h2>
            <p className="mt-5 text-gray-700 leading-relaxed text-base sm:text-lg">
              For owners seeking regular, ongoing care, the Comprehensive Care Plan offers an excellent
              balance of essential and additional services.
            </p>

            {/* tiles */}
            <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
              <a
                href={`mailto:${email}`}
                className="flex items-center justify-center gap-3 rounded-3xl bg-amber-50 px-6 py-6 ring-1 ring-amber-100"
              >
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-white text-gray-900 ring-1 ring-black/5">
                  <MessageSquare className="h-5 w-5" />
                </span>
                <span className="text-gray-900 font-medium">{email}</span>
              </a>
              <a
                href={`tel:${phone.replace(/[^\d+]/g, "")}`}
                className="flex items-center justify-center gap-3 rounded-3xl bg-amber-50 px-6 py-6 ring-1 ring-amber-100"
              >
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-white text-gray-900 ring-1 ring-black/5">
                  <Phone className="h-5 w-5" />
                </span>
                <span className="text-gray-900 font-medium">{phone}</span>
              </a>
            </div>

            {/* image card */}
            <div className="mt-6 overflow-hidden rounded-3xl ring-1 ring-amber-100 bg-amber-50">
              <div className="relative aspect-[16/9] w-full">
                <Image
                  src={imageSrc}
                  alt="Smiling customer with pet"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </div>
          </div>

          {/* RIGHT */}
          <div className="rounded-[28px] bg-white p-6 sm:p-8 lg:p-10 shadow-xl ring-1 ring-black/5">
            <h3 className="text-2xl md:text-3xl font-semibold text-gray-900">Lets Get In Touch</h3>
            <p className="mt-2 text-gray-700">
              Fill out the form below, and we’ll call you within 24 hours.
            </p>

            <form onSubmit={handleSubmit} className="mt-6 space-y-5">
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                {/* Full Name */}
                <div>
                  <label htmlFor="name" className="mb-2 block text-sm font-medium text-gray-800">
                    Full Name
                  </label>
                  <input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder="Full Name"
                    className="w-full rounded-2xl border border-gray-300 px-4 py-3 text-gray-900 placeholder-gray-400 outline-none focus:border-transparent focus:ring-2 focus:ring-gray-700/30"
                    type="text"
                  />
                </div>

                {/* Email */}
                <div>
                  <label htmlFor="email" className="mb-2 block text-sm font-medium text-gray-800">
                    Email Address
                  </label>
                  <input
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="Email Address"
                    className="w-full rounded-2xl border border-gray-300 px-4 py-3 text-gray-900 placeholder-gray-400 outline-none focus:border-transparent focus:ring-2 focus:ring-gray-700/30"
                    type="email"
                  />
                </div>

                {/* Services */}
                <div>
                  <label htmlFor="service" className="mb-2 block text-sm font-medium text-gray-800">
                    Services
                  </label>
                  <div className="relative">
                    <select
                      id="service"
                      name="service"
                      value={formData.service}
                      onChange={handleChange}
                      className="w-full appearance-none rounded-2xl border border-gray-300 px-4 py-3 pr-10 text-gray-900 outline-none focus:border-transparent focus:ring-2 focus:ring-gray-700/30"
                    >
                      <option value="">Choose Your Services</option>
                      <option value="boarding">Boarding</option>
                      <option value="grooming">Grooming</option>
                      <option value="retail">Retail</option>
                      <option value="training">Training</option>
                      <option value="transport">Transport</option>
                    </select>
                    <Mail className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                  </div>
                </div>

                {/* Phone */}
                <div>
                  <label htmlFor="phone" className="mb-2 block text-sm font-medium text-gray-800">
                    Phone
                  </label>
                  <input
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="Phone"
                    className="w-full rounded-2xl border border-gray-300 px-4 py-3 text-gray-900 placeholder-gray-400 outline-none focus:border-transparent focus:ring-2 focus:ring-gray-700/30"
                    type="tel"
                  />
                </div>
              </div>

              {/* Message */}
              <div>
                <label htmlFor="message" className="mb-2 block text-sm font-medium text-gray-800">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={4}
                  placeholder="Write Your Message"
                  className="w-full resize-none rounded-2xl border border-gray-300 px-4 py-3 text-gray-900 placeholder-gray-400 outline-none focus:border-transparent focus:ring-2 focus:ring-gray-700/30"
                />
              </div>

              {/* Submit */}
              <button
                type="submit"
                className="mt-1 inline-flex items-center justify-center rounded-full bg-amber-400 px-7 py-3 text-[15px] font-semibold text-gray-900 shadow-md transition hover:bg-amber-500"
              >
                Submit Your Request
              </button>

              {/* Status */}
              {formStatus === "success" && (
                <p className="rounded-xl border border-green-200 bg-green-50 p-3 text-green-700">
                  Thanks! We’ve received your request and will reach out within 24 hours.
                </p>
              )}
              {formStatus === "error" && (
                <p className="rounded-xl border border-red-200 bg-red-50 p-3 text-red-700">
                  Please fill in your name and email, then try again.
                </p>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
