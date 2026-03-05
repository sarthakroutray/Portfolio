"use client";

import { useState, type FormEvent, type ChangeEvent } from "react";
import emailjs from "@emailjs/browser";
import { validateEmail } from "@/lib/utils";

export default function ContactSection() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const SERVICE_ID = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
  const TEMPLATE_ID = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
  const PUBLIC_KEY = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setError("");

    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      setError("All fields are required.");
      return;
    }
    if (!validateEmail(form.email)) {
      setError("Please enter a valid email address.");
      return;
    }
    if (!SERVICE_ID || !TEMPLATE_ID || !PUBLIC_KEY) {
      setError("Email service is not configured yet.");
      return;
    }

    setLoading(true);
    emailjs
      .send(SERVICE_ID, TEMPLATE_ID, {
        from_name: form.name,
        to_name: "Sarthak Routray",
        from_email: form.email,
        to_email: "sarthak.routray2006@gmail.com",
        message: form.message,
      }, PUBLIC_KEY)
      .then(() => {
        setLoading(false);
        alert("Thank you. I will get back to you as soon as possible.");
        setForm({ name: "", email: "", message: "" });
      })
      .catch(() => {
        setLoading(false);
        setError("Something went wrong. Please try again.");
      });
  };

  return (
    <section id="contact" className="container mx-auto px-6 pb-24">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="fluid-glass reveal-glass floating-glass bg-paper-gray border-4 border-ink-black p-4 sm:p-8 shadow-cutout">
          <p className="font-mono text-sm uppercase tracking-[0.25em] mb-2">Get in touch</p>
          <h3 className="font-display text-5xl uppercase mb-8">Contact</h3>
          <p className="font-mono text-sm border-l-4 border-sharpie-blue pl-3 mb-6">
            Open to AI/ML internships and backend engineering roles.
          </p>

          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <label htmlFor="contact-name" className="sr-only">Your name</label>
            <input id="contact-name" type="text" name="name" value={form.name} onChange={handleChange} placeholder="Your name" className="bg-white py-3 px-4 border-2 border-ink-black font-mono outline-none focus:border-sharpie-blue" />
            <label htmlFor="contact-email" className="sr-only">Your email</label>
            <input id="contact-email" type="email" name="email" value={form.email} onChange={handleChange} placeholder="Your email" className="bg-white py-3 px-4 border-2 border-ink-black font-mono outline-none focus:border-sharpie-blue" />
            <label htmlFor="contact-message" className="sr-only">Your message</label>
            <textarea id="contact-message" rows={6} name="message" value={form.message} onChange={handleChange} placeholder="Your message" className="bg-white py-3 px-4 border-2 border-ink-black font-mono outline-none focus:border-sharpie-blue resize-none" />

            {error && <div className="text-red-700 font-mono text-sm" role="alert">{error}</div>}

            <button type="submit" className="contact-cta cursor-target w-fit px-6 py-3 bg-sharpie-blue text-white border-2 border-ink-black font-mono font-bold hover:bg-ink-black transition-colors inline-flex items-center gap-2">
              {loading ? "Sending..." : "Send"}
              <span className="cta-arrow" aria-hidden="true">-&gt;</span>
            </button>
          </form>
        </div>

        <div className="fluid-glass reveal-glass bg-white border-4 border-ink-black p-4 sm:p-8 shadow-cutout flex flex-col justify-between">
          <div>
            <h4 className="font-ransom text-4xl mb-6">CONNECT</h4>
            <p className="font-mono mb-6">
              I am open to internship roles where I can own backend and AI workflow implementation and ship features used by real users.
            </p>
            <address className="space-y-4 font-mono not-italic">
              <a href="https://github.com/sarthakroutray" target="_blank" rel="noreferrer" className="block hover:text-sharpie-blue">
                GitHub: @sarthakroutray
              </a>
              <a href="https://www.linkedin.com/in/sarthak-routray-020583323/" target="_blank" rel="noreferrer" className="block hover:text-sharpie-blue">
                LinkedIn: Sarthak Routray
              </a>
              <a href="mailto:sarthak.routray2006@gmail.com" className="block hover:text-sharpie-blue">
                Email: sarthak.routray2006@gmail.com
              </a>
            </address>
          </div>
        </div>
      </div>
    </section>
  );
}
