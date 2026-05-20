import { Users, Gift, TrendingUp, Award, Star, CheckCircle2, Zap, Shield, Heart } from "lucide-react";

export const affiliateBenefits = [
  {
    icon: Gift,
    title: "Komisi Menarik",
    description: "Rp 2.000.000 - Rp 3.500.000 per jamaah yang berangkat",
  },
  {
    icon: TrendingUp,
    title: "Level Terbatas",
    description: "Hanya 2 tier - Silver & Gold dengan komisi lebih besar",
  },
  {
    icon: Award,
    title: "Bonus Event",
    description: "Extra Rp 200.000 - Rp 500.000 untuk jamaah dari event",
  },
  {
    icon: Star,
    title: "Reward Utama",
    description: "Top affiliate dapat hadiah umroh gratis atau diskon besar",
  },
  {
    icon: Shield,
    title: "Aman & Terpercaya",
    description: "Pembayaran komisi setelah pelunasan / H-14 keberangkatan",
  },
  {
    icon: Heart,
    title: "Starter Kit Lengkap",
    description: "Katalog, brosur, poster, caption, dan skrip promosi",
  },
];

export const affiliateLevels = [
  {
    name: "Silver",
    minJamaah: "1-5 Jamaah",
    commission: "Rp 2.000.000/jamaah",
    bonus: "Starter kit digital + Akses grup pembinaan",
    color: "silver",
    closingRequirement: 5,
    icon: "🥈",
  },
  {
    name: "Gold",
    minJamaah: "5-10 Jamaah",
    commission: "Rp 3.500.000/jamaah",
    bonus: "+ Bonus event Rp 500.000 + Umroh gratis",
    color: "gold",
    closingRequirement: 10,
    icon: "🥇",
  },
];

export const affiliateHowItWorks = [
  {
    step: "01",
    title: "Daftar Affiliate",
    description: "Isi form registrasi + bayar Rp 200.000 (sekali seumur hidup). Dapat ID & Starter kit langsung.",
  },
  {
    step: "02",
    title: "Promosi & Ajak Jamaah",
    description: "Gunakan link, materi promo, dan skrip yang sudah disediakan untuk mengajak calon jamaah.",
  },
  {
    step: "03",
    title: "Bawa ke Event / Kantor",
    description: "Ajak prospek datang ke event presentasi atau kantor kami. Setiap kehadiran dicatat dengan kode affiliate.",
  },
  {
    step: "04",
    title: "Komisi + Bonus",
    description: "Dapat komisi per jama after closing + bonus event. Komisi cair setelah pelunasan atau H-14.",
  },
];

export const affiliateFaqs = [
  {
    question: "Siapa yang bisa jadi affiliate Ditoris?",
    answer: "Siapa saja! Alumni umroh, ustadz, pengurus masjid, komunitas muslim, influencer, atau siapapun yang serius ingin bisnis ibadah umroh.",
  },
  {
    question: "Bagaimana cara affiliate mempromosikan?",
    answer: "Lewat obrolan langsung, media sosial (WhatsApp, Instagram, Facebook), atau membawa langsung ke event/kantor kami. Semua prospek dicatat dengan kode affiliate.",
  },
  {
    question: "Kapan komisi dibayar?",
    answer: "Komisi dibayarkan setelah ada pelunasan atau H-14 sebelum keberangkatan. Ini untuk memastikan tidak ada pembatalan.",
  },
  {
    question: "Berapa minimal affiliate harus membawa prospek?",
    answer: "Tidak ada target keras, tapi disarankan 2-3 calon jamaah per bulan. Affiliate yang tidak aktif 2 bulan akan dikategorikan dormant.",
  },
  {
    question: "Apa yang didapat setelah daftar Rp 200.000?",
    answer: "Kartu/ID affiliate resmi, akses grup pembinaan, starter kit digital (katalog, brosur, poster, caption, skrip), dan akses pelatihan singkat.",
  },
  {
    question: "Bagaimana cara klaim komisi?",
    answer: "Semua data prospek & komisi bisa dilihat di dashboard affiliate. Tim kami akan verify dan transfer komisi ke rekening affiliate setelah syarat terpenuhi.",
  },
  {
    question: "Berbeda dengan program affiliate lainnya?",
    answer: "Kami memberikan komisi yang jauh lebih besar karena fokus pada kualitas dan bukan kuantitas. Dengan hanya 2 tier, sistem lebih sederhana dan mudah dipahami.",
  },
];

export const affiliateTestimonials = [
  {
    name: "Ustadz Ahmad Fauzi",
    role: "Pengurus Masjid Al-Ikhlas",
    text: "Sudah 3 kali dapat komisi dari Ditoris. Materi promonya lengkap dan gampang dipakai. Jamaah masjid saya banyak yang berangkat.",
    hasil: "6 Jamaah | Rp 12.000.000",
  },
  {
    name: "Siti Nurhaliza",
    role: "Top Affiliate Gold 2025",
    text: "Gak nyangka bisa dapat reward umroh gratis di tahun pertama. Sistemnya transparan dan bayarnya selalu tepat waktu.",
    hasil: "8 Jamaah | Umroh Gratis",
  },
  {
    name: "H. Hasan Wijaya",
    role: "Alumni Umroh + Affiliate",
    text: "Dari alumni berubah jadi affiliate. Pengalaman umroh saya jadi makin berarti karena bisa bawa saudara-saudara lain berangkat.",
    hasil: "4 Jamaah | Rp 8.000.000",
  },
];

export const affiliateRegistration = {
  fee: 200000,
  paymentInfo: {
    bank: "Bank BCA",
    account: "123-456-7890",
    holder: "PT Ditoris Travelnesia",
  },
};