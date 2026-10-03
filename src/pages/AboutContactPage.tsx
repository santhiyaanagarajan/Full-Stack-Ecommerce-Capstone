import React, { useState } from 'react';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { heroInteriorImg } from '../data/products';
import { LazyImage } from '../components/common/LazyImage';
import {
  Mail,
  MapPin,
  Clock,
  CheckCircle2,
  ChevronDown,
  Layers,
  Sparkles,
  Code2,
  Send,
} from 'lucide-react';

export const AboutContactPage: React.FC = () => {
  // Contact Form State
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: 'General Inquiry',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) return;
    setSubmitted(true);
  };

  const FAQS = [
    {
      q: 'Where are Aura Objects manufactured and assembled?',
      a: 'All acoustic enclosures and precision joinery are engineered in our Copenhagen studio, while wheel-thrown stoneware and ceramic glazes are fired by generational potters in Kyoto, Japan.',
    },
    {
      q: 'What is the shipping protocol and carbon offset guarantee?',
      a: 'Orders exceeding $200 qualify for complimentary courier delivery. Every shipment is packaged in 100% compostable mycelium molds and recycled corrugated craft boxes, with full carbon offsets verified via Gold Standard.',
    },
    {
      q: 'Can I request bespoke finishes or architect-specified dimensions?',
      a: 'Yes. Our studio works with interior designers, recording artists, and architectural practices on limited custom runs. Submit an inquiry through the concierge form below specifying project dimensions and timeline.',
    },
    {
      q: 'What warranty is provided on audio equipment and luminaires?',
      a: 'Every acoustic component and luminaire includes a 5-year comprehensive manufacturer guarantee and lifetime servicing availability. Modular internals ensure drivers and power switches can be replaced rather than discarded.',
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-16 sm:space-y-24">
      {/* Breadcrumbs */}
      <Breadcrumbs items={[{ label: 'Studio & Contact' }]} />

      {/* Hero Narrative */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
        <div className="lg:col-span-7 space-y-6">
          <span className="text-xs font-semibold text-stone-500 uppercase tracking-widest block">
            Philosophy & Lineage
          </span>
          <h1 className="text-3xl sm:text-5xl font-bold text-stone-900 font-display tracking-tight leading-tight text-balance">
            Where Japanese ceramics meet Scandinavian acoustic mathematics.
          </h1>
          <p className="text-sm sm:text-base text-stone-600 leading-relaxed max-w-xl">
            Aura Objects was founded in 2021 as a rebellion against planned obsolescence and hollow plastic gadgets. We craft spatial anchors—monolithic acoustic instruments, mineral vessels, and balanced luminaires designed to live alongside you for decades.
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 pt-4 border-t border-stone-200">
            <div>
              <span className="text-xl font-bold font-mono text-stone-900">2021</span>
              <p className="text-xs text-stone-500 mt-0.5">Studio Founded</p>
            </div>
            <div>
              <span className="text-xl font-bold font-mono text-stone-900">2 Ateliers</span>
              <p className="text-xs text-stone-500 mt-0.5">Kyoto & Copenhagen</p>
            </div>
            <div>
              <span className="text-xl font-bold font-mono text-stone-900">Zero Waste</span>
              <p className="text-xs text-stone-500 mt-0.5">Closed-loop Aluminum</p>
            </div>
          </div>
        </div>

        <div className="lg:col-span-5">
          <div className="rounded-2xl overflow-hidden border border-stone-200 shadow-lg">
            <LazyImage
              src={heroInteriorImg}
              alt="Aura Studio workshop interior"
              aspectRatio="4/3"
              fallbackTitle="Aura Kyoto Atelier"
            />
          </div>
        </div>
      </section>

      {/* Capstone Project Overview Card */}
      <section className="bg-stone-900 text-stone-100 rounded-2xl p-8 sm:p-10 border border-stone-800 shadow-md">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-6 border-b border-stone-800">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs font-mono text-amber-400">
              <Code2 className="w-4 h-4" />
              <span>Full-Stack Web Development Capstone Project</span>
            </div>
            <h2 className="text-2xl font-bold font-display text-white">
              Technical Architecture & Specification
            </h2>
          </div>
          <span className="text-xs font-mono text-stone-400 bg-stone-800 px-3 py-1.5 rounded-lg border border-stone-700">
            Production Build v1.0.0
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pt-6 text-xs">
          <div className="space-y-2">
            <h3 className="font-semibold text-stone-300">1. Client Routing</h3>
            <p className="text-stone-400 leading-relaxed">
              Zero-dependency client-side router with deep linking, search query synchronization, and back/forward browser support.
            </p>
          </div>
          <div className="space-y-2">
            <h3 className="font-semibold text-stone-300">2. Persistent State</h3>
            <p className="text-stone-400 leading-relaxed">
              Cart state, promo code discounts, and full order confirmation receipts securely persisted in localStorage across sessions.
            </p>
          </div>
          <div className="space-y-2">
            <h3 className="font-semibold text-stone-300">3. Dynamic Catalog</h3>
            <p className="text-stone-400 leading-relaxed">
              Multi-criteria filtering (category, price slider, real-time search query, stock status, and sorting algorithms).
            </p>
          </div>
          <div className="space-y-2">
            <h3 className="font-semibold text-stone-300">4. Asset Resilience</h3>
            <p className="text-stone-400 leading-relaxed">
              Zero-broken-image fallback protocol, responsive image ratios, and accessibility-compliant semantic HTML tags.
            </p>
          </div>
        </div>
      </section>

      {/* Interactive Contact Concierge & Atelier Coordinates */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Left: Contact Form */}
        <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-2xl border border-stone-200/90 shadow-2xs space-y-6">
          <div className="space-y-1">
            <span className="text-xs font-semibold text-stone-500 uppercase tracking-wider block">
              Direct Inquiries
            </span>
            <h2 className="text-2xl font-bold text-stone-900 font-display">
              Contact Studio Concierge
            </h2>
            <p className="text-xs text-stone-500">
              Inquire about current release availability, trade accounts, or bespoke dimensions.
            </p>
          </div>

          {submitted ? (
            <div className="p-8 bg-stone-50 rounded-xl border border-stone-200 text-center space-y-3">
              <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-stone-900 font-display">
                Dispatch Dispatched to Studio
              </h3>
              <p className="text-xs text-stone-600 max-w-sm mx-auto">
                Thank you, <strong>{formData.name}</strong>. Our Kyoto or Copenhagen studio team will respond within 24 business hours.
              </p>
              <button
                onClick={() => {
                  setSubmitted(false);
                  setFormData({ name: '', email: '', subject: 'General Inquiry', message: '' });
                }}
                className="text-xs font-semibold text-stone-900 underline underline-offset-2 pt-2"
              >
                Send Another Note
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-stone-700 mb-1">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Elena Rostova"
                    className="w-full text-xs px-3.5 py-2.5 bg-stone-50 border border-stone-300 rounded-lg focus:outline-hidden focus:border-stone-900"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-stone-700 mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="elena@studio.com"
                    className="w-full text-xs px-3.5 py-2.5 bg-stone-50 border border-stone-300 rounded-lg focus:outline-hidden focus:border-stone-900"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-stone-700 mb-1">Topic</label>
                <select
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  className="w-full text-xs px-3.5 py-2.5 bg-stone-50 border border-stone-300 rounded-lg focus:outline-hidden focus:border-stone-900"
                >
                  <option value="General Inquiry">General Catalog Inquiry</option>
                  <option value="Order Status">Existing Order & Shipping Inquiry</option>
                  <option value="Bespoke Commission">Bespoke Architectural Project</option>
                  <option value="Press / Media">Press, Gallery & Media</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium text-stone-700 mb-1">Message *</label>
                <textarea
                  required
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Describe your inquiry or space configuration..."
                  className="w-full text-xs p-3.5 bg-stone-50 border border-stone-300 rounded-lg focus:outline-hidden focus:border-stone-900"
                />
              </div>

              <button
                type="submit"
                className="w-full sm:w-auto px-6 py-3 bg-stone-900 hover:bg-stone-800 text-white rounded-xl text-xs font-semibold inline-flex items-center justify-center gap-2 transition-colors shadow-xs"
              >
                <span>Send Studio Note</span>
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>
          )}
        </div>

        {/* Right: Studio Addresses & Hours */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white p-6 rounded-2xl border border-stone-200/90 shadow-2xs space-y-4">
            <h3 className="text-xs font-semibold text-stone-900 uppercase tracking-wider">
              Studio Locations
            </h3>

            <div className="space-y-4 text-xs">
              <div className="flex gap-3 items-start">
                <MapPin className="w-4 h-4 text-stone-900 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-stone-900">Kyoto Ceramic Atelier</h4>
                  <p className="text-stone-500 leading-relaxed mt-0.5">
                    18-4 Higashiyama District, Kyoto 605-0862, Japan
                  </p>
                  <p className="text-stone-400 text-[11px] mt-1">Kiln visits by appointment</p>
                </div>
              </div>

              <div className="flex gap-3 items-start pt-3 border-t border-stone-100">
                <MapPin className="w-4 h-4 text-stone-900 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-stone-900">Copenhagen Acoustic Lab</h4>
                  <p className="text-stone-500 leading-relaxed mt-0.5">
                    Bredgade 34, 1260 København K, Denmark
                  </p>
                  <p className="text-stone-400 text-[11px] mt-1">Listening chamber available</p>
                </div>
              </div>

              <div className="flex gap-3 items-start pt-3 border-t border-stone-100">
                <Clock className="w-4 h-4 text-stone-900 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-stone-900">Concierge Working Hours</h4>
                  <p className="text-stone-500 leading-relaxed mt-0.5">
                    Monday – Friday: 09:00 – 18:00 CET / JST
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* FAQ Accordion */}
          <div className="bg-white p-6 rounded-2xl border border-stone-200/90 shadow-2xs space-y-3">
            <h3 className="text-xs font-semibold text-stone-900 uppercase tracking-wider mb-2">
              Frequently Answered
            </h3>

            <div className="divide-y divide-stone-100">
              {FAQS.map((faq, idx) => (
                <div key={idx} className="py-2.5">
                  <button
                    onClick={() => setOpenFaqIndex(openFaqIndex === idx ? null : idx)}
                    className="w-full text-left flex items-center justify-between text-xs font-semibold text-stone-800 hover:text-stone-950 py-1"
                  >
                    <span>{faq.q}</span>
                    <ChevronDown
                      className={`w-3.5 h-3.5 text-stone-400 transition-transform ${
                        openFaqIndex === idx ? 'rotate-180 text-stone-900' : ''
                      }`}
                    />
                  </button>
                  {openFaqIndex === idx && (
                    <p className="text-xs text-stone-500 leading-relaxed pt-2 pb-1 animate-in fade-in duration-150">
                      {faq.a}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
