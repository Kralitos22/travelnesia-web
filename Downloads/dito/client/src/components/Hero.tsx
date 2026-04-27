import { ArrowRight, Star } from "lucide-react";

export function Hero() {
  return (
    <section id="beranda" className="relative overflow-hidden bg-gradient-to-br from-primary/5 via-background to-accent/20">
      {/* Decorative elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-20 left-10 h-72 w-72 rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute bottom-20 right-10 h-96 w-96 rounded-full bg-primary/5 blur-3xl" />
      </div>

      <div className="container py-20 md:py-32">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-8 items-center">
          {/* Content */}
          <div className="flex flex-col gap-6">
            <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary">
              <Star className="h-4 w-4 fill-current" />
              Agen Umroh & Haji Terpercaya sejak 2010
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
              Wujudkan Impian{" "}
              <span className="text-primary">Beribadah</span> ke Tanah Suci
            </h1>
            <p className="text-lg text-muted-foreground max-w-xl">
              Travelnesia hadir memberikan pelayanan umroh dan haji terbaik dengan
              fasilitas lengkap, guide berpengalaman, dan itinerary yang terorganisir
              dengan baik.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="#paket"
                className="inline-flex items-center justify-center gap-2 rounded-md bg-primary px-6 py-3 text-base font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
              >
                Lihat Paket Umroh
                <ArrowRight className="h-4 w-4" />
              </a>
              <a
                href="https://wa.me/6281234567890"
                className="inline-flex items-center justify-center gap-2 rounded-md border px-6 py-3 text-base font-medium hover:bg-accent transition-colors"
              >
                Konsultasi Gratis
              </a>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 pt-8 border-t">
              <div>
                <div className="text-3xl font-bold text-primary">15+</div>
                <div className="text-sm text-muted-foreground">Tahun Pengalaman</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-primary">5000+</div>
                <div className="text-sm text-muted-foreground">Jamaah Terbimbing</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-primary">99%</div>
                <div className="text-sm text-muted-foreground">Tingkat Kepuasan</div>
              </div>
            </div>
          </div>

          {/* Visual */}
          <div className="relative">
            <div className="aspect-[4/3] rounded-2xl bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center overflow-hidden">
              <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC40Ij48cGF0aCBkPSJNMzYgMzEuNWwzNS41IDUuOC0xLjQgM1YyLjdsLTM0LjEgNS40eiIvPjxwYXRoIGQ9Ik0zNiAzMS41bC0xLjQgM3YxOGw0OCAyLjRWMzYuNGwtNDYuNi00LjR6Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-30" />
              <div className="text-center p-8">
                <div className="text-6xl mb-4">🕋</div>
                <p className="text-lg font-medium text-muted-foreground">
                  Masjidil Haram, Makkah
                </p>
              </div>
            </div>

            {/* Floating card */}
            <div className="absolute -bottom-4 -left-4 md:left-8 rounded-xl bg-background p-4 shadow-lg border">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-100 text-green-600">
                  ✓
                </div>
                <div>
                  <p className="font-semibold">Visa Disetujui</p>
                  <p className="text-sm text-muted-foreground">Proses 7 hari kerja</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}