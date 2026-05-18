import { services } from "@/data/content";

export function Services() {
  return (
    <section id="layanan" className="py-20 md:py-32 bg-muted/50">
      <div className="container">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Mengapa Memilih Travelnesia?
          </h2>
          <p className="text-muted-foreground text-lg">
            Kami memberikan pengalaman umroh terbaik dengan fasilitas premium dan
            pelayanan prima untuk kenyamanan Anda.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service) => {
            const Icon = service.icon;
            return (
              <div
                key={service.title}
                className="group p-6 rounded-2xl bg-background border hover:border-primary/50 hover:shadow-md transition-all"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary mb-4 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="font-semibold mb-2">{service.title}</h3>
                <p className="text-sm text-muted-foreground">{service.description}</p>
              </div>
            );
          })}
        </div>

        {/* Additional features */}
        <div className="mt-16 p-8 rounded-2xl bg-gradient-to-r from-primary/10 to-primary/5 border">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl font-bold mb-4">
                Fasilitas Lengkap untuk Kenyamanan Anda
              </h3>
              <p className="text-muted-foreground">
                Selain paket dasar, kami juga menyediakan berbagai fasilitas tambahan
                untuk memperkaya pengalaman ibadah Anda.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {services.map((service) => {
                const Icon = service.icon;
                return (
                  <div key={service.title} className="flex items-center gap-3 text-sm">
                    <Icon className="h-5 w-5 text-primary flex-shrink-0" />
                    <span>{service.title}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}