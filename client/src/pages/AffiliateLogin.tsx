import { useState } from "react";
import { Link } from "wouter";
import { Eye, EyeOff, Mail, Lock, ArrowRight, Users, Zap } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { cn } from "@/lib/utils";

export default function AffiliateLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    const result = await login(email, password);

    if (!result.success) {
      setError(result.message);
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-primary/10 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link href="/affiliate" className="inline-flex items-center gap-3 mb-6">
            <img src="/logo.png" alt="Ditoris" className="h-12 w-12 rounded-lg" />
            <div className="text-left">
              <span className="font-bold text-xl">DITORIS</span>
              <span className="text-xs text-muted-foreground block">Travelnesia</span>
            </div>
          </Link>
          <h1 className="text-2xl font-bold mb-2">Login Affiliate</h1>
          <p className="text-muted-foreground">Masuk ke dashboard affiliate Anda</p>
        </div>

        {/* Form */}
        <div className="bg-card rounded-2xl shadow-xl border p-8">
          <form onSubmit={handleSubmit} className="space-y-5">
            {error && (
              <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
                {error}
              </div>
            )}

            <div>
              <label className="block text-sm font-medium mb-2">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="email@contoh.com"
                  className="w-full pl-11 pr-4 py-3 rounded-lg border bg-background focus:ring-2 focus:ring-primary focus:border-primary outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-11 pr-12 py-3 rounded-lg border bg-background focus:ring-2 focus:ring-primary focus:border-primary outline-none"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2">
                <input type="checkbox" className="rounded border-primary text-primary focus:ring-primary" />
                <span>Ingat saya</span>
              </label>
              <a href="#" className="text-primary hover:underline">Lupa password?</a>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className={cn(
                "w-full py-3 rounded-lg font-bold text-lg flex items-center justify-center gap-2 transition-all",
                isLoading
                  ? "bg-primary/50 text-primary-foreground cursor-not-allowed"
                  : "bg-primary text-primary-foreground hover:bg-primary/90"
              )}
            >
              {isLoading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Memproses...
                </>
              ) : (
                <>
                  Login
                  <ArrowRight className="h-5 w-5" />
                </>
              )}
            </button>
          </form>

          {/* Demo Credentials */}
          <div className="mt-6 p-4 bg-muted/50 rounded-lg text-sm">
            <p className="font-medium mb-2 flex items-center gap-2">
              <Zap className="h-4 w-4 text-yellow-500" />
              Demo Login
            </p>
            <p className="text-muted-foreground">Email: <span className="font-mono">affiliate@ditoris.com</span></p>
            <p className="text-muted-foreground">Password: <span className="font-mono">demo123</span></p>
          </div>

          <div className="mt-6 text-center text-sm text-muted-foreground">
            <p>
              Belum punya akun?{" "}
              <Link href="/affiliate" className="text-primary font-medium hover:underline">
                Daftar Affiliate
              </Link>
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-8 text-center text-sm text-muted-foreground">
          <p>
            &copy; {new Date().getFullYear()} Ditoris Travelnesia. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
}