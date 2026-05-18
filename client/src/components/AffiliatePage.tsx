import { useState } from "react";
import { Link } from "wouter";
import { CheckCircle2, Users, Gift, TrendingUp, Award, Star, Shield, Heart, Zap, ChevronDown, ChevronUp } from "lucide-react";
import { cn } from "@/lib/utils";
import { affiliateBenefits, affiliateLevels, affiliateHowItWorks, affiliateFaqs, affiliateTestimonials, affiliateRegistration } from "@/data/affiliate";
import AffiliateRegistrationForm from "./AffiliateRegistrationForm";

export function AffiliatePage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [showRegistration, setShowRegistration] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary via-primary to-primary/80 text-primary-foreground py-20 md:py-32">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC40Ij48cGF0aCBkPSJNMzYgMzRjMC0yLjIxLTEuNzktNDAtNC00MHMtNC0xLjc5LTQtNCAxLjc5LTQgNC00IDQtNC00LTMuNzkgNC00IDQtNCA0eiIvPjwvZz48L2c+PC9zdmc+')]"></div>
        </div>
        <div className="container relative">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-white/20 rounded-full px-4 py-2 text-sm font-medium mb-6">
              <Users className="h-4 w-4" />
              PROGRAM AFFILIATE RESMI DITORIS TRAVELNESIA
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Raih Keuntungan dengan<br />
              <span className="text-yellow-300">Promosi Umroh</span>
            </h1>
            <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-2xl mx-auto">
              Bergabung menjadi Affiliate Ditoris Travelnesia dan dapatkan komisi Rp 500.000 - Rp 1.000.000+ per jamaah yang berangkat
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => setShowRegistration(true)}
                className="inline-flex items-center gap-2 bg-white text-primary px-8 py-4 rounded-full font-bold text-lg hover:bg-white/90 transition-all hover:scale-105 shadow-xl"
              >
                <Zap className="h-5 w-5" />
                Daftar Sekarang - Rp 150.000
              </button>
              <a
                href="#cara-kerja"
                className="inline-flex items-center gap-2 border-2 border-white text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-white/10 transition-all"
              >
                Pelajari Lebih Lanjut
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 md:py-24 bg-gradient-to-b from-primary/5 to-background">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Keuntungan Bergabung</h2>
            <p className="text-muted-foreground text-lg">Kenapa harus menjadi Affiliate Ditoris?</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {affiliateBenefits.map((benefit, index) => (
              <div
                key={index}
                className="p-6 rounded-2xl bg-card border hover:shadow-lg hover:border-primary/50 transition-all group"
              >
                <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                  <benefit.icon className="h-7 w-7 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-2">{benefit.title}</h3>
                <p className="text-muted-foreground">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="cara-kerja" className="py-16 md:py-24">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Cara Kerja Affiliate</h2>
            <p className="text-muted-foreground text-lg">4 langkah mudah mulai bisnis umroh</p>
          </div>
          <div className="grid md:grid-cols-4 gap-6">
            {affiliateHowItWorks.map((item, index) => (
              <div key={index} className="relative text-center">
                <div className="w-20 h-20 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                  {item.step}
                </div>
                <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                <p className="text-muted-foreground text-sm">{item.description}</p>
                {index < 3 && (
                  <div className="hidden md:block absolute top-10 left-[60%] w-[80%] border-t-2 border-dashed border-primary/30" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Level System */}
      <section className="py-16 md:py-24 bg-muted/30">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Level Affiliate</h2>
            <p className="text-muted-foreground text-lg">Semakin aktif, semakin besar komisi</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {affiliateLevels.map((level, index) => (
              <div
                key={level.name}
                className={cn(
                  "relative rounded-2xl p-8 border-2 transition-all hover:scale-105",
                  level.color === "gold" && "bg-gradient-to-b from-yellow-50 to-amber-50 border-yellow-400 shadow-xl",
                  level.color === "silver" && "bg-gradient-to-b from-gray-50 to-slate-50 border-gray-300",
                  level.color === "gray" && "bg-card border-gray-200"
                )}
              >
                {level.color === "gold" && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <span className="bg-yellow-400 text-yellow-900 px-4 py-1 rounded-full text-sm font-bold">
                      REKOMENDASI
                    </span>
                  </div>
                )}
                <div className="text-center mb-6">
                  <div className={cn(
                    "w-16 h-16 rounded-full mx-auto flex items-center justify-center mb-4",
                    level.color === "gold" && "bg-yellow-400",
                    level.color === "silver" && "bg-gray-300",
                    level.color === "gray" && "bg-gray-200"
                  )}>
                    <Award className={cn("h-8 w-8", level.color === "gold" ? "text-yellow-900" : "text-gray-600")} />
                  </div>
                  <h3 className="text-2xl font-bold">{level.name}</h3>
                  <p className="text-sm text-muted-foreground">{level.minJamaah}</p>
                </div>
                <div className="space-y-4">
                  <div className="text-center">
                    <p className="text-sm text-muted-foreground">Komisi per Jamaah</p>
                    <p className="text-2xl font-bold text-primary">{level.commission}</p>
                  </div>
                  <div className="border-t pt-4">
                    <p className="text-sm text-muted-foreground mb-2">Benefit:</p>
                    <ul className="space-y-2">
                      <li className="flex items-start gap-2 text-sm">
                        <CheckCircle2 className="h-4 w-4 text-green-600 flex-shrink-0 mt-0.5" />
                        {level.bonus}
                      </li>
                      <li className="flex items-start gap-2 text-sm">
                        <CheckCircle2 className="h-4 w-4 text-green-600 flex-shrink-0 mt-0.5" />
                        Starter kit digital
                      </li>
                      <li className="flex items-start gap-2 text-sm">
                        <CheckCircle2 className="h-4 w-4 text-green-600 flex-shrink-0 mt-0.5" />
                        Akses grup pembinaan
                      </li>
                      <li className="flex items-start gap-2 text-sm">
                        <CheckCircle2 className="h-4 w-4 text-green-600 flex-shrink-0 mt-0.5" />
                        Dashboard affiliate
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 md:py-24">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Cerita Affiliate Kami</h2>
            <p className="text-muted-foreground text-lg">Pengalaman affiliate yang sudah sukses</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {affiliateTestimonials.map((testi, index) => (
              <div key={index} className="p-6 rounded-2xl bg-card border">
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-muted-foreground mb-4 italic">"{testi.text}"</p>
                <div className="bg-primary/10 rounded-lg p-3 mb-4">
                  <p className="text-sm font-bold text-primary">{testi.hasil}</p>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center font-bold text-primary">
                    {testi.name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-semibold">{testi.name}</p>
                    <p className="text-sm text-muted-foreground">{testi.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 md:py-24 bg-muted/30">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Pertanyaan Umum</h2>
            <p className="text-muted-foreground text-lg">Hal yang sering ditanyakan tentang affiliate</p>
          </div>
          <div className="max-w-3xl mx-auto space-y-4">
            {affiliateFaqs.map((faq, index) => (
              <div key={index} className="bg-card rounded-xl border overflow-hidden">
                <button
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  className="w-full flex items-center justify-between p-5 text-left font-semibold hover:bg-muted/50 transition-colors"
                >
                  {faq.question}
                  {openFaq === index ? (
                    <ChevronUp className="h-5 w-5 text-muted-foreground" />
                  ) : (
                    <ChevronDown className="h-5 w-5 text-muted-foreground" />
                  )}
                </button>
                {openFaq === index && (
                  <div className="px-5 pb-5 text-muted-foreground">
                    {faq.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 md:py-32 bg-gradient-to-br from-primary via-primary to-primary/80 text-primary-foreground">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <Gift className="h-16 w-16 mx-auto mb-6" />
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              Siap Mulai Penghasilan dari Ibadah?
            </h2>
            <p className="text-xl text-white/90 mb-8">
              Bergabung sekarang dan dapatkan komisi menarik sambil membantu saudara sesama muslim menuju tanah suci
            </p>
            <div className="bg-white/10 rounded-2xl p-6 mb-8 max-w-md mx-auto">
              <p className="text-sm mb-2">Biaya Registrasi:</p>
              <p className="text-4xl font-bold">Rp {affiliateRegistration.fee.toLocaleString("id-ID")}</p>
              <p className="text-sm text-white/70 mt-2">Sekali seumur hidup • Dapat Starter Kit</p>
            </div>
            <button
              onClick={() => setShowRegistration(true)}
              className="inline-flex items-center gap-2 bg-white text-primary px-10 py-5 rounded-full font-bold text-xl hover:bg-white/90 transition-all hover:scale-105 shadow-xl"
            >
              <Zap className="h-6 w-6" />
              Daftar Affiliate Sekarang
            </button>
          </div>
        </div>
      </section>

      {/* Registration Modal */}
      {showRegistration && (
        <AffiliateRegistrationForm onClose={() => setShowRegistration(false)} />
      )}
    </div>
  );
}