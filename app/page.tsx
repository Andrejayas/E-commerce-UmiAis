export default function HomePage() {
  return (
    <main className="min-h-screen">
      <div className="container mx-auto px-4 py-16">
        <h1 className="text-5xl font-serif text-center mb-4">
          Welcome to Umi Ai&apos;s Bakery
        </h1>
        <p className="text-xl text-center text-gray-600 mb-8">
          Fresh homemade baked goods made with love
        </p>
        <div className="flex justify-center gap-4">
          <button className="btn-primary">
            Shop Now
          </button>
          <button className="btn-outline">
            Our Story
          </button>
        </div>
      </div>
    </main>
  );
}
