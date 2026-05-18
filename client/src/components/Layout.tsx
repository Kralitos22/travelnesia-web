import { Header } from "./Header";
import { Hero } from "./Hero";
import { Packages } from "./Packages";
import { PricingGallery } from "./PricingGallery";
import { Services } from "./Services";
import { Testimonials } from "./Testimonials";
import { Footer } from "./Footer";

export function Layout() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <Hero />
        <Packages />
        <PricingGallery />
        <Services />
        <Testimonials />
      </main>
      <Footer />
    </div>
  );
}