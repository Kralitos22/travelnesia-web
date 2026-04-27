import { CheckCircle2, Clock } from "lucide-react";
import { packages } from "@/data/content";
import { cn } from "@/lib/utils";

export function Packages() {
  return (
    <section id="paket" className="py-20 md:py-32">
      <div className="container">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Paket Umroh & Haji Pilihan
          </h2>
          <p className="text-muted-foreground text-lg">
            Pilih paket yang sesuai dengan kebutuhan dan budget Anda. Semua paket
            sudah termasuk akomodasi, transportasi, dan bimbingan.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {packages.map((pkg, index) => (
            <div
              key={pkg.name}
              className={cn(
                "relative rounded-2xl border bg-card text-card-foreground overflow-hidden transition-all hover:shadow-lg hover:-translate-y-1",
                index === 1 && "border-primary shadow-md"
              )}
            >
              {/* Badge */}
              {pkg.badge && (
                <div className="absolute top-4 right-4">
                  <span className={cn(
                    "inline-flex items-center rounded-full px-3 py-1 text-xs font-medium",
                    index === 0 && "bg-blue-100 text-blue-700",
                    index === 1 && "bg-primary text-primary-foreground",
                    index === 2 && "bg-amber-100 text-amber-700"
                  )}>
                    {pkg.badge}
                  </span>
                </div>
              )}

              <div className="p-6">
                {/* Header */}
                <div className="mb-6">
                  <h3 className="text-xl font-bold mb-2">{pkg.name}</h3>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Clock className="h-4 w-4" />
                    {pkg.duration}
                  </div>
                </div>

                {/* Price */}
                <div className="mb-6">
                  <span className="text-3xl font-bold">{pkg.price}</span>
                  <span className="text-sm text-muted-foreground">/orang</span>
                </div>

                {/* Highlights */}
                <ul className="space-y-3 mb-8">
                  {pkg.highlights.map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                      <span className="text-sm">{item}</span>
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <a
                  href={`https://wa.me/6281234567890?text=Halo, saya interested dengan paket ${pkg.name}`}
                  className={cn(
                    "block w-full text-center rounded-md py-3 font-medium transition-colors",
                    index === 1
                      ? "bg-primary text-primary-foreground hover:bg-primary/90"
                      : "border border-input bg-background hover:bg-accent"
                  )}
                >
                  Pesan Sekarang
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}