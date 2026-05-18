import { CheckCircle2, Plane, Calendar, Building2, Star } from "lucide-react";
import { packages } from "@/data/content";
import { cn } from "@/lib/utils";

export function Packages() {
  return (
    <section id="paket" className="py-20 md:py-32 bg-gradient-to-b from-background to-muted/30">
      <div className="container">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary rounded-full px-4 py-2 text-sm font-medium mb-4">
            <Star className="h-4 w-4" />
            PILIHAN TERBAIK UNTUK ANDA
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Paket Umroh & Haji Pilihan
          </h2>
          <p className="text-muted-foreground text-lg">
            Harga sudah termasuk semua kebutuhan Anda. Tersedia berbagai pilihan
            keberangkatan sepanjang tahun.
          </p>
        </div>

        {/* Packages Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {packages.map((pkg, index) => (
            <div
              key={pkg.name}
              className={cn(
                "relative rounded-2xl border bg-card text-card-foreground overflow-hidden transition-all hover:shadow-xl hover:-translate-y-2",
                index === 1 && "border-primary shadow-lg ring-2 ring-primary/20"
              )}
            >
              {/* Badge */}
              {pkg.badge && (
                <div className="absolute top-4 left-4 z-10">
                  <span className={cn(
                    "inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wide",
                    index === 0 && "bg-blue-100 text-blue-700",
                    index === 1 && "bg-primary text-primary-foreground",
                    index === 2 && "bg-amber-100 text-amber-700"
                  )}>
                    {pkg.badge}
                  </span>
                </div>
              )}

              {/* Header */}
              <div className={cn(
                "p-6 border-b bg-gradient-to-r",
                index === 0 && "from-blue-50 to-transparent",
                index === 1 && "from-primary/10 to-transparent",
                index === 2 && "from-amber-50 to-transparent"
              )}>
                <div className="flex items-center gap-2 mb-1">
                  <Plane className="h-5 w-5 text-primary" />
                  <span className="text-sm font-medium text-muted-foreground">{pkg.maskapai}</span>
                </div>
                <h3 className="text-xl font-bold mb-2">{pkg.name}</h3>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    {pkg.duration}
                  </span>
                  <span className="flex items-center gap-1">
                    <Building2 className="h-4 w-4" />
                    Hotel Bintang 5
                  </span>
                </div>
              </div>

              {/* Price */}
              <div className="px-6 pt-4 pb-2">
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-bold text-primary">{pkg.price}</span>
                  <span className="text-sm text-muted-foreground">/orang</span>
                </div>
                {pkg.departure && (
                  <p className="text-xs text-muted-foreground mt-1">
                    Keberangkatan: {pkg.departure}
                  </p>
                )}
              </div>

              {/* Hotel Info */}
              <div className="px-6 py-3 bg-muted/30 border-y">
                <p className="text-xs font-medium text-muted-foreground mb-1">Hotel:</p>
                <p className="text-sm font-medium">
                  Mekkah: {pkg.hotel.mekah}
                </p>
                <p className="text-sm font-medium">
                  Madinah: {pkg.hotel.madinah}
                </p>
              </div>

              {/* Highlights */}
              <div className="p-6">
                <p className="text-xs font-semibold uppercase text-muted-foreground mb-3 tracking-wide">
                  Harga Sudah Termasuk:
                </p>
                <ul className="space-y-2 mb-6">
                  {pkg.highlights.map((item) => (
                    <li key={item} className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-green-600 flex-shrink-0 mt-0.5" />
                      <span className="text-sm">{item}</span>
                    </li>
                  ))}
                </ul>

                {/* Not Included */}
                <div className="border-t pt-4 mb-6">
                  <p className="text-xs font-semibold uppercase text-muted-foreground mb-2 tracking-wide">
                    Harga Tidak Termasuk:
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {pkg.notIncluded.map((item) => (
                      <span key={item} className="text-xs bg-muted text-muted-foreground px-2 py-1 rounded">
                        {item}
                      </span>
                    ))}
                  </div>
                </div>

                {/* CTA */}
                <a
                  href={`https://wa.me/6281234567890?text=Halo, saya tertarik dengan paket ${pkg.name} (${pkg.price})`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cn(
                    "block w-full text-center rounded-md py-3 font-semibold transition-all",
                    index === 1
                      ? "bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg hover:shadow-xl"
                      : "border border-primary text-primary hover:bg-primary hover:text-primary-foreground"
                  )}
                >
                  Pesan Sekarang
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Info Banner */}
        <div className="mt-12 bg-gradient-to-r from-primary/10 via-primary/5 to-primary/10 rounded-2xl p-8 text-center">
          <div className="flex flex-wrap justify-center gap-8 mb-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
                <CheckCircle2 className="h-6 w-6 text-primary" />
              </div>
              <div className="text-left">
                <p className="font-bold">FREE</p>
                <p className="text-sm text-muted-foreground">Kereta Cepat Haramain</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
                <Plane className="h-6 w-6 text-primary" />
              </div>
              <div className="text-left">
                <p className="font-bold">FREE</p>
                <p className="text-sm text-muted-foreground">City Tour Thaif</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
                <Star className="h-6 w-6 text-primary" />
              </div>
              <div className="text-left">
                <p className="font-bold">Kuota Terbatas</p>
                <p className="text-sm text-muted-foreground">PastikanBooking Sekarang</p>
              </div>
            </div>
          </div>
          <p className="text-sm text-muted-foreground">
            Informasi Lengkap: <strong>@ditoris_tour</strong> | <strong>@ditoris_travelenesia</strong>
          </p>
        </div>
      </div>
    </section>
  );
}