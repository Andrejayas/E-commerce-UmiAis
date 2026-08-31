import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { HeroSection } from '@/components/sections/HeroSection';
import { MenuSection } from '@/components/sections/MenuSection';
import { StorySection } from '@/components/sections/StorySection';
import { OrderSection } from '@/components/sections/OrderSection';
import { TestimonialsSection } from '@/components/sections/TestimonialsSection';

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        <MenuSection />
        <StorySection />
        <OrderSection />
        <TestimonialsSection />
      </main>
      <Footer />
    </>
  );
}
