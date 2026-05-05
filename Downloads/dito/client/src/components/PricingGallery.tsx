import { Download } from "lucide-react";

const pricingImages = [
  {
    src: "/pricing-juli.jpg",
    alt: "Paket Umroh Juli 2026",
    title: "Paket Umroh Awal Musim - Juli 2026",
  },
  {
    src: "/pricing-agustus.jpg",
    alt: "Paket Umroh Spesial Agustus 2026",
    title: "Paket Umroh Spesial Agustus 2026",
  },
];

export function PricingGallery() {
  return (
    <section id="harga" className="py-16 bg-muted/30">
      <div className="container">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            Daftar Harga Paket Umroh
          </h2>
          <p className="text-muted-foreground">
            Lihat detail harga dan fasilitas lengkap dari paket pilihan Anda.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {pricingImages.map((img) => (
            <div
              key={img.src}
              className="bg-card rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow"
            >
              <div className="p-4 border-b bg-gradient-to-r from-primary/10 to-transparent">
                <h3 className="font-semibold text-center">{img.title}</h3>
              </div>
              <div className="relative">
                <img
                  src={img.src}
                  alt={img.alt}
                  className="w-full h-auto object-contain max-h-[600px]"
                />
                <div className="absolute top-4 right-4">
                  <a
                    href={img.src}
                    download
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-full text-sm font-medium hover:bg-primary/90 transition-colors shadow-lg"
                  >
                    <Download className="h-4 w-4" />
                    Simpan
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-10">
          <p className="text-muted-foreground mb-4">
            Untuk informasi lebih lengkap dan booking, hubungi kami:
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="https://wa.me/6281234567890"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-green-500 text-white px-6 py-3 rounded-full font-medium hover:bg-green-600 transition-colors"
            >
              Chat WhatsApp
            </a>
            <a
              href="https://instagram.com/ditoris_tour"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-3 rounded-full font-medium hover:opacity-90 transition-opacity"
            >
              @ditoris_tour
            </a>
            <a
              href="https://instagram.com/ditoris_travelenesia"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-pink-500 to-red-500 text-white px-6 py-3 rounded-full font-medium hover:opacity-90 transition-opacity"
            >
              @ditoris_travelenesia
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}