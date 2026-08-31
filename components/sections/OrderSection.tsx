'use client';

import { useState } from 'react';

const contactInfo = [
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z" />
      </svg>
    ),
    label: 'WhatsApp',
    value: '+62 812-3456-7890',
    href: 'https://wa.me/6281234567890',
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
      </svg>
    ),
    label: 'Email',
    value: 'order@umiaisbakery.com',
    href: 'mailto:order@umiaisbakery.com',
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
      </svg>
    ),
    label: 'Lokasi',
    value: 'Jl. Kenanga No. 12, Kota Anda',
    href: '#',
  },
];

const openingHours = [
  { day: 'Senin – Jumat', hours: '07.00 – 20.00' },
  { day: 'Sabtu – Minggu', hours: '07.00 – 21.00' },
];

export function OrderSection() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    product: '',
    deliveryMethod: 'pickup',
    notes: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const wa = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? '6281234567890';
    const msg = `Halo Umi Ai's Bakery! Saya ingin pesan:\n\nNama: ${formData.name}\nTelepon: ${formData.phone}\nPesanan: ${formData.product}\nMetode: ${formData.deliveryMethod === 'pickup' ? 'Ambil Sendiri' : 'Dikirim'}\nCatatan: ${formData.notes || '-'}`;
    window.open(`https://wa.me/${wa}?text=${encodeURIComponent(msg)}`, '_blank');
  };

  return (
    <section id="order" className="bg-espresso-900 py-20 px-4">
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Left: Info */}
        <div className="flex flex-col gap-8">
          <div>
            <p className="text-terracotta-400 text-sm font-semibold uppercase tracking-widest mb-3">
              — Pemesanan
            </p>
            <h2 className="font-serif text-4xl md:text-5xl text-white italic leading-tight">
              Pesan Produk Kami
            </h2>
            <p className="text-gray-400 mt-4 leading-relaxed">
              Hubungi kami untuk memesan produk favoritmu. Tersedia pengiriman ke seluruh
              kota dan layanan ambil sendiri di toko.
            </p>
          </div>

          {/* Contact info */}
          <div className="flex flex-col gap-3">
            {contactInfo.map((info) => (
              <a
                key={info.label}
                href={info.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 group"
              >
                <div className="w-11 h-11 rounded-full bg-terracotta-500/20 flex items-center justify-center text-terracotta-400 group-hover:bg-terracotta-500 group-hover:text-white transition-all duration-200">
                  {info.icon}
                </div>
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-wider">{info.label}</p>
                  <p className="text-white text-sm font-medium group-hover:text-terracotta-400 transition-colors">
                    {info.value}
                  </p>
                </div>
              </a>
            ))}
          </div>

          {/* Opening hours */}
          <div className="border border-white/10 rounded-xl p-5">
            <p className="text-white font-medium mb-3 text-sm uppercase tracking-wider">
              Jam Operasional
            </p>
            <div className="flex flex-col gap-2">
              {openingHours.map((h) => (
                <div key={h.day} className="flex justify-between text-sm">
                  <span className="text-gray-400">{h.day}</span>
                  <span className="text-white">{h.hours}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right: Form */}
        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 md:p-8">
          <h3 className="font-serif text-2xl text-white italic mb-6">
            Buat Pesanan
          </h3>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs text-gray-400 mb-1.5">Nama</label>
                <input
                  type="text"
                  placeholder="Nama kamu"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                  className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-terracotta-400 transition-colors"
                />
              </div>
              <div>
                <label className="block text-xs text-gray-400 mb-1.5">Telepon / WA</label>
                <input
                  type="tel"
                  placeholder="08xx-xxxx-xxxx"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  required
                  className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-terracotta-400 transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs text-gray-400 mb-1.5">Produk yang Dipesan</label>
              <input
                type="text"
                placeholder="Contoh: Sourdough 1 loaf, Croissant 3 pcs"
                value={formData.product}
                onChange={(e) => setFormData({ ...formData, product: e.target.value })}
                required
                className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-terracotta-400 transition-colors"
              />
            </div>

            <div>
              <label className="block text-xs text-gray-400 mb-1.5">Metode Pengambilan</label>
              <select
                value={formData.deliveryMethod}
                onChange={(e) => setFormData({ ...formData, deliveryMethod: e.target.value })}
                className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white text-sm focus:outline-none focus:border-terracotta-400 transition-colors appearance-none"
              >
                <option value="pickup" className="bg-espresso-900">Ambil Sendiri</option>
                <option value="delivery" className="bg-espresso-900">Dikirim (dalam kota)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs text-gray-400 mb-1.5">
                Catatan Khusus <span className="text-gray-600">(opsional)</span>
              </label>
              <textarea
                rows={3}
                placeholder="Alergi, permintaan khusus, atau catatan lainnya..."
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-terracotta-400 transition-colors resize-none"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-terracotta-500 hover:bg-terracotta-600 text-white font-medium py-3.5 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2 mt-2"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                <path fillRule="evenodd" d="M1.5 4.5a3 3 0 0 1 3-3h1.372c.86 0 1.61.586 1.819 1.42l1.105 4.423a1.875 1.875 0 0 1-.694 1.955l-1.293.97c-.135.101-.164.249-.126.352a11.285 11.285 0 0 0 6.697 6.697c.103.038.25.009.352-.126l.97-1.293a1.875 1.875 0 0 1 1.955-.694l4.423 1.105c.834.209 1.42.959 1.42 1.82V19.5a3 3 0 0 1-3 3h-2.25C8.552 22.5 1.5 15.448 1.5 6.75V4.5Z" clipRule="evenodd" />
              </svg>
              Pesan via WhatsApp
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
