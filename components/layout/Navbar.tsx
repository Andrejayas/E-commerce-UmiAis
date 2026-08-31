'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

const navLinks = [
  { label: 'Menu', href: '#menu' },
  { label: 'Cerita Kami', href: '#story' },
  { label: 'Pemesanan', href: '#order' },
  { label: 'Kontak', href: '#contact' },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex justify-center px-4 pt-4">
      <nav
        className={`w-full max-w-5xl flex items-center justify-between px-6 py-3 rounded-xl border border-gray-200 transition-all duration-300 ${
          scrolled
            ? 'bg-white/90 backdrop-blur-md shadow-md'
            : 'bg-white/80 backdrop-blur-sm shadow-sm'
        }`}
      >
        {/* Logo */}
        <Link
          href="/"
          className="font-serif text-xl font-semibold text-espresso-900 tracking-tight"
        >
          Umi Ai&apos;s Bakery
        </Link>

        {/* Nav Links */}
        <ul className="hidden md:flex items-center gap-7">
          {navLinks.map((link) => (
            <li key={link.label}>
              <a
                href={link.href}
                className="text-sm text-gray-600 hover:text-terracotta-500 transition-colors duration-200 font-medium"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        {/* CTA Button */}
        <a
          href="#order"
          className="hidden md:inline-flex items-center px-5 py-2.5 bg-terracotta-500 text-white text-sm font-medium rounded-pill hover:bg-terracotta-600 transition-colors duration-200 shadow-sm"
        >
          Pesan Sekarang
        </a>

        {/* Mobile menu button */}
        <button
          className="md:hidden p-2 text-gray-600 hover:text-terracotta-500 transition-colors"
          aria-label="Buka menu"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
            />
          </svg>
        </button>
      </nav>
    </header>
  );
}
