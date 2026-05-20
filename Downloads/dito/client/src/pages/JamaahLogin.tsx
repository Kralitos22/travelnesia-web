import { useState } from "react";
import { useLocation } from "wouter";
import { User, Mail, Lock, Eye, EyeOff, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

export default function JamaahLogin() {
  const [, setLocation] = useLocation();
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (isLogin) {
      // Login logic
      if (formData.email && formData.password) {
        // Mock login - simpan session
        localStorage.setItem("ditoris_jamaah_session", JSON.stringify({
          email: formData.email,
          name: formData.name || "Jamaah",
          loginAt: new Date().toISOString()
        }));
        setSuccess("Login berhasil! Mengalihkan ke dashboard...");
        setTimeout(() => setLocation("/tabungan"), 1500);
      } else {
        setError("Email dan password harus diisi!");
      }
    } else {
      // Register logic
      if (!formData.name || !formData.email || !formData.password || !formData.phone) {
        setError("Semua field harus diisi!");
        return;
      }
      if (formData.password !== formData.confirmPassword) {
        setError("Password tidak cocok!");
        return;
      }
      if (formData.password.length < 6) {
        setError("Password minimal 6 karakter!");
        return;
      }

      // Mock register
      localStorage.setItem("ditoris_jamaah_session", JSON.stringify({
        email: formData.email,
        name: formData.name,
        phone: formData.phone,
        loginAt: new Date().toISOString()
      }));
      setSuccess("Registrasi berhasil! Mengalihkan ke dashboard...");
      setTimeout(() => setLocation("/tabungan"), 1500);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-green-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-3xl shadow-2xl p-8">
          <div className="text-center mb-8">
            <div className="inline-flex itemsgap-3 mb-4">
              <img src="/logo.png" alt="Travelnesia" className="h-14 w-14 rounded-lg" />
              <div className="text-left">
                <span className="text-2xl font-bold text-slate-900">TRAVELNESIA</span>
                <span className="text-sm text-slate-500 block">Akun Jamaah</span>
              </div>
            </div>
            <h2 className="text-2xl font-bold text-slate-900 mb-2">
              {isLogin ? "Masuk ke Akun Anda" : "Daftar Akun Jamaah"}
            </h2>
            <p className="text-slate-500">
              {isLogin ? "Kelola tabungan umroh Anda" : "Mulai menabung untuk umroh impian"}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {error && (
              <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
                {error}
              </div>
            )}
            {success && (
              <div className="p-4 bg-green-50 border border-green-200 rounded-lg text-green-700 text-sm">
                {success}
              </div>
            )}

            {!isLogin && (
              <>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Nama Lengkap</label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full pl-11 pr-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-primary focus:border-primary outline-none"
                      placeholder="Masukkan nama lengkap"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Nomor WhatsApp</label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 font-medium">+62</span>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full pl-14 pr-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-primary focus:border-primary outline-none"
                      placeholder="812-3456-7890"
                    />
                  </div>
                </div>
              </>
            )}

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full pl-11 pr-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-primary focus:border-primary outline-none"
                  placeholder="email@example.com"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                <input
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="w-full pl-11 pr-12 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-primary focus:border-primary outline-none"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </div>

            {!isLogin && (
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Konfirmasi Password</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                  <input
                    type={showPassword ? "text" : "password"}
                    value={formData.confirmPassword}
                    onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                    className="w-full pl-11 pr-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-primary focus:border-primary outline-none"
                    placeholder="••••••••"
                  />
                </div>
              </div>
            )}

            {isLogin && (
              <div className="flex items-center justify-between text-sm">
                <label className="flex items-center gap-2">
                  <input type="checkbox" className="rounded border-slate-300" />
                  <span className="text-slate-600">Ingat saya</span>
                </label>
                <a href="#" className="text-primary hover:underline">Lupa password?</a>
              </div>
            )}

            <button
              type="submit"
              className="w-full py-3 bg-gradient-to-r from-primary to-green-600 text-white rounded-lg font-bold hover:from-primary/90 hover:to-green-700 transition-all shadow-lg flex items-center justify-center gap-2"
            >
              {isLogin ? "Masuk Sekarang" : "Daftar Sekarang"}
              <ArrowRight className="h-5 w-5" />
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-slate-600">
              {isLogin ? "Belum punya akun?" : "Sudah punya akun?"}{" "}
              <button
                onClick={() => {
                  setIsLogin(!isLogin);
                  setError("");
                  setSuccess("");
                }}
                className="text-primary font-bold hover:underline"
              >
                {isLogin ? "Daftar di sini" : "Masuk di sini"}
              </button>
            </p>
          </div>

          {!isLogin && (
            <div className="mt-6 p-4 bg-amber-50 border border-amber-200 rounded-lg">
              <p className="text-sm text-amber-800">
                <strong>Ingin jadi Affiliate?</strong> Daftar sebagai agen dan dapat hingga Rp 3.500.000 per closing!{" "}
                <a href="/affiliate" className="text-amber-600 font-bold hover:underline">Daftar Affiliate →</a>
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
