import React, { useState } from 'react';
import { Link } from '../../context/RouterContext';
import { ArrowUpRight, CheckCircle2 } from 'lucide-react';

export const Footer: React.FC = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail('');
    }
  };

  return (
    <footer className="bg-[#121212] text-stone-300 border-t border-stone-800 pt-16 pb-12 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-16 border-b border-stone-800/80">
          {/* Brand Vision */}
          <div className="md:col-span-5 space-y-4">
            <span className="text-xl font-bold tracking-tight font-display text-white block">
              AURA OBJECTS
            </span>
            <p className="text-sm text-stone-400 max-w-sm leading-relaxed">
              An architectural design laboratory crafting enduring tactile artifacts. Balancing monolithic materials, acoustic precision, and restorative interior light.
            </p>
            <div className="pt-2 text-xs text-stone-500 space-y-1">
              <p>Studio Workshop: 420 Kyoto Craft District / Copenhagen Annex</p>
              <p>Responsibly sourced travertine, raw stoneware, & recyclable aluminum</p>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-stone-200">
              Curated Catalog
            </h4>
            <ul className="space-y-2 text-sm text-stone-400">
              <li>
                <Link to="/products" className="hover:text-white transition-colors">
                  All Artifacts
                </Link>
              </li>
              <li>
                <Link to="/products?category=audio" className="hover:text-white transition-colors">
                  Acoustic Systems
                </Link>
              </li>
              <li>
                <Link to="/products?category=ceramics" className="hover:text-white transition-colors">
                  Textured Stoneware
                </Link>
              </li>
              <li>
                <Link to="/products?category=lighting" className="hover:text-white transition-colors">
                  Architectural Lighting
                </Link>
              </li>
              <li>
                <Link to="/products?category=workspace" className="hover:text-white transition-colors">
                  Desk Rituals
                </Link>
              </li>
            </ul>
          </div>

          {/* Studio Dispatch & Newsletter */}
          <div className="md:col-span-4 space-y-4">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-stone-200">
              Studio Dispatch
            </h4>
            <p className="text-xs text-stone-400 leading-relaxed">
              Receive private invitations to small-batch kiln releases, audio calibrations, and material research notes.
            </p>

            {subscribed ? (
              <div className="flex items-center gap-2 p-3 bg-stone-900 border border-stone-800 rounded-lg text-emerald-400 text-xs">
                <CheckCircle2 className="w-4 h-4 shrink-0" />
                <span>You are subscribed to the Aura Studio Dispatch.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex gap-2">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter email address"
                  className="bg-stone-900 border border-stone-800 text-xs text-white px-3.5 py-2.5 rounded-lg focus:outline-hidden focus:border-stone-500 flex-1 placeholder:text-stone-500"
                />
                <button
                  type="submit"
                  className="px-4 py-2.5 bg-stone-100 text-stone-950 font-semibold text-xs rounded-lg hover:bg-white transition-colors whitespace-nowrap"
                >
                  Join
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-stone-500 gap-4">
          <div className="flex items-center gap-4">
            <span>© {new Date().getFullYear()} AURA OBJECTS INC. All rights reserved.</span>
            <span>·</span>
            <span className="font-mono text-stone-400">Full-Stack Web Dev Capstone</span>
          </div>
          <div className="flex items-center gap-6">
            <Link to="/about" className="hover:text-stone-300 transition-colors">
              Terms & Care
            </Link>
            <Link to="/about" className="hover:text-stone-300 transition-colors">
              Privacy Philosophy
            </Link>
            <Link to="/about" className="hover:text-stone-300 transition-colors">
              Contact Concierge
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
