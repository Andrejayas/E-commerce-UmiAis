import Image from 'next/image';

export function HeroSection() {
  return (
    <section className="min-h-screen bg-cream pt-28 pb-16 px-4">
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        {/* Left: Text */}
        <div className="flex flex-col gap-6">
          {/* Badge */}
          <span className="inline-flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-full text-sm font-medium text-gray-700 w-fit">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-4 h-4 text-terracotta-500"
            >
              <path
                fillRule="evenodd"
                d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z"
                clipRule="evenodd"
              />
            </svg>
            Kue & Roti Buatan Rumah
          </span>

          {/* Heading */}
          <h1 className="font-serif leading-tight">
            <span className="block text-espresso-900 text-5xl md:text-6xl font-normal italic">
              Nikmati Cita Rasa
            </span>
            <span className="block text-terracotta-500 text-5xl md:text-6xl font-normal italic">
              Bakeri Rumahan
            </span>
          </h1>

          {/* Description */}
          <p className="text-gray-600 text-lg leading-relaxed max-w-sm">
            Dibuat dengan bahan-bahan pilihan, resep turun-temurun, dan penuh cinta.
            Setiap gigitan adalah kenangan yang tak terlupakan.
          </p>

          {/* Buttons */}
          <div className="flex flex-wrap gap-4">
            <a
              href="#order"
              className="inline-flex items-center px-7 py-3.5 bg-terracotta-500 text-white font-medium rounded-pill hover:bg-terracotta-600 transition-colors duration-200 shadow-sm"
            >
              Pesan Sekarang
            </a>
            <a
              href="#menu"
              className="inline-flex items-center px-7 py-3.5 border-2 border-espresso-900 text-espresso-900 font-medium rounded-pill hover:bg-espresso-900 hover:text-white transition-all duration-200"
            >
              Lihat Menu
            </a>
          </div>

          {/* Info bar */}
          <div className="flex flex-wrap gap-6 pt-2">
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-4 h-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                />
              </svg>
              Buka Setiap Hari 07.00 – 20.00
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-4 h-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"
                />
              </svg>
              Antar ke Seluruh Kota
            </div>
          </div>
        </div>

        {/* Right: Photo Grid */}
        <div className="relative grid grid-cols-2 gap-3 h-[480px]">
          {/* Top-left: tall image */}
          <div className="relative row-span-1 rounded-xl overflow-hidden bg-gray-200">
            <Image
              src="https://images.unsplash.com/photo-1549931319-a545dcf3bc73?w=400&q=80"
              alt="Roti artisan buatan tangan"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 50vw, 25vw"
            />
          </div>
          {/* Top-right: tall image */}
          <div className="relative rounded-xl overflow-hidden bg-gray-200 mt-6">
            <Image
              src="https://images.unsplash.com/photo-1588195538326-c5b1e9f80a1b?w=400&q=80"
              alt="Kue cantik hiasan"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 50vw, 25vw"
            />
          </div>
          {/* Bottom-left */}
          <div className="relative rounded-xl overflow-hidden bg-gray-200">
            <Image
              src="https://images.unsplash.com/photo-1517433670267-08bbd4be890f?w=400&q=80"
              alt="Pastri segar dari oven"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 50vw, 25vw"
            />
          </div>
          {/* Bottom-right */}
          <div className="relative rounded-xl overflow-hidden bg-gray-200 -mt-6">
            <Image
              src="https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=400&q=80"
              alt="Proses memanggang roti"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 50vw, 25vw"
            />
          </div>

          {/* Badge overlay */}
          <div className="absolute bottom-4 right-4 bg-terracotta-500 text-white rounded-xl px-5 py-4 text-center shadow-lg z-10">
            <p className="text-3xl font-serif font-bold">5+</p>
            <p className="text-xs uppercase tracking-widest mt-0.5 font-medium opacity-90">
              Tahun Pengalaman
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
