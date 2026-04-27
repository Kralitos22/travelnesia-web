import { useState } from "react";
import { Menu, X, Phone, Moon, Sun } from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { label: "Beranda", href: "#beranda" },
  { label: "Paket Umroh", href: "#paket" },
  { label: "Layanan", href: "#layanan" },
  { label: "Testimoni", href: "#testimoni" },
  { label: "Kontak", href: "#kontak" },
];

export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [isDark, setIsDark] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <a href="#beranda" className="flex items-center gap-3">
            <img src="/logo.png" alt="Travelnesia" className="h-10 w-10 rounded-lg object-cover" />
            <div className="flex flex-col">
              <span className="font-bold text-lg leading-tight">Travelnesia</span>
              <span className="text-xs text-muted-foreground">Umroh & Haji</span>
            </div>
          </a>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-6">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsDark(!isDark)}
              className="hidden md:flex h-9 w-9 items-center justify-center rounded-md border hover:bg-accent transition-colors"
              aria-label="Toggle theme"
            >
              {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </button>
            <a
              href="https://wa.me/6281234567890"
              className="hidden md:flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
            >
              <Phone className="h-4 w-4" />
              Hubungi Kami
            </a>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden h-10 w-10 items-center justify-center rounded-md border"
              aria-label="Toggle menu"
            >
              {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Nav */}
        {isOpen && (
          <nav className="md:hidden border-t py-4 space-y-2">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className="block px-4 py-2 text-sm font-medium hover:bg-accent rounded-md transition-colors"
              >
                {item.label}
              </a>
            ))}
            <div className="pt-4 border-t">
              <a
                href="https://wa.me/6281234567890"
                className="flex items-center gap-2 px-4 py-2 text-sm font-medium bg-primary text-primary-foreground rounded-md mx-2"
              >
                <Phone className="h-4 w-4" />
                Hubungi Kami
              </a>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}