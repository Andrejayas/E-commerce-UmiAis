import Image from 'next/image';

const menuCategories = [
  {
    label: 'Roti & Pastri',
    items: [
      {
        name: 'Sourdough Klasik',
        description: 'Roti sourdough artisan dengan kerak renyah, fermentasi 24 jam',
        price: 'Rp 45.000',
        image: 'https://images.unsplash.com/photo-1549931319-a545dcf3bc73?w=200&q=80',
      },
      {
        name: 'Croissant Mentega',
        description: 'Croissant berlapis mentega Prancis, renyah di luar lembut di dalam',
        price: 'Rp 25.000',
        image: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=200&q=80',
      },
    ],
  },
  {
    label: 'Kue & Cake',
    items: [
      {
        name: 'Kue Cokelat Belgia',
        description: 'Cokelat Belgia premium, moist sempurna, ganache lembut di atasnya',
        price: 'Rp 75.000',
        image: 'https://images.unsplash.com/photo-1588195538326-c5b1e9f80a1b?w=200&q=80',
      },
      {
        name: 'Tart Buah Segar',
        description: 'Pastry cream vanilla dengan topping buah segar musiman pilihan',
        price: 'Rp 55.000',
        image: 'https://images.unsplash.com/photo-1517433670267-08bbd4be890f?w=200&q=80',
      },
    ],
  },
  {
    label: 'Paket Spesial',
    items: [
      {
        name: 'Paket Hampers Lebaran',
        description: 'Pilih 6 item bakeri favoritmu, dikemas cantik dalam box eksklusif',
        price: 'Mulai Rp 150.000',
        image: 'https://images.unsplash.com/photo-1607478900766-efe13248b125?w=200&q=80',
      },
      {
        name: 'Birthday Cake Custom',
        description: 'Kue ulang tahun sesuai keinginan, design custom, rasa pilihanmu',
        price: 'Mulai Rp 200.000',
        image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=200&q=80',
      },
    ],
  },
];

export function MenuSection() {
  return (
    <section id="menu" className="bg-cream-100 py-20 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Section Heading */}
        <div className="text-center mb-14">
          <div className="flex items-center justify-center gap-4 mb-4">
            <span className="block h-px w-16 bg-terracotta-500" />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={1.5}
              className="w-6 h-6 text-terracotta-500"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25"
              />
            </svg>
            <span className="block h-px w-16 bg-terracotta-500" />
          </div>
          <h2 className="font-serif text-4xl md:text-5xl text-espresso-900 italic mb-3">
            Menu Kami
          </h2>
          <p className="text-gray-500 text-base max-w-md mx-auto">
            Bahan-bahan segar pilihan, teknik tradisional, cita rasa yang tak terlupakan
          </p>
        </div>

        {/* Category + Items */}
        <div className="flex flex-col gap-12">
          {menuCategories.map((cat) => (
            <div key={cat.label}>
              <h3 className="font-serif italic text-2xl text-terracotta-500 text-center mb-6">
                {cat.label}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {cat.items.map((item) => (
                  <div
                    key={item.name}
                    className="flex items-center gap-4 p-4 bg-white rounded-xl border border-gray-200 hover:shadow-md transition-shadow duration-200"
                  >
                    {/* Image */}
                    <div className="relative w-20 h-20 rounded-lg overflow-hidden flex-shrink-0 bg-gray-100">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover"
                        sizes="80px"
                      />
                    </div>
                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <h4 className="font-serif text-base font-medium text-espresso-900 leading-snug">
                          {item.name}
                        </h4>
                        <span className="text-terracotta-500 font-semibold text-sm whitespace-nowrap">
                          {item.price}
                        </span>
                      </div>
                      <p className="text-gray-500 text-sm mt-1 leading-snug line-clamp-2">
                        {item.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="flex justify-center mt-12">
          <a
            href="#order"
            className="inline-flex items-center gap-2 px-8 py-3.5 border-2 border-espresso-900 text-espresso-900 font-medium rounded-pill hover:bg-espresso-900 hover:text-white transition-all duration-200"
          >
            Lihat Semua Menu
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-4 h-4"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
