import { useState } from "react";
import { X, CheckCircle2, Copy, Send, User, Mail, Phone, MapPin, Building, Instagram } from "lucide-react";
import { cn } from "@/lib/utils";
import { affiliateRegistration } from "@/data/affiliate";

interface AffiliateRegistrationFormProps {
  onClose: () => void;
}

export default function AffiliateRegistrationForm({ onClose }: AffiliateRegistrationFormProps) {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    city: "",
    address: "",
    occupation: "",
    instagram: "",
    referralSource: "",
    agreement: false,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In production, this would submit to backend/Google Forms
    setStep(3);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
      <div className="bg-background rounded-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-primary text-primary-foreground p-6 rounded-t-2xl flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold">Daftar Affiliate</h2>
            <p className="text-sm text-white/80">
              {step === 1 && "Step 1: Isi Data Diri"}
              {step === 2 && "Step 2: Pembayaran"}
              {step === 3 && "Pendaftaran Berhasil!"}
            </p>
          </div>
          <button
            onClick={onClose}
            className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center hover:bg-white/30 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Step 1: Form */}
        {step === 1 && (
          <form onSubmit={handleSubmit} className="p-6 space-y-5">
            <div className="flex gap-2 mb-6">
              {[1, 2, 3].map((s) => (
                <div
                  key={s}
                  className={cn(
                    "h-2 flex-1 rounded-full transition-colors",
                    s <= step ? "bg-primary" : "bg-muted"
                  )}
                />
              ))}
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Nama Lengkap *</label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Masukkan nama lengkap"
                    className="w-full pl-11 pr-4 py-3 rounded-lg border bg-background focus:ring-2 focus:ring-primary focus:border-primary outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Email *</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="email@contoh.com"
                    className="w-full pl-11 pr-4 py-3 rounded-lg border bg-background focus:ring-2 focus:ring-primary focus:border-primary outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">No. WhatsApp *</label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="08xxxxxxxxxx"
                    className="w-full pl-11 pr-4 py-3 rounded-lg border bg-background focus:ring-2 focus:ring-primary focus:border-primary outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Kota *</label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                    <input
                      type="text"
                      required
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      placeholder="Kota"
                      className="w-full pl-11 pr-4 py-3 rounded-lg border bg-background focus:ring-2 focus:ring-primary focus:border-primary outline-none"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Pekerjaan</label>
                  <div className="relative">
                    <Building className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                    <input
                      type="text"
                      value={formData.occupation}
                      onChange={(e) => setFormData({ ...formData, occupation: e.target.value })}
                      placeholder="Pekerjaan"
                      className="w-full pl-11 pr-4 py-3 rounded-lg border bg-background focus:ring-2 focus:ring-primary focus:border-primary outline-none"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Instagram (opsional)</label>
                <div className="relative">
                  <Instagram className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <input
                    type="text"
                    value={formData.instagram}
                    onChange={(e) => setFormData({ ...formData, instagram: e.target.value })}
                    placeholder="@username"
                    className="w-full pl-11 pr-4 py-3 rounded-lg border bg-background focus:ring-2 focus:ring-primary focus:border-primary outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Sumber Informasi</label>
                <select
                  value={formData.referralSource}
                  onChange={(e) => setFormData({ ...formData, referralSource: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg border bg-background focus:ring-2 focus:ring-primary focus:border-primary outline-none"
                >
                  <option value="">Pilih...</option>
                  <option value="instagram">Instagram</option>
                  <option value="facebook">Facebook</option>
                  <option value="whatsapp">WhatsApp</option>
                  <option value="teman">Teman/Referral</option>
                  <option value="google">Google</option>
                  <option value="lainnya">Lainnya</option>
                </select>
              </div>
            </div>

            <div className="flex items-start gap-3 pt-2">
              <input
                type="checkbox"
                id="agreement"
                checked={formData.agreement}
                onChange={(e) => setFormData({ ...formData, agreement: e.target.checked })}
                className="mt-1 w-5 h-5 rounded border-primary text-primary focus:ring-primary"
              />
              <label htmlFor="agreement" className="text-sm text-muted-foreground">
                Saya menyetujui <span className="text-primary font-medium">Syarat & Ketentuan</span> Affiliate Ditoris Travelnesia dan siap mengikuti program dengan serius.
              </label>
            </div>

            <button
              type="submit"
              disabled={!formData.agreement}
              className={cn(
                "w-full py-4 rounded-lg font-bold text-lg transition-all",
                formData.agreement
                  ? "bg-primary text-primary-foreground hover:bg-primary/90"
                  : "bg-muted text-muted-foreground cursor-not-allowed"
              )}
            >
              Lanjut ke Pembayaran
            </button>
          </form>
        )}

        {/* Step 2: Payment */}
        {step === 2 && (
          <div className="p-6 space-y-6">
            <div className="flex gap-2 mb-6">
              {[1, 2, 3].map((s) => (
                <div
                  key={s}
                  className={cn(
                    "h-2 flex-1 rounded-full transition-colors",
                    s <= step ? "bg-primary" : "bg-muted"
                  )}
                />
              ))}
            </div>

            <div className="bg-muted/50 rounded-xl p-5">
              <p className="text-sm text-muted-foreground mb-2">Total Pembayaran</p>
              <p className="text-3xl font-bold text-primary">
                Rp {affiliateRegistration.fee.toLocaleString("id-ID")}
              </p>
              <p className="text-sm text-muted-foreground mt-1">Sekali seumur hidup</p>
            </div>

            <div className="bg-card border rounded-xl p-5">
              <p className="font-semibold mb-3">Transfer ke:</p>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Bank</span>
                  <span className="font-bold">{affiliateRegistration.paymentInfo.bank}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">No. Rekening</span>
                  <div className="flex items-center gap-2">
                    <span className="font-bold">{affiliateRegistration.paymentInfo.account}</span>
                    <button
                      onClick={() => copyToClipboard(affiliateRegistration.paymentInfo.account)}
                      className="p-1 hover:bg-muted rounded"
                    >
                      <Copy className="h-4 w-4 text-muted-foreground" />
                    </button>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Atas Nama</span>
                  <span className="font-bold">{affiliateRegistration.paymentInfo.holder}</span>
                </div>
              </div>
            </div>

            <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 text-sm">
              <p className="font-semibold text-yellow-800 mb-1">Penting!</p>
              <p className="text-yellow-700">
                Setelah transfer, kirim bukti pembayaran ke WhatsApp kami untuk konfirmasi registrasi.
              </p>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setStep(1)}
                className="flex-1 py-4 rounded-lg font-bold border border-primary text-primary hover:bg-primary/5 transition-all"
              >
                Kembali
              </button>
              <a
                href={`https://wa.me/6281234567890?text=Halo, saya sudah transfer Rp ${affiliateRegistration.fee.toLocaleString("id-ID")} untuk registrasi affiliate Ditoris Travelnesia. Nama: ${formData.name}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 py-4 rounded-lg font-bold bg-green-500 text-white hover:bg-green-600 transition-all flex items-center justify-center gap-2"
              >
                <Send className="h-5 w-5" />
                Kirim Bukti Bayar
              </a>
            </div>
          </div>
        )}

        {/* Step 3: Success */}
        {step === 3 && (
          <div className="p-6 text-center">
            <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 className="h-10 w-10 text-green-600" />
            </div>
            <h3 className="text-2xl font-bold mb-2">Pendaftaran Berhasil!</h3>
            <p className="text-muted-foreground mb-6">
              Terima kasih {formData.name}! Pendaftaran Anda sedang diproses.
            </p>

            <div className="bg-muted/50 rounded-xl p-5 text-left mb-6">
              <p className="font-semibold mb-3">Langkah selanjutnya:</p>
              <ol className="space-y-2 text-sm">
                <li className="flex gap-2">
                  <span className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-bold flex-shrink-0">1</span>
                  <span>Konfirmasi pembayaran via WhatsApp</span>
                </li>
                <li className="flex gap-2">
                  <span className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-bold flex-shrink-0">2</span>
                  <span>Tim kami akan mengirim ID Affiliate & Starter Kit</span>
                </li>
                <li className="flex gap-2">
                  <span className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-bold flex-shrink-0">3</span>
                  <span>Gabung grup pembinaan affiliate</span>
                </li>
                <li className="flex gap-2">
                  <span className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-bold flex-shrink-0">4</span>
                  <span>Mulai promosikan dan raih komisi!</span>
                </li>
              </ol>
            </div>

            <a
              href="https://wa.me/6281234567890"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-green-500 text-white px-8 py-4 rounded-full font-bold hover:bg-green-600 transition-all"
            >
              <Send className="h-5 w-5" />
              Hubungi Kami via WhatsApp
            </a>
          </div>
        )}
      </div>
    </div>
  );
}