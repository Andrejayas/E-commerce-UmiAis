const testimonials = [
  {
    stars: 5,
    quote:
      'Rotinya luar biasa! Sourdough-nya benar-benar autentik, kerak renyah dan dalamnya super lembut. Sudah langganan 2 tahun dan tidak mau pindah ke toko lain.',
    name: 'Rina Hartati',
    role: 'Pelanggan Setia',
  },
  {
    stars: 5,
    quote:
      'Pesan birthday cake untuk anak, hasilnya melebihi ekspektasi. Desainnya cantik, rasanya enak banget! Semua tamu pesta memuji kuenya. Pasti pesan lagi!',
    name: 'Budi Santoso',
    role: 'Orang Tua Bahagia',
  },
  {
    stars: 5,
    quote:
      'Croissant-nya sama persis seperti yang saya makan di Paris. Serius! Berlapis-lapis, harum mentega, dan renyah sempurna. Wajib coba untuk pecinta pastri.',
    name: 'Maya Kusuma',
    role: 'Food Blogger',
  },
];

function StarRating({ count }: { count: number }) {
  return (
    <div className="flex gap-1">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill={i < count ? 'currentColor' : 'none'}
          stroke="currentColor"
          strokeWidth={i < count ? 0 : 1.5}
          className={`w-4 h-4 ${i < count ? 'text-terracotta-500' : 'text-gray-300'}`}
        >
          <path
            fillRule="evenodd"
            d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z"
            clipRule="evenodd"
          />
        </svg>
      ))}
    </div>
  );
}

export function TestimonialsSection() {
  return (
    <section id="testimonials" className="bg-cream-100 py-20 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Heading */}
        <div className="text-center mb-14">
          <div className="flex items-center justify-center gap-4 mb-4">
            <span className="block h-px w-16 bg-terracotta-500" />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6 text-terracotta-500"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M8.625 9.75a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375m-13.5 3.01c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.184-4.183a1.14 1.14 0 0 1 .778-.332 48.294 48.294 0 0 0 5.83-.498c1.585-.233 2.708-1.626 2.708-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z"
              />
            </svg>
            <span className="block h-px w-16 bg-terracotta-500" />
          </div>
          <h2 className="font-serif text-4xl md:text-5xl text-espresso-900 italic mb-3">
            Kata Pelanggan Kami
          </h2>
          <p className="text-gray-500 text-base max-w-md mx-auto">
            Jangan percaya kata kami — dengar langsung dari pelanggan setia kami
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t, idx) => (
            <div
              key={idx}
              className="flex flex-col gap-4 bg-white border border-gray-200 rounded-xl p-6 hover:shadow-md transition-shadow duration-200"
            >
              <StarRating count={t.stars} />
              <p className="text-gray-600 text-sm leading-relaxed flex-1">
                &ldquo;{t.quote}&rdquo;
              </p>
              <div className="border-t border-gray-100 pt-4">
                <p className="font-semibold text-espresso-900 text-sm">{t.name}</p>
                <p className="text-gray-400 text-xs mt-0.5">{t.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
