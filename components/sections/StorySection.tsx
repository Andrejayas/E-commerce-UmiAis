import Image from 'next/image';

const stats = [
  { value: '5+', label: 'Tahun Berdiri' },
  { value: '1000+', label: 'Pelanggan Setia' },
  { value: '50+', label: 'Varian Produk' },
];

export function StorySection() {
  return (
    <section id="story" className="bg-cream py-20 px-4">
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
        {/* Left: Photo + Quote */}
        <div className="relative">
          <div className="relative w-full aspect-[4/5] rounded-2xl overflow-hidden bg-gray-200">
            <Image
              src="https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=600&q=80"
              alt="Umi Ai sedang membuat kue"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>

          {/* Quote Card overlay */}
          <div className="absolute bottom-8 -right-4 md:right-[-2rem] bg-white rounded-xl shadow-xl p-5 max-w-[280px] border border-gray-100">
            <div className="text-3xl text-terracotta-500 font-serif leading-none mb-2">&ldquo;</div>
            <p className="text-gray-700 text-sm leading-relaxed italic">
              &quot;Memasak adalah soal cinta. Setiap kue yang saya buat membawa sepotong
              hati saya untuk keluarga kalian.&quot;
            </p>
            <p className="mt-3 text-xs font-semibold text-espresso-900">— Umi Ai</p>
          </div>
        </div>

        {/* Right: Text + Stats */}
        <div className="flex flex-col justify-center gap-6 md:pt-8">
          {/* Section label */}
          <div className="flex items-center gap-3">
            <span className="block h-px w-10 bg-terracotta-500" />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={1.5}
              className="w-5 h-5 text-terracotta-500"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
              />
            </svg>
          </div>

          <h2 className="font-serif text-4xl md:text-5xl text-espresso-900 italic leading-tight">
            Cerita Kami
          </h2>

          <div className="flex flex-col gap-4 text-gray-600 leading-relaxed">
            <p>
              Berdiri sejak 2019, Umi Ai&apos;s Bakery lahir dari dapur rumah yang penuh
              aroma vanila dan mentega hangat. Berawal dari pesanan kecil keluarga dan
              tetangga, kini kami melayani ratusan pelanggan setia setiap bulannya.
            </p>
            <p>
              Di bawah tangan Umi Ai, setiap produk dibuat dengan teknik tradisional yang
              dipadukan bahan-bahan premium pilihan. Tidak ada pengawet, tidak ada
              kompromi — hanya kualitas terbaik untuk keluarga Anda.
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 mt-2">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="border border-gray-200 rounded-xl p-4 text-center bg-white hover:border-terracotta-500 transition-colors duration-200"
              >
                <p className="font-serif text-2xl text-terracotta-500 font-semibold">
                  {stat.value}
                </p>
                <p className="text-xs text-gray-500 uppercase tracking-wider mt-1 font-medium">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
