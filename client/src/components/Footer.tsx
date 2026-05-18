import { Phone, Mail, MapPin, Clock } from "lucide-react";

const footerLinks = {
  layanan: [
    "Paket Umroh Reguler",
    "Paket Umroh Premium",
    "Haji Furoda",
    "Ziarah Tambahan",
  ],
  informasi: [
    "Tentang Kami",
    "Galeri",
    "Blog",
    "FAQ",
  ],
  kontak: [
    { icon: Phone, text: "+62 812-3456-7890" },
    { icon: Mail, text: "info@travelnesia.com" },
    { icon: MapPin, text: "Jl. Sudirman No. 123, Jakarta" },
    { icon: Clock, text: "Senin - Sabtu: 08:00 - 20:00" },
  ],
};

export function Footer() {
  return (
    <footer id="kontak" className="bg-slate-900 text-slate-50">
      <div className="container py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <a href="#beranda" className="flex items-center gap-3 mb-4">
              <img src="/logo.png" alt="Travelnesia" className="h-10 w-10 rounded-lg object-cover" />
              <div className="flex flex-col">
                <span className="font-bold text-lg leading-tight">Travelnesia</span>
                <span className="text-xs text-slate-400">Umroh & Haji</span>
              </div>
            </a>
            <p className="text-sm text-slate-400 mb-6">
              Travelnesia adalah biro perjalanan umroh dan haji terpercaya yang telah
              membantu ribuan keluarga menunaikan ibadah dengan nyaman dan berkesan.
            </p>
            <div className="flex gap-4">
              <a href="#" className="h-10 w-10 flex items-center justify-center rounded-full bg-slate-800 hover:bg-primary transition-colors">
                f
              </a>
              <a href="#" className="h-10 w-10 flex items-center justify-center rounded-full bg-slate-800 hover:bg-primary transition-colors">
                in
              </a>
              <a href="#" className="h-10 w-10 flex items-center justify-center rounded-full bg-slate-800 hover:bg-primary transition-colors">
                yt
              </a>
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-semibold mb-4">Layanan</h4>
            <ul className="space-y-3 text-sm text-slate-400">
              {footerLinks.layanan.map((link) => (
                <li key={link}>
                  <a href="#paket" className="hover:text-primary transition-colors">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Info */}
          <div>
            <h4 className="font-semibold mb-4">Informasi</h4>
            <ul className="space-y-3 text-sm text-slate-400">
              {footerLinks.informasi.map((link) => (
                <li key={link}>
                  <a href="#" className="hover:text-primary transition-colors">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold mb-4">Hubungi Kami</h4>
            <ul className="space-y-4">
              {footerLinks.kontak.map((item) => {
                const Icon = item.icon;
                return (
                  <li key={item.text} className="flex items-start gap-3 text-sm text-slate-400">
                    <Icon className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                    <span>{item.text}</span>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-16 pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-slate-400">
            © 2024 PT Travelnesia. All rights reserved.
          </p>
          <p className="text-sm text-slate-400">
            Izin travel: No. 123/ABC/2024 | Anggota ASITA
          </p>
        </div>
      </div>
    </footer>
  );
}