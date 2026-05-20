import { useState, useEffect } from "react";
import { Menu, X, Phone, Moon, Sun, Users, LogIn, LogOut, User, Wallet, Landmark } from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { label: "Beranda", href: "/" },
  { label: "Paket Umroh", href: "#paket" },
  { label: "Harga", href: "#harga" },
  { label: "Tabungan Umroh", href: "/tabungan" },
  { label: "Affiliate", href: "/affiliate" },
  { label: "Testimoni", href: "#testimoni" },
  { label: "Kontak", href: "#kontak" },
];

export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userType, setUserType] = useState<"jamaah" | "affiliate" | "admin" | null>(null);

  useEffect(() => {
    // Check session for Jamaah
    const jamaahSession = localStorage.getItem("ditoris_jamaah_session");
    const affiliateSession = localStorage.getItem("ditoris_session");
    const adminSession = sessionStorage.getItem("ditoris_admin_session");

    if (jamaahSession) {
      setIsLoggedIn(true);
      setUserType("jamaah");
    } else if (affiliateSession) {
      setIsLoggedIn(true);
      setUserType("affiliate");
    } else if (adminSession) {
      setIsLoggedIn(true);
      setUserType("admin");
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("ditoris_jamaah_session");
    sessionStorage.removeItem("ditoris_session");
    sessionStorage.removeItem("ditoris_admin_session");
    setIsLoggedIn(false);
    setUserType(null);
    window.location.href = "/";
  };

  const getDashboardLink = () => {
    switch (userType) {
      case "jamaah": return "/tabungan";
      case "affiliate": return "/affiliate/dashboard";
      case "admin": return "/admin/dashboard";
      default: return "/tabungan";
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <a href="/" className="flex items-center gap-3">
            <img src="/logo.png" alt="Travelnesia" className="h-10 w-10 rounded-lg object-cover" />
            <div className="flex flex-col">
              <span className="font-bold text-lg leading-tight">Travelnesia</span>
              <span className="text-xs text-muted-foreground">Umroh & Haji</span>
            </div>
          </a>

          {/* Desktop Nav */}
          <nav className="hidden xl:flex items-stretch h-full overflow-hidden">
            {navItems.map((item, index) => (
              <a
                key={item.label}
                href={item.href}
                className={cn(
                  "flex items-center px-5 text-sm font-medium transition-colors border-b-2 border-transparent hover:border-primary hover:text-primary",
                  item.label === "Tabungan Umroh"
                    ? "text-primary"
                    : "text-muted-foreground"
                )}
                style={{ whiteSpace: "nowrap" }}
              >
                {item.label === "Tabungan Umroh" && <Landmark className="h-4 w-4 mr-1" />}
                {item.label}
              </a>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsDark(!isDark)}
              className="hidden md:flex h-9 w-9 items-center justify-center rounded-md border hover:bg-accent transition-colors"
              aria-label="Toggle theme"
            >
              {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </button>

            {isLoggedIn ? (
              <>
                <a
                  href={getDashboardLink()}
                  className="hidden md:flex items-center gap-2 rounded-md bg-gradient-to-r from-green-600 to-green-700 text-white px-4 py-2 text-sm font-medium hover:from-green-700 hover:to-green-800 transition-all shadow-md"
                >
                  <Wallet className="h-4 w-4" />
                  Dashboard
                </a>
                <button
                  onClick={handleLogout}
                  className="hidden md:flex items-center gap-2 rounded-md border border-red-500 text-red-600 px-4 py-2 text-sm font-medium hover:bg-red-50 transition-colors"
                >
                  <LogOut className="h-4 w-4" />
                  Sign Out
                </button>
              </>
            ) : (
              <>
                <a
                  href="/jamaah/login"
                  className="hidden md:flex items-center gap-2 rounded-md bg-gradient-to-r from-primary to-primary/90 text-primary-foreground px-4 py-2 text-sm font-medium hover:from-primary/90 hover:to-primary transition-all shadow-md"
                >
                  <User className="h-4 w-4" />
                  Masuk Akun Jamaah
                </a>
                <a
                  href="/affiliate"
                  className="hidden md:flex items-center gap-2 rounded-md border-2 border-amber-500 text-amber-600 px-4 py-2 text-sm font-bold hover:bg-amber-50 transition-colors"
                >
                  <Users className="h-4 w-4" />
                  Jadi Affiliate
                </a>
              </>
            )}

            <a
              href="https://wa.me/6281234567890"
              className="hidden xl:flex items-center gap-2 rounded-md border border-green-500 text-green-600 px-4 py-2 text-sm font-medium hover:bg-green-50 transition-colors"
            >
              <Phone className="h-4 w-4" />
              Hubungi Kami
            </a>

            <button
              onClick={() => setIsOpen(!isOpen)}
              className="xl:hidden h-10 w-10 items-center justify-center rounded-md border"
              aria-label="Toggle menu"
            >
              {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Nav */}
        {isOpen && (
          <nav className="xl:hidden border-t py-4 space-y-2">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className={cn(
                  "flex items-center gap-2 px-4 py-2 text-sm font-medium hover:bg-accent rounded-md transition-colors",
                  item.label === "Tabungan Umroh" ? "text-primary bg-primary/5" : ""
                )}
              >
                {item.label === "Tabungan Umroh" && <Landmark className="h-4 w-4" />}
                {item.label}
              </a>
            ))}
            <div className="pt-4 border-t space-y-2">
              {isLoggedIn ? (
                <>
                  <a
                    href={getDashboardLink()}
                    onClick={() => setIsOpen(false)}
                    className="flex items-center gap-2 px-4 py-2 text-sm font-medium bg-green-600 text-white rounded-md mx-2 justify-center"
                  >
                    <Wallet className="h-4 w-4" />
                    Dashboard Saya
                  </a>
                  <button
                    onClick={() => { handleLogout(); setIsOpen(false); }}
                    className="flex items-center gap-2 px-4 py-2 text-sm font-medium border border-red-500 text-red-600 rounded-md mx-2 w-full justify-center"
                  >
                    <LogOut className="h-4 w-4" />
                    Sign Out
                  </button>
                </>
              ) : (
                <>
                  <a
                    href="/jamaah/login"
                    onClick={() => setIsOpen(false)}
                    className="flex items-center gap-2 px-4 py-2 text-sm font-medium bg-primary text-primary-foreground rounded-md mx-2 justify-center"
                  >
                    <User className="h-4 w-4" />
                    Masuk Akun Jamaah
                  </a>
                  <a
                    href="/affiliate"
                    onClick={() => setIsOpen(false)}
                    className="flex items-center gap-2 px-4 py-2 text-sm font-medium border-2 border-amber-500 text-amber-600 rounded-md mx-2 justify-center font-bold"
                  >
                    <Users className="h-4 w-4" />
                    Jadi Affiliate
                  </a>
                </>
              )}
              <a
                href="https://wa.me/6281234567890"
                className="flex items-center gap-2 px-4 py-2 text-sm font-medium bg-green-500 text-white rounded-md mx-2 justify-center"
              >
                <Phone className="h-4 w-4" />
                Hubungi Kami via WhatsApp
              </a>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}
